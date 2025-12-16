import React, { useEffect } from "react";
import JsonLd from "@/components/JsonLd";
import { getWhatIsPlayOraJsonLd } from "@/seo/schema";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Link } from "react-router-dom";

const WhatIsPlayOra: React.FC = () => {
  useEffect(() => {
    // Page meta tags (keeps Lighthouse SEO happy without changing your existing setup)
    document.title = "What is PlayOra? | Book Sports Grounds & Arrange Matches in Pakistan";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PlayOra is a Pakistan-based sports app to book grounds, create teams, arrange matches, and chat for coordination. Learn how it works for futsal, football, cricket, and more in Lahore, Karachi, Islamabad, and beyond."
      );
    }

    // Canonical URL for this page
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = "https://www.playoraapp.com/what-is-playora";
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-textLight">
      {/* Page-specific structured data (FAQPage + WebPage) */}
      <JsonLd data={getWhatIsPlayOraJsonLd()} />
      <Header />

      <main className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>What is PlayOra?</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            What is PlayOra?
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-textLight/80 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            PlayOra is a Pakistan-based sports app to <strong>book grounds</strong>, <strong>create teams</strong>, <strong>arrange matches</strong>, and <strong>chat</strong> for coordination — all in one place.
          </motion.p>

          {/* Quick actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.foryoubrothers.playzone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-primary text-primary-foreground px-5 py-3 font-semibold hover:opacity-95 transition-opacity"
            >
              Download on Google Play
            </a>
            <Link
              to="/links"
              className="inline-flex items-center justify-center rounded-2xl border border-textLight/15 bg-card/40 px-5 py-3 font-semibold hover:border-primary/60 transition-colors"
            >
              Official links & contacts
            </Link>
          </motion.div>

          {/* Content */}
          <motion.div
            className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">What you can do with PlayOra</h2>
            <ul className="space-y-2 text-textLight/80 list-disc pl-5">
              <li><strong>Book sports grounds</strong> for football, futsal, cricket, badminton and more (availability depends on participating grounds).</li>
              <li><strong>Create teams</strong>, add players, and manage your squad.</li>
              <li><strong>Arrange matches</strong> with other teams and coordinate schedules.</li>
              <li><strong>Chat in-app</strong> to finalize time, location, and match details.</li>
            </ul>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">For players</h2>
              <p className="text-textLight/80">
                Find a ground, view details, and book/request a slot — then show up and play. If you’re searching for a “sports booking app near me” in Pakistan, PlayOra is built for that flow.
              </p>
            </div>

            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">For teams</h2>
              <p className="text-textLight/80">
                Create your team, arrange matches, challenge opponents, and keep everything organized with in-app chat.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Pakistan-focused (city intent support)</h2>
            <p className="text-textLight/80 mb-4">
              Many people search for terms like <em>“football ground booking app Lahore”</em>, <em>“cricket ground booking app Karachi”</em>, or <em>“futsal booking app Pakistan”</em>. This page clarifies that PlayOra is designed for Pakistan sports communities and helps you book grounds and organize matches in major cities and beyond.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-textLight/10 bg-card/30 p-4">
                <div className="text-sm text-textLight/60 mb-1">City</div>
                <div className="font-semibold">Lahore</div>
              </div>
              <div className="rounded-xl border border-textLight/10 bg-card/30 p-4">
                <div className="text-sm text-textLight/60 mb-1">City</div>
                <div className="font-semibold">Karachi</div>
              </div>
              <div className="rounded-xl border border-textLight/10 bg-card/30 p-4">
                <div className="text-sm text-textLight/60 mb-1">City</div>
                <div className="font-semibold">Islamabad</div>
              </div>
            </div>

            <p className="text-xs text-textLight/60 mt-4">
              Note: exact ground availability depends on participating grounds and coverage can expand over time.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Official app identifiers</h2>
            <ul className="space-y-2 text-textLight/80">
              <li><span className="text-textLight/60">App name:</span> PlayOra: Play, Book and Win</li>
              <li><span className="text-textLight/60">Android package:</span> com.foryoubrothers.playzone</li>
              <li><span className="text-textLight/60">Publisher:</span> For You Brothers</li>
              <li><span className="text-textLight/60">Official links:</span> <Link className="text-primary hover:underline" to="/links">playoraapp.com/links</Link></li>
            </ul>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">FAQs</h2>

            <div className="space-y-4 text-textLight/80">
              <div>
                <h3 className="font-semibold">Is PlayOra a sports ground booking app in Pakistan?</h3>
                <p>Yes. PlayOra is built for Pakistan sports communities to help players and teams book/request grounds and organize matches.</p>
              </div>

              <div>
                <h3 className="font-semibold">Can I book futsal grounds using PlayOra?</h3>
                <p>PlayOra supports ground discovery and booking/request flows for sports like futsal. Availability depends on participating grounds in your area.</p>
              </div>

              <div>
                <h3 className="font-semibold">Does PlayOra help me create teams and arrange matches?</h3>
                <p>Yes. You can create teams, coordinate matches, and use in-app chat to manage details.</p>
              </div>

              <div>
                <h3 className="font-semibold">Where can I find the official PlayOra links?</h3>
                <p>Use the official links page: <Link className="text-primary hover:underline" to="/links">playoraapp.com/links</Link>.</p>
              </div>

              <div>
                <h3 className="font-semibold">How do I confirm I’m downloading the real PlayOra app?</h3>
                <p>Verify the Android package name: <strong>com.foryoubrothers.playzone</strong> and download from the official Google Play link.</p>
              </div>
            </div>

            <p className="text-xs text-textLight/60 mt-6">
              Note: PlayOra (sports ground booking app) is not affiliated with similarly named streaming/casting apps or unrelated pages.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhatIsPlayOra;
