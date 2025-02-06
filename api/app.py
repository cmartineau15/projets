from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import chromadb
from openai import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
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
 
# Initialisation du modèle LangChain avec OpenAI
llm = ChatOpenAI(model_name="gpt-4o-mini", openai_api_key=clé_api)
 
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
 
def retrieve_documents(query):
    results = collection.query(
        query_texts=[query],
        n_results=20,
        include=["metadatas", "documents"]
    )
   
    return results
 
# Fonction pour construire le prompt avec la conversation précédente
def build_prompt(query, retrieved_docs, session_id):
    context = retrieved_docs
   
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
 
# Fonction pour construire le prompt avec la conversation précédente
def build_prompt_motivation(query, session_id):
   
    # Récupérer l'historique de conversation
    history = user_sessions.get(session_id, [])
    formatted_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
   
    prompt = f"""    
    Historique de la conversation :
    {formatted_history}
   
    Question utilisateur : {query}
    Réponds de manière détaillée et précise.
    """
   
    return prompt
# Route API pour traiter la requête utilisateur et générer la réponse via query parameter
@app.get("/generate")
async def generate_response_api(query: str, session_id: str):
    try:
        if not session_id:
            raise HTTPException(status_code=400, detail="Le paramètre 'session_id' est obligatoire")
 
        retrieved_docs = retrieve_documents(query)
        prompt = build_prompt(query, retrieved_docs, session_id)
 
        # Affichage du prompt dans les logs du serveur
        print("\n===== Prompt envoyé au LLM =====\n")
        print(prompt)
        print("\n================================\n")
 
        return StreamingResponse(generate_response(prompt, session_id), media_type="text/plain")
 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
# Fonction pour générer une réponse via OpenAI
def generate_response(prompt, session_id):
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages = [
            {
                "role": "system",
                "content": """
                   Tu es un assistant d'orientation professionnelle expert. Ta mission est d'aider l'utilisateur à explorer les métiers et les formations qui lui correspondent en engageant un dialogue interactif et progressif.
                    L'utilisateur pourra également te copier/coller des offres d'emploi et/ou de formations et tu devras le guider sur les attendus et l'aider à comprendre ces textes.
                    Principes clés:
                    - Engagement progressif : Ne pas inonder d’informations. Poser des questions pour affiner la discussion au fur et à mesure.
                    - Échange naturel: Utiliser un ton conversationnel, éviter les réponses encyclopédiques.
                    - Adaptation à l’utilisateur : Relancer avec des questions personnalisées selon ses réponses.
                    - Ne pas inclure "assistant :" en début de réponse. Réponds directement dans un format conversationnel naturel.
                   
                    ### 🛠 **Exemples d'échanges** (Few-Shot) :
                    **Utilisateur :** Je ne sais pas quel métier choisir.  
                    **Assistant :** Pas de souci ! 😊 Peux-tu me dire ce que tu aimes faire au quotidien ?  
                    **Utilisateur :** J’aime travailler avec les chiffres.  
                    **Assistant :** Intéressant ! 📊 Est-ce que tu préfères les analyser, faire des prévisions ou les organiser ?  
                    **Utilisateur :** J’aime surtout les analyser.  
                    **Assistant :** Super ! 🎯 Tu pourrais aimer des métiers comme **data analyst**, **actuaire** ou **contrôleur de gestion**. Veux-tu plus d’infos sur l’un d’eux ?  
                    **Utilisateur :** Oui, sur le data analyst.  
                    **Assistant :** Bien sûr ! Voici un résumé clair 👇  
                   
markdown
                    ### Métier : Data Analyst
                    **Description** : Spécialiste de l’analyse des données, il aide les entreprises à prendre des décisions stratégiques en traitant et visualisant des informations.  
                    **Salaire moyen** : Environ 40 000€ par an.  
                    **Compétences requises** : Statistiques, programmation (Python, SQL), esprit analytique.  
                    **Formation** : Master en data science, statistiques ou économie.  
                    **💡 Et après ?**  
                    - Est-ce que cela te parle ou veux-tu explorer d'autres métiers liés aux chiffres ?
                    - Préfères-tu un métier plus orienté terrain ou stratégie ?
 
                    Ta mission :  
                    - Toujours engager la conversation avec des relances.
                    - Fournir des infos pertinentes en gardant un ton fluide et interactif.
                    - Ne jamais répondre avec un long pavé sans relancer l’échange.
                    Si l’utilisateur est indécis, l’aider à affiner en posant une question à la fois.  
                    Style de réponse :
                    - Évite de commencer chaque réponse par "C'est super !" ou "Génial !".  
                    - Adapte ton ton en fonction du contexte :  
                    - Si l'utilisateur partage une hésitation → Montre de l’empathie ("Je vois, ce n’est pas facile de choisir…")  
                    - S’il exprime une envie ou une idée → Encourage sans exagérer ("C'est une bonne piste, tu veux qu'on explore ensemble les débouchés ?")  
                    - S’il pose une question technique → Reste neutre et informatif.  
                    - Ne répète pas les mêmes formules à chaque réponse. Varie ton langage pour garder la conversation naturelle.
                   
                   
 
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
 
 
# Fonction pour générer une réponse via OpenAI
def generate_response_motivation(prompt, session_id):
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages = [
            {
                "role": "system",
                "content": """
                    Tu es un assistant expert en rédaction de lettres de motivation. Ta mission est d'aider l'utilisateur à rédiger, corriger et optimiser sa lettre pour maximiser ses chances d'obtenir un entretien. Tu peux également analyser les fiches de poste qu'il fournit.
 
                    ### Règles de réponse :
                    - **Approche personnalisée :** Pose des questions pour adapter la lettre au profil du candidat et au poste visé.
                    - **Structure claire en markdown :**
                      - 📌 **Introduction :** Présente-toi brièvement et engage l'utilisateur avec une phrase encourageante.
                      - 🔍 **Corrections et suggestions :** Analyse la lettre et propose des améliorations (phrases plus impactantes, reformulations, ajustements).
                      - 🎯 **Conseils personnalisés :** Donne des astuces sur le ton, la mise en page et l’impact des formulations.
                      - ✅ **Version finale optimisée :** Réécris la lettre en tenant compte des ajustements.
 
                    ### Format de réponse initial :
                    📌 **Questions préliminaires qui doivent être posées une par une et non pas en une fois :**
                    1. Quel est le poste que tu vises ou peux-tu me fournir la fiche de poste ?
                    2. Quelles études as-tu suivies et quels sont tes points forts ?
                    3. Peux-tu décrire tes expériences professionnelles passées pertinentes pour ce poste ?
                   
                    Une fois que l'utilisateur a fourni ces informations, tu généreras une lettre de motivation personnalisée et demanderas si cela lui convient ou si des modifications sont nécessaires.
                   
                    **Message d’accueil (première interaction seulement) :**  
                    "Bienvenue ! Ensemble, créons une lettre de motivation percutante. Dis-moi pour quel poste tu postules et quelles sont tes expériences clés ! 🚀"
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
 
# Route API pour traiter la requête utilisateur et générer la réponse via query parameter
@app.get("/generate_motivation")
async def generate_response_api(query: str, session_id: str):
    try:
        # Vérifier si session_id est fourni
        if not session_id:
            raise HTTPException(status_code=400, detail="Le paramètre 'session_id' est obligatoire")
 
        # Construire le prompt
        prompt = build_prompt_motivation(query, session_id)
 
        # Stream the response using StreamingResponse
        return StreamingResponse(generate_response_motivation(prompt, session_id), media_type="text/plain")
 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))