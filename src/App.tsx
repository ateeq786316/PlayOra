import React, { Suspense } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

// Split the app into two shells:
// - LinksShell: minimal JS for /links (public, AI-friendly entry)
// - MainShell: the rest of the site (includes toasts/tooltips/query client, etc.)
// This improves /links performance WITHOUT changing URLs, SEO tags, or accessibility.
const MainShell = React.lazy(() => import("./shells/MainShell"));
const LinksShell = React.lazy(() => import("./shells/LinksShell"));

function ShellSwitch() {
  const { pathname } = useLocation();
  const isLinks = pathname === "/links" || pathname.startsWith("/links/");
  return isLinks ? <LinksShell /> : <MainShell />;
}

const App = () => {
  React.useEffect(() => {
    // Keep your existing dark theme behavior
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
        <ShellSwitch />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
