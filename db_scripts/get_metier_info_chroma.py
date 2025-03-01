from pymongo import MongoClient
import chromadb
import time

# Connexion à MongoDB
mongo_client = MongoClient("")  # Remplace par ton URI
mongo_db = mongo_client["chatbot_data"]
mongo_collection = mongo_db["metier_info"]

# Connexion à ChromaDB
chroma_client = chromadb.PersistentClient(path="")  # Vérifie le bon chemin
collection = chroma_client.get_or_create_collection("metier_info")

# Récupération des documents MongoDB
documents = list(mongo_collection.find({}, {"_id": 0}))

if not documents:
    print("⚠️ Aucun document récupéré depuis MongoDB ! Vérifie ta base.")
else:
    print(f"✅ {len(documents)} documents récupérés depuis MongoDB.")

# Ajout des documents dans ChromaDB
for idx, doc in enumerate(documents):
    doc_id = f"doc_{idx}"  # Génère un ID unique

    # Extraction des métadonnées
    metadata = {
        "id": doc.get("id", "N/A"),  # Remplace None par "N/A"
        "metier_id": doc.get("metier_id", "N/A"),
        "titre": doc.get("titre", "Inconnu"),
        "url_fiche_metier": doc.get("url_fiche_metier", "Inconnu"),
        "nbr_demandeurs": doc.get("nbr_demandeurs", "N/A"),
        "nbr_offre": doc.get("nbr_offre", "N/A"),
        "difficulte_recrutement": doc.get("difficulte_recrutement", "N/A"),
        "plage_salaire_min": doc.get("plage_salaire", {}).get("min", "N/A"),
        "plage_salaire_max": doc.get("plage_salaire", {}).get("max", "N/A"),
    }

    # Vérifie si l'un des champs est None et remplace par "Inconnu" ou autre valeur
    for key, value in metadata.items():
        if value is None:
            print(f"⚠️ Valeur None pour {key}, remplacement par 'Inconnu'.")
            metadata[key] = "Inconnu"

        if isinstance(value, list):
            metadata[key] = ", ".join(value)
        
    # Vérification avant l'ajout dans ChromaDB
    if not metadata["titre"]:
        print(f"⚠️ Document {doc_id} ignoré car 'titre' est vide.")
        continue

    # Transformation des listes en texte
    missions = ", ".join(doc.get("missions", []))
    secteurs = ", ".join(doc.get("secteurs", []))
    certifications = ", ".join(doc.get("certifications", []))
    
    # Traitement des compétences
    competences = ", ".join(
        [c.get("nom", "Inconnu") for c in doc.get("competences", []) if isinstance(c, dict)]
    )  # Gère les objets correctement
    
    horaires = ", ".join(doc.get("horaires", []))

    # Construction du texte pour l'indexation
    text = (
        f"Titre: {metadata['titre']}, "
        f"URL: {metadata['url_fiche_metier']}, "
        f"Missions: {missions}, "
        f"Secteurs: {secteurs}, "
        f"Certifications: {certifications}, "
        f"Compétences: {competences}, "
        f"Horaires: {horaires}, "
        f"Nombre de demandeurs: {metadata['nbr_demandeurs']}, "
        f"Nombre d'offres: {metadata['nbr_offre']}, "
        f"Difficulté de recrutement: {metadata['difficulte_recrutement']}, "
        f"Salaire: {metadata['plage_salaire_min']} - {metadata['plage_salaire_max']}"
    )

    # Ajout dans ChromaDB
    collection.add(
        ids=[doc_id],
        documents=[text],  # Remplace par un embedding si besoin
        metadatas=[metadata]
    )

    print(f"✅ Ajouté dans ChromaDB : {doc_id} ({text})")

print("🚀 Migration terminée avec succès !")
