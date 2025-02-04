import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, X } from 'lucide-react';

function Chat2() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string; animate?: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNameModal, setShowNameModal] = useState(true);
  const [firstName, setFirstName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamBuffer = useRef('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    setShowNameModal(false);
    
    // Add welcome message with animation and personalized greeting
    const welcomeMessage = {
      type: 'bot' as const,
      content: `# Bonjour **${firstName}** ! 🌟

je suis la pour t'aider à rédiger ta lettre de motivation`,
      animate: true
    };
    
    setMessages([welcomeMessage]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);
    streamBuffer.current = ''; // Reset stream buffer

    try {
      // Add the name context to every query
      const queryWithName = `je m'appelle ${firstName}. ${userMessage}`;
      const response = await fetch(`http://127.0.0.1:8000/generate?query=${encodeURIComponent(queryWithName)}`);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) {
        throw new Error('No reader available');
      }

      // Add an initial bot message that we'll update
      setMessages(prev => [...prev, { type: 'bot', content: '' }]);
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        streamBuffer.current += chunk;
        
        // Update the last message with the complete buffer
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.type === 'bot') {
            lastMessage.content = streamBuffer.current;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'bot', content: "Désolé, une erreur s'est produite." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col font-inter">
      {/* Name Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4">
            <h2 className="gradient-text-pink text-2xl font-clash font-semibold mb-6">Bienvenue ! 👋</h2>
            <form onSubmit={handleNameSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Comment puis-je vous appeler ?
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-pink-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                  placeholder="Votre prénom"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl px-6 py-3 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Commencer
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden border border-pink-100">
          {/* Messages container with padding bottom to account for fixed input */}
          <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} ${
                  message.animate ? 'animate-fade-in-up' : ''
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                      : 'bg-white border border-pink-100'
                  }`}
                >
                  {message.type === 'bot' ? (
                    <div className="prose prose-pink max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => (
                            <h1 {...props} className="gradient-text-pink text-3xl font-clash font-semibold mb-4" />
                          ),
                          h2: ({node, ...props}) => (
                              <h1 {...props} className="gradient-text-pink text-2xl font-clash font-semibold mb-4" />
                            ),
                          h3: ({ node, ...props }) => (
                            <h3 {...props} className="gradient-text-pink text-xl font-clash font-semibold mb-3" />
                          ),
                          strong: ({node, ...props}) => (
                            <strong {...props} className="gradient-text-pink font-semibold" />
                          ),
                          p: ({node, ...props}) => (
                            <p {...props} className="text-gray-800 mb-4 leading-relaxed" />
                          ),
                          ul: ({node, ...props}) => (
                            <ul {...props} className="list-disc list-inside space-y-2 mb-4 text-gray-700" />
                          ),
                          li: ({node, ...props}) => (
                            <li {...props} className="text-gray-700" />
                          ),
                          a: ({ node, ...props }) => (
                            <a 
                              {...props} 
                              className="gradient-text-pink underline decoration-pink-500 hover:decoration-pink-700"
                            />
                          ),
                          hr: () => (
                            <hr className="border-0 h-1 bg-gradient-to-r from-pink-400 to-purple-400 my-6 w-full rounded-lg" />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-white">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed input at bottom */}
          <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 border-t border-pink-100 bg-white/95 backdrop-blur-sm">
            <div className="flex space-x-4 max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 rounded-xl border border-pink-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl px-6 py-3 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat2;