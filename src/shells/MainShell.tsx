import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import JsonLd from "@/components/JsonLd";
import { getBaseJsonLd } from "@/seo/schema";
import ProtectedRoute from "../components/ProtectedRoute";

// Route-level code splitting (keeps initial JS smaller)
const Index = React.lazy(() => import("../pages/Index"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy"));
const DeleteAccount = React.lazy(() => import("../pages/DeleteAccount"));
const Login = React.lazy(() => import("../pages/Login"));
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboard"));
const WhatIsPlayOra = React.lazy(() => import("../pages/WhatIsPlayOra"));
const TestConnection = React.lazy(() => import("../pages/TestConnection"));

const queryClient = new QueryClient();

export default function MainShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global structured data for the PlayOra entity */}
        <JsonLd data={getBaseJsonLd()} />
        <Toaster />
        <Sonner />
        <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test-connection" element={<TestConnection />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
                        <Route path="/what-is-playora" element={<WhatIsPlayOra />} />

{/* Keep catch-all last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
