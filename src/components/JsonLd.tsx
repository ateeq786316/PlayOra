import React from "react";

type JsonLdProps = {
  data: unknown;
};

/**
 * Renders JSON-LD structured data.
 * JSON-LD can be rendered in the body; search engines still parse it.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // React requires dangerouslySetInnerHTML for raw JSON.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
