import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import ClientsPage from "./app/pages/ClientsPage.tsx";
import CaseStudiesPage from "./app/pages/CaseStudiesPage.tsx";
import CareersPage from "./app/pages/CareersPage.tsx";
import ServicePage from "./app/pages/ServicePage.tsx";
import ContactPage from "./app/pages/ContactPage.tsx";
import LeadershipPage from "./app/pages/LeadershipPage.tsx";
import "./styles/index.css";

// Initialize dark/light mode before React render
const initialTheme = localStorage.getItem("theme") || "dark";
if (initialTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/leadership" element={<LeadershipPage />} />
      <Route path="/about" element={<LeadershipPage />} />
      <Route path="/services/:serviceId" element={<ServicePage />} />
    </Routes>
  </BrowserRouter>
);