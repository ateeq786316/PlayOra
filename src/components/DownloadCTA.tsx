/**
 * PlayOra Download CTA Section
 * App download section with store badges and features
 */

import { motion } from 'framer-motion';
import { Download, Star, Users, Trophy, Shield } from 'lucide-react';
import { Button } from './ui/button';
import splashScreen from '../assets/splash-logo-screen.jpg';

export default function DownloadCTA() {
  const benefits = [
    {
      icon: Star,
      title: 'Instant Booking',
      description: 'Book grounds in under 30 seconds'
    },
    {
      icon: Users,
      title: 'Find Players',
      description: 'Connect with players near you'
    },
    {
      icon: Trophy,
      title: 'Join Tournaments',
      description: 'Compete and win exciting prizes'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Verified grounds and players'
    }
  ];

  const handlePlayStoreClick = () => {
    // In a real app, this would link to the actual Play Store
    window.open('https://play.google.com/store', '_blank', 'noopener,noreferrer');
  };

  const handleAppStoreClick = () => {
    // Coming soon message
    alert('iOS app coming soon! Stay tuned for updates.');
  };

  return (
    <section 
      id="download" 
      className="py-16 lg:py-24 bg-primary text-textLight relative overflow-hidden"
      role="region"
      aria-labelledby="download-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border border-textLight rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 border border-textLight rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 border border-textLight rounded-full transform -translate-x-24 translate-y-24"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              id="download-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6"
            >
              Download PlayOra
              <span className="text-accentGold block lg:inline lg:ml-3">Today</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-textLight/90 max-w-3xl mx-auto leading-relaxed px-2">
              Join the sports revolution! Download PlayOra now and start booking grounds, 
              building teams, and connecting with players in your city.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8">
              Why Choose PlayOra?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-textLight/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accentGold" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base">{benefit.title}</h4>
                      <p className="text-textLight/80 text-xs sm:text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-textLight/20">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-accentGold">4.8★</div>
                <div className="text-xs sm:text-sm text-textLight/80">App Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-accentGold">100K+</div>
                <div className="text-xs sm:text-sm text-textLight/80">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-accentGold">24/7</div>
                <div className="text-xs sm:text-sm text-textLight/80">Support</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Download Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* App Screenshot */}
            <div className="relative mb-6 sm:mb-8">
              <div className="inline-block relative">
                <div className="w-40 h-80 sm:w-48 sm:h-96 bg-neutralDark rounded-3xl p-2 mx-auto shadow-2xl">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img 
                      src={splashScreen} 
                      alt="PlayOra App Screenshot" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                {/* Floating Download Badge */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-accentGold rounded-full flex items-center justify-center shadow-lg"
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 text-neutralDark" />
                </motion.div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              {/* Google Play Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={handlePlayStoreClick}
                  className="w-full bg-textLight text-primary hover:bg-textLight/90 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3 min-h-[60px] sm:min-h-[70px]"
                >
                  <div className="flex items-center gap-3">
                    {/* Google Play Icon */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-textLight" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-primary/70 leading-tight">GET IT ON</div>
                      <div className="text-sm sm:text-base font-bold leading-tight">Google Play</div>
                    </div>
                  </div>
                </Button>
              </motion.div>

              {/* App Store Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={handleAppStoreClick}
                  variant="outline"
                  className="w-full border-2 border-textLight text-textLight hover:bg-textLight hover:text-primary px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 min-h-[60px] sm:min-h-[70px]"
                >
                  <div className="flex items-center gap-3">
                    {/* App Store Icon */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-textLight rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs opacity-70 leading-tight">COMING SOON</div>
                      <div className="text-sm sm:text-base font-bold leading-tight">App Store</div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4 sm:mt-6 text-textLight/70 text-xs sm:text-sm">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Secure • Privacy Protected • Ad-Free</span>
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-textLight/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-textLight/20">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
              Ready to Transform Your Sports Experience?
            </h3>
            <p className="text-textLight/90 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Don't wait! Join thousands of players who are already enjoying seamless sports booking 
              and community building with PlayOra.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={handlePlayStoreClick}
                className="bg-accentGold hover:bg-accentGold/90 text-neutralDark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-gold hover:scale-105 w-full sm:w-auto min-h-[50px] sm:min-h-[60px]"
              >
                Download Now - It's Free!
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}