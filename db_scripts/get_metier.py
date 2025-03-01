import requests
from bs4 import BeautifulSoup
import pymongo
import uuid
from urllib.parse import urljoin

# URI DE CONNECTION MONGODB
mongo_uri = ""

def scrap_metier():
    # Connection à la base de données
    client = pymongo.MongoClient(mongo_uri)
    db = client["chatbot_data"]
    collection = db["metiers"]
    
    base_url = "https://candidat.francetravail.fr"
    jobs_url = f"{base_url}/metierscope/metiers"
    
    try:
        response = requests.get(jobs_url)
        response.raise_for_status()
        
        # Parsing du HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Trouver tout les éléments métier dans la liste
        job_items = soup.find_all('li', attrs={'_ngcontent-sc133': ''})
        
        jobs_data = []
        for item in job_items:
            link = item.find('a')
            if link:
                # Trouver l'url de la fiche métier
                fiche_metier = link.get('href')
                
                # Trouver de titre du métier
                job_title = link.find('span', class_='btn-search-text')
                if job_title:
                    job_title = job_title.text.strip()
                    
                    # Construire l'object avec la sauvegarde
                    job_doc = {
                        "id": str(uuid.uuid4()),
                        "titre": job_title,
                        "url_fiche_metier": urljoin(base_url, fiche_metier)
                    }
                    jobs_data.append(job_doc)
        
        if jobs_data:
            # Insérer la data dans la db
            collection.insert_many(jobs_data)
            
    except requests.RequestException as e:
        print(f"Error: {e}")
    except pymongo.errors.PyMongoError as e:
        print(f"Error DB: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    scrap_metier()
