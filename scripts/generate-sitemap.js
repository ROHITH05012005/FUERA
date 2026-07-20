import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.fuera.in.net";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/leadership", priority: "0.6", changefreq: "monthly" },
  { path: "/careers", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/clients", priority: "0.7", changefreq: "monthly" },
  { path: "/case-studies", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/sitemap", priority: "0.6", changefreq: "monthly" },
];

const SERVICES = [
  "website-development",
  "social-media-marketing",
  "performance-marketing",
  "meta-ads",
  "google-ads",
  "google-seo",
  "branding",
  "review-scanner",
  "content-creation",
];

const BLOG_SLUGS = [
  "why-performance-marketing-beats-traditional-advertising",
  "essential-seo-strategies-for-2026",
  "why-your-business-needs-a-custom-website",
];

function generateXml() {
  const urlBlocks = [];

  // Static routes
  for (const route of ROUTES) {
    const loc = route.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
    urlBlocks.push(`  <url>
    <loc>${loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
  }

  // Services
  for (const service of SERVICES) {
    urlBlocks.push(`  <url>
    <loc>${BASE_URL}/services/${service}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Blog posts
  for (const slug of BLOG_SLUGS) {
    urlBlocks.push(`  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join("\n")}
</urlset>
`;
}

const xmlContent = generateXml();
const targetPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(targetPath, xmlContent, "utf8");
console.log(`[SITEMAP GENERATOR] Successfully generated sitemap with ${ROUTES.length + SERVICES.length + BLOG_SLUGS.length} URLs at public/sitemap.xml`);
