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
        text: "PlayOra supports ground discovery and booking/request flows for sports like futsal. Availability depends on participating grounds in your area.",
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
