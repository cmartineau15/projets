import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText, Search, BookOpen, BriefcaseIcon, Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Bar with Background */}
      

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50">
          <Link to='/'><h1 className="ml-2 text-6xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent chillax-font">
          ✨Lil'IA 
          </h1></Link>
          <p className="text-gray-600 font-medium">Un guide intelligent pour ton avenir</p>
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
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Conseil d'orientation
              </h2>
              <p className="text-gray-600 text-center max-w-md text-lg">
              Découvrez votre voie professionnelle avec notre chatbot spécialisé en orientation
              </p>
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-700">
                Commencer
              </button>
            </Link>
          </div>

          {/* Right side - Rédaction de lettre de motivation */}
          <div className="flex-1 bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
            <Link 
              to="/Chat_2" 
              className="h-full flex flex-col items-center justify-center p-8 space-y-8"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FileText className="w-12 h-12 text-purple-500" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
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

export default App;