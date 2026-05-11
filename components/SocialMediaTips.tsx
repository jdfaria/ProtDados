import React from 'react';
import Section from './Section';
import { EyeOff, UserPlus, Image as ImageIcon, MessageSquare, ShieldAlert } from 'lucide-react';

const SocialMediaTips: React.FC = () => {
  return (
    <Section title="Segurança nas Redes Sociais">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-indigo-500">
          <div className="flex items-center space-x-3 mb-4">
            <EyeOff className="text-indigo-600" />
            <h3 className="font-bold text-lg text-indigo-900">Privacidade é a Chave</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mantém o teu perfil <strong>Privado</strong>. Controla quem pode ver as tuas publicações, a tua lista de amigos e as tuas informações pessoais nas definições de cada app.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-rose-500">
          <div className="flex items-center space-x-3 mb-4">
            <UserPlus className="text-rose-600" />
            <h3 className="font-bold text-lg text-rose-900">Cuidado com Desconhecidos</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Não aceites pedidos de amizade de pessoas que não conheces na vida real. Muitos perfis são falsos (bots ou burlões) criados apenas para recolher dados.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-amber-500">
          <div className="flex items-center space-x-3 mb-4">
            <ImageIcon className="text-amber-600" />
            <h3 className="font-bold text-lg text-amber-900">Pensa antes de Postar</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Uma foto de uma passagem de avião (tem códigos de barras!) ou do novo setup de gaming revela muito sobre a tua vida privada e localização.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-emerald-500">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="text-emerald-600" />
            <h3 className="font-bold text-lg text-emerald-900">Links por Mensagem Direta</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Desconfia de links enviados por DM, mesmo de amigos. Se a mensagem parecer estranha ("Vê o que dizem de ti aqui"), confirma primeiro com a pessoa.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 shadow-inner">
        <div className="flex items-center space-x-3 mb-2 text-indigo-800">
          <ShieldAlert size={20} />
          <h4 className="font-bold uppercase text-xs tracking-widest">A Regra de Ouro</h4>
        </div>
        <p className="text-indigo-900 italic text-center text-lg">
          "O que entra na Internet, fica lá para sempre. Mesmo que apagues, alguém pode ter guardado uma cópia."
        </p>
      </div>
    </Section>
  );
};

export default SocialMediaTips;
