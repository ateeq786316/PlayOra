import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import JsonLd from "@/components/JsonLd";
import { getTeamsPakistanJsonLd } from "@/seo/schema";
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
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sialkot",
  "Hyderabad",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Sukkur",
];

const TeamsPakistan: React.FC = () => {
  useEffect(() => {
    document.title = "Create Teams & Arrange Matches in Pakistan | PlayOra";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PlayOra helps you create teams, find opponents, arrange matches, and chat across Pakistan — including cities like Karachi, Lahore, Islamabad and more. Coordinate games, reviews, and team communication in one app."
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = "https://www.playoraapp.com/teams";
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-textLight">
      <JsonLd data={getTeamsPakistanJsonLd()} />
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
                  <BreadcrumbPage>Teams</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Create teams & arrange matches across Pakistan
          </h1>

          <p className="text-base sm:text-lg text-textLight/80 max-w-3xl mb-8">
            PlayOra helps sports communities in Pakistan <strong>create teams</strong>, <strong>find opponents</strong>, <strong>coordinate matches</strong>, and <strong>chat</strong> inside the app — so everything stays organized.
          </p>
<div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 mb-10">
  <h2 className="text-xl font-semibold mb-2">Find teams across Pakistan</h2>
  <p className="text-textLight/80">
    PlayOra is designed for Pakistan-wide sports communities. Discover teams, coordinate matches, and chat with opponents in cities like:
  </p>
  <div className="flex flex-wrap gap-2 mt-4">
    {CITIES.map((c) => (
      <span key={c} className="text-sm rounded-full border border-textLight/10 px-3 py-1">
        {c}
      </span>
    ))}
  </div>
  <p className="text-xs text-textLight/60 mt-3">
    Availability depends on participating teams and can expand over time.
  </p>
</div>


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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">Team creation</h2>
              <ul className="space-y-2 text-textLight/80 list-disc pl-5">
                <li>Create your team and add members.</li>
                <li>Keep team details and communication in one place.</li>
                <li>Manage your squad and prepare for match days.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">Match coordination</h2>
              <ul className="space-y-2 text-textLight/80 list-disc pl-5">
                <li>Find and connect with other teams.</li>
                <li>Arrange matches and coordinate time + location via chat.</li>
                <li>Book/request grounds when needed: <Link className="text-primary hover:underline" to="/book-grounds-pakistan">Book Grounds</Link>.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Community trust: reviews</h2>
            <p className="text-textLight/80">
              PlayOra supports review flows for <strong>grounds</strong> and <strong>match experiences</strong> so communities can make better decisions over time.
            </p>
          </div>

          <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">FAQs</h2>
            <div className="space-y-4 text-textLight/80">
              <div>
                <h3 className="font-semibold">Can I create a sports team on PlayOra?</h3>
                <p>Yes. PlayOra lets you create teams, add members, and manage match coordination inside the app.</p>
              </div>
              <div>
                <h3 className="font-semibold">Is there in-app chat for teams and match coordination?</h3>
                <p>Yes. PlayOra includes in-app chat for team coordination and communicating with other teams.</p>
              </div>
              <div>
                <h3 className="font-semibold">Where can I see the sports supported?</h3>
                <p>
                  View the full list here: <Link className="text-primary hover:underline" to="/sports">playoraapp.com/sports</Link>.
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

export default TeamsPakistan;