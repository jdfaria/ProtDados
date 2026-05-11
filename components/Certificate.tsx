
import React, { useState, useRef } from 'react';
import Section from './Section';
import { toPng } from 'html-to-image';

interface CertificateProps {
  totalScore: number;
  totalPossible: number;
}

const Certificate: React.FC<CertificateProps> = ({ totalScore, totalPossible }) => {
  const [name, setName] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  const percentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
  const currentDate = new Date().toLocaleDateString('pt-PT');

  const handleDownload = () => {
    if (certificateRef.current === null) {
      return;
    }

    toPng(certificateRef.current, { cacheBust: true, backgroundColor: '#FFFFFF' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'certificado-protecao-dados.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  };

  return (
    <Section title="Certificado de Conclusão">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        {/* The actual certificate content to be downloaded */}
        <div ref={certificateRef} className="bg-white p-10 border-4 border-teal-600 relative">
            <div className="absolute top-4 right-4 text-teal-600 font-bold">
                <div className="inline-block bg-white px-3 py-1 rounded-full shadow-md border border-teal-100">
                    <span className="text-sm font-bold text-gray-500">TIC</span>
                    <span className="inline-block w-4 h-4 bg-orange-400 text-white text-xs font-bold rounded-full ml-1 leading-4">6</span>
                </div>
            </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Certificado de Conclusão</h2>
            <p className="mt-4 text-lg text-gray-600">Este certificado é concedido a</p>
            <p className="mt-2 text-4xl font-extrabold text-red-600 tracking-wider">
              {name || '________________'}
            </p>
            <p className="mt-6 text-lg text-gray-600">
              pela conclusão com sucesso da sequência de aprendizagem <br />
              <strong className="text-teal-700">Proteção de Dados Pessoais</strong>
            </p>
            <div className="mt-8">
              <p className="text-5xl font-bold text-teal-600">{percentage}%</p>
              <p className="text-sm text-gray-500">Pontuação Final</p>
            </div>
            <div className="mt-10 flex justify-between items-center text-sm text-gray-500">
              <div>
                <p className="font-semibold">{currentDate}</p>
                <p>Data de Emissão</p>
              </div>
              <div>
                <p className="font-semibold">Professor José Faria</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* User interaction area */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg text-center text-gray-700">Personalize e Descarregue o seu Certificado</h3>
            <div className="mt-4 max-w-md mx-auto">
                 <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Insira o seu primeiro e último nome:
                 </label>
                <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="O seu nome aqui..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={handleDownload}
                    disabled={!name}
                    className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Descarregar Certificado (.png)
                </button>
            </div>
        </div>

      </div>
    </Section>
  );
};

export default Certificate;