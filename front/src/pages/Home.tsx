import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText, Search, BookOpen, BriefcaseIcon, Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Bar with Background */}
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
                <span className="ml-2 text-xl font-bold text-gray-900">CareerMatch</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="Home" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Accueil
                </a>
                <a href="Offres" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Offres
                </a>
                
                <a href="About" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  À propos
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden relative z-10">
            <div className="pt-2 pb-3 space-y-1">
              <a href="Home.tsx" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Accueil
              </a>
              <a href="Offres" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Offres
              </a>

              <a href="About" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                À propos
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-100 to-purple-100">
          <h1 className="font-clash font-bold text-6xl mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Career Match
          </h1>
          <p className="text-gray-600 font-medium">Trouvez votre emploi idéal</p>
        </div>

        {/* Main Two-Column Layout */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Left side - Conseil d'orientation */}
          <div className="flex-1 bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
            <Link 
              to="/chat" 
              className="h-full flex flex-col items-center justify-center p-8 space-y-8"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-12 h-12 text-blue-500" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Test d'Orientation
              </h2>
              <p className="text-gray-600 text-center max-w-md text-lg">
              Passez notre test d'orientation complet pour découvrir le parcours professionnel qui correspond à vos compétences et intérêts
              </p>
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-700">
                Commencer
              </button>
            </Link>
          </div>

          {/* Right side - Rédaction de lettre de motivation */}
          <div className="flex-1 bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
            <Link 
              to="/chat" 
              className="h-full flex flex-col items-center justify-center p-8 space-y-8"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FileText className="w-12 h-12 text-purple-500" />
              </div>
              <h2 className="font-clash font-semibold text-4xl gradient-text-purple">
                Rédaction de lettre de motivation
              </h2>
              <p className="text-gray-600 text-center max-w-md text-lg">
                Créez une lettre de motivation percutante avec l'aide de notre assistant intelligent
              </p>
              <button className="bg-purple-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-purple-700">
                Commencer
              </button>
            </Link>
          </div>
        </div>

        {/* Featured Careers Section with Background */}
        <div className="relative bg-white py-16 px-8">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80")',
            opacity: '0.05'
          }}></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Offres de la Semaine
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Développeur Logiciel',
                  description: 'Envisagez une carrière en développement logiciel. Ce domaine est en pleine croissance et offre diverses opportunités.',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=300',
                  course: 'Introduction à la Programmation'
                },
                {
                  title: 'Gestionnaire de Santé',
                  description: 'La gestion de la santé est un domaine gratifiant avec une demande croissante de professionnels qualifiés.',
                  image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400&h=300',
                  course: 'Administration des Soins de Santé'
                },
                {
                  title: 'Designer Graphique',
                  description: 'Le design graphique est une carrière créative avec des opportunités dans divers secteurs.',
                  image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=400&h=300',
                  course: 'Bases du Design Graphique'
                },
              ].map((career, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <img 
                    src={career.image} 
                    alt={career.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">{career.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{career.description}</p>
                    <div className="text-sm text-gray-500 mb-4">
                      
                    </div>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300">
                      Explorer l'offre
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                <li><a href="Contact" className="text-base text-gray-500 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Mentions Légales</h3>
              <ul className="space-y-2">
                <li><a href="PrivacyPolicy" className="text-base text-gray-500 hover:text-gray-900">Politique de Confidentialité</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Conditions d'Utilisation</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Politique des Cookies</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Centre d'Aide</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">FAQ</a></li>
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
                  className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0"
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

export default App;