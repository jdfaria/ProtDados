import React from 'react';
import Section from './Section';
import { ShieldCheck, Phone, Mail, Smartphone, Key } from 'lucide-react';

const TwoFactorAuth: React.FC = () => {
  return (
    <Section title="Autenticação de Dois Fatores (2FA)">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-teal-100">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-teal-100 rounded-2xl text-teal-600">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-800">Cria uma segunda barreira!</h3>
            <p className="text-gray-600">Ter uma boa palavra-passe é apenas o primeiro passo.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              O <strong>2FA (ou MFA)</strong> é um sistema que solicita <strong>duas formas diferentes</strong> de identificação antes de te permitir aceder a uma conta. 
            </p>
            <p className="text-gray-700">
              Mesmo que um pirata informático descubra a tua palavra-passe, ele não conseguirá entrar na tua conta sem o segundo código.
            </p>
            
            <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-400">
              <h4 className="font-bold text-amber-800 mb-2">Porquê usar?</h4>
              <ul className="space-y-2 text-amber-900 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Protege contra roubo de palavras-passe.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Recebes um alerta se alguém tentar entrar na tua conta.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>É a forma mais eficaz de prevenir acessos não autorizados.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-4">Formas comuns de 2FA:</h4>
            
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="mt-1 text-teal-500"><Phone size={20} /></div>
              <div>
                <p className="font-bold text-gray-800">SMS / Chamada</p>
                <p className="text-sm text-gray-600">Recebes um código temporário no teu telemóvel.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="mt-1 text-teal-500"><Smartphone size={20} /></div>
              <div>
                <p className="font-bold text-gray-800">Apps de Autenticação</p>
                <p className="text-sm text-gray-600">Google Authenticator ou Microsoft Authenticator.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="mt-1 text-teal-500"><Mail size={20} /></div>
              <div>
                <p className="font-bold text-gray-800">E-mail</p>
                <p className="text-sm text-gray-600">Um código enviado para a tua caixa de correio.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="mt-1 text-teal-500"><Key size={20} /></div>
              <div>
                <p className="font-bold text-gray-800">Chaves de Segurança</p>
                <p className="text-sm text-gray-600">Dispositivos físicos USB (como YubiKeys).</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-teal-900 text-white p-6 rounded-2xl">
          <div className="flex items-center space-x-3 mb-3">
            <span className="p-2 bg-teal-800 rounded-lg">💡</span>
            <h4 className="font-bold">Onde deves ativar?</h4>
          </div>
          <p className="text-teal-100 text-sm mb-4">
            Prioriza as contas mais importantes, como o teu <strong>e-mail principal</strong> (que dá acesso a tudo o resto), <strong>redes sociais</strong> e <strong>contas bancárias</strong>.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Instagram', 'Gmail', 'TikTok', 'WhatsApp', 'Discord', 'Fortnite'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-teal-800 rounded-full text-xs font-medium">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TwoFactorAuth;
