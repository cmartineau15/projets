import React from 'react';
import { BriefcaseIcon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function CookiesPolicy() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="relative bg-gradient-to-br from-purple-50 to-purple-50">
                    
                    <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex justify-center h-16">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 flex items-center">
                            {/* <BriefcaseIcon className="h-8 w-8 text-blue-600" /> */}
                            <Link to="/" className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent chillax-font">✨ Lil'IA</Link>
                          </div>
                          {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-900 px-3 py-2 text-sm font-medium">Accueil</Link>
                            <Link to="/Offres" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Offres</Link>
                            <Link to="/About" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">À propos</Link>
                          </div> */}
                        </div>
                        <div className="sm:hidden">
                          
                        </div>
                      </div>
                    </div>
                  </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de Confidentialité</h1>
          <p className="text-gray-700 mb-4">
          Politique des Cookies
          </p>
         
          <p className="text-gray-700">
          Date de dernière mise à jour : 03/02/2025

Cette Politique de Cookies explique comment CarrerMatch utilise des cookies pour améliorer votre expérience sur notre chatbot d'orientation professionnelle. En utilisant notre service, vous acceptez l’utilisation des cookies conformément à cette politique.

Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à mémoriser vos préférences et à analyser votre utilisation du chatbot. Nous utilisons des cookies nécessaires pour le bon fonctionnement du service, des cookies de performance pour analyser l’usage du chatbot, des cookies fonctionnels pour mémoriser vos paramètres et des cookies de suivi et marketing pour vous proposer des opportunités pertinentes.

<p>Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur. Cependant, certaines fonctionnalités de notre chatbot pourraient ne pas fonctionner correctement si vous désactivez certains cookies. Les cookies peuvent être temporaires ou permanents selon leur fonction.
</p>
Nous nous engageons à protéger votre vie privée et à respecter la législation sur la protection des données personnelles, comme le RGPD. Nous nous réservons le droit de modifier cette politique de cookies à tout moment, et toute modification sera publiée sur cette page. Pour toute question, contactez-nous à [adresse e-mail/contact].
          </p>
          
        </div>
      </main>

      {/* Footer with Legal Notices */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              
               
              
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
          <div className="mt-8  pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} Lil'IA. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CookiesPolicy;
