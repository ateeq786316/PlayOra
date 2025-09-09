import Header from "../components/Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Screenshots from "../components/Screenshots";
import BlogSection from "../components/BlogSection";
import Testimonials from "../components/Testimonials";
import DownloadCTA from "../components/DownloadCTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // slight delay to allow layout to settle, then smooth scroll
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Screenshots />
      <BlogSection />
      <Testimonials />
      <DownloadCTA />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
