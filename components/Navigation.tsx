
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
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center gap-4">
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 text-gray-700 font-bold">
        <span>{currentSection + 1}</span> / <span>{totalSections}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={currentSection === 0 || isPrevDisabled}
          className="bg-teal-600 text-white rounded-full p-3 shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Secção Anterior"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          disabled={currentSection === totalSections - 1 || isNextDisabled}
          className="bg-teal-600 text-white rounded-full p-3 shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Próxima Secção"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;