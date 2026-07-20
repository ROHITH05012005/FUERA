import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export function useSEO({ title, description, path }: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    // 3. Update Canonical Link
    const fullUrl = `https://www.fuera.in.net${path}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute("href", fullUrl);
    } else {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      linkCanonical.setAttribute("href", fullUrl);
      document.head.appendChild(linkCanonical);
    }

    // 4. Update Open Graph Tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        if (isProperty) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:url", fullUrl);
    updateMetaTag("og:site_name", "FUERA");
    updateMetaTag("application-name", "FUERA", false);
    updateMetaTag("apple-mobile-web-app-title", "FUERA", false);
    updateMetaTag("twitter:title", title, false);
    updateMetaTag("twitter:description", description, false);
  }, [title, description, path]);
}
