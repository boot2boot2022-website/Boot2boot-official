export const SHAPE_SERVICES_DATA = [
  {
    id: "design",
    giantTitle: "Design",
    heading: "Brand designers and digital creatives in-house crafting visuals to match your brand values.",
    description: "From comprehensive visual identity systems to high-converting user interfaces, we turn ambitious brand visions into unforgettable digital experiences.",
    services: [
      {
        num: "01",
        id: "brand-identity",
        slug: "brand-identity",
        name: "Brand Identity",
        tagline: "Logos, Visual Systems & Brand Guidelines",
        summary: "We design enduring brand identities, memorable typography systems, and cohesive design languages that set your business apart in competitive markets.",
        heroDescription: "A brand is far more than just a logo—it is the emotional and visual foundation of your entire business. We craft iconic visual identities that resonate with your target audience, inspire internal teams, and establish unmistakable authority across all digital and physical touchpoints.",
        metrics: [
          { label: "Brand Recognition", value: "3.2x" },
          { label: "Assets Delivered", value: "50+ Files" },
          { label: "Brand Guideline", value: "40+ Pages" }
        ],
        deliverables: [
          "Primary, Secondary & Monogram Logo Suites",
          "Comprehensive Brand Guidelines (PDF & Web)",
          "Color Theory & Accessible Typography Hierarchies",
          "Social Media Kit, Presentation Decks & Business Cards",
          "Brand Voice, Positioning & Tone Framework"
        ],
        process: [
          { step: "01", title: "Discovery & Archetype", desc: "Uncovering your brand values, target demographic psychology, and competitive positioning." },
          { step: "02", title: "Visual Exploration", desc: "Developing 3 distinct creative directions, moodboards, and exploratory design territories." },
          { step: "03", title: "Refinement & Systems", desc: "Polishing the selected identity, defining typography pairings, and testing contrast ratios." },
          { step: "04", title: "Asset Delivery & Guidelines", desc: "Exporting vector assets for web/print and compiling a comprehensive brand book." }
        ],
        faqs: [
          { q: "What files and formats will I receive?", a: "You will receive full vector master files (.AI, .EPS, .SVG) along with high-res raster exports (.PNG with transparency, .JPG, WebP) tailored for web, social, merchandise, and print." },
          { q: "How long does the branding process take?", a: "A full brand identity system typically takes between 3 to 5 weeks from initial kickoff to final guideline delivery." }
        ],
        tools: ["Figma", "Adobe Illustrator", "Photoshop", "InDesign"],
        timeline: "3 - 5 Weeks"
      },
      {
        num: "02",
        id: "custom-website-design",
        slug: "custom-website-design",
        name: "Custom Website Design",
        tagline: "Bespoke Art Direction & Immersive Layouts",
        summary: "Crafting visually striking, human-centered website layouts designed to captivate your audience and communicate your unique value proposition.",
        heroDescription: "We craft custom, conversion-driven website designs that balance cinematic visual storytelling with effortless usability. Every page template is custom designed from scratch in Figma with custom design tokens, micro-animations, and mobile-first responsiveness.",
        metrics: [
          { label: "Avg Session Duration", value: "+65%" },
          { label: "Bounce Rate", value: "-40%" },
          { label: "Conversion Lift", value: "+38%" }
        ],
        deliverables: [
          "Bespoke High-Fidelity Interactive UI Prototypes",
          "Responsive Layouts for Mobile, Tablet, Laptop & 4K",
          "Interactive Micro-Animations & WebGL Motion Guides",
          "Design Tokens & Reusable Component Libraries",
          "Comprehensive Developer Handoff Specifications"
        ],
        process: [
          { step: "01", title: "UX Wireframing", desc: "Mapping user flows, content hierarchies, and page structure to ensure zero friction." },
          { step: "02", title: "Art Direction & Style", desc: "Creating immersive visual concepts, typography scales, and moodboard alignment." },
          { step: "03", title: "High-Fidelity Prototyping", desc: "Designing every breakpoint in Figma with interactive transitions and states." },
          { step: "04", title: "Design System & Handoff", desc: "Organizing tokens, spacing rules, and asset exports ready for pixel-perfect engineering." }
        ],
        faqs: [
          { q: "Do you design for mobile and tablet too?", a: "Yes, every template is designed with dedicated responsive artboards for Mobile, Tablet, and Desktop displays." },
          { q: "Can you provide interactive clickable prototypes in Figma?", a: "Absolutely. We deliver interactive Figma prototypes so your stakeholders can test and experience user journeys before code is written." }
        ],
        tools: ["Figma", "Spline 3D", "Adobe CC", "Protopie"],
        timeline: "3 - 6 Weeks"
      },
      {
        num: "03",
        id: "ecommerce-design",
        slug: "ecommerce-design",
        name: "eCommerce Design",
        tagline: "Conversion-Centric Storefronts",
        summary: "Data-driven UI/UX design engineered specifically to maximize average order value, streamline browsing, and eliminate checkout friction.",
        heroDescription: "Online shopping behavior is defined by speed, trust, and clarity. We engineer digital storefronts that guide customers effortlessly from discovery to cart, leveraging proven UX heuristics that drive higher conversion rates and larger basket sizes.",
        metrics: [
          { label: "Checkout Completion", value: "84%" },
          { label: "AOV Increase", value: "+28%" },
          { label: "Cart Abandonment", value: "-32%" }
        ],
        deliverables: [
          "Conversion-Focused UX Wireframing",
          "Product Detail Page (PDP) Optimization",
          "Custom Cart Drawers & Upsell Flows",
          "Mobile-First Shopping Experience",
          "Trust & Social Proof Integration"
        ],
        process: [
          { step: "01", title: "Funnel Analysis", desc: "Auditing user drop-offs, search query patterns, and competitor checkout flows." },
          { step: "02", title: "PDP & Collection Layouts", desc: "Designing high-impact product media galleries, size guides, and sticky add-to-cart triggers." },
          { step: "03", title: "Cart & Checkout Flow", desc: "Streamlining slide-out drawers, free shipping thresholds, and 1-click upsells." },
          { step: "04", title: "Handoff & Shopify Specs", desc: "Providing modular section templates ready for Shopify OS 2.0 implementation." }
        ],
        faqs: [
          { q: "Is the design optimized for Shopify?", a: "Yes, all our ecommerce designs are architected to seamlessly map to Shopify sections and headless setups." }
        ],
        tools: ["Figma", "Shopify Design", "Hotjar", "Baymard UX Guidelines"],
        timeline: "2 - 4 Weeks"
      },
      {
        num: "04",
        id: "ui-ux",
        slug: "ui-ux",
        name: "UI / UX Experience",
        tagline: "User Journey Architecture & Wireframing",
        summary: "Rigorous user research, interface prototyping, and usability testing that ensure intuitive digital interactions across web and mobile platforms.",
        heroDescription: "We design complex digital products, SaaS dashboards, and web applications that feel deceptively simple. Through user research and iterative prototyping, we eliminate confusion and empower users to accomplish their goals faster.",
        metrics: [
          { label: "Task Success Rate", value: "96%" },
          { label: "Time-to-Value", value: "-50%" },
          { label: "SUS Usability Score", value: "88/100" }
        ],
        deliverables: [
          "User Persona & Customer Journey Mapping",
          "Low-Fidelity & High-Fidelity Wireframes",
          "Interactive Clickable Prototypes",
          "Usability Testing & Feedback Integration",
          "Accessibility (WCAG 2.1 AA) Compliance"
        ],
        process: [
          { step: "01", title: "Research & Interviews", desc: "Conducting user interviews, analytics reviews, and competitive usability audits." },
          { step: "02", title: "Information Architecture", desc: "Structuring site maps, user journeys, navigation paradigms, and screen states." },
          { step: "03", title: "Wireframes & Testing", desc: "Testing clickable prototypes with real users to validate layout logic before styling." },
          { step: "04", title: "UI Components", desc: "Crafting scalable component libraries with accessible color contrasts." }
        ],
        faqs: [
          { q: "Do you perform usability testing?", a: "Yes, we run remote and moderated usability test sessions to identify bottlenecks before development." }
        ],
        tools: ["Figma", "Miro", "Maze", "UserTesting"],
        timeline: "3 - 6 Weeks"
      },
      {
        num: "05",
        id: "graphic-design",
        slug: "graphic-design",
        name: "Graphic Design",
        tagline: "Digital Assets, 3D Renders & Marketing Creatives",
        summary: "Impactful marketing creatives, presentation decks, digital ads, and 3D visual assets crafted to elevate your promotional campaigns.",
        heroDescription: "Compelling graphic design captures attention in crowded social feeds and leaves an unforgettable impression. From 3D visuals to sales decks, our studio crafts high-resolution creative collateral.",
        metrics: [
          { label: "CTR Increase", value: "+45%" },
          { label: "Turnaround Time", value: "48-72h" },
          { label: "Format Variations", value: "All Aspect Ratios" }
        ],
        deliverables: [
          "Marketing Ad Sets & Social Packs",
          "Pitch Decks & Investor Presentations",
          "Custom Iconography & Illustrations",
          "Digital Billboard & Display Assets"
        ],
        process: [
          { step: "01", title: "Briefing & Specs", desc: "Gathering campaign objectives, copy assets, and platform technical requirements." },
          { step: "02", title: "Concept Generation", desc: "Drafting creative variations, typography treatments, and layout options." },
          { step: "03", title: "Render & Polish", desc: "Executing high-res 3D modeling, color grading, and typography alignment." },
          { step: "04", title: "Multi-Format Export", desc: "Delivering ready-to-publish assets optimized for all ad channels." }
        ],
        faqs: [
          { q: "Can you design pitch decks in PowerPoint or Keynote?", a: "Yes, we provide fully editable templates in Figma, Google Slides, Keynote, or PowerPoint." }
        ],
        tools: ["Adobe Creative Suite", "Cinema 4D", "Blender", "Figma"],
        timeline: "1 - 3 Weeks"
      }
    ]
  },
  {
    id: "development",
    giantTitle: "Develop",
    heading: "Web development to the highest standards, matching the latest industry requirements.",
    description: "We engineer lightning-fast digital flagships, robust SaaS web applications, and headless commerce platforms using modern web standards.",
    services: [
      {
        num: "01",
        id: "web-development",
        slug: "web-development",
        name: "Web Development",
        tagline: "Modern React & Next.js Architecture",
        summary: "Custom modern web engineering combining fluid GSAP animations, clean modular code, responsive layouts, and sub-second load times.",
        heroDescription: "We engineer bespoke, enterprise-grade web applications that blend cinematic WebGL & GSAP animations with blazingly fast load speeds. Built with modern React, Next.js, and TypeScript, our web flagships are secure, scalable, and optimized for maximum organic search performance.",
        metrics: [
          { label: "Lighthouse Score", value: "98/100" },
          { label: "Avg Page Load", value: "< 0.8s" },
          { label: "Core Web Vitals", value: "100% Pass" }
        ],
        deliverables: [
          "Custom React / Next.js Web Development",
          "Tailwind CSS & Vanilla Design Systems",
          "GSAP Motion & ScrollTrigger Animations",
          "Sub-Second Load Times & 98+ Lighthouse",
          "Cross-Browser & Mobile-First Architecture"
        ],
        process: [
          { step: "01", title: "Technical Architecture", desc: "Selecting the optimal tech stack, rendering strategy (SSR/SSG), and database structure." },
          { step: "02", title: "Component Development", desc: "Building modular, accessible components with strict TypeScript types and CSS tokens." },
          { step: "03", title: "Motion & API Integration", desc: "Hooking up headless APIs, CMS webhooks, and crafting buttery GSAP scroll transitions." },
          { step: "04", title: "QA & Lighthouse Optimization", desc: "Running cross-browser audits, asset compression, and automated CI/CD deployment." }
        ],
        faqs: [
          { q: "What frameworks do you build with?", a: "We specialize in React, Next.js, Node.js, Tailwind CSS, TypeScript, and modern headless CMS platforms." },
          { q: "Will our team be able to update content easily?", a: "Yes, we integrate headless content management systems so your marketing team can publish pages, blogs, and media without writing code." }
        ],
        tools: ["React", "Next.js", "JavaScript/TypeScript", "TailwindCSS", "GSAP", "Vite"],
        timeline: "3 - 6 Weeks"
      },
      {
        num: "02",
        id: "technical-seo",
        slug: "technical-seo",
        name: "Technical SEO",
        tagline: "Architecture, Structured Data & Performance",
        summary: "Comprehensive technical auditing, schema markup, Core Web Vitals remediation, and indexing strategies that earn dominant search visibility.",
        heroDescription: "Great design must be discoverable. We perform deep architectural SEO audits and code-level optimizations to ensure Google bots can seamlessly crawl, render, and index your digital assets at maximum speed.",
        metrics: [
          { label: "Organic Clicks", value: "+140%" },
          { label: "Crawl Errors", value: "0" },
          { label: "Page 1 Keywords", value: "+85%" }
        ],
        deliverables: [
          "Technical Site Health & Speed Audit",
          "JSON-LD Schema Markup Implementation",
          "Core Web Vitals Performance Tuning",
          "Sitemap, Canonical & Robots Strategy",
          "Internal Linking Architecture"
        ],
        process: [
          { step: "01", title: "Audit & Diagnostics", desc: "Crawling your entire URL tree with Screaming Frog and inspecting server response headers." },
          { step: "02", title: "Speed & Core Web Vitals", desc: "Resolving Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and FID issues." },
          { step: "03", title: "Schema & Structured Data", desc: "Writing custom JSON-LD schemas for Organizations, Articles, FAQs, and Products." },
          { step: "04", title: "Indexing & Monitoring", desc: "Submitting verified sitemaps and monitoring Search Console index coverage." }
        ],
        faqs: [
          { q: "How soon do SEO results appear?", a: "Technical fixes (like fixing 404s and schema) are recognized by Google within 2 to 4 weeks, with compounding ranking gains over 3 to 6 months." }
        ],
        tools: ["Google Search Console", "Ahrefs", "Semrush", "Screaming Frog", "PageSpeed"],
        timeline: "Ongoing / Retainer"
      },
      {
        num: "03",
        id: "ecommerce-development",
        slug: "ecommerce-development",
        name: "eCommerce & Shopify",
        tagline: "Custom Storefronts & Headless Commerce",
        summary: "High-volume online storefronts, custom Shopify themes, headless commerce APIs, and seamless multi-currency payment checkout flows.",
        heroDescription: "We engineer enterprise-grade Shopify Plus stores and headless Next.js commerce flagships built to handle millions in monthly volume with zero slowdowns.",
        metrics: [
          { label: "Transaction Speed", value: "0.4s" },
          { label: "Uptime Reliability", value: "99.99%" },
          { label: "Average ROAS", value: "3.8x" }
        ],
        deliverables: [
          "Shopify Plus & Custom Theme Development",
          "Headless Commerce & Next.js Storefronts",
          "Stripe & Multi-Gateway Integration",
          "Custom Product Bundles & Upsell Logic",
          "ERP, CRM & Inventory Synchronization"
        ],
        process: [
          { step: "01", title: "Catalog Architecture", desc: "Structuring product variants, metafields, collections, and multi-currency pricing rules." },
          { step: "02", title: "Custom Theme Engineering", desc: "Coding fast, modular Liquid / React components with dynamic product filters." },
          { step: "03", title: "Checkout & App Stack", desc: "Configuring 1-click checkout, Klaviyo flows, and inventory sync webhooks." },
          { step: "04", title: "Launch & Load Testing", desc: "Simulating heavy traffic spikes to guarantee stability during flash sales." }
        ],
        faqs: [
          { q: "Can you migrate our store from WooCommerce or Magento?", a: "Yes, we handle complete data migrations including customers, order history, products, and SEO redirect maps." }
        ],
        tools: ["Shopify Plus", "Liquid", "Next.js Commerce", "Stripe", "Sanity"],
        timeline: "4 - 8 Weeks"
      },
      {
        num: "04",
        id: "software-development",
        slug: "software-development",
        name: "Software Development",
        tagline: "Full-Stack SaaS & Custom Web Platforms",
        summary: "Bespoke SaaS applications, internal operations portals, database architectures, and automated business workflows designed for scale.",
        heroDescription: "When off-the-shelf software can't meet your operational requirements, we architect custom full-stack software tailored to your exact business logic.",
        metrics: [
          { label: "API Response Time", value: "< 45ms" },
          { label: "Test Coverage", value: "90%+" },
          { label: "Cloud Scalability", value: "Auto-Scale" }
        ],
        deliverables: [
          "Full-Stack Web App Architecture",
          "Secure Authentication & Role Permissions",
          "RESTful & GraphQL API Development",
          "Relational Database & Cloud Architecture",
          "CI/CD Automated Deployment Pipelines"
        ],
        process: [
          { step: "01", title: "Requirements & Scope", desc: "Mapping user roles, database entities, security protocols, and operational workflows." },
          { step: "02", title: "API & DB Architecture", desc: "Designing PostgreSQL schemas, authentication JWTs, and scalable serverless APIs." },
          { step: "03", title: "Full-Stack Build", desc: "Developing intuitive front-end views connected to resilient back-end services." },
          { step: "04", title: "Testing & DevOps", desc: "Setting up automated test suites, Docker containers, and cloud infrastructure." }
        ],
        faqs: [
          { q: "Who owns the source code?", a: "You own 100% of the code, intellectual property, and database rights upon project completion." }
        ],
        tools: ["Node.js", "Python", "PostgreSQL", "Supabase", "Docker", "AWS"],
        timeline: "6 - 12 Weeks"
      },
      {
        num: "05",
        id: "cms-architecture",
        slug: "cms-architecture",
        name: "CMS & API Architecture",
        tagline: "Headless CMS, Craft & Sanity Systems",
        summary: "Effortless content editing workflows with structured headless CMS setups that empower marketing teams to publish without developers.",
        heroDescription: "Tired of rigid templates and fragile CMS plugins? We build modern headless content architectures that allow non-technical team members to build beautiful pages with pre-approved design blocks.",
        metrics: [
          { label: "Publishing Speed", value: "10x Faster" },
          { label: "Security Vulnerabilities", value: "0" },
          { label: "Modular Blocks", value: "25+ Sections" }
        ],
        deliverables: [
          "Custom Headless CMS Modeling",
          "Real-Time Visual Content Previewing",
          "Multi-Language & Localization Setup",
          "Webhooks & Automated Cache Invalidation"
        ],
        process: [
          { step: "01", title: "Content Modeling", desc: "Structuring reusable schemas, custom fields, and relational content types." },
          { step: "02", title: "Studio Configuration", desc: "Customizing editing UI with visual previews and role-based permissions." },
          { step: "03", title: "Front-End Hydration", desc: "Fetching CMS data with GraphQL/GROQ queries and automated revalidation." }
        ],
        faqs: [
          { q: "Which headless CMS do you recommend?", a: "We frequently recommend Sanity.io or Craft CMS for their flexibility, visual live previewing, and developer experience." }
        ],
        tools: ["Sanity.io", "Strapi", "Craft CMS", "Contentful", "GraphQL"],
        timeline: "2 - 5 Weeks"
      }
    ]
  },
  {
    id: "marketing",
    giantTitle: "Marketing",
    heading: "Performance campaigns and creative growth engines built to deliver measurable ROI.",
    description: "We combine precision paid media, viral social strategy, compelling copywriting, and full-funnel optimization to build brands that get noticed.",
    services: [
      {
        num: "01",
        id: "ads",
        slug: "ads",
        name: "Paid Ads & PPC",
        tagline: "High-Converting Meta, Google & LinkedIn Ads",
        summary: "Multi-channel advertising campaigns focused on strict unit economics, creative fatigue management, and profitable customer acquisition.",
        heroDescription: "We scale paid acquisition channels profitably with rigorous unit economic discipline. Combining high-converting video creative, audience segmentation, and algorithmic bid strategies, we turn ad dollars into predictable revenue.",
        metrics: [
          { label: "Managed Ad Spend", value: "$25M+" },
          { label: "Average ROAS", value: "4.2x" },
          { label: "CAC Reduction", value: "-26%" }
        ],
        deliverables: [
          "Full Paid Media & Audience Strategy",
          "High-Impact Ad Creatives & Video Copy",
          "A/B Creative & Hook Testing Framework",
          "Budget Pacing & Bid Optimization",
          "Real-Time Analytics Dashboard"
        ],
        process: [
          { step: "01", title: "Audit & Pixel Setup", desc: "Verifying Conversion APIs, server-side tracking, and multi-touch attribution." },
          { step: "02", title: "Creative Sprint", desc: "Scripting and producing hook-heavy video and static ad creative variations." },
          { step: "03", title: "Launch & Testing", desc: "Testing audiences, angles, and landing pages with systematic budget pacing." },
          { step: "04", title: "Scale & Optimize", desc: "Scaling high-performing ad sets while pruning underperforming creative." }
        ],
        faqs: [
          { q: "What ad networks do you manage?", a: "We manage Meta (Facebook & Instagram), Google Ads (Search, YouTube, Performance Max), TikTok, and LinkedIn." }
        ],
        tools: ["Meta Ads Manager", "Google Ads", "LinkedIn Ads", "Triple Whale", "Looker"],
        timeline: "Monthly Retainer"
      },
      {
        num: "02",
        id: "content-writing",
        slug: "content-writing",
        name: "Content Writing & Copy",
        tagline: "SEO Articles, Website Copy & Storytelling",
        summary: "Engaging, keyword-optimized articles, conversion-focused website copy, and strategic messaging that turn passive readers into loyal customers.",
        heroDescription: "Words that rank on Google and compel readers to take action. Our copywriters combine in-depth search keyword research with human-centered storytelling that builds brand authority.",
        metrics: [
          { label: "Organic Readership", value: "+120%" },
          { label: "Avg Time on Page", value: "4m 12s" },
          { label: "Content Published", value: "500k+ Words" }
        ],
        deliverables: [
          "Keyword-Optimized Long-Form Articles",
          "High-Converting Landing Page Sales Copy",
          "Email Marketing & Drip Sequences",
          "Brand Storytelling & Tagline Development",
          "PR & Thought Leadership Articles"
        ],
        process: [
          { step: "01", title: "Keyword Clustering", desc: "Finding high-intent search queries and mapping content clusters." },
          { step: "02", title: "Drafting & Storytelling", desc: "Writing comprehensive, engaging drafts aligned with your brand voice." },
          { step: "03", title: "SEO Optimization", desc: "Tuning keyword density, internal links, and meta descriptions using SurferSEO." }
        ],
        faqs: [
          { q: "Is the content human-written?", a: "Yes, 100% human-crafted and edited by experienced editorial professionals." }
        ],
        tools: ["Clearscope", "SurferSEO", "Grammarly", "Google Workspace"],
        timeline: "Per Project / Retainer"
      },
      {
        num: "03",
        id: "social-media-marketing",
        slug: "social-media-marketing",
        name: "Social Media Marketing",
        tagline: "Viral Short-Form Content & Community",
        summary: "End-to-end social media management, cinematic reels, TikTok production, and community engagement strategies that spark genuine brand advocacy.",
        heroDescription: "We build culturally relevant social channels that turn casual scrollers into passionate brand advocates through viral short-form video and daily community management.",
        metrics: [
          { label: "Organic Reach", value: "12M+" },
          { label: "Follower Growth", value: "+250%" },
          { label: "Engagement Rate", value: "5.8%" }
        ],
        deliverables: [
          "Monthly Strategic Content Calendars",
          "Short-Form Video Production (Reels / TikTok)",
          "Daily Community & Comment Management",
          "Influencer Partnerships & Collabs",
          "Monthly Growth & Analytics Reports"
        ],
        process: [
          { step: "01", title: "Content Strategy", desc: "Defining content pillars, visual themes, and viral hook formats." },
          { step: "02", title: "Production & Editing", desc: "Filming, editing, and sound designing vertical video clips." },
          { step: "03", title: "Publishing & Engagement", desc: "Scheduling posts at peak times and engaging with active comments." }
        ],
        faqs: [
          { q: "Do you handle creator sourcing?", a: "Yes, we handle creator matchmaking, contract negotiation, and content briefs." }
        ],
        tools: ["CapCut", "Premiere Pro", "Later", "Sprout Social", "Canva Pro"],
        timeline: "Monthly Retainer"
      },
      {
        num: "04",
        id: "performance-marketing",
        slug: "performance-marketing",
        name: "Performance Marketing",
        tagline: "Full-Funnel Acquisition & Retention",
        summary: "Holistic growth architecture integrating paid search, retargeting funnels, automated lifecycle email flows, and retention mechanics.",
        heroDescription: "Growth is not a single tactic—it is an interconnected machine. We connect paid media, lifecycle email/SMS marketing, and CRO into a full-funnel growth engine.",
        metrics: [
          { label: "LTV Expansion", value: "+34%" },
          { label: "Email Revenue Share", value: "32%" },
          { label: "Blended ROAS", value: "4.8x" }
        ],
        deliverables: [
          "Multi-Touch Attribution Setup",
          "Conversion Rate Optimization (CRO)",
          "Automated Email & SMS Retention Flows",
          "Full-Funnel CAC & ROAS Maximization",
          "Weekly Executive Strategy Reviews"
        ],
        process: [
          { step: "01", title: "Attribution Setup", desc: "Connecting GA4, Mixpanel, and server-side tracking to trace customer journeys." },
          { step: "02", title: "Retention Automation", desc: "Building automated abandoned cart, welcome series, and VIP winback flows." },
          { step: "03", title: "CRO Experiments", desc: "Running weekly A/B landing page tests to lower cost per lead." }
        ],
        faqs: [
          { q: "What CRM and email tools do you use?", a: "We work primarily with Klaviyo, HubSpot, ActiveCampaign, and Customer.io." }
        ],
        tools: ["GA4", "Klaviyo", "Google Tag Manager", "Mixpanel", "HubSpot"],
        timeline: "Monthly Retainer"
      }
    ]
  },
  {
    id: "support",
    giantTitle: "Support",
    heading: "Lean on our in-house team to support with your design, development, and SEO needs.",
    description: "Proactive maintenance, enterprise-grade cloud hosting, rapid issue resolution, and continuous technical defense for your digital assets.",
    services: [
      {
        num: "01",
        id: "web-hosting",
        slug: "web-hosting",
        name: "Web Hosting & Cloud",
        tagline: "99.99% Uptime, Global Edge CDN & Security",
        summary: "Ultra-fast, high-availability cloud infrastructure with automated daily backups, enterprise SSL certificates, and 24/7 uptime monitoring.",
        heroDescription: "Enterprise cloud hosting built for speed, security, and effortless reliability. Your site is deployed across globally distributed edge nodes for near-instant response times worldwide.",
        metrics: [
          { label: "Guaranteed Uptime", value: "99.99%" },
          { label: "Global Edge Nodes", value: "300+" },
          { label: "DDoS Mitigation", value: "Always-On" }
        ],
        deliverables: [
          "Cloud Edge Hosting & Global CDN Setup",
          "Automated Daily Backups & Recovery",
          "SSL Certificate Installation & Renewal",
          "DDoS Protection & Web Application Firewall",
          "24/7 Server Health Monitoring & Alerts"
        ],
        process: [
          { step: "01", title: "DNS & Edge Config", desc: "Setting up Cloudflare or AWS CloudFront CDN and routing records." },
          { step: "02", title: "SSL & Security Rules", desc: "Enforcing HTTPS, HTTP/3, and firewall rules to prevent spam attacks." },
          { step: "03", title: "Automated Snapshots", desc: "Configuring daily automated cloud snapshots and 1-click restore points." }
        ],
        faqs: [
          { q: "What happens if our site goes down?", a: "Our automated monitoring pings your server every 60 seconds and notifies our on-call engineers 24/7." }
        ],
        tools: ["AWS", "Vercel", "Cloudflare", "DigitalOcean", "Redis"],
        timeline: "Monthly / Annual Management"
      },
      {
        num: "02",
        id: "ppc-support",
        slug: "ppc-support",
        name: "PPC Management Support",
        tagline: "Continuous Account Oversight & Tuning",
        summary: "Dedicated pay-per-click account oversight, negative keyword mining, bid adjustments, and ad health diagnostics to maintain peak efficiency.",
        heroDescription: "Paid ad algorithms require constant vigilance to maintain optimal return. We provide ongoing weekly bid adjustments, search query negative keyword pruning, and creative performance monitoring.",
        metrics: [
          { label: "Wasted Spend Saved", value: "22%" },
          { label: "Quality Score", value: "9/10" },
          { label: "Weekly Checks", value: "7 Days" }
        ],
        deliverables: [
          "Daily Bid Adjustments & Budget Monitoring",
          "Search Query Mining & Negative Keyword List",
          "Quality Score & Landing Page Diagnostics",
          "Conversion Tracking & Pixel Integrity Audits",
          "Monthly Performance Review Call"
        ],
        process: [
          { step: "01", title: "Search Term Mining", desc: "Pruning irrelevant search queries and adding negative keywords daily." },
          { step: "02", title: "Bid & Budget Pacing", desc: "Shifting budget dynamically to top-performing ad auctions." },
          { step: "03", title: "Health Reporting", desc: "Delivering transparent monthly ROI and cost-per-acquisition reports." }
        ],
        faqs: [
          { q: "How often do you review the account?", a: "Our media buyers inspect and optimize your account daily." }
        ],
        tools: ["Google Ads", "Microsoft Advertising", "ClickCease", "Looker Studio"],
        timeline: "Monthly Support"
      },
      {
        num: "03",
        id: "seo-support",
        slug: "seo-support",
        name: "SEO Ongoing Support",
        tagline: "Organic Monitoring & Algorithm Defense",
        summary: "Regular technical audits, broken link remediation, indexation health checks, and protection against search engine algorithm updates.",
        heroDescription: "SEO is an ongoing marathon. We continuously protect your search rankings against Google algorithm updates, fix broken redirects, and maintain core web vitals.",
        metrics: [
          { label: "Ranking Retention", value: "99%" },
          { label: "Audit Frequency", value: "Bi-Weekly" },
          { label: "Broken Links Fixed", value: "100%" }
        ],
        deliverables: [
          "Monthly Technical Health Audits",
          "Broken Link, Redirect & 404 Resolution",
          "Core Web Vitals Ongoing Performance Checks",
          "Search Algorithm Update Impact Tracking",
          "Competitor Rank Tracking Reports"
        ],
        process: [
          { step: "01", title: "Bi-Weekly Crawls", desc: "Running automated site audits to identify new broken links or index issues." },
          { step: "02", title: "Remediation", desc: "Implementing 301 redirects, schema updates, and performance patches." },
          { step: "03", title: "Ranking Reports", desc: "Tracking keyword position movements and competitor organic changes." }
        ],
        faqs: [
          { q: "Do you protect against Google algorithm updates?", a: "Yes, we monitor algorithm rollouts and proactively adjust technical factors." }
        ],
        tools: ["Ahrefs", "Google Search Console", "Screaming Frog", "PageSpeed"],
        timeline: "Monthly Support"
      },
      {
        num: "04",
        id: "dedicated-support",
        slug: "dedicated-support",
        name: "Dedicated Retainer Support",
        tagline: "Priority SLA & On-Demand Developer Hours",
        summary: "Guaranteed monthly development and design hours for continuous feature improvements, landing page rollouts, and rapid bug fixes.",
        heroDescription: "Have a dedicated agency team on speed-dial. Our monthly retainer packages provide guaranteed developer and designer hours with a priority SLA response time.",
        metrics: [
          { label: "SLA Response", value: "< 4 Hours" },
          { label: "Monthly Hours", value: "Flexible" },
          { label: "Roll-Over Hours", value: "Supported" }
        ],
        deliverables: [
          "Dedicated Monthly Developer & Designer Hours",
          "Priority 4-Hour Response SLA",
          "Monthly Strategy & Roadmap Planning Call",
          "Proactive Security Patches & Dependency Updates"
        ],
        process: [
          { step: "01", title: "Slack Channel", desc: "Direct communication with our senior developers in a dedicated Slack Connect channel." },
          { step: "02", title: "Sprint Queue", desc: "Managing feature tasks and requests in a transparent backlog." },
          { step: "03", title: "Rapid Execution", desc: "Deploying code updates, security patches, and landing pages with zero delay." }
        ],
        faqs: [
          { q: "Can unused retainer hours roll over?", a: "Yes, unused hours can roll over into the subsequent month." }
        ],
        tools: ["Slack Connect", "Jira / Linear", "GitHub", "Notion"],
        timeline: "Monthly Retainer"
      }
    ]
  }
];

export const getAllServices = () => {
  const all = [];
  SHAPE_SERVICES_DATA.forEach((category) => {
    category.services.forEach((service) => {
      all.push({
        ...service,
        category: category.giantTitle,
        categoryId: category.id,
      });
    });
  });
  return all;
};

export const getServiceBySlug = (slug) => {
  if (!slug) return null;
  const all = getAllServices();
  const normalized = slug.toLowerCase().trim();
  return all.find(
    (s) =>
      s.id.toLowerCase() === normalized ||
      s.slug?.toLowerCase() === normalized ||
      s.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === normalized
  );
};
