import React from 'react';
import { BriefcaseIcon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function UserConditions() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="relative bg-white shadow-sm">
              <div className="absolute inset-0 bg-cover bg-center z-0" style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80")',
                opacity: '0.1'
              }}></div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                      <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                      <Link to="/" className="ml-2 text-xl font-bold text-gray-900">CareerMatch</Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link to="/" className="text-gray-900 px-3 py-2 text-sm font-medium">Accueil</Link>
                      <Link to="/Offres" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Offres</Link>
                      <Link to="/About" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">À propos</Link>
                    </div>
                  </div>
                  <div className="sm:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 hover:text-gray-500">
                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>
            </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de Confidentialité</h1>
          <p className="text-gray-700 mb-4">
            Conditions Utilisateurs
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">1. Introduction</h3>
          <p className="text-gray-700">
          Ce chatbot est mis à votre disposition pour fournir des informations et répondre à vos demandes en fonction de ses capacités. L'utilisation de ce service est soumise aux conditions suivantes.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">2. Utilisation du Service</h3>
          <p className="text-gray-700">
          Vous vous engagez à utiliser le chatbot uniquement à des fins légales et conformément aux lois en vigueur. Vous êtes responsable de l'utilisation que vous faites du service et vous vous engagez à ne pas utiliser le chatbot pour :

Diffuser des informations illégales ou nuisibles
Provoquer des nuisances ou déranger d'autres utilisateurs
Demander des conseils ou des informations pour des fins non professionnelles
Utiliser le chatbot pour solliciter des offres commerciales sans autorisation
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">3. Conseils et Informations Fournis</h3>
          <p className="text-gray-700">
          Le chatbot fournit des conseils et des informations basés sur des algorithmes prédéfinis et des données accessibles. Toutefois, les informations ne remplacent pas une consultation personnalisée avec un professionnel de l'orientation ou un conseiller en ressources humaines. Nous recommandons de vérifier toute information obtenue via ce chatbot avec des experts dans le domaine concerné.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">4. Collecte et Utilisation des Données</h3>
          <p className="text-gray-700">
          Le chatbot peut collecter certaines informations personnelles pour mieux adapter les recommandations professionnelles à votre profil. Ces données peuvent inclure des informations sur vos préférences de carrière, votre expérience professionnelle ou vos compétences. Ces informations seront traitées conformément à notre politique de confidentialité, disponible [ici]. Nous nous engageons à respecter votre vie privée et à protéger vos données conformément aux lois sur la protection des données personnelles.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">5. Propriété Intellectuelle</h3>
          <p className="text-gray-700">
          Tout le contenu fourni par le chatbot, y compris les réponses générées, les recommandations professionnelles et les ressources, reste la propriété de [Nom de la société/organisme]. Vous n'êtes pas autorisé à reproduire, distribuer ou exploiter tout contenu du chatbot à des fins commerciales sans autorisation préalable.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">7. Modifications des Conditions</h3>
          <p className="text-gray-700">
          Nous nous réservons le droit de modifier les présentes conditions d'utilisation à tout moment. Toute modification sera publiée sur cette page et prendra effet immédiatement après sa publication.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">9. Contact</h3>
          <p className="text-gray-700">
          Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : [adresse e-mail/contact].
          </p>
        </div>
      </main>

      {/* Footer with Legal Notices */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="About" className="text-base text-gray-500 hover:text-gray-900">À Propos</a></li>
                <li><a href="Offres" className="text-base text-gray-500 hover:text-gray-900">Offres</a></li>
               
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Mentions Légales</h3>
              <ul className="space-y-2">
                <li><a href="PrivacyPolicy" className="text-base text-gray-500 hover:text-gray-900">Politique de Confidentialité</a></li>
                <li><a href="UserConditions" className="text-base text-gray-500 hover:text-gray-900">Conditions d'Utilisation</a></li>
                <li><a href="CookiesPolicy" className="text-base text-gray-500 hover:text-gray-900">Politique des Cookies</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Newsletter</h3>
              <p className="text-base text-gray-500">Abonnez-vous à notre newsletter pour recevoir des conseils de carrière et des mises à jour.</p>
              <form className="mt-4 sm:flex sm:max-w-md">
                <input
                  type="email"
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-full shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-400"
                  placeholder="Entrez votre email"
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0"
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} CareerMatch. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserConditions;
