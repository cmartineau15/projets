import requests
from bs4 import BeautifulSoup
import pymongo
from urllib.parse import urljoin
import time

def scrape_metier_details(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Missions
        missions = []
        missions_ul = soup.find('ul', attrs={'data-cy': 'liste-descriptif-metier'})
        if missions_ul:
            missions = [li.text.strip() for li in missions_ul.find_all('li')]
            
        # Secteur d'activité
        secteurs = []
        secteurs_container = soup.find('div', {'class': 'sub-domains-container'})
        if secteurs_container:
            secteurs_links = secteurs_container.find_all('a', {'class': 'text-link'})
            secteurs = [link.text.strip() for link in secteurs_links]
            
        # Certifications
        certifications = []
        cert_ul = soup.find('ul', attrs={'data-cy': 'liste-certification-metier'})
        if cert_ul:
            certifications = [li.text.strip() for li in cert_ul.find_all('li')]
            
        # Competences
        competences = []
        competences_ul = soup.find('ul', {'data-cy': 'liste-savoir-faire-metier'})
        if competences_ul:
            for li in competences_ul.find_all('li', recursive=False):
                title = li.find('h4', {'class': 'fm-block-form-title'})
                if not title:
                    continue
                    
                # Extractaire nom + pourcentage
                title_text = title.text.strip()
                name = title_text.split('(')[0].strip() if '(' in title_text else title_text
                percentage = title_text.split('(')[1].replace(')', '').strip() if '(' in title_text else None
                
                subcategories = []
                content_divs = li.find_all('div', {'class': 'fm-block-form-collapse-content'})
                
                for content in content_divs:
                    subtitle = content.find('h5', {'class': 'fm-block-form-subtitle'})
                    if not subtitle:
                        continue
                        
                    skills = []
                    skills_ul = content.find('ul', {'class': 'list-unstyled'})
                    if skills_ul:
                        skills = [skill.text.strip() for skill in skills_ul.find_all('li')]
                    
                    subcategories.append({
                        'nom': subtitle.text.strip(),
                        'competence': skills
                    })
                
                competences.append({
                    'nom': name,
                    'pourcentage': percentage,
                    'sous-categorie': subcategories
                })
                    
        # Horaire de travail
        working_hours = []
        hours_ul = soup.find('ul', attrs={'data-cy': 'liste-contexte-horaires'})
        if hours_ul:
            working_hours = [li.text.strip() for li in hours_ul.find_all('li')]
            
        # Nombre de demandeurs d'emploie
        job_demand_part0 = soup.find('span', {'data-cy': 'nb-demandeurs-marche-metier-part-0'})
        job_demand_part1 = soup.find('span', {'data-cy': 'nb-demandeurs-marche-metier-part-1'})
        job_demand = ''
        if job_demand_part0 and job_demand_part1:
            job_demand = job_demand_part0.text.strip() + job_demand_part1.text.strip()
        
        # Nombre  d'offre d'emploie
        job_offers_part0 = soup.find('span', {'data-cy': 'nb-offres-marche-metier-part-0'})
        job_offers_part1 = soup.find('span', {'data-cy': 'nb-offres-marche-metier-part-1'})
        job_offers = ''
        if job_offers_part0 and job_offers_part1:
            job_offers = job_offers_part0.text.strip() + job_offers_part1.text.strip()
        
        # Difficulté de recrutement
        recruitment_difficulty = soup.find('h4', {'data-cy': 'difficulte-recrutement-titre'})
        recruitment_difficulty_text = ''
        if recruitment_difficulty:
            difficulty_span = recruitment_difficulty.find('span', {'class': 'sr-only'})
            if difficulty_span:
                recruitment_difficulty_text = difficulty_span.text.strip()
        
        # Plage de salaire
        min_salary = soup.find('div', {'data-cy': 'salaire-minimum'})
        max_salary = soup.find('div', {'data-cy': 'salaire-maximum'})
        min_salary_value = min_salary.text.strip() if min_salary else None
        max_salary_value = max_salary.text.strip() if max_salary else None
        
        return {
            'missions': missions,
            'secteurs': secteurs,
            'certifications': certifications,
            'competences': competences,
            'horaires': working_hours,
            'nbr_demandeurs': job_demand,
            'nbr_offre': job_offers,
            'difficulte_recrutement': recruitment_difficulty_text,
            'plage_salaire': {
                'min': min_salary_value,
                'max': max_salary_value
            }
        }
    except requests.RequestException as e:
        print(f"Error scrap {url}: {e}")
        return None

def main():
    # Connection à la db
    mongo_uri = ""       
    client = pymongo.MongoClient(mongo_uri)
    db = client["chatbot_data"]
    metiers_collection = db["metiers"]
    metier_info_collection = db["metier_info"]
    
    try:
        # Récupérer les metier de mongo
        metiers = metiers_collection.find()
        
        for metier in metiers:
            # Si exist ne pas scrap
            existing = metier_info_collection.find_one({"metier_id": metier['id']})
            if existing:
                continue
                
            print(f"Traitement: {metier['titre']}")
            details = scrape_metier_details(metier['url_fiche_metier'])
            
            if details:
                metier_info = {
                    "metier_id": metier['id'],
                    "titre": metier['titre'],
                    "url_fiche_metier": metier['url_fiche_metier'],
                    **details
                }
                
                try:
                    metier_info_collection.insert_one(metier_info)
                    print(f"Data sauvgarder pour: {metier['titre']}")
                except pymongo.errors.PyMongoError as e:
                    print(f"Error: {e}")
            
            # Délai pour ne pas se faire ban
            time.sleep(1)
            
    except Exception as e:
        print(f"error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    main()
