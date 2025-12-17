/**
 * PlayOra Footer Component
 * Site footer with links and social media
 */

import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import playoraLogo from '../assets/playora-logo.svg';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61578953536480', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/playora.app/', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: 'mailto:playorahelpcenter@gmail.com', label: 'Email' }
  ];

  const handleNavClick = (href: string) => {
    const elementId = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutralDark text-textLight py-16" role="contentinfo">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <img src={playoraLogo} alt="PlayOra Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-bold">PlayOra</span>
            </div>
            <p className="text-textLight/80 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              A Pakistan-focused sports app to book/request grounds, create teams, arrange matches, and chat for coordination — built for local sports communities.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'Email' ? '_self' : '_blank'}
                  rel={label === 'Email' ? '' : 'noopener noreferrer'}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-textLight/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <nav className="space-y-1 sm:space-y-2">
              {['Home', 'Features', 'How it Works', 'Screenshots', 'Blog', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(`#${item.toLowerCase().replace(' ', '-')}`)}
                  className="block text-textLight/80 hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <a 
                  href="mailto:playorahelpcenter@gmail.com"
                  className="text-textLight/80 hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                >
                  playorahelpcenter@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-textLight/80 text-sm sm:text-base">+92 *** *******</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-textLight/80 text-sm sm:text-base">Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-textLight/20 my-6 sm:my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-textLight/60 text-xs sm:text-sm">
            © 2024 PlayOra. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6 mt-3 sm:mt-4 md:mt-0">
            <a href="/book-grounds-pakistan" className="text-textLight/60 hover:text-primary text-xs sm:text-sm transition-colors duration-200">Book Grounds</a>
            <a href="/teams" className="text-textLight/60 hover:text-primary text-xs sm:text-sm transition-colors duration-200">Teams</a>
            <a href="/sports" className="text-textLight/60 hover:text-primary text-xs sm:text-sm transition-colors duration-200">Sports</a>
            <a href="/links" className="text-textLight/60 hover:text-primary text-xs sm:text-sm transition-colors duration-200">Official Links</a>
            <a href="/what-is-playora" className="text-textLight/60 hover:text-primary text-xs sm:text-sm transition-colors duration-200">What is PlayOra?</a>
            <a href="/privacy-policy" className="text-textLight/60 hover:text-textLight text-xs sm:text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="/delete-account" className="text-textLight/60 hover:text-textLight text-xs sm:text-sm transition-colors duration-200">Delete Account</a>
          </div>
        </div>
      </div>
    </footer>
  );
}