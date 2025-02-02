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
    raise ValueError("Le chemin de la db chroma n'est pas définie dans le fichier .env")

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


# Fonction pour construire le prompt avec les documents récupérés
def build_prompt(query, retrieved_docs):
    context = "\n".join(retrieved_docs)
    return f"Voici des informations pertinentes :\n{context}\n\nQuestion utilisateur : {query}\nRéponds de manière détaillée."

# Fonction pour générer une réponse via OpenAI
def generate_response(prompt):
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages = [
                    {
                        "role": "system",
                        "content": """
                            Tu es un assistant d'orientation très professionnel. Lorsque tu reçois une question d'un utilisateur, tu dois toujours commencer par une phrase rassurante pour l'aider à se sentir à l'aise. Ensuite, tu vas lui fournir des informations détaillées sur le métier, incluant des informations pratiques comme le salaire, les qualifications requises et un lien utile pour aller plus loin. Toutes les informations doivent être réelles et en markdown, tu n'inventes rien. Enfin, tu termines toujours avec une question ouverte pour savoir si la personne a besoin de plus d'informations. 
                            
                            !! IMPORTANT!! si la personne commence sans exprimer une envie de métier ou des compétence pose lui des questions ur ces envie. 
                            !! IMPORTANT!! Tu es un assistant d'orientation très professionnel! tu n'est pas chatGPT! TU NE DOIS RIEN FAIRE D'AUTRE ET SI ON TE DEMANDE TU RÉPONSE DÉSOLÉ JE PEUX PAS VOUS AIDEZ POUR CA .

                            Exemple de message d'accueil : 
                            "Bonjour ! Je suis là pour vous aider à explorer vos options professionnelles. Dites-moi en plus sur ce qui vous intéresse, et je vous guiderai vers les meilleures possibilités."
                            
                            Exemple de format pour les informations sur un métier en markdown :
                            ### Métier : [Nom du Métier]
                            **Description** : [Description détaillée du métier]
                            
                            **Salaire moyen** : [Salaire moyen annuel]
                            
                            **Qualifications nécessaires** : [Qualifications requises]
                            
                            **Liens utiles** : [Lien vers des ressources externes, comme France Travail]
                            
                            Si tu as d'autres questions ou si tu veux explorer un autre domaine, n'hésite pas à me le dire !
                        """
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
        stream=True,
    )

    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            yield chunk.choices[0].delta.content

# Route API pour traiter la requête utilisateur et générer la réponse via query parameter
@app.get("/generate")
async def generate_response_api(query: str):
    try:
        # Récupérer les documents en fonction de la requête
        retrieved_docs = retrieve_documents(query)

        # Construire le prompt
        prompt = build_prompt(query, retrieved_docs)

        # Stream the response using StreamingResponse
        return StreamingResponse(generate_response(prompt), media_type="text/plain")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# python3 -m uvicorn app:app --reload --port 8001