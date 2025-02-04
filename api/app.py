from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import chromadb
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

clé_api = os.getenv("OPENAI_API_KEY")
chroma_db_path = os.getenv("CHROMA_DB_PATH")

if clé_api is None:
    raise ValueError("La clé API OpenAI n'est pas définie dans le fichier .env")

if chroma_db_path is None:
    raise ValueError("Le chemin de la db chroma n'est pas défini dans le fichier .env")

client = OpenAI(api_key=clé_api)

# Connexion à la base de données Chroma
chroma_client = chromadb.PersistentClient(path=chroma_db_path)
collection = chroma_client.get_collection("metier_info")

# Créer l'application FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mémorisation des conversations
user_sessions = {}

# Fonction pour récupérer les documents pertinents depuis Chroma
def retrieve_documents(query):
    results = collection.query(query_texts=[query], n_results=5)
    documents = results.get("documents", [[]])
    scores = results.get("distances", [[]]) 

    if not documents or not documents[0]:
        return ["Aucune information trouvée."]

    threshold = 0.3 

    filtered_docs = [
        doc for doc, score in zip(documents[0], scores[0]) if score <= threshold
    ]

    if not filtered_docs:
        return ["Les résultats ne semblent pas pertinents. Pouvez-vous préciser votre question ?"]

    return filtered_docs

# Fonction pour construire le prompt avec la conversation précédente
def build_prompt(query, retrieved_docs, session_id):
    context = "\n".join(retrieved_docs)
    
    # Récupérer l'historique de conversation
    history = user_sessions.get(session_id, [])
    formatted_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
    
    prompt = f"""
    Voici des informations pertinentes :
    {context}
    
    Historique de la conversation :
    {formatted_history}
    
    Question utilisateur : {query}
    Réponds de manière détaillée et précise.
    """
    
    return prompt

# Fonction pour générer une réponse via OpenAI
def generate_response(prompt, session_id):
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages = [
            {
                "role": "system",
                "content": """
                    Tu es un assistant d'orientation professionnelle expert. Ta mission est d'accompagner l'utilisateur dans son exploration des métiers en lui fournissant des informations fiables, précises et utiles.

                    ### Règles de réponse :
                    - **Première interaction :** Toujours commencer par une phrase rassurante et engageante pour mettre l'utilisateur à l'aise.
                    - **Réponses détaillées :** Fournir une description complète du métier demandé, incluant :
                    - Une **explication claire du rôle** et des missions principales.
                    - Le **salaire moyen** estimé.
                    - Les **formations et compétences requises**.
                    - Un ou plusieurs **liens utiles** pour approfondir (ex. France Travail, ONISEP, etc.).
                    - **Format clair et structuré en markdown.**
                    - **Aucune invention** : si l'information est inconnue, proposer des alternatives ou poser des questions pour préciser la demande.
                    - **Variabilité du langage** : Ne pas répéter les mêmes tournures dans une même conversation pour paraître plus naturel.
                    
                    - **Gestion de la conversation :**
                    - Si l'utilisateur n’exprime pas clairement une idée de métier ou de compétences, lui poser des questions ciblées pour affiner son profil.
                    - Toujours conclure par une **question ouverte** pour l’inviter à poursuivre la discussion.

                    ### Restrictions :
                    - **Tu n’es PAS ChatGPT.** Tu es uniquement un assistant d'orientation. Si une question sort de ton domaine, réponds : "Désolé, je ne peux pas vous aider pour cela."
                    - **Ne redis pas "Bonjour" après le premier message.**

                    ### Exemples :

                    **Message d’accueil (premier message seulement) :**
                    "Bienvenue ! Je suis là pour vous aider à explorer vos options professionnelles. Dites-moi en plus sur ce qui vous intéresse, et je vous guiderai vers les meilleures opportunités."

                    **Réponse formatée en markdown :**
                    ```markdown
                    ### Métier : [Nom du Métier]
                    **Description** : [Description détaillée du métier]

                    **Salaire moyen** : [Salaire moyen annuel]

                    **Qualifications nécessaires** : [Diplômes et compétences requises]

                    **Liens utiles** : [Lien vers des ressources externes]

                    Avez-vous des questions sur ce métier ou souhaitez-vous explorer d’autres options ?

                """
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        stream=True,
    )

    full_response = ""
    
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            yield chunk.choices[0].delta.content
            full_response += chunk.choices[0].delta.content

    # Mémoriser la conversation
    user_sessions.setdefault(session_id, []).append({"role": "user", "content": prompt})
    user_sessions[session_id].append({"role": "assistant", "content": full_response})

# Route API pour traiter la requête utilisateur et générer la réponse via query parameter
@app.get("/generate")
async def generate_response_api(query: str, session_id: str):
    try:
        # Vérifier si session_id est fourni
        if not session_id:
            raise HTTPException(status_code=400, detail="Le paramètre 'session_id' est obligatoire")

        # Récupérer les documents en fonction de la requête
        retrieved_docs = retrieve_documents(query)

        # Construire le prompt
        prompt = build_prompt(query, retrieved_docs, session_id)

        # Stream the response using StreamingResponse
        return StreamingResponse(generate_response(prompt, session_id), media_type="text/plain")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
