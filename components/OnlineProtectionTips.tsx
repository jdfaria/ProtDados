import React from 'react';
import Section from './Section';
import { ShieldCheckIcon, EyeOffIcon, LogOutIcon } from './icons';

const TipCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const OnlineProtectionTips: React.FC = () => {
  return (
    <Section title="Como proteger as informações pessoais online?">
      <div className="grid md:grid-cols-3 gap-8">
        <TipCard icon={<ShieldCheckIcon className="w-8 h-8"/>} title="Usa a Privacidade">
          Usa as opções de configuração de privacidade nos teus perfis online para limitar, o mais possível, os teus dados pessoais.
        </TipCard>
        <TipCard icon={<EyeOffIcon className="w-8 h-8"/>} title="Não Publiques Tudo">
          Não publiques as tuas atividades e rotinas pessoais do dia a dia nas redes sociais. Pensa duas vezes antes de partilhar.
        </TipCard>
        <TipCard icon={<LogOutIcon className="w-8 h-8"/>} title="Termina a Sessão">
          Termina sempre a sessão no email e em websites se estiveres num computador partilhado com outras pessoas.
        </TipCard>
      </div>
    </Section>
  );
};

export default OnlineProtectionTips;
