
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center relative overflow-hidden">
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-600 rounded-full opacity-50"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-red-500 rounded-full opacity-50"></div>
        
        <div className="relative z-10">
            <div className="inline-block bg-white px-3 py-1 rounded-full shadow-md mb-4">
                <span className="text-sm font-bold text-gray-500">TIC</span>
                <span className="inline-block w-4 h-4 bg-orange-400 text-white text-xs font-bold rounded-full ml-1 leading-4">6</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-red-600 tracking-tight leading-tight">
                Proteção dos dados pessoais
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-teal-700">
                Tecnologias de Informação e Comunicação
            </p>
        </div>
    </header>
  );
};

export default Header;
