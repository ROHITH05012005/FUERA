import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import ClientsPage from "./app/pages/ClientsPage.tsx";
import CaseStudiesPage from "./app/pages/CaseStudiesPage.tsx";
import CareersPage from "./app/pages/CareersPage.tsx";
import TeamPage from "./app/pages/TeamPage.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  </BrowserRouter>
);