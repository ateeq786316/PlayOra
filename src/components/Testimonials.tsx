/**
 * PlayOra Testimonials Section
 * Carousel showcasing user testimonials and reviews
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from './ui/button';
import { Testimonial } from '../models/types';

import ateeq from '../assets/ateeq.jpg';
import rehan from '../assets/rehan.png';
import basit from '../assets/basit.webp';
import hafiz from '../assets/hafiz.png';
import Taha from '../assets/taha.png';
import saif from '../assets/saif.png';

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Ateeq Ur Rehman',
    location: 'Lahore, Pakistan',
    rating: 5,
    content: 'Bhai, PlayOra ne mera sports ka scene hi badal diya! Pehle ground dhundna mushkil tha, ab bas 2 minute mein booking ho jati hai. Cricket team bhi mil gayi, ab roz practice karte hain. Best app hai!',
    avatar: ateeq
  },
  {
    id: 'testimonial-2',
    name: 'Mohammad Rehan',
    location: 'Lahore, Pakistan',
    rating: 5,
    content: 'Yaar, main software engineer hun aur time nahi milta tha sports ke liye. PlayOra ne sab solve kar diya! Badminton players mil gaye mere level ke, ab weekend pe regular matches hote hain. Zindagi mein balance aa gaya!',
    avatar: rehan
  },
  {
    id: 'testimonial-3',
    name: 'Basit Niazi',
    location: 'Lahore, Pakistan',
    rating: 5,
    content: 'Football ka shauq tha lekin team nahi mil rahi thi. PlayOra pe local tournaments join kiye, ab Lahore ke best players ke saath khelta hun! Skills improve ho gayi hain, ab coaching bhi kar raha hun.',
    avatar: basit
  },
  {
    id: 'testimonial-4',
    name: 'Hafiz',
    location: 'Lahore, Pakistan',
    rating: 5,
    content: 'Main Karachi se Lahore shift hua tha job ke liye. Koi dost nahi tha yahan. PlayOra se basketball team join ki, ab sab se dosti ho gayi hai! Team dinners bhi karte hain, family jaisa feel hota hai.',
    avatar: hafiz
  },
  {
    id: 'testimonial-5',
    name: 'Taha',
    location: 'Lahore, Pakistan',
    rating: 5,
    content: 'Mera sports complex hai Model Town mein. PlayOra se booking management bilkul easy ho gayi! Customers ko pasand aa raha hai, revenue 40% badh gaya hai. Digital payment bhi ho jati hai, sab kuch smooth hai!',
    avatar: Taha
  },
  {
    id: 'testimonial-6',
    name: 'Saifoon',
    location: 'Lahore, Pakistan',
    rating: 5,
    content: 'Tennis ka passion tha lekin proper coaching nahi mil rahi thi. PlayOra pe professional coaches mil gaye! 6 mahine mein itna improve hua hun ke ab tournaments jeet raha hun. Dream come true hai!',
    avatar: saif
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating 
            ? 'text-accentGold fill-current' 
            : 'text-border'
        }`}
      />
    ));
  };

  return (
    <section 
      id="testimonials" 
      className="py-16 lg:py-24 bg-background-secondary"
      role="region"
      aria-labelledby="testimonials-heading"
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
              id="testimonials-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6"
            >
              What Players
              <span className="text-primary block lg:inline lg:ml-3">Say About Us</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
              Join thousands of satisfied players who have transformed their sporting 
              experience with PlayOra. Here's what our community has to say.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative bg-background rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-border min-h-[350px] sm:min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center w-full"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                {/* Content */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-text-primary font-medium mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={`${testimonials[currentIndex].name} profile picture`}
                    className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-primary/20"
                    loading="lazy"
                  />
                  <cite className="not-italic">
                    <div className="font-bold text-lg text-text-primary">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-text-secondary">
                      {testimonials[currentIndex].location}
                    </div>
                  </cite>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="sm"
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-primary hover:text-textLight transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <Button
              onClick={goToNext}
              variant="outline"
              size="sm"
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-primary hover:text-textLight transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-border hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-text-secondary">Average Rating</div>
            <div className="flex justify-center gap-1 mt-2">
              {renderStars(5)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-accentGold mb-2">10,000+</div>
            <div className="text-text-secondary">Happy Players</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-success mb-2">50,000+</div>
            <div className="text-text-secondary">Games Booked</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-text-secondary mb-6">
            Ready to join our community of sports enthusiasts?
          </p>
          <Button
            onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary-dark text-textLight px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-green hover:scale-105"
          >
            Start Your Journey Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
}