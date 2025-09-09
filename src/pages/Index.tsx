import Header from "../components/Header";
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
