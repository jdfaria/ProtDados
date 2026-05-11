
import React from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => {
  return (
    <section className="scroll-mt-20" id={title.toLowerCase().replace(/\s/g, '-')}>
      <h2 className="text-3xl md:text-4xl font-bold text-red-600">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-teal-600 font-semibold">{subtitle}</p>}
      <div className="mt-6">
        {children}
      </div>
    </section>
  );
};

export default Section;
