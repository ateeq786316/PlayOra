/**
 * PlayOra Screenshots Section
 * Carousel showcasing mobile app screenshots
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from './ui/button';
import dashboard from '../assets/dashboard.jpg';
import groundBooking from '../assets/ground-booking.jpg';
import teamHub from '../assets/team-hub.jpg';
import liveChat from '../assets/team-chat.jpg';
import challenges from '../assets/challange.jpg';

const screenshots = [
  {
    id: 'home-screen',
    title: 'Home Dashboard',
    description: 'Clean, intuitive dashboard showing nearby grounds and quick actions.',
    image: dashboard,
    alt: 'PlayOra home screen showing dashboard with nearby sports grounds'
  },
  {
    id: 'ground-booking',
    title: 'Ground Booking',
    description: 'Easy booking interface with real-time availability and instant confirmation.',
    image: groundBooking,
    alt: 'Ground booking screen with calendar and available time slots'
  },
  {
    id: 'team-management',
    title: 'Team Hub',
    description: 'Comprehensive team management with player stats and communication tools.',
    image: teamHub,
    alt: 'Team management interface showing player profiles and team statistics'
  },
  {
    id: 'live-chat',
    title: 'Community Chat',
    description: 'Real-time messaging with team members and fellow players.',
    image: liveChat,
    alt: 'Chat interface with team communication and messaging features'
  },
  {
    id: 'challenges',
    title: 'Challenges & Tournaments',
    description: 'Participate in exciting competitions and track your performance.',
    image: challenges,
    alt: 'Challenges screen showing tournaments and competition leaderboards'
  }
];

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      id="screenshots" 
      className="py-16 lg:py-24 bg-background-secondary"
      role="region"
      aria-labelledby="screenshots-heading"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              id="screenshots-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6"
            >
              See PlayOra
              <span className="text-primary block lg:inline lg:ml-3">in Action</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
              Take a peek at PlayOra's intuitive interface designed to make sports booking 
              and team management effortless and enjoyable.
            </p>
          </motion.div>
        </div>

        {/* Screenshots Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mobile Preview */}
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto max-w-xs sm:max-w-sm">
                {/* Phone Frame */}
                <div className="relative bg-neutralDark rounded-3xl p-3 shadow-2xl">
                  <div className="bg-background rounded-2xl overflow-hidden aspect-[9/19.5]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        src={screenshots[currentIndex].image}
                        alt={screenshots[currentIndex].alt}
                        className="w-full h-full object-contain bg-background"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                    </AnimatePresence>
                  </div>
                  
                  {/* Phone Details */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full" />
                </div>

                {/* Navigation Arrows */}
                <Button
                  onClick={goToPrevious}
                  variant="outline"
                  size="sm"
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-primary hover:text-textLight transition-all duration-200"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>

                <Button
                  onClick={goToNext}
                  variant="outline"
                  size="sm"
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-primary hover:text-textLight transition-all duration-200"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="text-center lg:text-left"
                >
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
                    {screenshots[currentIndex].title}
                  </h3>
                  <p className="text-base sm:text-lg text-text-secondary mb-6 sm:mb-8 leading-relaxed px-2">
                    {screenshots[currentIndex].description}
                  </p>
                  
                  {/* Auto-play Toggle */}
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 sm:mb-8">
                    <Button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Play className={`w-4 h-4 ${isAutoPlaying ? 'text-success' : 'text-text-secondary'}`} />
                      {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="flex justify-center lg:justify-start space-x-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-primary scale-110'
                        : 'bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Store Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-text-secondary mb-6">
            Experience PlayOra yourself
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center px-1 md:px-2 w-full max-w-2xl mx-auto">
            <Button
              onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary-dark text-textLight rounded-full font-semibold transition-all duration-300 hover:shadow-green hover:scale-105 w-full md:w-auto min-h-[48px] text-xs md:text-base px-3 md:px-6 py-3 md:py-4"
            >
              Download for Android
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-textLight rounded-full font-semibold transition-all duration-300 w-full md:w-auto min-h-[48px] text-xs md:text-base px-3 md:px-6 py-3 md:py-4"
            >
              Coming Soon on iOS
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}