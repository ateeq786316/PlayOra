/**
 * PlayOra Hero Section
 * Full-height hero with sports background and CTAs
 */

import { motion } from 'framer-motion';
import { ArrowDown, Play, Download } from 'lucide-react';
import { Button } from './ui/button';
import { scrollToElement } from '../utils/helpers';
import heroBackground from '../assets/hero-sports-bg.jpg';

export default function Hero() {
  const handleLearnMore = () => {
    scrollToElement('features');
  };

  const handleDownload = () => {
    scrollToElement('download');
  };

  return (
    <section 
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden w-full"
      role="banner"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 sm:mb-6 leading-tight">
            <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-rustic text-accentGold golden-glow">
              PlayOra
            </span>
            <span className="block text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mt-2 sm:mt-4 text-primary-light tracking-widest transform scale-x-100">
              <span style={{ color: '#00FF00' }}>Book. Play. Win.</span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-textLight mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            The ultimate sports booking and community app. Find grounds, build teams, 
            join challenges, and connect with players in your city.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-6"
        >
          <Button
            onClick={handleDownload}
            className="bg-primary hover:bg-primary-dark text-textLight px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-green hover:scale-105 flex items-center gap-2 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Download Now
          </Button>
          
          <Button
            onClick={handleLearnMore}
            variant="outline"
            className="border-textLight text-textLight hover:bg-textLight hover:text-primary px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-lg flex items-center gap-2 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            Learn More
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="animate-bounce"
        >
          <button
            onClick={handleLearnMore}
            className="text-textLight/70 hover:text-textLight transition-colors duration-200"
            aria-label="Scroll down to learn more"
          >
            <ArrowDown className="w-8 h-8 mx-auto" />
          </button>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-0 right-0 z-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-textLight/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="text-textLight">
                <div className="text-2xl sm:text-3xl font-bold text-accentGold">10,000+</div>
                <div className="text-sm opacity-90">Active Players</div>
              </div>
              <div className="text-textLight">
                <div className="text-2xl sm:text-3xl font-bold text-accentGold">500+</div>
                <div className="text-sm opacity-90">Sports Grounds</div>
              </div>
              <div className="text-textLight">
                <div className="text-2xl sm:text-3xl font-bold text-accentGold">1,200+</div>
                <div className="text-sm opacity-90">Teams Formed</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}