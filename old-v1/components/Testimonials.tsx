import React from 'react';
import { Section } from './Section';
import { Quote } from 'lucide-react';
import { FadeIn } from './FadeIn';

const testimonials = [
  {
    quote: "I didn't realize how much mental load I was carrying until Datum took over. I just text them, and it's handled.",
    author: "James & Sarah T.",
    location: "Highland Park"
  },
  {
    quote: "The transparency is refreshing. No hidden fees, just honest work. It feels like having a partner, not just a contractor.",
    author: "Michael R.",
    location: "Preston Hollow"
  },
  {
    quote: "Finally, someone who understands that my time is more valuable than spending Saturday waiting for a plumber.",
    author: "Elena K.",
    location: "University Park"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <Section className="bg-white">
      <div className="text-center mb-16">
        <FadeIn direction="up">
            <h2 className="text-xs font-bold tracking-[0.2em] text-datum-slate uppercase mb-4">Testimonials</h2>
        </FadeIn>
        <FadeIn direction="up" delay={100}>
            <h3 className="text-3xl md:text-4xl font-light mb-4">Unhappy homeowners move on.</h3>
        </FadeIn>
        <FadeIn direction="up" delay={200}>
            <p className="text-xl font-serif italic text-datum-sage">Satisfied ones stay.</p>
        </FadeIn>
        <FadeIn direction="up" delay={300}>
            <p className="mt-4 text-datum-charcoal max-w-xl mx-auto text-xl">We don't ask for trust. We earn it through transparency, speed, and results.</p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <FadeIn key={index} delay={index * 150} className="h-full">
            <div className="flex flex-col h-full p-8 bg-datum-cream rounded-sm border border-transparent hover:border-datum-sage/30 transition-all duration-300">
                <Quote className="text-datum-sage w-8 h-8 mb-6" />
                <p className="text-datum-charcoal italic mb-6 flex-grow leading-relaxed text-lg">"{t.quote}"</p>
                <div>
                <p className="font-bold text-datum-black text-lg">{t.author}</p>
                <p className="text-sm text-datum-slate uppercase tracking-wider">{t.location}</p>
                </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};