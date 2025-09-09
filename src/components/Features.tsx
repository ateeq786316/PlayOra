/**
 * PlayOra Features Section
 * Responsive grid showcasing app features
 */

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Trophy, 
  MessageCircle, 
  Star, 
  Filter,
  Calendar,
  Target
} from 'lucide-react';
import { useWindowSize } from '../hooks/useWindowSize';

const features = [
  {
    id: 'ground-booking',
    title: 'Smart Ground Booking',
    description: 'Find and book sports grounds instantly with real-time availability and smart filters.',
    icon: MapPin,
    color: 'text-primary'
  },
  {
    id: 'team-creation',
    title: 'Team Management',
    description: 'Create teams, invite players, and manage your sporting community with ease.',
    icon: Users,
    color: 'text-accentGold'
  },
  {
    id: 'challenges',
    title: 'Challenges & Tournaments',
    description: 'Join exciting competitions and challenges to test your skills and win prizes.',
    icon: Trophy,
    color: 'text-success'
  },
  {
    id: 'live-chat',
    title: 'Live Chat',
    description: 'Connect with players, coordinate games, and build lasting sports friendships.',
    icon: MessageCircle,
    color: 'text-primary-light'
  },
  {
    id: 'reviews',
    title: 'Reviews & Ratings',
    description: 'Rate grounds and players to help build a trusted sports community.',
    icon: Star,
    color: 'text-warning'
  },
  {
    id: 'location-filtering',
    title: 'Location Filtering',
    description: 'Find sports facilities near you with advanced location-based search.',
    icon: Filter,
    color: 'text-error'
  },
  {
    id: 'scheduling',
    title: 'Smart Scheduling',
    description: 'Sync with your calendar and never miss a game with intelligent scheduling.',
    icon: Calendar,
    color: 'text-primary'
  },
  {
    id: 'skill-matching',
    title: 'Skill Matching',
    description: 'Find players of similar skill levels for balanced and enjoyable games.',
    icon: Target,
    color: 'text-accentGold'
  }
];

export default function Features() {
  const { isMobile, isTablet } = useWindowSize();

  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section 
      id="features" 
      className="py-16 lg:py-24 bg-background-secondary"
      role="region"
      aria-labelledby="features-heading"
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
              id="features-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6"
            >
              Powerful Features for
              <span className="text-primary block lg:inline lg:ml-3">Sports Enthusiasts</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
              Everything you need to find, book, and enjoy sports activities with your community.
              PlayOra brings players together through innovative features designed for modern athletes.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${getGridCols()} gap-4 sm:gap-6 lg:gap-8`}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-background rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-border hover:border-primary/20 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl bg-gradient-card flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${feature.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-text-secondary mb-6">
            Ready to experience all these features?
          </p>
          <button
            onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary-dark text-textLight px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-green hover:scale-105"
          >
            Download PlayOra Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}