import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const DeleteAccount: React.FC = () => {
  // Set page meta tags
  useEffect(() => {
    document.title = 'Delete Your PlayOra Account | PlayOra';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to delete your PlayOra account. Contact us at playorahelpcenter@gmail.com with your deletion request.');
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Spacer to offset fixed header height */}
      <div className="h-12 sm:h-14 lg:h-16" aria-hidden="true" />
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
                <BreadcrumbPage>Delete Account</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Delete Your PlayOra Account
        </motion.h1>

        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <h2 id="how-to-request" className="text-xl font-semibold mt-8 mb-3 scroll-mt-20">
            <a href="#how-to-request" className="text-primary hover:text-primary/80 transition-colors">How to request deletion</a>
          </h2>
          <p>
            Email <a className="text-primary underline" href="mailto:playorahelpcenter@gmail.com">playorahelpcenter@gmail.com</a> with subject
            <span className="font-semibold"> "Delete my PlayOra account"</span>. Include your registered email. Account deletion request must be
            submitted using the registered PlayOra email address.
          </p>

          <h2 id="what-we-delete" className="text-xl font-semibold mt-8 mb-3 scroll-mt-20">
            <a href="#what-we-delete" className="text-primary hover:text-primary/80 transition-colors">What we delete</a>
          </h2>
          <ul className="list-disc pl-6">
            <li>Profile (name, photo, email)</li>
            <li>Reviews you wrote</li>
            <li>Teams you made</li>
            <li>Removal from teams you joined</li>
            <li>Bookings you created</li>
            <li>In-app preferences</li>
          </ul>

          <h2 id="what-may-remain" className="text-xl font-semibold mt-8 mb-3 scroll-mt-20">
            <a href="#what-may-remain" className="text-primary hover:text-primary/80 transition-colors">What may remain</a>
          </h2>
          <p>
            Messages or content visible to others (e.g., chat history) and legal/abuse logs may remain as permitted by law and our
            legitimate interests (e.g., abuse prevention, security).
          </p>

          <h2 id="timing" className="text-xl font-semibold mt-8 mb-3 scroll-mt-20">
            <a href="#timing" className="text-primary hover:text-primary/80 transition-colors">Timing</a>
          </h2>
          <p>Requests are typically processed within 10 days.</p>

          <h2 id="contact" className="text-xl font-semibold mt-8 mb-3 scroll-mt-20">
            <a href="#contact" className="text-primary hover:text-primary/80 transition-colors">Contact</a>
          </h2>
          <p>
            For any questions, contact us at <a className="text-primary underline" href="mailto:playorahelpcenter@gmail.com">playorahelpcenter@gmail.com</a>.
          </p>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
};

export default DeleteAccount;


