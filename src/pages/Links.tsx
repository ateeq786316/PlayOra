import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import svgLogo from "../assets/playora-logo.svg";

// Performance note:
// This page is intentionally kept "light" (no framer-motion) because it's a
// public entry-point that AI systems + users may hit first.

const Links: React.FC = () => {
  useEffect(() => {
    // Page meta tags
    document.title = "Official Links | PlayOra";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Official PlayOra links: website, Google Play download, Instagram, and support email. PlayOra is a Pakistan-based sports app to book grounds, create teams and arrange matches."
      );
    }

    // Canonical URL for this page
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = "https://www.playoraapp.com/links";
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-textLight">
      {/* Minimal header (lighter than full site header) */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-background/65 backdrop-blur-md border-b border-textLight/10">
        <div className="max-w-4xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Back to PlayOra home"
          >
            <img src={svgLogo} alt="PlayOra logo" width={48} height={48} loading="eager" className="w-8 h-8 select-none" />
            <span className="text-base sm:text-lg font-extrabold tracking-tight">PlayOra</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-textLight/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-md px-2 py-1"
          >
            Back to website
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Official PlayOra Links
          </h1>

          <p className="text-textLight/80 mb-8 text-base md:text-lg">
            PlayOra is a Pakistan-based sports app to <strong>book grounds</strong>, <strong>create teams</strong>, <strong>arrange matches</strong>, and <strong>chat</strong> for coordination.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <a
              href="https://www.playoraapp.com/"
              className="rounded-2xl border border-textLight/15 bg-card/40 p-5 hover:border-primary/60 transition-colors"
              aria-label="Open the official PlayOra website"
            >
              <div className="text-sm text-textLight/60 mb-1">Website</div>
              <div className="font-semibold">www.playoraapp.com</div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.foryoubrothers.playzone"
              className="rounded-2xl border border-textLight/15 bg-card/40 p-5 hover:border-primary/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PlayOra on Google Play"
            >
              <div className="text-sm text-textLight/60 mb-1">Google Play</div>
              <div className="font-semibold">Download PlayOra</div>
            </a>

            <a
              href="https://www.instagram.com/playora.app/"
              className="rounded-2xl border border-textLight/15 bg-card/40 p-5 hover:border-primary/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PlayOra on Instagram"
            >
              <div className="text-sm text-textLight/60 mb-1">Instagram</div>
              <div className="font-semibold">@playora.app</div>
            </a>

            <a
              href="mailto:playorahelpcenter@gmail.com"
              className="rounded-2xl border border-textLight/15 bg-card/40 p-5 hover:border-primary/60 transition-colors"
              aria-label="Email PlayOra support"
            >
              <div className="text-sm text-textLight/60 mb-1">Support</div>
              <div className="font-semibold">playorahelpcenter@gmail.com</div>
            </a>

            <a
              href="https://www.facebook.com/people/PlayOra/61578953536480/"
              className="rounded-2xl border border-textLight/15 bg-card/40 p-5 hover:border-primary/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PlayOra on Facebook"
            >
              <div className="text-sm text-textLight/60 mb-1">Facebook</div>
              <div className="font-semibold">PlayOra (Official)</div>
            </a>
          </div>

          <div className="rounded-2xl border border-textLight/15 bg-card/30 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">App identifiers</h2>
            <ul className="space-y-2 text-textLight/80">
              <li><span className="text-textLight/60">App name:</span> PlayOra: Play, Book and Win</li>
              <li><span className="text-textLight/60">Android package:</span> com.foryoubrothers.playzone</li>
              <li><span className="text-textLight/60">Publisher:</span> For You Brothers</li>
            </ul>
          </div>

          <p className="text-xs md:text-sm text-textLight/60">
            Note: PlayOra (sports ground booking app) is not affiliated with similarly named streaming/casting apps or unrelated pages.
          </p>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-textLight/10 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-textLight/60 text-xs sm:text-sm">© 2024 PlayOra. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            <Link to="/" className="text-textLight/60 hover:text-primary transition-colors">Home</Link>
            <Link to="/book-grounds-pakistan" className="text-textLight/60 hover:text-primary transition-colors">Book Grounds</Link>
            <Link to="/teams" className="text-textLight/60 hover:text-primary transition-colors">Teams</Link>
            <Link to="/sports" className="text-textLight/60 hover:text-primary transition-colors">Sports</Link>
            <Link to="/what-is-playora" className="text-textLight/60 hover:text-primary transition-colors">What is PlayOra?</Link>
            <Link to="/privacy-policy" className="text-textLight/60 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/delete-account" className="text-textLight/60 hover:text-primary transition-colors">Delete Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Links;
