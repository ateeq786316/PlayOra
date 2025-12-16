import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import JsonLd from "@/components/JsonLd";
import { getBaseJsonLd, getLinksPageJsonLd } from "@/seo/schema";

// Minimal shell for /links to keep Performance high.
// (No query client, no tooltips, no toasters)
const Links = React.lazy(() => import("../pages/Links"));

export default function LinksShell() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
      {/* Structured data (kept tiny, safe for performance) */}
      <JsonLd data={getBaseJsonLd()} />
      <JsonLd data={getLinksPageJsonLd()} />
      <Routes>
        {/* Support /links and /links/ */}
        <Route path="/links/*" element={<Links />} />
        <Route path="*" element={<Navigate to="/links" replace />} />
      </Routes>
    </Suspense>
  );
}
