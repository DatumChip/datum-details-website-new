import React from 'react';
import { Section } from './Section';
import { AlertTriangle, CheckCircle2, FileText, UserCheck, Search } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const ProblemSolution: React.FC = () => {
  return (
    <>
      {/* THE PROBLEM */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <FadeIn direction="right" duration={1200}>
                <div className="aspect-[4/5] bg-gray-200 overflow-hidden rounded-sm relative">
                    <img 
                        src="https://images.unsplash.com/photo-1759823547184-2ebe168c728f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Homeowner looking at a home maintenance problem"
                        className="object-cover w-full h-full grayscale opacity-80"
                    />
                    <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
                </div>
                {/* Floating Icon */}
                <div className="absolute -bottom-6 -right-6 bg-datum-black text-white p-6 rounded-sm shadow-xl">
                    <AlertTriangle size={32} />
                </div>
            </FadeIn>
          </div>
          
          <div className="md:col-span-7">
            <FadeIn delay={200}>
                <h2 className="text-xs font-bold tracking-[0.2em] text-red-700 uppercase mb-4">The Problem</h2>
            </FadeIn>
            <FadeIn delay={300}>
                <h3 className="text-3xl md:text-5xl font-light mb-8 leading-tight text-datum-black">
                The gamble of <br/><span className="font-semibold">home repair.</span>
                </h3>
            </FadeIn>
            <FadeIn delay={400}>
                <div className="w-16 h-px bg-red-700 mb-8"></div>
            </FadeIn>
            <FadeIn delay={500}>
                <p className="text-xl text-datum-slate leading-relaxed mb-6">
                Something breaks. A noise in the furnace. A leak in the roof. Where do you turn? Google ads? Random apps? A stranger from a Facebook group?
                </p>
            </FadeIn>
            <FadeIn delay={600}>
                <p className="text-xl text-datum-slate leading-relaxed">
                You have no way to verify quality. You hope they show up. You pray the price is fair. It’s not management. <strong className="text-datum-black font-semibold">It’s a roll of the dice.</strong>
                </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* THE SOLUTION */}
      <Section dark className="border-t border-datum-slate/20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <FadeIn direction="up">
            <h2 className="text-xs font-bold tracking-[0.2em] text-datum-sage uppercase mb-4">The Solution</h2>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <h3 className="text-3xl md:text-5xl font-light mb-6">Stop guessing. Start knowing.</h3>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <p className="text-2xl text-gray-400 font-light">We replace the gamble with certainty.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1 */}
          <FadeIn delay={300} className="h-full">
            <div className="group h-full p-8 border border-white/10 hover:border-datum-sage/50 transition-colors duration-300 bg-white/5">
                <UserCheck className="w-10 h-10 text-datum-sage mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-3">We know the trades.</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                We don't search for help; we bring our own. You get the same vetted partners we’ve built with for a decade.
                </p>
            </div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={400} className="h-full">
            <div className="group h-full p-8 border border-white/10 hover:border-datum-sage/50 transition-colors duration-300 bg-white/5">
                <Search className="w-10 h-10 text-datum-sage mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-3">We know the cost.</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                You can't fool a builder. We audit every quote to ensure the scope is necessary and the price is real.
                </p>
            </div>
          </FadeIn>

          {/* Card 3 */}
          <FadeIn delay={500} className="h-full">
            <div className="group h-full p-8 border border-white/10 hover:border-datum-sage/50 transition-colors duration-300 bg-white/5">
                <FileText className="w-10 h-10 text-datum-sage mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-3">We show the receipts.</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                Open-book billing. You see the vendor invoice. You see our rate. No secrets.
                </p>
            </div>
          </FadeIn>

          {/* Card 4 */}
          <FadeIn delay={600} className="h-full">
            <div className="group h-full p-8 border border-white/10 hover:border-datum-sage/50 transition-colors duration-300 bg-white/5">
                <CheckCircle2 className="w-10 h-10 text-datum-sage mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-3">We own the result.</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                One contact. From urgent repairs to major renovations. You make the request; we handle the execution.
                </p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
};