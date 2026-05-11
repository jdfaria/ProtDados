import React, { useState, useRef, useEffect } from 'react';
import Section from './Section';
import { Bot, Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { askPrivacyAssistant } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIPrivacyAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o teu Assistente de Privacidade. Tens alguma dúvida sobre como proteger os teus dados ou navegar em segurança?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await askPrivacyAssistant(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'Não recebi uma resposta válida.' }]);
    } catch (err: any) {
      if (err.message?.includes('API key')) {
        setError('Configuração incompleta: Falta a chave de API (VITE_GEMINI_API_KEY) para o assistente funcionar no GitHub.');
      } else {
        setError('Ocorreu um erro ao processar a tua pergunta. Verifica a tua ligação.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section title="Assistente de Privacidade IA">
      <div className="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden flex flex-col h-[500px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-4 flex items-center space-x-3 text-white">
          <div className="p-2 bg-white/20 rounded-lg">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold">Privacidade GPT</h3>
            <p className="text-xs text-teal-100">Alimentado por Gemini</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] items-start space-x-2 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                  <div className={`p-2 rounded-full mt-1 ${m.role === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-teal-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                <Sparkles size={16} className="text-teal-500 animate-pulse" />
                <span className="text-xs text-gray-500 font-medium">A pensar...</span>
              </div>
            </motion.div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-2 border border-red-100">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Categories / Quick Suggestions */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
          {['Senhas', 'Phishing', 'Redes Sociais', 'Cookies'].map(tag => (
            <button
              key={tag}
              onClick={() => setInput(`Fala-me sobre ${tag}`)}
              className="whitespace-nowrap px-3 py-1 bg-white border border-teal-200 text-teal-700 rounded-full text-xs hover:bg-teal-50 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Diz alguma coisa..."
            className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-xl transition-all ${
              isLoading || !input.trim() 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </Section>
  );
};

export default AIPrivacyAssistant;
