import React from 'react';
import Section from './Section';

const PasswordGuide: React.FC = () => {
  return (
    <Section title="Como criar palavras-passe seguras?" subtitle="O que é uma palavra-passe?">
      <div className="space-y-8">
        <div className="bg-yellow-100/50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <p className="text-lg">
            Uma palavra-passe, também designada por <em>password</em>, é uma palavra-chave que permite o acesso a áreas restritas ou a dados protegidos num sistema informático.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-teal-700">Requisitos de uma Palavra-Passe Segura</h3>
            <p className="mt-2 text-gray-600">
              Deve ter, no mínimo, <strong className="text-red-600 text-2xl font-bold">12 caracteres</strong> e incluir os seguintes tipos:
            </p>
          </div>
          
          <div className="overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="p-4 font-bold uppercase rounded-tl-lg">Tipos de Caracteres</th>
                  <th className="p-4 font-bold uppercase rounded-tr-lg">Exemplos</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">Letras minúsculas</td>
                  <td className="p-4 font-mono text-gray-800">a...z</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">Letras maiúsculas</td>
                  <td className="p-4 font-mono text-gray-800">A...Z</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">Números</td>
                  <td className="p-4 font-mono text-gray-800">0...9</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">Caracteres especiais</td>
                  <td className="p-4 font-mono text-sm break-all text-gray-800">{'~!@#$%^&*()_+|-=\\{[]:";\'<>?,./'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-teal-50 border-t-4 border-teal-300 p-4 rounded-b-lg text-center">
          <p className="italic text-teal-800">
            <strong>Dica:</strong> Uma palavra-passe também pode ser uma frase longa, sem espaços, para ser mais fácil de memorizar e mais difícil de adivinhar.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default PasswordGuide;
