import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { FadeIn } from './FadeIn';
import { 
  ShieldCheck, 
  Clock, 
  Receipt, 
  Droplets, 
  Sun, 
  Thermometer, 
  Snowflake, 
  DollarSign, 
  AlertTriangle, 
  Hand, 
  Timer,
  Check
} from 'lucide-react';

export const ServicesPricing: React.FC = () => {
  return (
    <div className="pt-20 bg-datum-cream">
      {/* HERO */}
      <Section className="bg-white pt-24 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-datum-black">
              Open Books. <br/>
              <span className="font-semibold italic font-serif">Flat Rates.</span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <p className="text-2xl text-datum-sage font-medium mb-8">Maintenance without the markup games.</p>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <div className="w-16 h-px bg-datum-slate/20 mx-auto mb-10"></div>
          </FadeIn>
          <FadeIn direction="up" delay={300}>
            <p className="text-xl md:text-2xl text-datum-slate leading-relaxed mb-12 max-w-2xl mx-auto">
              Most contractors hide their profit in the material costs or trip charges. We don't. We charge a flat monthly retainer for stewardship. We charge a simple hourly rate for repairs. <strong className="text-datum-black">You see the receipts.</strong>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={400}>
             <p className="text-lg font-bold tracking-[0.2em] uppercase text-datum-black mb-12">Simple. Honest. Fair.</p>
          </FadeIn>
          <FadeIn direction="up" delay={500}>
            <Button onClick={() => window.location.href = 'tel:5555555555'}>Call Us Today</Button>
          </FadeIn>
        </div>
      </Section>

      {/* SECTION 1: THE MEMBERSHIP */}
      <Section className="bg-datum-cream border-t border-datum-slate/10">
        <div className="text-center mb-16">
          <FadeIn direction="up">
             <h2 className="text-xs font-bold tracking-[0.2em] text-datum-sage uppercase mb-4">The Membership</h2>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
             <h3 className="text-4xl font-light mb-4">How we bill.</h3>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
             <p className="text-xl text-gray-500 max-w-2xl mx-auto">We believe in low barriers and high transparency. You join as a member; you pay for what you use.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <FadeIn delay={300} className="h-full">
            <div className="bg-white p-10 h-full shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-datum-black rounded-sm group">
              <div className="w-14 h-14 bg-datum-cream rounded-full flex items-center justify-center mb-6 group-hover:bg-datum-black group-hover:text-white transition-colors">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-2">1. The Retainer</h4>
              <p className="text-3xl font-serif italic mb-6 text-datum-slate">$250 <span className="text-sm font-sans font-normal not-italic text-gray-400">/ Month</span></p>
              <ul className="space-y-4 text-datum-charcoal">
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> Guaranteed Stewardship</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> Includes your 4 quarterly health checks (labor included)</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> Priority "Direct Dial" access</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> No minimum trip charges</li>
              </ul>
            </div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={400} className="h-full">
            <div className="bg-white p-10 h-full shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-datum-sage rounded-sm group">
               <div className="w-14 h-14 bg-datum-cream rounded-full flex items-center justify-center mb-6 group-hover:bg-datum-sage group-hover:text-white transition-colors">
                <Clock size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-2">2. The Member Rate</h4>
              <p className="text-3xl font-serif italic mb-6 text-datum-slate">$75 <span className="text-sm font-sans font-normal not-italic text-gray-400">/ Hour</span></p>
              <ul className="space-y-4 text-datum-charcoal">
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> On-Demand Service</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> For repairs, "honey-do" lists, and tasks outside the quarterly checklist</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> Exclusive rate for members only</li>
              </ul>
            </div>
          </FadeIn>

          {/* Card 3 */}
          <FadeIn delay={500} className="h-full">
             <div className="bg-white p-10 h-full shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-datum-slate rounded-sm group">
               <div className="w-14 h-14 bg-datum-cream rounded-full flex items-center justify-center mb-6 group-hover:bg-datum-slate group-hover:text-white transition-colors">
                <Receipt size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-2">3. The Materials</h4>
              <p className="text-3xl font-serif italic mb-6 text-datum-slate">Cost <span className="text-sm font-sans font-normal not-italic text-gray-400">+ Management</span></p>
              <ul className="space-y-4 text-datum-charcoal">
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> Zero Secrets</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> You see the receipt. We add a transparent fee to cover sourcing, vetting, and warranty</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-datum-sage mt-1 flex-shrink-0" /> No hidden padding</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* SECTION 2: QUARTERLY STEWARDSHIP */}
      <Section className="bg-white">
         <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <FadeIn direction="right">
                <h2 className="text-xs font-bold tracking-[0.2em] text-datum-slate uppercase mb-4">Quarterly Stewardship</h2>
                <h3 className="text-4xl font-light mb-6 text-datum-black">Four visits.<br/>Zero surprises.</h3>
                <p className="text-xl text-gray-500 leading-relaxed mb-6">
                  Included in your retainer. Every season, we dedicate 3 hours to the "Big 4": Air, Water, Safety, and Envelope. We catch the small issues before they become expensive disasters.
                </p>
              </FadeIn>
            </div>
            
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Spring */}
                <FadeIn delay={100} className="h-full">
                  <div className="bg-datum-cream p-8 h-full border border-transparent hover:border-datum-sage/30 transition-colors rounded-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <Droplets className="text-blue-400" size={24} />
                      <h4 className="text-lg font-bold">Spring: Thaw & Flow</h4>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> Test sump pumps and de-winterize hose bibs</li>
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> Inspect roof, gutters, and grading for winter damage</li>
                    </ul>
                  </div>
                </FadeIn>

                 {/* Summer */}
                 <FadeIn delay={200} className="h-full">
                  <div className="bg-datum-cream p-8 h-full border border-transparent hover:border-datum-sage/30 transition-colors rounded-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <Sun className="text-yellow-500" size={24} />
                      <h4 className="text-lg font-bold">Summer: Cool & Dry</h4>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> Check A/C condensers and change filters</li>
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> Clear dryer vents and lubricate windows/doors</li>
                    </ul>
                  </div>
                </FadeIn>

                 {/* Fall */}
                 <FadeIn delay={300} className="h-full">
                  <div className="bg-datum-cream p-8 h-full border border-transparent hover:border-datum-sage/30 transition-colors rounded-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <Thermometer className="text-orange-500" size={24} />
                      <h4 className="text-lg font-bold">Fall: Freeze Prep</h4>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> <span className="font-semibold text-red-700">Critical:</span> Winterize hose bibs to prevent burst pipes</li>
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> Test fire the furnace and check attic seals</li>
                    </ul>
                  </div>
                </FadeIn>

                 {/* Winter */}
                 <FadeIn delay={400} className="h-full">
                  <div className="bg-datum-cream p-8 h-full border border-transparent hover:border-datum-sage/30 transition-colors rounded-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <Snowflake className="text-blue-300" size={24} />
                      <h4 className="text-lg font-bold">Winter: Interior Health</h4>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> Test smoke/CO detectors and scan electrical panels</li>
                      <li className="flex items-start gap-2"><div className="w-1 h-1 bg-datum-slate rounded-full mt-2"></div> Manage humidity to prevent window condensation</li>
                    </ul>
                  </div>
                </FadeIn>
              </div>
              <p className="text-xs italic text-gray-400 mt-6 text-right"> > Labor included. Materials billed separately.</p>
            </div>
         </div>
      </Section>

      {/* SECTION 3: THE FAIRNESS SCALE */}
      <Section className="bg-datum-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-xs font-bold tracking-[0.2em] text-datum-sage uppercase mb-4">The Fairness Scale</h2>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
               <h3 className="text-4xl font-light mb-6">We account for every penny.</h3>
            </FadeIn>
            <FadeIn direction="up" delay={200}>
              <p className="text-xl text-gray-500">All invoices include a 5% Operations Fee. Beyond that, the model is simple.</p>
            </FadeIn>
          </div>

          <div className="space-y-8">
            {/* Item 1 */}
            <FadeIn delay={300}>
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-8 rounded-sm shadow-sm">
                 <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-datum-slate">
                    <DollarSign size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Standard (&lt;$2,500): Cost + 15%</h4>
                    <p className="text-datum-charcoal leading-relaxed">We vet, buy, and warranty. You pay for the management of the trade, not just the labor.</p>
                 </div>
              </div>
            </FadeIn>

            {/* Item 2 */}
            <FadeIn delay={400}>
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-8 rounded-sm shadow-sm">
                 <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-datum-slate">
                    <AlertTriangle size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Major (&gt;$10,000): Flat Fee</h4>
                    <p className="text-datum-charcoal leading-relaxed">No predatory percentages on big jobs (like roofs). We charge a fixed fee for oversight.</p>
                 </div>
              </div>
            </FadeIn>

             {/* Item 3 */}
             <FadeIn delay={500}>
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-8 rounded-sm shadow-sm">
                 <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-datum-slate">
                    <Hand size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">The "Just Fix It" Limit</h4>
                    <p className="text-datum-charcoal leading-relaxed">Set a cap (e.g., $500). Under? We fix immediately. Over? We pause for approval. No bottlenecks.</p>
                 </div>
              </div>
            </FadeIn>

             {/* Item 4 */}
             <FadeIn delay={600}>
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-8 rounded-sm shadow-sm">
                 <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-datum-slate">
                    <Timer size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">No Minimums</h4>
                    <p className="text-datum-charcoal leading-relaxed">No trip charges. If you need us for 30 minutes, you pay for 30 minutes.</p>
                 </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* SECTION 4: BILLING */}
      <Section dark className="bg-datum-slate text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <FadeIn direction="right">
                 <h2 className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase mb-4">Billing</h2>
                 <h3 className="text-5xl font-light mb-6">Frictionless payments.</h3>
                 <h4 className="text-2xl italic font-serif text-white/90 mb-8">We don't chase. We work.</h4>
                 <p className="text-xl text-gray-300 leading-relaxed mb-8">
                   You shouldn't have to manage a dozen invoices for a dozen lightbulbs. We streamline the financial side so you can ignore it.
                 </p>
                 
                 <div className="bg-white/10 p-8 rounded-sm border-l-4 border-datum-sage">
                    <h5 className="text-xl font-bold mb-3">Consolidated Billing</h5>
                    <p className="text-gray-300">
                      We work from a pre-paid deposit or a secure card on file. We send you a detailed statement showing exactly what was done and what was spent. You stay in control; we handle the administration.
                    </p>
                 </div>
               </FadeIn>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center items-center">
                <FadeIn direction="left" duration={1200}>
                    {/* Abstract Card/Invoice Graphic */}
                    <div className="relative w-72 h-96 bg-white rounded-lg p-6 shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-700">
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-12 h-12 bg-datum-black rounded-full"></div>
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="w-full h-2 bg-gray-100 rounded"></div>
                            <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                            <div className="w-full h-2 bg-gray-100 rounded"></div>
                        </div>
                        <div className="w-full h-px bg-gray-200 mb-8"></div>
                        <div className="flex justify-between items-end">
                             <div className="space-y-2">
                                <div className="w-16 h-2 bg-gray-200 rounded"></div>
                                <div className="w-20 h-2 bg-gray-200 rounded"></div>
                             </div>
                             <div className="text-3xl font-bold text-datum-black">$0.00</div>
                        </div>
                        {/* Status Stamp */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 text-green-500 px-4 py-2 text-xl font-bold uppercase rotate-[-15deg] opacity-50">
                            Paid
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
      </Section>

      {/* CTA */}
       <Section className="bg-datum-black text-white py-24">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn direction="up">
             <h2 className="text-4xl md:text-6xl font-light mb-6">Your home deserves a steward.</h2>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
             <h3 className="text-2xl text-gray-400 font-light mb-12">And you deserve a break.</h3>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button variant="secondary" onClick={() => window.location.href = 'tel:5555555555'}>
                  Call Us Today
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-datum-black" onClick={() => document.getElementById('footer')?.scrollIntoView()}>
                  Book Your Assessment
                </Button>
             </div>
          </FadeIn>
        </div>
       </Section>
    </div>
  );
};