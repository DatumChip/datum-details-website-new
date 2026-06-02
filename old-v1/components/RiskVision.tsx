import React from 'react';
import { Section } from './Section';
import { RiskChart } from './RiskChart';
import { FadeIn } from './FadeIn';

export const RiskVision: React.FC = () => {
  return (
    <>
      {/* THE RISK */}
      <Section dark id="risk">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <FadeIn direction="up">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase mb-4">The Risk</h2>
                </FadeIn>
                <FadeIn direction="up" delay={100}>
                    <h3 className="text-4xl font-light mb-6">The Cost of Doing Nothing.</h3>
                </FadeIn>
                <FadeIn direction="up" delay={200}>
                    <p className="text-xl text-gray-300 leading-relaxed mb-6">
                        Reactive maintenance is expensive maintenance. Ignoring a noise in the HVAC leads to a mid-winter failure. Ignoring a small drip leads to mold.
                    </p>
                </FadeIn>
                <FadeIn direction="up" delay={300}>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                        Without a steward, you are at the mercy of emergency rates and unavailable trades. You pay more to fix disasters than you would have paid to prevent them.
                    </p>
                </FadeIn>
                <FadeIn direction="up" delay={400}>
                    <h4 className="text-2xl font-serif italic text-white">
                        You can manage the chaos.<br/>Or you can eliminate it.
                    </h4>
                </FadeIn>
            </div>
            
            <div className="w-full">
                <FadeIn direction="left" delay={500} duration={1200}>
                    <RiskChart />
                </FadeIn>
            </div>
        </div>
      </Section>

      {/* THE VISION */}
      <Section className="bg-datum-sage/10 relative overflow-hidden">
        {/* Background texture decoration */}
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <path d="M10 10 L90 90 M90 10 L10 90" strokeWidth="0.5" />
            </svg>
        </div>

        <div className="max-w-3xl mx-auto text-center">
            <FadeIn direction="up">
                <h2 className="text-xs font-bold tracking-[0.2em] text-datum-slate uppercase mb-4">The Vision</h2>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
                <h3 className="text-4xl md:text-5xl font-light mb-8 text-datum-black">A home that takes care of you.</h3>
            </FadeIn>
            <FadeIn direction="up" delay={200}>
                <p className="text-2xl leading-relaxed text-datum-charcoal font-light">
                    Imagine a home that simply works. No nagging to-do list. No unanswered calls. Just the <span className="font-semibold italic text-datum-sage">silence</span> of systems running perfectly.
                </p>
            </FadeIn>
            <FadeIn direction="up" delay={300}>
                <div className="my-8 w-24 h-px bg-datum-black/20 mx-auto"></div>
            </FadeIn>
            <FadeIn direction="up" delay={400}>
                <p className="text-xl font-medium text-datum-slate">
                    We handle the noise. You enjoy the sanctuary.
                </p>
            </FadeIn>
        </div>
      </Section>
    </>
  );
};