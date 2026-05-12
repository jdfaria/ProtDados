import React from 'react';
import Section from './Section';
import { Newspaper, Search, UserCheck, Calendar, ExternalLink } from 'lucide-react';

const FakeNewsTips: React.FC = () => {
  return (
    <Section
      id="fake-news-tips"
      title="Fake News: Como Não Ser Enganado"
      description="Aprende a distinguir factos de ficção na internet."
      icon={<Newspaper className="text-red-500" />}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            As "Fake News" são notícias falsas criadas para enganar, manipular ou gerar lucro através de cliques (clickbait). Saber identificá-las é essencial para sermos cidadãos digitais responsáveis.
          </p>
          
          <div className="space-y-4">
            <h4 className="font-bold text-red-700 flex items-center space-x-2">
              <span>🚩 Sinais de Alerta:</span>
            </h4>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-red-50">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <Search size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800">Títulos Sensacionalistas</p>
                <p className="text-sm text-gray-600">Usam letras maiúsculas, muitos pontos de exclamação e frases chocantes para te obrigar a clicar.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-red-50">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800">Fonte Desconhecida</p>
                <p className="text-sm text-gray-600">Verifica se o site é conhecido. Sites com nomes estranhos ou que imitam sites famosos são suspeitos.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-red-50">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800">Datas Antigas</p>
                <p className="text-sm text-gray-600">Muitas fake news são notícias reais de há muitos anos, republicadas como se estivessem a acontecer agora.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h4 className="font-bold text-red-800 mb-4 flex items-center space-x-2">
            <ExternalLink size={20} />
            <span>O Método dos 3 Passos</span>
          </h4>
          
          <div className="space-y-6">
            <div className="relative pl-8 border-l-2 border-red-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
              <p className="font-bold text-gray-800">1. Lê Além do Título</p>
              <p className="text-sm text-gray-600">Muitas vezes o corpo da notícia diz algo diferente ou menos dramático do que o título sugere.</p>
            </div>
            
            <div className="relative pl-8 border-l-2 border-red-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
              <p className="font-bold text-gray-800">2. Pesquisa noutras Fontes</p>
              <p className="text-sm text-gray-600">Se algo é realmente importante e verdadeiro, estará em vários jornais e sites de confiança ao mesmo tempo.</p>
            </div>

            <div className="relative pl-8 border-l-2 border-red-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
              <p className="font-bold text-gray-800">3. Verifica os Factos</p>
              <p className="text-sm text-gray-600">Usa sites de Fact-Checking (verificação de factos) que se dedicam a desmascarar mentiras na internet.</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-xl border-2 border-dashed border-red-200 text-center">
            <p className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">Dica de Ouro</p>
            <p className="text-red-700 font-bold">"Se parece demasiado incrível para ser verdade, provavelmente é mentira."</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FakeNewsTips;
