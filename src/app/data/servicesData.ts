export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  iconName: string;
  description: string;
  detailedOverview: string;
  benefits: { title: string; desc: string; iconName: string }[];
  process: { step: string; title: string; desc: string }[];
  features: string[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "website-development": {
    id: "website-development",
    title: "Website Development",
    subtitle: "Premium, fast-loading, mobile-first websites built for conversion and brand trust.",
    heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&h=700&fit=crop&auto=format",
    iconName: "Code",
    description: "We build modern, responsive, and blazing-fast websites tailored to your business goals. By utilizing the latest technologies, we ensure your site is secure, SEO-friendly, and optimized for maximum conversions.",
    detailedOverview: "Your website is the digital storefront of your business. We combine premium aesthetics, clean code, and user-centric design to create websites that don't just look great but also drive actions. Every site we build includes lifetime hosting on robust global CDN platforms like Netlify or Vercel, saving you from recurring monthly hosting bills.",
    benefits: [
      { title: "Mobile-First Design", desc: "Optimized for all screen sizes so customers can browse easily on any device.", iconName: "Smartphone" },
      { title: "Lightning Fast Speed", desc: "Built with Vite & React for sub-second loading times to reduce bounce rates.", iconName: "Zap" },
      { title: "Free Lifetime Hosting", desc: "No recurring hosting bills—deployed on enterprise-grade static CDNs.", iconName: "Globe" }
    ],
    process: [
      { step: "01", title: "Discovery & UX Strategy", desc: "We align on your goals, user personas, and map out the site architecture." },
      { step: "02", title: "Premium Visual Design", desc: "We design a high-fidelity visual prototype tailored to your brand identity." },
      { step: "03", title: "Blazing-Fast Development", desc: "Clean, performant React coding with SEO optimization baked in." },
      { step: "04", title: "Launch & Support", desc: "Comprehensive testing, deployment, and free ongoing maintenance setup." }
    ],
    features: [
      "Custom React/Vite development",
      "Free SSL certificate & security setup",
      "Interactive Enquiry forms",
      "WhatsApp & social media integrations",
      "Google Analytics & Tag Manager integration",
      "Life-time hosting support"
    ]
  },
  "social-media-marketing": {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    subtitle: "Grow your brand presence and turn followers into loyal customers.",
    heroImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&h=700&fit=crop&auto=format",
    iconName: "Share2",
    description: "Increase brand awareness and build an active online community across Instagram, Facebook, and LinkedIn. We create scroll-stopping content and run targeted strategies to drive consistent engagement.",
    detailedOverview: "Social media is where your customers hang out. Our team takes care of your complete social presence—from content strategy and graphic design to community management. We don't just post; we create a unique voice for your brand that builds trust and drives organic sales.",
    benefits: [
      { title: "Consistent Brand Voice", desc: "A unified, professional presence across all social media networks.", iconName: "Palette" },
      { title: "High Engagement", desc: "Content designed specifically to trigger likes, comments, and shares.", iconName: "Heart" },
      { title: "Targeted Audience Growth", desc: "Build a community of real, highly-interested potential buyers.", iconName: "Users" }
    ],
    process: [
      { step: "01", title: "Competitor & Audience Analysis", desc: "We study your market to find what formats resonate most with your audience." },
      { step: "02", title: "Content Calendar & Strategy", desc: "A weekly layout of reels, carousels, and single posts planned in advance." },
      { step: "03", title: "Creative Production", desc: "Our designers and copywriters craft stunning visuals and compelling captions." },
      { step: "04", title: "Publishing & Reporting", desc: "Posting at optimal times, engagement tracking, and monthly growth audits." }
    ],
    features: [
      "Instagram, Facebook, & LinkedIn management",
      "Custom brand aesthetic & templates",
      "Engagement and comment moderation",
      "Influencer collaboration outreach",
      "Monthly growth & engagement reports",
      "Hashtag and keyword optimization"
    ]
  },
  "performance-marketing": {
    id: "performance-marketing",
    title: "Performance Marketing",
    subtitle: "Data-driven campaigns engineered to maximize your return on ad spend.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=700&fit=crop&auto=format",
    iconName: "Target",
    description: "Scale your revenue with highly targeted, conversion-oriented campaigns. We track every single rupee spent, continuously optimizing for the lowest customer acquisition cost.",
    detailedOverview: "Performance marketing is about measurable business results. We look beyond vanity metrics like clicks and impressions to focus on what actually matters: leads, sales, and ROI. Our marketing experts build and manage full-funnel advertising strategies tailored to your exact budget.",
    benefits: [
      { title: "Measurable ROI", desc: "Track every single rupee of advertising spend against direct revenue.", iconName: "BarChart2" },
      { title: "Precise Targeting", desc: "Reach your ideal customers based on demographics, interests, and behavior.", iconName: "Crosshair" },
      { title: "Continuous Optimization", desc: "Daily bid management and A/B testing to maximize results.", iconName: "Zap" }
    ],
    process: [
      { step: "01", title: "Funnel Strategy", desc: "We map out your customer journey from initial hook to conversion." },
      { step: "02", title: "Tracking Setup", desc: "Configuring Pixels, APIs, and GA4 to ensure data is tracked correctly." },
      { step: "03", title: "Campaign Launch", desc: "Creating targeted ad sets and A/B testing multiple creatives." },
      { step: "04", title: "Scaling & Optimization", desc: "Reallocating budget to top performers to scale your lead generation." }
    ],
    features: [
      "Cross-channel advertising strategies",
      "Pixel, API, and tracking integration",
      "Audience retargeting funnels",
      "Creative and copy A/B testing",
      "ROAS (Return on Ad Spend) optimization",
      "Weekly analytics dashboards"
    ]
  },
  "meta-ads": {
    id: "meta-ads",
    title: "Meta Ads",
    subtitle: "Generate high-quality leads on Facebook & Instagram at the lowest cost.",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&h=700&fit=crop&auto=format",
    iconName: "Megaphone",
    description: "Harness the power of Meta's advanced algorithm. We design ad copy, creatives, and landing pages that grab attention and turn social media scrolling into high-intent leads.",
    detailedOverview: "Meta Ads are perfect for building desire and collecting leads directly. We configure custom Facebook and Instagram lead forms, dynamic product ads, and message-destination campaigns that connect you instantly with prospects via WhatsApp or Messenger.",
    benefits: [
      { title: "Attention-Grabbing Creatives", desc: "Video and static ads engineered to stop users from scrolling.", iconName: "Eye" },
      { title: "Direct Lead Gen", desc: "In-app lead forms that pre-fill contact details for maximum conversion.", iconName: "FileText" },
      { title: "Custom Retargeting", desc: "Re-engage users who visited your website or profile but didn't buy.", iconName: "RotateCcw" }
    ],
    process: [
      { step: "01", title: "Audience Profiling", desc: "We define custom and lookalike audiences based on your best buyers." },
      { step: "02", title: "Ad Copy & Design", desc: "We craft hook-heavy copy and scroll-stopping visual assets." },
      { step: "03", title: "Campaign Architecture", desc: "Building clean TOFU, MOFU, and BOFU campaigns inside Ads Manager." },
      { step: "04", title: "Optimization", desc: "Adjusting placements, budgets, and bid caps to maintain low CPL." }
    ],
    features: [
      "Facebook & Instagram Ads Manager setup",
      "Custom CBO and ABO structure",
      "Lead generation & catalog ads",
      "Creative direction & copy writing",
      "Lookalike and Custom Audience creation",
      "Meta Pixel & Conversion API setup"
    ]
  },
  "google-ads": {
    id: "google-ads",
    title: "Google Ads",
    subtitle: "Put your business in front of buyers at the exact moment they search.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=700&fit=crop&auto=format",
    iconName: "BarChart2",
    description: "Capture high-intent searches. We create Search, Display, and Performance Max campaigns that place your brand at the very top of Google results when users are ready to act.",
    detailedOverview: "Unlike social media, users on Google are actively looking for solutions. Google Ads capture this high intent. We manage search keywords, build negative keyword lists, write high-converting ad copy, and optimize bidding strategies to ensure you only pay for highly qualified clicks.",
    benefits: [
      { title: "High-Intent Traffic", desc: "Reach customers who are actively searching for your service right now.", iconName: "Search" },
      { title: "Top-of-Page Placement", desc: "Beat your competitors to the top spot on search result pages.", iconName: "ArrowUp" },
      { title: "Pay-Per-Click", desc: "Maximize your budget—only pay when someone actually visits your site.", iconName: "DollarSign" }
    ],
    process: [
      { step: "01", title: "Keyword Research", desc: "Identifying high-volume, low-cost search terms with strong buying intent." },
      { step: "02", title: "Ad Copy & Extensions", desc: "Drafting headlines and description lines that drive high CTR." },
      { step: "03", title: "Smart Bidding Setup", desc: "Configuring Target CPA or Maximize Conversions to bid efficiently." },
      { step: "04", title: "Negative Match Optimization", desc: "Adding search term exclusions to prevent wasted ad budget." }
    ],
    features: [
      "Search, Display, & YouTube campaigns",
      "In-depth keyword bidding & research",
      "Negative keyword lists management",
      "Ad extension optimizations",
      "Smart Bidding (tCPA, tROAS) management",
      "Conversion tracking configuration"
    ]
  },
  "google-seo": {
    id: "google-seo",
    title: "Google SEO",
    subtitle: "Rank on the first page of Google and drive consistent free traffic.",
    heroImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&h=700&fit=crop&auto=format",
    iconName: "Search",
    description: "Build long-term organic traffic. We optimize your website's content, technical structure, and Google Business Profile to rank higher in local and global searches.",
    detailedOverview: "Paid ads stop when the budget runs out, but SEO delivers free, compounding traffic forever. We focus on search engine optimization that matters: auditing technical issues, optimizing landing page content, building local citations, and optimizing your Google Business Profile to make you stand out locally.",
    benefits: [
      { title: "Free Organic Traffic", desc: "Get consistent leads and visitors without paying for clicks.", iconName: "TrendingUp" },
      { title: "Local Map Pack Ranking", desc: "Dominating local search results so nearby customers find you first.", iconName: "MapPin" },
      { title: "Long-Term Authority", desc: "Establish your brand as an industry leader in Google's eyes.", iconName: "Award" }
    ],
    process: [
      { step: "01", title: "Technical SEO Audit", desc: "Fixing site speed, broken links, sitemaps, and mobile issues." },
      { step: "02", title: "Keyword Mapping", desc: "Mapping out keywords to optimize title tags, headings, and copy." },
      { step: "03", title: "Local Map Optimization", desc: "Optimizing your Google Business Profile (GBP) for local searches." },
      { step: "04", title: "Authority & Backlinks", desc: "Building profile links and listings to grow domain trust." }
    ],
    features: [
      "On-page content optimization",
      "Google Business Profile (GBP) optimization",
      "Technical SEO & Core Web Vitals audit",
      "XML Sitemap and Robot.txt setup",
      "Google Search Console integration",
      "Monthly keyword ranking reports"
    ]
  },
  "branding": {
    id: "branding",
    title: "Branding & Identity",
    subtitle: "Craft a memorable brand identity that builds credibility and trust.",
    heroImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1400&h=700&fit=crop&auto=format",
    iconName: "Palette",
    description: "Stand out from the crowd. We design unique logos, curated color palettes, modern typography, and brand identity guidelines that tell your company's story.",
    detailedOverview: "A brand is more than just a logo—it's how your business makes people feel. We translate your company's values, mission, and personality into cohesive visual assets. From social media templates to business cards and digital guidelines, we make your brand look premium and professional.",
    benefits: [
      { title: "Unique Visual Identity", desc: "Stand out with a look that is completely customized and memorable.", iconName: "Sparkles" },
      { title: "Brand Consistency", desc: "Color palettes and guidelines that make your business look unified.", iconName: "Grid" },
      { title: "Instant Credibility", desc: "A premium design that immediately gains customer trust.", iconName: "ShieldCheck" }
    ],
    process: [
      { step: "01", title: "Brand Archetype & Discovery", desc: "Understanding your mission, audience, and defining the brand voice." },
      { step: "02", title: "Logo Concepts", desc: "Drafting multiple logo iterations from sketches to clean vector graphics." },
      { step: "03", title: "Color & Typography Setup", desc: "Curating typography pairings and harmonious color systems." },
      { step: "04", title: "Brand Book & Guidelines", desc: "Compiling guidelines explaining font sizes, logo rules, and layouts." }
    ],
    features: [
      "Vector logo design (.AI, .PNG, .SVG)",
      "Typography styling and font pairings",
      "Harmonious brand color palettes",
      "Social media post & story guidelines",
      "Digital business card layouts",
      "Brand style guide documentation"
    ]
  },
  "review-scanner": {
    id: "review-scanner",
    title: "Review Scanner",
    subtitle: "Protect your online reputation and boost organic sales with reviews.",
    heroImage: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1400&h=700&fit=crop&auto=format",
    iconName: "ScanSearch",
    description: "Monitor and manage customer feedback across Google and social platforms. We help you collect positive reviews, scan for negative feedback, and maintain a stellar rating.",
    detailedOverview: "Over 90% of customers check reviews before making a purchase. A single bad review can hurt conversions. Our Review Scanner monitors your online reputation in real-time, helping you respond to customer feedback quickly, address complaints, and collect five-star reviews.",
    benefits: [
      { title: "Reputation Protection", desc: "Get notified immediately when reviews are posted to handle complaints fast.", iconName: "Shield" },
      { title: "Boost Google Rankings", desc: "More positive reviews signal Google to rank your local profile higher.", iconName: "ArrowUpRight" },
      { title: "Increased Sales Conversion", desc: "Use 5-star reviews as testimonials to build immediate trust.", iconName: "ThumbsUp" }
    ],
    process: [
      { step: "01", title: "Setup Review Scanning", desc: "Linking your Google Profile, Facebook, and directory reviews." },
      { step: "02", title: "Review Campaigns", desc: "Deploying automated SMS/WhatsApp flows to request client reviews." },
      { step: "03", title: "Monitoring & Alerts", desc: "Receiving real-time alerts for any feedback that needs attention." },
      { step: "04", title: "Response Strategy", desc: "Providing guidelines and responding to reviews to protect your score." }
    ],
    features: [
      "Multi-platform review monitoring",
      "SMS & WhatsApp review request flows",
      "Negative review alert systems",
      "Google Business Review widgets",
      "Automated response templates",
      "Monthly reputation health reports"
    ]
  },
  "content-creation": {
    id: "content-creation",
    title: "Content Creation",
    subtitle: "Scroll-stopping reels, graphics, and copies engineered for conversions.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=700&fit=crop&auto=format",
    iconName: "FileText",
    description: "We craft ad creatives, reels, copywriting, and custom graphics that tell your brand's story and capture attention in busy social feeds.",
    detailedOverview: "In a digital-first world, content is king. We combine high-quality scriptwriting, expert video editing, and modern graphic design to create content that doesn't just look pretty but actually converts viewers into leads.",
    benefits: [
      { title: "Scroll-Stopping Hooks", desc: "Reels and ad creatives designed to hook viewers in the first 3 seconds.", iconName: "Zap" },
      { title: "Professional Video Editing", desc: "Dynamic pacing, captions, and visual transitions that keep attention.", iconName: "Video" },
      { title: "Copywriting That Converts", desc: "Persuasive captions and ad script copies that trigger actions.", iconName: "PenTool" }
    ],
    process: [
      { step: "01", title: "Ideation & Scriptwriting", desc: "Brainstorming hooks, video angles, and writing scripts in detail." },
      { step: "02", title: "Visual & Asset Creation", desc: "Filming support guidelines or creating graphic assets." },
      { step: "03", title: "Professional Post-Editing", desc: "Applying modern transitions, sounds, and active captions." },
      { step: "04", title: "Delivery & Testing", desc: "A/B testing copy formats to maximize social engagement." }
    ],
    features: [
      "Instagram Reels & TikTok edit layouts",
      "Conversion copywriting for ad campaigns",
      "Professional graphic post designs",
      "Video script writing & hooks ideas",
      "Custom brand typography assets",
      "Multi-format export optimized for web"
    ]
  }
};
