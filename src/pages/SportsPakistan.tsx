import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import JsonLd from "@/components/JsonLd";
import { getSportsPakistanJsonLd } from "@/seo/schema";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {

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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

const SPORTS = [
  "Archery",
  "Athletics",
  "Badminton",
  "Baseball",
  "Basketball",
  "Boxing",
  "Cricket",
  "Cycling",
  "Football",
  "Futsal",
  "Golf",
  "Gymnastics",
  "Hockey",
  "Horse Riding",
  "Judo",
  "Kabaddi",
  "Karate",
  "Martial Arts",
  "Padel",
  "Rugby",
  "Shooting",
  "Squash",
  "Swimming",
  "Table Tennis",
  "Tennis",
  "Volleyball",
];

const SportsPakistan: React.FC = () => {
  useEffect(() => {
    document.title = "Sports Supported on PlayOra (Pakistan) | PlayOra";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PlayOra supports many sports and activities in Pakistan. Explore supported sports, then use PlayOra to request/book grounds and coordinate teams and matches across major Pakistani cities."
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = "https://www.playoraapp.com/sports";
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-textLight">
      <JsonLd data={getSportsPakistanJsonLd()} />
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
                  <BreadcrumbPage>Sports</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Sports & activities supported on PlayOra</h1>

          <p className="text-base sm:text-lg text-textLight/80 max-w-3xl mb-8">
            PlayOra supports multiple sports and activities for Pakistan sports communities. You can <strong>book/request grounds</strong>, <strong>create teams</strong>, <strong>arrange matches</strong>, and <strong>chat</strong> for coordination.
          </p>
<div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 mb-10">
  <h2 className="text-xl font-semibold mb-2">Across Pakistan (major cities)</h2>
  <p className="text-textLight/80">
    PlayOra is built for Pakistan-wide sports communities. You can use the app to coordinate teams and request/book grounds in cities like:
  </p>
  <div className="flex flex-wrap gap-2 mt-4">
    {CITIES.map((c) => (
      <span key={c} className="text-sm rounded-full border border-textLight/10 px-3 py-1">
        {c}
      </span>
    ))}
  </div>
  <p className="text-xs text-textLight/60 mt-3">
    Coverage depends on participating grounds and can expand over time.
  </p>
</div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">Book & request grounds</h2>
              <p className="text-textLight/80">
                Want to find a ground and lock a slot? Start here: <Link className="text-primary hover:underline" to="/book-grounds-pakistan">Book Grounds</Link>.
              </p>
            </div>
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">Teams & matches</h2>
              <p className="text-textLight/80">
                Create teams, find opponents, arrange matches, and coordinate via chat: <Link className="text-primary hover:underline" to="/teams">Teams</Link>.
              </p>
            </div>
            <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6">
              <h2 className="text-xl font-semibold mb-2">Official links</h2>
              <p className="text-textLight/80">
                Verify the official app links and contact: <Link className="text-primary hover:underline" to="/links">playoraapp.com/links</Link>.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Full sports list</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {SPORTS.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-textLight/10 bg-card/30 px-3 py-2 text-sm text-textLight/80"
                >
                  {s}
                </div>
              ))}
            </div>
            <p className="text-xs text-textLight/60 mt-4">
              Note: availability depends on participating grounds and can expand over time.
            </p>
          </div>

          <div className="rounded-2xl border border-textLight/10 bg-card/20 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">FAQs</h2>
            <div className="space-y-4 text-textLight/80">
              <div>
                <h3 className="font-semibold">What sports and activities are supported on PlayOra?</h3>
                <p>
                  PlayOra supports many sports and activities including cricket, football, futsal, badminton, basketball, tennis, volleyball, table tennis, squash, swimming, hockey, martial arts, archery, athletics, and more.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Is PlayOra only for one city in Pakistan?</h3>
                <p>
                  No. PlayOra is built for Pakistan-wide sports communities. Coverage depends on participating grounds and can expand across cities over time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Where can I book grounds or coordinate teams?</h3>
                <p>
                  Use <Link className="text-primary hover:underline" to="/book-grounds-pakistan">Book Grounds</Link> to book/request grounds and <Link className="text-primary hover:underline" to="/teams">Teams</Link> to create teams and arrange matches.
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

export default SportsPakistan;