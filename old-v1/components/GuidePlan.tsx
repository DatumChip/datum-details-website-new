import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { ClipboardList, Hammer, PhoneCall } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const GuidePlan: React.FC = () => {
  return (
    <>
        <Section className="bg-datum-cream">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
                <FadeIn direction="up">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-datum-slate uppercase mb-4">The Guide</h2>
                </FadeIn>
                <FadeIn direction="up" delay={100}>
                    <h3 className="text-3xl md:text-5xl font-light mb-6 text-datum-black leading-tight">
                        Construction science,<br/>applied to maintenance.
                    </h3>
                </FadeIn>
                <FadeIn direction="up" delay={200}>
                    <h4 className="text-xl font-medium text-datum-sage mb-8">Others patch symptoms. We solve root causes.</h4>
                </FadeIn>
                <FadeIn direction="up" delay={300}>
                    <p className="text-lg md:text-xl text-datum-charcoal leading-relaxed mb-6">
                        We bring ten years of building experience to your home. We know the systems, the failure points, and the physics behind the walls.
                    </p>
                </FadeIn>
                <FadeIn direction="up" delay={400}>
                    <p className="text-lg md:text-xl text-datum-charcoal leading-relaxed border-l-4 border-datum-sage pl-4 italic">
                        <span className="font-bold">Handymen guess. We diagnose.</span> We don't just look at the break; we look at the build. We understand why the failure happened.
                    </p>
                </FadeIn>
            </div>
            <div className="md:w-1/2 relative">
                <FadeIn direction="left" duration={1200}>
                    <img 
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop" 
                        alt="Detailed architectural blueprint"
                        className="rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </FadeIn>
            </div>
        </div>
      </Section>

      {/* THE PLAN */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <h2 className="text-xs font-bold tracking-[0.2em] text-datum-black uppercase mb-4">The Plan</h2>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <h3 className="text-4xl font-light">How we take control.</h3>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <FadeIn delay={200} className="h-full">
                <div className="relative h-full p-8 bg-datum-cream rounded-sm border-t-4 border-datum-slate shadow-sm hover:shadow-lg transition-shadow">
                    <div className="absolute -top-6 left-8 bg-datum-slate text-white w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full">1</div>
                    <div className="mt-4 mb-4 text-datum-slate">
                        <ClipboardList size={32} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl font-bold mb-4">The Baseline</h4>
                    <p className="text-datum-charcoal text-base leading-relaxed">
                        Interior and exterior. From the squeak in the floor to the drainage in the yard. We create a definitive record of every issue.
                    </p>
                </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn delay={400} className="h-full">
                <div className="relative h-full p-8 bg-datum-cream rounded-sm border-t-4 border-datum-sage shadow-sm hover:shadow-lg transition-shadow">
                    <div className="absolute -top-6 left-8 bg-datum-sage text-white w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full">2</div>
                    <div className="mt-4 mb-4 text-datum-sage">
                        <Hammer size={32} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl font-bold mb-4">The Fix</h4>
                    <p className="text-datum-charcoal text-base leading-relaxed">
                        We categorize by urgency. You approve the scope. We deploy our trades to fix the nagging issues immediately.
                    </p>
                </div>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn delay={600} className="h-full">
                <div className="relative h-full p-8 bg-datum-cream rounded-sm border-t-4 border-datum-black shadow-sm hover:shadow-lg transition-shadow">
                    <div className="absolute -top-6 left-8 bg-datum-black text-white w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full">3</div>
                    <div className="mt-4 mb-4 text-datum-black">
                        <PhoneCall size={32} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl font-bold mb-4">The Support</h4>
                    <p className="text-datum-charcoal text-base leading-relaxed">
                        Seasonal visits to keep systems running. Direct access for anything that breaks. We are the first and last call you need to make.
                    </p>
                </div>
            </FadeIn>
        </div>

        <div className="text-center">
            <FadeIn direction="up" delay={800}>
                <p className="text-xl md:text-3xl font-light italic mb-8 text-datum-slate">
                    "Stop managing. Start living."
                </p>
            </FadeIn>
            <FadeIn direction="up" delay={900}>
                <p className="mb-8 text-datum-charcoal text-lg md:text-xl max-w-2xl mx-auto">
                    Your home needs a steward. Your schedule needs a break. One assessment changes everything.
                </p>
            </FadeIn>
            <FadeIn direction="up" delay={1000}>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={() => window.location.href = 'tel:5555555555'}>Call Us Today</Button>
                    <Button variant="outline" onClick={() => document.getElementById('footer')?.scrollIntoView()}>Book Your Assessment</Button>
                </div>
            </FadeIn>
        </div>
      </Section>
    </>
  );
};