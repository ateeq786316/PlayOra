/**
 * PlayOra Contact Section
 * Contact form with validation (frontend only)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { ContactFormData } from '../models/types';
import { isValidEmail } from '../utils/helpers';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Error", 
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for contacting us. We'll get back to you soon!",
        variant: "default"
      });
      
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background" role="region" aria-labelledby="contact-heading">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 id="contact-heading" className="text-2xl sm:text-3xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
              Have questions about PlayOra? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8">Contact Information</h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm sm:text-base">Email</h4>
                  <p className="text-text-secondary text-sm sm:text-base">support@playora.app</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm sm:text-base">Phone</h4>
                  <p className="text-text-secondary text-sm sm:text-base">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm sm:text-base">Office</h4>
                  <p className="text-text-secondary text-sm sm:text-base">Lahore, Cantt, Pakistan</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1 sm:mb-2">Name</label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1 sm:mb-2">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1 sm:mb-2">Message</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full h-28 sm:h-32 resize-none"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-textLight py-3 font-semibold rounded-lg transition-all duration-300 hover:shadow-green flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-textLight"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}