import chromadb

# Connexion à ChromaDB
chroma_client = chromadb.PersistentClient(path="")  # Ton chemin vers ChromaDB
collection = chroma_client.get_or_create_collection("metier_info")

# Récupérer tous les documents dans la collection ChromaDB
documents_chroma = collection.get(include=["metadatas", "documents"])

if not documents_chroma['documents']:
    print("⚠️ Aucune donnée trouvée dans ChromaDB.")
else:
    print("📂 Documents disponibles dans ChromaDB :")
    for idx, doc in enumerate(documents_chroma['documents']):
        metadata = documents_chroma['metadatas'][idx]
        print(f"Document {idx + 1}: {doc}")
        print(f"  Métadonnées : {metadata}")
        print("")
