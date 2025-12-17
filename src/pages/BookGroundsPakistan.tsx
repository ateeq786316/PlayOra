import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import JsonLd from "@/components/JsonLd";
import { getBookGroundsPakistanJsonLd } from "@/seo/schema";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

const CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sialkot",
  "Hyderabad",
  "Sukkur",
];

const BookGroundsPakistan: React.FC = () => {
  useEffect(() => {
    document.title = "Book Sports Grounds Across Pakistan | PlayOra";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PlayOra helps Pakistan sports communities book/request grounds, coordinate slots, and stay organized with in-app chat. Find grounds for cricket, football, futsal, badminton and more across Pakistan."
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = "https://www.playoraapp.com/book-grounds-pakistan";
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-textLight">
      <JsonLd data={getBookGroundsPakistanJsonLd()} />
      <Header />

      <main className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <BreadcrumbPage>Book Grounds</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Book sports grounds across Pakistan
          </h1>

          <p className="text-base sm:text-lg text-textLight/80 max-w-3xl mb-8">
            PlayOra helps you <strong>discover</strong> and <strong>book/request</strong> sports grounds, then coordinate details with <strong>in-app chat</strong>. It’s built for Pakistan sports communities and works across multiple cities and sports.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
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
          </div>

          <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">How booking works</h2>
            <ol className="space-y-2 text-textLight/80 list-decimal pl-5">
              <li>Find a ground and check details (photos, timing, location, price).</li>
              <li>Select your preferred slot and send a booking/request.</li>
              <li>Coordinate quickly via in-app chat and play your match.</li>
            </ol>
            <p className="text-xs text-textLight/60 mt-4">
              Note: availability depends on participating grounds and can expand over time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">Sports coverage</h2>
              <p className="text-textLight/80">
                PlayOra supports a wide range of sports and activities (e.g., cricket, football, futsal, badminton, basketball, tennis, volleyball and more). For the full list, see{" "}
                <Link className="text-primary hover:underline" to="/sports">
                  Sports Supported
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">Teams & matches</h2>
              <p className="text-textLight/80">
                Create teams, find opponents, arrange matches, and keep everything organized with chat and reviews. Learn more on the{" "}
                <Link className="text-primary hover:underline" to="/teams">
                  Teams
                </Link>
                {" "}page.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Pakistan-wide intent (cities)</h2>
            <p className="text-textLight/80 mb-4">
              People often search for terms like “ground booking app near me” or “sports ground booking in my city”. PlayOra is designed for Pakistan-wide coverage.
            </p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-textLight/10 bg-card/30 px-3 py-1 text-sm text-textLight/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">FAQs</h2>
            <div className="space-y-4 text-textLight/80">
              <div>
                <h3 className="font-semibold">Is PlayOra available across Pakistan for sports ground booking?</h3>
                <p>
                  PlayOra is a Pakistan-focused sports app designed to help people discover and book/request sports grounds. Availability depends on participating grounds and can expand over time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Which sports can I book or request grounds for?</h3>
                <p>
                  PlayOra supports a wide range of sports and activities such as cricket, football, futsal, badminton, basketball, tennis, volleyball, squash, swimming, hockey, martial arts, and more.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Where can I find official links?</h3>
                <p>
                  Use the official links page: <Link className="text-primary hover:underline" to="/links">playoraapp.com/links</Link>.
                </p>
              </div>
            </div>
            <p className="text-xs text-textLight/60 mt-6">
              Note: PlayOra (sports ground booking app) is not affiliated with similarly named streaming/casting apps or unrelated pages.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookGroundsPakistan;
