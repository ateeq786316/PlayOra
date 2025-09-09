/**
 * PlayOra How It Works Section
 * Timeline showing the app usage process
 */

import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Search, 
  Calendar, 
  Users, 
  Play 
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Download & Sign Up',
    description: 'Download PlayOra from the Play Store and create your profile in under 2 minutes.',
    icon: Smartphone,
    color: 'bg-primary'
  },
  {
    id: 2,
    title: 'Find Grounds & Players',
    description: 'Search for nearby sports grounds and connect with players in your area.',
    icon: Search,
    color: 'bg-accentGold'
  },
  {
    id: 3,
    title: 'Book Your Slot',
    description: 'Choose your preferred time slot and book instantly with secure payment.',
    icon: Calendar,
    color: 'bg-success'
  },
  {
    id: 4,
    title: 'Build Your Team',
    description: 'Invite friends or join existing teams to enhance your sporting experience.',
    icon: Users,
    color: 'bg-primary-light'
  },
  {
    id: 5,
    title: 'Play & Enjoy',
    description: 'Show up at your booked ground, play your heart out, and track your progress.',
    icon: Play,
    color: 'bg-warning'
  }
];

export default function HowItWorks() {
  return (
    <section 
      id="how-it-works" 
      className="py-16 lg:py-24 bg-background"
      role="region"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 overflow-visible">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6"
            >
              How PlayOra
              <span className="text-primary block lg:inline lg:ml-3">Works</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
              Getting started with PlayOra is simple. Follow these 5 easy steps to transform 
              your sporting experience and join thousands of active players.
            </p>
          </motion.div>
        </div>

        {/* Steps Timeline */}
        <div className="relative overflow-visible">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accentGold to-primary transform -translate-y-1/2 rounded-full" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-4 relative z-10 overflow-visible" style={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                  style={{ paddingTop: '16px', paddingBottom: '16px' }}
                >
                  {/* Step Card */}
                  <div className="bg-background-secondary rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-2 relative overflow-visible" style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px' }}>
                    {/* Step Number - At the side, fully visible */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-primary text-textLight rounded-full flex items-center justify-center text-sm sm:text-base font-bold z-30 shadow-xl border-2 border-background" style={{ borderColor: 'var(--background)' }}>
                      {step.id}
                    </div>
                    
                    {/* Step Number & Icon */}
                    <div className="relative mb-6 sm:mb-8">
                      {/* Icon Background */}
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 ${step.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-textLight" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile Connection Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4 sm:mt-6 mb-2">
                      <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-primary to-transparent rounded-full" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-primary rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-textLight mb-3 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-accentGold text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Join thousands of players who are already using PlayOra to enhance their sporting experience. 
              Download now and book your first ground today!
            </p>
            <button
              onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-textLight text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-textLight/90 transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              Start Your Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}