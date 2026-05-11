
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  onPrev: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, totalSections, onPrev, onNext, isNextDisabled, isPrevDisabled }) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 md:left-auto md:right-8 z-50 flex flex-col items-center gap-2 px-4 md:px-0">
      {isNextDisabled && (
        <div className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 animate-bounce shadow-sm uppercase tracking-tighter">
          Completa a atividade para continuar 
        </div>
      )}
      <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md shadow-2xl rounded-full p-2 border border-teal-100">
        <div className="px-4 text-gray-700 font-bold border-r border-gray-200 mr-2 flex items-center">
          <span className="text-teal-600 mr-1">#</span>
          <span>{currentSection + 1}</span>
          <span className="mx-1 text-gray-300">/</span>
          <span className="text-gray-400">{totalSections}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            disabled={currentSection === 0 || isPrevDisabled}
            className="bg-gray-100 text-gray-600 rounded-full p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Secção Anterior"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            disabled={currentSection === totalSections - 1 || isNextDisabled}
            className={`${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all`}
            aria-label="Próxima Secção"
          >
            <ArrowRightIcon className={`w-5 h-5 ${!isNextDisabled ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;