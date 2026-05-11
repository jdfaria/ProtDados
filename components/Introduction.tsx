import React from 'react';
import Section from './Section';
import { ShieldCheckIcon } from './icons';

const Introduction: React.FC = () => {
  return (
    <Section title="O que são dados pessoais?">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-yellow-100/50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <p className="text-lg leading-relaxed text-gray-700">
            São informações que permitem <strong>identificar uma pessoa</strong>. Podem ser informações como o nome, a morada, a data de nascimento, as informações de contacto, e até dados mais sensíveis, como os dados financeiros ou de saúde.
          </p>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-white p-12 rounded-3xl shadow-2xl border-4 border-emerald-500 flex flex-col items-center">
              <ShieldCheckIcon className="w-32 h-32 text-emerald-500 mb-4" />
              <span className="text-emerald-700 font-bold text-xl uppercase tracking-wider">Proteção de Dados</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Introduction;
