from pymongo import MongoClient
import chromadb

# Connexion à MongoDB
mongo_client = MongoClient("")  # Modifie avec ton URI MongoDB
mongo_db = mongo_client["chatbot_data"]
mongo_collection = mongo_db["metiers"]

# Connexion à ChromaDB
chroma_client = chromadb.PersistentClient(path="")  # Vérifie le bon chemin
collection = chroma_client.get_or_create_collection("metier")

# Récupération des documents MongoDB
documents = list(mongo_collection.find({}, {"_id": 0}))  # Exclut _id pour éviter les problèmes

if not documents:
    print("⚠️ Aucune donnée trouvée dans MongoDB. Vérifie que la base n'est pas vide.")

# Ajout des documents dans ChromaDB
for idx, doc in enumerate(documents):
    doc_id = f"doc_{idx}"  # Génère un ID unique pour ChromaDB
    metadata = {
        "id": doc.get("id", ""),
        "titre": doc.get("titre", ""),
        "url_fiche_metier": doc.get("url_fiche_metier", "")
    }  # Métadonnées

    # Crée un texte composite à partir des champs récupérés
    text = f"Titre: {doc.get('titre', '')}, URL: {doc.get('url_fiche_metier', '')}"

    # Ajout dans ChromaDB
    collection.add(
        ids=[doc_id],
        documents=[text],  # Remplace par un embedding si nécessaire
        metadatas=[metadata]
    )

    print(f"✅ Document ajouté : {doc_id} - {text}")

print("🚀 Migration terminée avec succès !")

# Vérification des collections existantes
collections = chroma_client.list_collections()
print("📂 Collections disponibles :", collections)
