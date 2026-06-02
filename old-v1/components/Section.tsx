import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id, dark = false }) => {
  return (
    <section 
      id={id}
      className={`relative w-full py-20 md:py-32 overflow-hidden transition-colors duration-500 ${dark ? 'bg-datum-black text-datum-white' : 'bg-datum-cream text-datum-black'} ${className}`}
    >
      <div className="container mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
};
