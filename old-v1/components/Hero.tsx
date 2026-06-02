import React from 'react';
import { Button } from './Button';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect (fixed attachment) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop")',
        }}
      >
        {/* Dark Overlay for text legibility - Increased opacity for better contrast */}
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center text-white">
        <FadeIn direction="up" duration={1200} distance={40}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight leading-tight drop-shadow-2xl">
            Home Maintenance<br />
            <span className="font-semibold italic font-serif">as it should be.</span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={200} duration={1000}>
          <div className="w-24 h-px bg-datum-sage mx-auto mb-8 shadow-sm"></div>
        </FadeIn>

        <FadeIn direction="up" delay={400} duration={1000}>
          <h2 className="text-xl md:text-3xl font-light mb-10 max-w-2xl mx-auto opacity-100 drop-shadow-lg">
            Founded by builders. Built for homeowners.
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={600} duration={1000}>
          <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto opacity-95 leading-relaxed font-light drop-shadow-lg">
            We handle the repairs, the projects, and the seasonal upkeep. Founded by custom builders, we apply construction expertise to your daily home life. No chasing contractors. No guessing at costs. Just results.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={800} duration={800}>
          <Button variant="secondary" onClick={() => window.location.href = 'tel:5555555555'}>
            Call Us Today
          </Button>
        </FadeIn>
      </div>
    </div>
  );
};