import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";

// Lazy load all OTHER pages for better performance, but eager load App (Homepage) for LCP/CLS
const ClientsPage = React.lazy(() => import("./app/pages/ClientsPage.tsx"));
const CaseStudiesPage = React.lazy(() => import("./app/pages/CaseStudiesPage.tsx"));
const CareersPage = React.lazy(() => import("./app/pages/CareersPage.tsx"));
const ServicePage = React.lazy(() => import("./app/pages/ServicePage.tsx"));
const ContactPage = React.lazy(() => import("./app/pages/ContactPage.tsx"));
const LeadershipPage = React.lazy(() => import("./app/pages/LeadershipPage.tsx"));
const PrivacyPage = React.lazy(() => import("./app/pages/PrivacyPage.tsx"));
const TermsPage = React.lazy(() => import("./app/pages/TermsPage.tsx"));
const BlogListPage = React.lazy(() => import("./app/pages/BlogListPage.tsx"));
const BlogPostPage = React.lazy(() => import("./app/pages/BlogPostPage.tsx"));
const SitemapPage = React.lazy(() => import("./app/pages/SitemapPage.tsx"));

// Initialize dark/light mode before React render
const initialTheme = localStorage.getItem("theme") || "dark";
if (initialTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/about" element={<LeadershipPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/services/:serviceId" element={<ServicePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);