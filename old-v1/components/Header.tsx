import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  
  // If not on home page, header should always have background
  const showBackground = scrolled || !isHome;

  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
    showBackground ? 'bg-datum-cream shadow-md py-4' : 'bg-transparent py-6'
  }`;

  const textColor = showBackground ? 'text-datum-black' : 'text-white';

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Container */}
        <div className="w-32 md:w-40 relative z-50">
           <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Logo color={showBackground ? '#1a1a1a' : '#ffffff'} />
           </Link>
        </div>

        {/* Desktop Nav */}
        <div className={`hidden md:flex gap-8 items-center font-medium text-sm tracking-wide ${textColor}`}>
          <Link to="/" className="hover:text-datum-sage transition-colors">Home</Link>
          <Link to="/pricing" className="hover:text-datum-sage transition-colors">Services & Pricing</Link>
          <button 
            className={`px-6 py-2 border transition-all duration-300 ${showBackground ? 'border-datum-black hover:bg-datum-black hover:text-white' : 'border-white hover:bg-white hover:text-datum-black'}`}
            onClick={() => document.getElementById('footer')?.scrollIntoView()}
          >
            Book Assessment
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
            className={`md:hidden relative z-50 ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            {mobileMenuOpen ? <X size={24} color={'#1a1a1a'} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
          <div className="fixed inset-0 bg-datum-cream text-datum-black z-40 flex flex-col justify-center items-center gap-8 md:hidden">
            <Link to="/" className="text-2xl font-light" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/pricing" className="text-2xl font-light" onClick={() => setMobileMenuOpen(false)}>Services & Pricing</Link>
            <button 
                className="py-3 px-8 bg-datum-black text-white uppercase tracking-widest text-sm"
                onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('footer')?.scrollIntoView();
                }}
            >
                Book Assessment
            </button>
          </div>
      )}
    </nav>
  );
};