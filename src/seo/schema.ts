import { ENTITY } from "./entity";

type AnyRecord = Record<string, any>;

// Remove undefined / null / empty arrays so JSON-LD stays clean.
function prune(value: any): any {
  if (Array.isArray(value)) {
    const arr = value.map(prune).filter((v) => v !== undefined && v !== null);
    return arr.length ? arr : undefined;
  }
  if (value && typeof value === "object") {
    const out: AnyRecord = {};
    Object.keys(value).forEach((k) => {
      const v = prune(value[k]);
      if (v !== undefined && v !== null) out[k] = v;
    });
    return Object.keys(out).length ? out : undefined;
  }
  return value;
}

export function getBaseJsonLd() {
  const orgId = `${ENTITY.website}#org`;
  const websiteId = `${ENTITY.website}#website`;
  const appId = `${ENTITY.website}#app`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: ENTITY.brandName,
        url: ENTITY.website,
        email: ENTITY.supportEmail,
        sameAs: [ENTITY.playStoreUrl, ENTITY.instagramUrl, ENTITY.facebookUrl],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: ENTITY.website,
        name: ENTITY.brandName,
        publisher: { "@id": orgId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: ENTITY.appName,
        applicationCategory: "SportsApplication",
        operatingSystem: "Android",
        countriesSupported: ["PK"],
        url: ENTITY.website,
        downloadUrl: ENTITY.playStoreUrl,
        publisher: { "@id": orgId },
        identifier: [
          {
            "@type": "PropertyValue",
            name: "Android package",
            value: ENTITY.androidPackage,
          },
        ],
      },
    ],
  };

  return prune(data);
}

export function getLinksPageJsonLd() {
  const appId = `${ENTITY.website}#app`;
  const websiteId = `${ENTITY.website}#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ENTITY.linksPage}#webpage`,
        url: ENTITY.linksPage,
        name: "Official PlayOra Links",
        isPartOf: { "@id": websiteId },
        about: { "@id": appId },
        inLanguage: "en-PK",
      },
    ],
  };
  return prune(data);
}

export function getWhatIsPlayOraJsonLd() {
  const appId = `${ENTITY.website}#app`;
  const websiteId = `${ENTITY.website}#website`;

  const faq = [
    {
      "@type": "Question",
      name: "Is PlayOra a sports ground booking app in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PlayOra is built for Pakistan sports communities to help players and teams book/request grounds and organize matches.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book futsal grounds using PlayOra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PlayOra can be used to request/book futsal grounds in Pakistan depending on participating venues. You can also create teams, arrange matches, and chat in-app."
      },
    },
    {
      "@type": "Question",
      name: "Does PlayOra help me create teams and arrange matches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can create teams, coordinate matches, and use in-app chat to manage details.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find the official PlayOra links?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Use the official links page: ${ENTITY.linksPage}.`,
      },
    },
    {
      "@type": "Question",
      name: "How do I confirm I’m downloading the real PlayOra app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Verify the Android package name: ${ENTITY.androidPackage} and download from the official Google Play link.`,
      },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ENTITY.whatIsPage}#webpage`,
        url: ENTITY.whatIsPage,
        name: "What is PlayOra?",
        isPartOf: { "@id": websiteId },
        about: { "@id": appId },
        inLanguage: "en-PK",
      },
      {
        "@type": "FAQPage",
        "@id": `${ENTITY.whatIsPage}#faq`,
        url: ENTITY.whatIsPage,
        mainEntity: faq,
      },
    ],
  };

  return prune(data);
}

export function getBookGroundsPakistanJsonLd() {
  const appId = `${ENTITY.website}#app`;
  const websiteId = `${ENTITY.website}#website`;

  const faq = [
    {
      "@type": "Question",
      name: "Is PlayOra available across Pakistan for sports ground booking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PlayOra is a Pakistan-focused sports app designed to help people discover and book/request sports grounds. Availability depends on participating grounds and can expand over time.",
      },
    },
    {
      "@type": "Question",
      name: "Which sports can I book or request grounds for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PlayOra supports many sports and activities including Archery, Athletics, Badminton, Baseball, Basketball, Boxing, Cricket, Cycling, Football, Futsal, Golf, Gymnastics, Hockey, Horse Riding, Judo, Kabaddi, Karate, Martial Arts, Padel, Rugby, Shooting, Squash, Swimming, Table Tennis, Tennis, and Volleyball. You can request/book grounds for these sports depending on participating venues."
      },
    },
    {
      "@type": "Question",
      name: "Can I use PlayOra to book grounds in cities like Karachi, Lahore, and Islamabad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PlayOra is built for Pakistan cities and local sports communities. Coverage can include major cities such as Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and more (depending on participating grounds).",
      },
    },
    {
      "@type": "Question",
      name: "How do I confirm I’m downloading the official PlayOra app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Download from the official Google Play listing and verify the Android package name: ${ENTITY.androidPackage}.`,
      },
    },
    {
      "@type": "Question",
      name: "Where can I find official PlayOra links and contact?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Use the official links page: ${ENTITY.linksPage}.`,
      },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ENTITY.bookGroundsPakistanPage}#webpage`,
        url: ENTITY.bookGroundsPakistanPage,
        name: "Book Sports Grounds Across Pakistan",
        isPartOf: { "@id": websiteId },
        about: { "@id": appId },
        inLanguage: "en-PK",
      },
      {
        "@type": "FAQPage",
        "@id": `${ENTITY.bookGroundsPakistanPage}#faq`,
        url: ENTITY.bookGroundsPakistanPage,
        mainEntity: faq,
      },
    ],
  };

  return prune(data);
}

export function getTeamsPakistanJsonLd() {
  const appId = `${ENTITY.website}#app`;
  const websiteId = `${ENTITY.website}#website`;

  const faq = [
    {
      "@type": "Question",
      name: "Can I create a sports team on PlayOra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PlayOra lets you create teams, add members, and manage match coordination inside the app.",
      },
    },
    {
      "@type": "Question",
      name: "Does PlayOra help teams arrange matches and find opponents in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PlayOra is designed for Pakistan sports communities to help teams connect, coordinate, and arrange matches across different sports.",
      },
    },
    {
      "@type": "Question",
      name: "Is there in-app chat for teams and match coordination?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PlayOra includes in-app chat for team coordination and communicating with other teams.",
      },
    },
    {
      "@type": "Question",
      name: "Can users review grounds and matches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PlayOra lets players review grounds and match experiences so communities can make better decisions over time."
      },
    },
    {
      "@type": "Question",
      name: "Where can I find official PlayOra links?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Use the official links page: ${ENTITY.linksPage}.`,
      },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ENTITY.teamsPage}#webpage`,
        url: ENTITY.teamsPage,
        name: "Teams & Match Coordination in Pakistan",
        isPartOf: { "@id": websiteId },
        about: { "@id": appId },
        inLanguage: "en-PK",
      },
      {
        "@type": "FAQPage",
        "@id": `${ENTITY.teamsPage}#faq`,
        url: ENTITY.teamsPage,
        mainEntity: faq,
      },
    ],
  };

  return prune(data);
}

export function getSportsPakistanJsonLd() {
  const appId = `${ENTITY.website}#app`;
  const websiteId = `${ENTITY.website}#website`;

  const faq = [
    {
      "@type": "Question",
      name: "What sports and activities are supported on PlayOra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PlayOra supports many sports and activities including Archery, Athletics, Badminton, Baseball, Basketball, Boxing, Cricket, Cycling, Football, Futsal, Golf, Gymnastics, Hockey, Horse Riding, Judo, Kabaddi, Karate, Martial Arts, Padel, Rugby, Shooting, Squash, Swimming, Table Tennis, Tennis, and Volleyball. Explore the full list on the Sports page and then use PlayOra to request/book grounds and coordinate teams."
      },
    },
    {
      "@type": "Question",
      name: "Is PlayOra only for one city in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. PlayOra is built for Pakistan-wide sports communities. Coverage depends on participating grounds and can expand across cities over time.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I book grounds or coordinate teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Use ${ENTITY.bookGroundsPakistanPage} to book/request grounds and ${ENTITY.teamsPage} to create teams and arrange matches.`,
      },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ENTITY.sportsPage}#webpage`,
        url: ENTITY.sportsPage,
        name: "Sports Supported on PlayOra (Pakistan)",
        isPartOf: { "@id": websiteId },
        about: { "@id": appId },
        inLanguage: "en-PK",
      },
      {
        "@type": "FAQPage",
        "@id": `${ENTITY.sportsPage}#faq`,
        url: ENTITY.sportsPage,
        mainEntity: faq,
      },
    ],
  };

  return prune(data);
}
