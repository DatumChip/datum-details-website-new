import React from 'react';
import { Button } from './Button';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-datum-black text-white pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Main CTA Section */}
        <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-8">Ready for effortless homeownership?</h2>
          <p className="text-2xl text-gray-400 mb-10 font-light max-w-2xl">
            Stop waiting on hold. You have access to a team that treats your home with the reverence it deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Button variant="secondary" onClick={() => window.location.href = 'tel:5555555555'}>
              Call Us Today
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-datum-black">
              Book Your Assessment
            </Button>
          </div>
        </div>

        <div className="h-px w-full bg-white/10 mb-12"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-4">
                <div className="w-32">
                  <Logo className="text-white" />
                </div>
                <p className="text-gray-500 text-base mt-2">
                    © {new Date().getFullYear()} Datum Details. All rights reserved.
                </p>
            </div>

            <div className="flex gap-8 text-base text-gray-400">
                <Link to="/pricing" className="hover:text-datum-sage transition-colors">Services & Pricing</Link>
                <a href="#" className="hover:text-datum-sage transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-datum-sage transition-colors">Contact</a>
            </div>
        </div>
      </div>
    </footer>
  );
};