/**
 * PlayOra Header Component
 * Sticky navigation with responsive mobile menu
 */

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { scrollToElement } from '../utils/helpers';
import svgLogo from '../assets/playora-logo.svg';

const navItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'how-it-works', label: 'How it Works', href: '#how-it-works' },
  { id: 'screenshots', label: 'Screenshots', href: '#screenshots' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
  { id: 'download', label: 'Download', href: '#download' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const elementId = href.replace('#', '');
    scrollToElement(elementId);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 border-b border-border/0 ${
        isScrolled 
          ? 'bg-background/65 backdrop-blur-md shadow-md' 
          : 'bg-background/40 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <img
              src={svgLogo}
              alt="PlayOra logo"
              width={800}
              height={800}
              loading="eager"
              className="w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 select-none"
            />
            <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-foreground">
              PlayOra
            </span>
          </div>

          {/* Right side - Navigation and Download Button */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 lg:space-x-2 flex-nowrap">
            {/* Navigation - Right side alignment */}
            <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1 flex-nowrap" role="navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-xs font-bold transition-all duration-200 relative group whitespace-nowrap px-1 py-1 rounded-md flex-shrink-0 ${
                    activeSection === item.id 
                      ? 'text-accentGold bg-accentGold/10' 
                      : 'text-foreground hover:text-accentGold hover:bg-accentGold/5'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accentGold transition-all duration-300 group-hover:w-full ${
                    activeSection === item.id ? 'w-full' : ''
                  }`} />
                </button>
              ))}
            </nav>

            {/* Download Button - Right side alignment */}
            <Button 
              onClick={() => handleNavClick('#download')}
              className="hidden md:block bg-primary-light hover:bg-primary text-white px-2 py-1.5 rounded-full transition-all duration-200 hover:shadow-green font-semibold tracking-wide text-xs whitespace-nowrap flex-shrink-0"
            >
              Download App
            </Button>
          </div>

          {/* Mobile Menu Toggle - Positioned absolutely on right */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMenuToggle}
            className="md:hidden absolute right-4 p-2 text-foreground hover:text-accentGold hover:bg-accentGold/10"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav 
            className="py-4 space-y-2 bg-background-secondary rounded-lg mt-2 shadow-lg"
            role="navigation"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left px-4 py-3 font-bold transition-all duration-200 relative group ${
                  activeSection === item.id 
                    ? 'text-accentGold bg-accentGold/10' 
                    : 'text-foreground hover:text-accentGold hover:bg-accentGold/5'
                }`}
              >
                {item.label}
                <span className={`absolute left-0 top-0 w-1 h-full bg-accentGold transition-all duration-300 ${
                  activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} />
              </button>
            ))}
            <div className="px-4 pt-2">
              <Button 
                onClick={() => handleNavClick('#download')}
                className="w-full bg-primary-light hover:bg-primary text-white py-3 rounded-full transition-all duration-200"
              >
                Download App
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}