import React from 'react';
import { BriefcaseIcon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
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
      <main className="flex-1 flex flex-col items-center justify-center text-left p-10">
        <h1 className="text-4xl font-bold text-blue-600">À Propos de CareerMatch</h1>
        <p className="text-gray-600 max-w-2xl mt-4">
        CarrerMatch : Le Chatbot Qui Accompagne les Étudiants Dans Leur Orientation Professionnelle

L’orientation professionnelle est souvent un parcours semé d’embûches pour les étudiants, entre la multitude d’options disponibles et la pression des décisions à prendre. C’est pour répondre à ce besoin de guidance qu’a été développé CarrerMatch, un chatbot innovant conçu pour accompagner les étudiants dans leur parcours d'orientation et leurs choix de carrière.

CarrerMatch se distingue par sa capacité à offrir un accompagnement personnalisé, en tenant compte des aspirations, des compétences et des attentes de chaque étudiant. Grâce à une intelligence artificielle avancée, il permet aux utilisateurs d’analyser en profondeur des offres de formation, des propositions d’emploi, des opportunités de stage et bien plus encore. Cette analyse détaillée permet de mieux comprendre les exigences des différents secteurs et de choisir le parcours le plus adapté.
<p className="text-gray-600 max-w-2xl mt-4">
Un Outil Polyvalent et Pratique</p>

Parmi les fonctionnalités phares de CarrerMatch, on retrouve la possibilité de :

L'un des atouts majeurs de CarrerMatch est sa disponibilité immédiate. Contrairement à un conseiller humain, qui peut être difficile à joindre ou avoir des horaires limités, CarrerMatch est accessible 24/7, offrant ainsi une flexibilité totale. En cas de doutes ou de questions urgentes, les étudiants peuvent obtenir des réponses instantanées, ce qui constitue un réel atout dans un contexte où le temps est souvent compté.

L’Intelligence Artificielle au Service de l’Orientation 

Grâce à l’intelligence artificielle qui le sous-tend, CarrerMatch ne se contente pas de fournir des réponses standardisées. Il apprend en continu des interactions avec les étudiants, s’adapte à leurs besoins et propose des solutions sur mesure. Plus il est utilisé, plus il devient précis dans ses recommandations.
</p>
<p className="text-gray-600 max-w-2xl mt-4">
En Conclusion

CarrerMatch est bien plus qu'un simple chatbot. C’est un véritable compagnon d’orientation professionnelle, une aide précieuse qui guide les étudiants tout au long de leur parcours scolaire et professionnel. En les aidant à prendre des décisions éclairées, à mieux se préparer aux exigences du monde du travail et à structurer leur démarche de candidature, CarrerMatch s’impose comme un outil incontournable pour réussir son orientation et construire son avenir professionnel.
        </p>
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

export default About;
