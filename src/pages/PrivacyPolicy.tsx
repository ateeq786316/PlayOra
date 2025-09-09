import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  // Set page meta tags
  useEffect(() => {
    document.title = 'Privacy Policy | PlayOra';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'PlayOra Privacy Policy - Learn how we collect, use, and protect your data. Last updated August 18, 2025.');
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 max-w-3xl">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Privacy Policy – PlayOra
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        >
          Last updated: 18 August 2025
        </motion.p>

        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <h2 id="who-we-are" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#who-we-are" className="text-primary hover:text-primary/80 transition-colors">Who we are</a>
          </h2>
          <p>
            PlayZone provides a mobile app to discover and book sports grounds, chat with venue owners/teams, and leave reviews.
          </p>

          <h2 id="data-we-collect" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#data-we-collect" className="text-primary hover:text-primary/80 transition-colors">Data we collect</a>
          </h2>
          <ul className="list-disc pl-6">
            <li>Account info: name, email address, user ID, profile photo (optional), address (district/city/province).</li>
            <li>Phone number (venue owners only): collected during ground verification.</li>
            <li>Device or other IDs: Firebase Installation ID and FCM push token (for notifications and device security).</li>
            <li>User-generated content: chat messages, reviews, team/ground descriptions, and booking-related actions.</li>
            <li>App info & performance: crash logs (via Firebase Crashlytics).</li>
          </ul>

          <h2 id="data-we-do-not-collect" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#data-we-do-not-collect" className="text-primary hover:text-primary/80 transition-colors">Data we do NOT collect</a>
          </h2>
          <p>We do not request device GPS permissions and do not collect precise or approximate device location.</p>

          <h2 id="how-we-use-data" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#how-we-use-data" className="text-primary hover:text-primary/80 transition-colors">How we use data</a>
          </h2>
          <ul className="list-disc pl-6">
            <li>App functionality and account management (login, profiles, bookings, chat, reviews, notifications).</li>
            <li>Security/abuse prevention (e.g., verifying venue owner phone numbers).</li>
            <li>Analytics for stability and quality (crash logs only).</li>
          </ul>

          <h2 id="sharing" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#sharing" className="text-primary hover:text-primary/80 transition-colors">Sharing</a>
          </h2>
          <p>
            We do not sell or share your data with third parties for their independent purposes. We use service providers (e.g., Google/Firebase) to process data on our behalf to run the app.
          </p>

          <h2 id="retention" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#retention" className="text-primary hover:text-primary/80 transition-colors">Retention</a>
          </h2>
          <ul className="list-disc pl-6">
            <li>Account and content remain until you request deletion.</li>
            <li>Account deletion process can take up to 10 days.</li>
          </ul>

          <h2 id="your-choices-rights" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#your-choices-rights" className="text-primary hover:text-primary/80 transition-colors">Your choices & rights</a>
          </h2>
          <ul className="list-disc pl-6">
            <li>You can update profile details in the app.</li>
            <li>
              To delete your account or request deletion of certain data, follow the steps here: <a className="text-primary underline" href="https://sites.google.com/view/playzonehelp/home" target="_blank" rel="noreferrer">PlayZone Help</a>.
            </li>
          </ul>

          <h2 id="childrens-privacy" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#childrens-privacy" className="text-primary hover:text-primary/80 transition-colors">Children's privacy</a>
          </h2>
          <p>PlayZone is not directed to children under 13, and we do not knowingly collect personal data from them.</p>

          <h2 id="changes" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#changes" className="text-primary hover:text-primary/80 transition-colors">Changes</a>
          </h2>
          <p>We may update this policy. We will post the new version with a revised "Last updated" date.</p>

          <h2 id="contact" className="text-xl font-semibold mt-6 mb-3 scroll-mt-20">
            <a href="#contact" className="text-primary hover:text-primary/80 transition-colors">Contact</a>
          </h2>
          <p>
            If you have questions, contact us at: <a className="text-primary underline" href="mailto:playorahelpcenter@gmail.com">playorahelpcenter@gmail.com</a>
          </p>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;


