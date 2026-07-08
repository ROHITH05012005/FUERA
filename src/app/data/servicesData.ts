import {
  Code,
  Share2,
  Target,
  Megaphone,
  Search,
  Palette,
  ScanSearch,
  Video,
  Globe2,
  Cpu,
  Layers,
  Zap,
  TrendingUp,
  Award,
  Users,
  Shield,
  Clock,
  Sparkles,
  Smartphone,
  Eye,
  MessageSquare,
  ThumbsUp,
  Flame,
  CheckCircle
} from "lucide-react";

export interface ServiceBenefit {
  title: string;
  description: string;
  icon: any;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceInfo {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  benefits: ServiceBenefit[];
  process: ServiceProcessStep[];
  features: string[];
}

export const SERVICES_DATA: Record<string, ServiceInfo> = {
  "website-development": {
    id: "website-development",
    title: "Website Development",
    subtitle: "High-performance, custom-crafted web experiences engineered to convert traffic into loyal customers.",
    heroImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&h=700&fit=crop&auto=format",
    overview: "Your website is the digital storefront of your business. We don't just build websites; we design high-converting, lightning-fast digital solutions. Leveraging modern tech stacks (React, Vite, Next.js), we focus on responsive UI/UX design, sub-second load times, and clean semantic structures that search engines love.",
    benefits: [
      {
        title: "Custom UI/UX Design",
        description: "Tailored to your brand style guide, ensuring a completely unique aesthetic that stands out.",
        icon: Palette
      },
      {
        title: "Speed Optimization",
        description: "Sub-second load times using advanced caching, image optimization, and clean React code.",
        icon: Zap
      },
      {
        title: "SEO-Ready Architecture",
        description: "Built-in meta tags, structured JSON-LD schema, and semantic HTML for instant ranking potential.",
        icon: Search
      }
    ],
    process: [
      {
        step: "01",
        title: "Wireframing & UX Design",
        description: "We map out user flows and design high-fidelity interactive screens in Figma for your review."
      },
      {
        step: "02",
        title: "React/Next.js Engineering",
        description: "We write clean, semantic TypeScript code to turn static mockups into interactive web apps."
      },
      {
        step: "03",
        title: "Launch & Support",
        description: "We configure hosting on Vercel/Netlify, perform extensive browser testing, and go live."
      }
    ],
    features: [
      "Responsive layout for Mobile, Tablet & Desktop",
      "Interactive slider components & dynamic graphics",
      "Form validation with secure spam protection",
      "SSL Certificate setup & Domain mapping",
      "Integration with analytics tools (Google Analytics, Hotjar)"
    ]
  },
  "social-media-marketing": {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    subtitle: "Organically grow your brand and build a passionate digital community around your products.",
    heroImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&h=700&fit=crop&auto=format",
    overview: "Social media is where your customers discover, engage with, and review your brand. We design organic content strategies that position your company as an industry leader. By creating high-value Reels, interactive Stories, and cohesive grid feeds, we foster high engagement rates and turn followers into advocates.",
    benefits: [
      {
        title: "Cohesive Feed Aesthetic",
        description: "A customized visual theme for Instagram, LinkedIn, and Facebook that matches your brand guidelines.",
        icon: Sparkles
      },
      {
        title: "Reels & Video Strategy",
        description: "Short-form vertical video strategies tailored to capture algorithmic attention and trends.",
        icon: Video
      },
      {
        title: "Daily Channel Management",
        description: "Regular community engagement, replying to comments, and monitoring incoming direct messages.",
        icon: MessageSquare
      }
    ],
    process: [
      {
        step: "01",
        title: "Brand & Competitor Audit",
        description: "We analyze your current social media footprint and review what top competitors are doing successfully."
      },
      {
        step: "02",
        title: "Monthly Content Calendar",
        description: "We plan out all creatives, carousels, video scripts, and copy captions 30 days in advance."
      },
      {
        step: "03",
        title: "Analytics & Iteration",
        description: "We review monthly performance logs to see which formats drive the most reach and conversions."
      }
    ],
    features: [
      "Custom graphic templates designed in Figma",
      "Hashtag research & trend alignment",
      "Active story posting (polls, Q&A, behind-the-scenes)",
      "LinkedIn thought leadership posts for founders",
      "Comprehensive monthly performance review deck"
    ]
  },
  "performance-marketing": {
    id: "performance-marketing",
    title: "Performance Marketing",
    subtitle: "Direct-response advertising campaigns optimized for high return on ad spend (ROAS) and sales.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=700&fit=crop&auto=format",
    overview: "Stop guessing if your marketing spend works. Our performance marketing framework is data-first, tracking every single dollar spent from impression to final check-out. We run cross-channel campaigns using advanced pixel attribution, split-testing creatives, and laser-targeted demographic lists to maximize your conversions.",
    benefits: [
      {
        title: "ROAS-Driven Approach",
        description: "Every campaign is optimized for high return on ad spend and scaling what drives profit.",
        icon: TrendingUp
      },
      {
        title: "Continuous A/B Testing",
        description: "We split test headlines, copy, videos, and layouts to constantly improve conversion rates.",
        icon: Layers
      },
      {
        title: "Demographic Precision",
        description: "Advanced targeting to put your brand in front of ready-to-buy decision makers.",
        icon: Target
      }
    ],
    process: [
      {
        step: "01",
        title: "Funnel Strategy Formulation",
        description: "We design multi-stage campaigns targeting Cold, Warm, and Hot audiences separately."
      },
      {
        step: "02",
        title: "Creative & Copy Rollout",
        description: "We deploy multiple visual variants and copy angles to discover the best performer."
      },
      {
        step: "03",
        title: "Scale & Budget Shift",
        description: "We aggressively scale successful ad-sets while turning off underperforming ones."
      }
    ],
    features: [
      "Multi-channel tracking pixel integration",
      "Dynamic retargeting setup (DABA/DPA)",
      "Lead generation forms with CRM integrations",
      "LTV & CAC calculations and dashboarding",
      "Weekly performance logs and direct communications"
    ]
  },
  "meta-ads": {
    id: "meta-ads",
    title: "Meta Ads",
    subtitle: "Command attention across Instagram, Facebook, and Messenger with visual ads that sell.",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&h=700&fit=crop&auto=format",
    overview: "Meta's family of apps contains the world's most powerful audience mapping data. We help you capitalize on this through high-performing Instagram Reels ads, Facebook carousel placements, and conversion-optimized Messenger campaigns. Our team manages copy, creative, audience building, and scaling.",
    benefits: [
      {
        title: "Creative Concept Testing",
        description: "We test multiple creator-style videos and static graphics to beat ad fatigue.",
        icon: Video
      },
      {
        title: "Custom & Lookalike Audiences",
        description: "We build lookalikes of your past buyers and retarget landing page visitors.",
        icon: Users
      },
      {
        title: "CAPI & Pixel Optimization",
        description: "Conversion API setup bypasses cookie limits for accurate event attribution.",
        icon: Cpu
      }
    ],
    process: [
      {
        step: "01",
        title: "Asset Development",
        description: "We write conversion-focused copy and design mobile-first video/graphic creatives."
      },
      {
        step: "02",
        title: "Meta Campaign Launch",
        description: "We deploy CBO and ABO campaigns targeting carefully vetted interest groups."
      },
      {
        step: "03",
        title: "Frequency & Ad Fatigue Management",
        description: "We cycle in new creatives as older ones start showing diminishing ROAS."
      }
    ],
    features: [
      "Instagram Reels and Stories vertical placements",
      "High-intent lead generation forms",
      "Integration with Meta Commerce Catalog",
      "Dynamic creative optimization (DCO) setup",
      "Weekly analytics reporting"
    ]
  },
  "google-ads": {
    id: "google-ads",
    title: "Google Ads",
    subtitle: "Show up at the top of Search results right when high-intent buyers search for you.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=700&fit=crop&auto=format",
    overview: "Google Ads allows you to intercept users with high buying intent. Unlike social media discovery, Google users are actively searching for a solution. We build search campaigns, Performance Max setup, and call-only campaigns targeting high-intent commercial keywords to ensure you win the click.",
    benefits: [
      {
        title: "Intent-Based Bidding",
        description: "We target commercial terms like 'hire digital agency' rather than generic queries.",
        icon: Search
      },
      {
        title: "Negative Keyword Control",
        description: "Rigorous daily maintenance to filter out irrelevant searches and conserve budget.",
        icon: Shield
      },
      {
        title: "Ad Strength Optimization",
        description: "Creating premium headlines, descriptions, and site extensions for higher CTR.",
        icon: Zap
      }
    ],
    process: [
      {
        step: "01",
        title: "Search Term Research",
        description: "We gather search volumes, competition rates, and average CPC estimates for your keywords."
      },
      {
        step: "02",
        title: "Campaign Configuration",
        description: "We build structured ad groups, define match types, and set up conversion tracking."
      },
      {
        step: "03",
        title: "Bid Strategy Optimization",
        description: "Transitioning campaigns from Max Clicks to Max Conversions as data accumulates."
      }
    ],
    features: [
      "Search, Display & Performance Max (PMax) setups",
      "Local Map Pack ad campaigns for brick-and-mortars",
      "Google Tag Manager (GTM) event setups",
      "Sitelink, Callout, and Structured Snippet extensions",
      "Detailed search query reports"
    ]
  },
  "google-seo": {
    id: "google-seo",
    title: "Google SEO",
    subtitle: "Drive sustainable, organic traffic that compounds over time without active ad spend.",
    heroImage: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1400&h=700&fit=crop&auto=format",
    overview: "Search Engine Optimization is the ultimate digital asset. We help your business claim page-one rankings for keywords that drive actual commercial value. Our approach includes fixing technical crawl errors, optimizing your on-page copy, and earning links from authoritative websites.",
    benefits: [
      {
        title: "Compounding Traffic",
        description: "Organic rankings keep driving visitors 24/7 without paying per click.",
        icon: TrendingUp
      },
      {
        title: "Enhanced Trust & Authority",
        description: "Users inherently trust organic results more than paid advertisements.",
        icon: Award
      },
      {
        title: "Technical Site Health",
        description: "Optimized XML sitemaps, robots.txt, schema, and page speeds for crawl bots.",
        icon: Code
      }
    ],
    process: [
      {
        step: "01",
        title: "Technical Audit & Clean",
        description: "We run deep crawler diagnostics to fix indexing issues, 404s, and slow-loading assets."
      },
      {
        step: "02",
        title: "Keyword & Content Plan",
        description: "We map out high-value informational and commercial content hubs to write."
      },
      {
        step: "03",
        title: "Link Building Outreach",
        description: "We secure high-quality backlinks from trusted domains to build domain authority."
      }
    ],
    features: [
      "Semantic keyword research & content mapping",
      "On-page heading, image alt, and title optimization",
      "Google Search Console & Analytics setup",
      "Local SEO (Google Business Profile optimization)",
      "Technical Schema markup creation"
    ]
  },
  "branding": {
    id: "branding",
    title: "Branding",
    subtitle: "Build a premium, cohesive visual identity that commands authority and builds trust.",
    heroImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1400&h=700&fit=crop&auto=format",
    overview: "A brand is more than a logo; it is the feeling and identity associated with your business. We design comprehensive visual ecosystems including typography, custom logo marks, cohesive color palettes, and detailed brand identity books to ensure your presence remains premium across web, print, and social channels.",
    benefits: [
      {
        title: "Memorable Logo Identity",
        description: "A custom logo symbol and wordmark designed to be highly recognizable.",
        icon: Sparkles
      },
      {
        title: "Comprehensive Style Guides",
        description: "Rules for fonts, colors, imagery, and logo usage to ensure future consistency.",
        icon: Layers
      },
      {
        title: "Premium Visual Position",
        description: "Visual assets that position your brand as a premium and trusted choice.",
        icon: Eye
      }
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Identity Survey",
        description: "We align on target personas, design tastes, core values, and industry competitor styles."
      },
      {
        step: "02",
        title: "Concept Presentations",
        description: "We showcase multiple distinct creative logo concepts in real-world mockups."
      },
      {
        step: "03",
        title: "Collateral & Guidelines",
        description: "We export final vector files, build the brand book, and design business cards/stationery."
      }
    ],
    features: [
      "Custom vector logo packages (SVG, PNG, EPS)",
      "Brand Color Palette definition (HEX, RGB, CMYK)",
      "Typography selection and hierarchy guidance",
      "Social Media brand kit (profile assets, headers)",
      "Print-ready collateral design (business cards, letterheads)"
    ]
  },
  "review-scanner": {
    id: "review-scanner",
    title: "Review Scanner",
    subtitle: "Automate five-star review acquisition, monitor reputation, and boost local map rank.",
    heroImage: "https://images.unsplash.com/photo-1521791136368-1a8519007b51?w=1400&h=700&fit=crop&auto=format",
    overview: "92% of customers read online reviews before choosing a service. Our proprietary Review Scanner simplifies reputation building. We set up automated feedback request campaigns via SMS & WhatsApp, helping you secure five-star Google reviews while catching negative feedback internally before it hits the web.",
    benefits: [
      {
        title: "Automated Feedback Loops",
        description: "Send automatic review prompts via WhatsApp/SMS after a sale or booking.",
        icon: Clock
      },
      {
        title: "Local Map Rankings Boost",
        description: "Higher positive review volume signals Google to rank your map listing higher.",
        icon: MapPin
      },
      {
        title: "Reputation Shielding",
        description: "Private feedback channel directs negative reviews internally for prompt resolution.",
        icon: Shield
      }
    ],
    process: [
      {
        step: "01",
        title: "Platform Integration",
        description: "We link your CRM or sales system to trigger the Review Scanner automation."
      },
      {
        step: "02",
        title: "Template Copywriting",
        description: "We write highly converting, friendly request scripts for SMS and WhatsApp messages."
      },
      {
        step: "03",
        title: "Dashboard Setup",
        description: "You receive a live dashboard to track review acquisition rates and response logs."
      }
    ],
    features: [
      "WhatsApp & SMS API campaign templates",
      "Smart routing for positive vs negative feedback",
      "Google Business Profile API integration",
      "Real-time analytics rating dashboard",
      "Printable QR code review stands for in-store checkout"
    ]
  },
  "content-creation": {
    id: "content-creation",
    title: "Content Creation",
    subtitle: "High-quality, viral-ready video, photo, and copywriting that tells your brand story.",
    heroImage: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1400&h=700&fit=crop&auto=format",
    overview: "In today's digital landscape, content is currency. We produce premium short-form videos, custom illustrations, high-conversion ad creatives, and search-optimized copy that captures eyes and converts clicks. From scripts to production, editing, and optimization, we handle the full production line.",
    benefits: [
      {
        title: "Viral Hook Video Editing",
        description: "We edit short-form Reels & TikToks with engaging subtitles, effects, and pacing.",
        icon: Video
      },
      {
        title: "Direct-Response Copy",
        description: "Persuasive text copy for landing pages, emails, and social ads that motivates action.",
        icon: Flame
      },
      {
        title: "High-End Custom Assets",
        description: "Graphics and illustrations crafted by custom vector designers, not template editors.",
        icon: Sparkles
      }
    ],
    process: [
      {
        step: "01",
        title: "Creative Briefing & Scripts",
        description: "We map out visual storyboards, hooks, scripts, and production assets."
      },
      {
        step: "02",
        title: "Design & Post-Production",
        description: "We film/design the visual elements, refine color grading, and format dimensions."
      },
      {
        step: "03",
        title: "SEO Copywriting Sync",
        description: "Integrating high-ranking keywords into all social captions and blogs before publish."
      }
    ],
    features: [
      "Reels & YouTube Shorts scriptwriting and editing",
      "Custom vector illustrations & infographic design",
      "High-conversion email newsletter copywriting",
      "Ad creative design packs (Static, Carousel, Video)",
      "SEO blog and long-form article writing"
    ]
  }
};
