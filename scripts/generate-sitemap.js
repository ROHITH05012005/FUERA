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

// Dynamically read services and blog slugs from source files
function getDynamicData() {
  const servicesPath = path.resolve(__dirname, "../src/app/data/servicesData.ts");
  const blogPath = path.resolve(__dirname, "../src/app/data/blogData.ts");

  let services = [];
  let blogSlugs = [];

  try {
    if (fs.existsSync(servicesPath)) {
      const content = fs.readFileSync(servicesPath, "utf8");
      // Match top-level keys in SERVICES_DATA record, e.g. "website-development": {
      const serviceMatches = [...content.matchAll(/^\s*["']([^"']+)["']\s*:\s*\{/gm)];
      services = serviceMatches.map(m => m[1]);
    }
  } catch (err) {
    console.error("[SITEMAP GENERATOR] Warning: Could not read services data:", err.message);
  }

  try {
    if (fs.existsSync(blogPath)) {
      const content = fs.readFileSync(blogPath, "utf8");
      // Match slug fields in BLOG_POSTS array, e.g. slug: "why-performance..."
      const blogMatches = [...content.matchAll(/^\s*slug:\s*["']([^"']+)["']/gm)];
      blogSlugs = blogMatches.map(m => m[1]);
    }
  } catch (err) {
    console.error("[SITEMAP GENERATOR] Warning: Could not read blog data:", err.message);
  }

  // Fallback defaults if parsing fails entirely to avoid empty sitemaps
  if (services.length === 0) {
    services = [
      "website-development",
      "social-media-marketing",
      "performance-marketing",
      "meta-ads",
      "google-ads",
      "google-seo",
      "branding",
      "review-scanner",
      "content-creation"
    ];
  }
  if (blogSlugs.length === 0) {
    blogSlugs = [
      "why-performance-marketing-beats-traditional-advertising",
      "essential-seo-strategies-for-2026",
      "why-your-business-needs-a-custom-website"
    ];
  }

  return { services, blogSlugs };
}

function generateXml(services, blogSlugs) {
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
  for (const service of services) {
    urlBlocks.push(`  <url>
    <loc>${BASE_URL}/services/${service}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Blog posts
  for (const slug of blogSlugs) {
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

const { services, blogSlugs } = getDynamicData();
const xmlContent = generateXml(services, blogSlugs);
const targetPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(targetPath, xmlContent, "utf8");
console.log(`[SITEMAP GENERATOR] Successfully generated dynamic sitemap with ${ROUTES.length + services.length + blogSlugs.length} URLs at public/sitemap.xml`);
