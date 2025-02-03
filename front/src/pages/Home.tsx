import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <div className="text-center py-12 bg-gradient-to-r from-pink-100 to-purple-100">
        <h1 className="font-clash font-bold text-6xl mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          ORIENTATION BOT
        </h1>
        <p className="text-gray-600 font-medium">Votre assistant intelligent</p>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Conseil d'orientation */}
        <div className="flex-1 bg-pink-50 hover:bg-pink-100 transition-colors duration-300">
          <Link 
            to="/chat" 
            className="h-full flex flex-col items-center justify-center p-8 space-y-8"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-12 h-12 text-pink-500" />
            </div>
            <h2 className="font-clash font-semibold text-4xl gradient-text-pink">
              Conseil d'orientation
            </h2>
            <p className="text-gray-600 text-center max-w-md text-lg">
              Découvrez votre voie professionnelle avec notre chatbot spécialisé en orientation
            </p>
            <button className="bg-white text-pink-500 px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
            <button className="bg-white text-purple-500 px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Commencer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
