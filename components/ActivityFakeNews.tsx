import React, { useState } from 'react';
import Section from './Section';
import { Newspaper, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const fakeNewsScenarios = [
  {
    id: 1,
    headline: "🚨 CIENTISTAS DESCOBREM QUE COMER CHOCOLATE ANTES DE DORMIR EMAGRECE 5KG POR SEMANA! 🚨",
    source: "SaudeIncrivel-Agora.net",
    date: "Hoje",
    isFake: true,
    explanation: "Títulos com Caps Lock exagerado, promessas milagrosas e fontes desconhecidas são sinais clássicos de Fake News.",
    redFlags: ["Título sensacionalista", "Fonte não oficial", "Promessa milagrosa"]
  },
  {
    id: 2,
    headline: "Governo anuncia novas regras para o uso de trotinetes elétricas em todo o país.",
    source: "Jornal Público (Oficial)",
    date: "Há 2 horas",
    isFake: false,
    explanation: "Notícia com título informativo, sem sensacionalismo e vinda de uma fonte jornalística credível e identificável.",
    redFlags: []
  },
  {
    id: 3,
    headline: "⚠️ URGENTE: NASA confirma que um asteroide vai destruir a Terra na próxima terça-feira! Partilha antes que apaguem! ⚠️",
    source: "WhatsApp / Grupo de Amigos",
    date: "Desconhecida",
    isFake: true,
    explanation: "Mensagens que pedem partilha urgente e anunciam catástrofes sem links para fontes oficiais (como o site da NASA) são quase sempre falsas.",
    redFlags: ["Tom alarmista", "Pedido de partilha", "Falta de fonte oficial"]
  },
  {
    id: 4,
    headline: "Seleção Nacional de Futebol garante apuramento para o próximo torneio europeu.",
    source: "RTP Notícias",
    date: "Ontem",
    isFake: false,
    explanation: "Evento desportivo real reportado por um canal público de televisão. Pode ser facilmente confirmado noutros meios.",
    redFlags: []
  },
  {
    id: 5,
    headline: "BEBER ÁGUA FERVIDA COM CASCA DE LARANJA CURA QUALQUER VÍRUS EM 24 HORAS! ESPALHE A VERDADE!",
    source: "Post de Facebook",
    date: "2019 (Republicado)",
    isFake: true,
    explanation: "Conselhos médicos milagrosos sem base científica e com data antiga republicada são perigosos e falsos.",
    redFlags: ["Conselho médico suspeito", "Data antiga", "Clickbait"]
  }
];

interface ActivityFakeNewsProps {
  onActivityComplete: (score: number, total: number) => void;
}

const ActivityFakeNews: React.FC<ActivityFakeNewsProps> = ({ onActivityComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const scenario = fakeNewsScenarios[currentIndex];

  const handleDecision = (choice: boolean) => {
    setUserChoice(choice);
    setShowFeedback(true);
    if (choice === scenario.isFake) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < fakeNewsScenarios.length - 1) {
      setCurrentIndex(c => c + 1);
      setShowFeedback(false);
      setUserChoice(null);
    } else {
      setIsFinished(true);
      onActivityComplete(score + (userChoice === scenario.isFake ? 1 : 0), fakeNewsScenarios.length);
    }
  };

  if (isFinished) {
    return (
      <Section
        id="fake-news-activity-result"
        title="Detector de Fake News"
        description="Resultado da tua análise."
        icon={<Newspaper className="text-red-500" />}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-red-500">
          <h3 className="text-2xl font-bold text-red-700 mb-4">Análise Concluída!</h3>
          <p className="text-5xl font-black text-red-600 mb-4">
            {score} / {fakeNewsScenarios.length}
          </p>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {score === fakeNewsScenarios.length 
              ? "Incrível! És um verdadeiro Fact-Checker. Nada te escapa!" 
              : score >= fakeNewsScenarios.length / 2 
              ? "Bom trabalho! Estás no caminho certo, mas continua a duvidar de títulos bombásticos." 
              : "Precisas de ter mais cuidado. Lembra-te: pesquisa sempre antes de partilhar!"}
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="fake-news-activity"
      title="Atividade: Facto ou Fake?"
      description="Analisa as notícias abaixo e decide se são verdadeiras ou falsas."
      icon={<Newspaper className="text-red-500" />}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
          <div className="bg-red-600 px-6 py-3 flex justify-between items-center text-white">
            <span className="font-bold tracking-tighter">RED NEWS FEED</span>
            <span className="text-xs font-mono opacity-80">Caso {currentIndex + 1} de {fakeNewsScenarios.length}</span>
          </div>
          
          <div className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Atenção à Notícia</span>
            </div>
            
            <h4 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-6 p-4 bg-gray-50 rounded-xl border-l-4 border-red-500 italic">
              "{scenario.headline}"
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Fonte:</p>
                <p className="font-bold text-gray-700">{scenario.source}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Data:</p>
                <p className="font-bold text-gray-700">{scenario.date}</p>
              </div>
            </div>
          </div>
        </div>

        {!showFeedback ? (
          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={() => handleDecision(false)}
              className="group relative flex flex-col items-center justify-center p-6 bg-white border-2 border-emerald-500 rounded-2xl hover:bg-emerald-50 transition-all shadow-sm active:scale-95"
            >
              <CheckCircle2 size={32} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-emerald-700">FACTO</span>
              <p className="text-[10px] text-emerald-600 mt-1 uppercase">Parece Real</p>
            </button>
            <button 
              onClick={() => handleDecision(true)}
              className="group relative flex flex-col items-center justify-center p-6 bg-white border-2 border-red-500 rounded-2xl hover:bg-red-50 transition-all shadow-sm active:scale-95"
            >
              <XCircle size={32} className="text-red-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-red-700">FAKE</span>
              <p className="text-[10px] text-red-600 mt-1 uppercase">Parece Falso</p>
            </button>
          </div>
        ) : (
          <div className={`p-8 rounded-2xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${userChoice === scenario.isFake ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-start space-x-4 mb-6">
              <div className={`p-3 rounded-full ${userChoice === scenario.isFake ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                {userChoice === scenario.isFake ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
              </div>
              <div>
                <h4 className={`text-xl font-bold mb-2 ${userChoice === scenario.isFake ? 'text-emerald-800' : 'text-red-800'}`}>
                  {userChoice === scenario.isFake ? 'Boa! Estás atento.' : 'Enganaram-te!'}
                </h4>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {scenario.explanation}
                </p>
              </div>
            </div>

            {scenario.redFlags.length > 0 && (
              <div className="mb-6 bg-white/60 p-4 rounded-xl border border-white">
                <p className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <AlertTriangle size={16} className="text-red-500" />
                  <span>Sinais de Alerta Identificados:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {scenario.redFlags.map((flag, i) => (
                    <span key={i} className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={handleNext}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
            >
              {currentIndex < fakeNewsScenarios.length - 1 ? 'Próxima Notícia' : 'Ver Resultado Final'}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default ActivityFakeNews;
