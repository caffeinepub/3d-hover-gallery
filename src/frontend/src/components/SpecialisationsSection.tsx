import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type CardData = {
  category: string;
  title: string;
  desc: string;
  features: string[];
  metric: string;
  cta: string;
  featured?: boolean;
  wide?: boolean;
};

type TabData = {
  label: string;
  isNew?: boolean;
  cards: CardData[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const TABS: TabData[] = [
  {
    label: "All",
    cards: [
      {
        featured: true,
        category: "WORDPRESS · WOOCOMMERCE",
        title: "B2B Wholesale Portal",
        desc: "Role-based pricing engine, GST invoice automation, and a custom wholesale checkout flow built inside WooCommerce for a 200+ SKU distributor.",
        features: [
          "Custom plugin development",
          "Role-based pricing & bulk forms",
          "GST / tax automation",
          "Performance surgery",
        ],
        metric: "+41% Mobile conversion rate within 3 weeks of launch",
        cta: "View case study →",
      },
      {
        category: "SHOPIFY · HEADLESS",
        title: "Next.js Storefront Migration",
        desc: "Migrated a legacy Shopify theme to a fully headless Next.js storefront powered by the Storefront API, cutting LCP from 6.2s to 1.4s.",
        features: [
          "Storefront API + ISR",
          "Custom cart & checkout",
          "Speed optimisation",
        ],
        metric: "6 wks From open to production deployment",
        cta: "View case study →",
      },
      {
        category: "LARAVEL · SAAS",
        title: "Multi-tenant SaaS Platform",
        desc: "Greenfield SaaS application with multi-tenant architecture, Spatie role permissions, and Laravel Horizon queues handling 50k+ jobs/day.",
        features: [
          "Multi-tenant design",
          "Role & permission systems",
          "Laravel Horizon queues",
        ],
        metric: "50k+ background jobs processed per day without incident",
        cta: "View case study →",
      },
      {
        wide: true,
        category: "THE OFFSHORE MODEL",
        title: "Gujarat-based. Globally-minded.",
        desc: "IST timezone. English-fluent team. 14 years of institutional product memory. Offshore cost without offshore quality risk.",
        features: ["IST GMT+5:30", "English-fluent", "14 yrs experience"],
        metric: "Trusted by 80+ clients across AU, UK & US",
        cta: "Learn more →",
      },
    ],
  },
  {
    label: "WordPress",
    cards: [
      {
        featured: true,
        category: "WORDPRESS · CUSTOM PLUGIN",
        title: "The WordPress Surgeon",
        desc: "Not theme installation. Not page builders. We operate on WordPress — custom plugins, deep third-party integrations, and configurations that off-the-shelf tools cannot achieve.",
        features: [
          "Custom plugin from scratch",
          "WooCommerce deep customisation",
          "Third-party API & webhook integrations",
          "Performance & Core Web Vitals surgery",
          "Multisite architecture",
          "WordPress + Next.js headless",
        ],
        metric: "+68% improvement in Core Web Vitals score post-surgery",
        cta: "Discuss your WordPress project →",
      },
      {
        category: "WOOCOMMERCE",
        title: "Custom Commerce Engine",
        desc: "B2B pricing engines, GST invoice automation, custom checkout flows, and wholesale portals built inside WooCommerce — not around it.",
        features: [
          "Role-based pricing & bulk order forms",
          "GST / tax automation plugins",
          "Custom product configurators",
          "Subscription systems",
        ],
        metric: "+41% mobile conversion rate within 3 weeks",
        cta: "WooCommerce project →",
      },
      {
        category: "HEADLESS WP · NEXT.JS",
        title: "WordPress + Next.js",
        desc: "WordPress as the content backend, Next.js as the front-end. Editorial freedom meets developer performance with WPGraphQL and ISR.",
        features: [
          "WP REST API / WPGraphQL",
          "Next.js with ISR for speed",
          "ACF Pro data modelling",
        ],
        metric: "1.4s LCP — down from 6.2s on the legacy theme",
        cta: "Headless WP project →",
      },
      {
        wide: true,
        category: "THE OFFSHORE MODEL",
        title: "Gujarat-based. Globally-minded.",
        desc: "IST timezone. English-fluent team. 14 years of institutional product memory. You get offshore cost without offshore quality risk.",
        features: ["IST GMT+5:30"],
        metric: "Trusted by 80+ clients across AU, UK & US",
        cta: "Learn more →",
      },
    ],
  },
  {
    label: "Shopify",
    cards: [
      {
        featured: true,
        category: "SHOPIFY · CUSTOM THEME",
        title: "The Theme Architect",
        desc: "No templates. No drag-and-drop bandages. We engineer custom Shopify themes from the ground up — pixel-perfect, conversion-optimised, and fully maintainable.",
        features: [
          "Custom Liquid theme development",
          "Section schema & metafield architecture",
          "Shopify 2.0 OS blocks",
          "Speed optimisation & LCP tuning",
          "Shopify Markets & multi-currency",
        ],
        metric: "+55% checkout completion rate on redesigned storefront",
        cta: "Discuss your Shopify project →",
      },
      {
        category: "SHOPIFY PLUS",
        title: "Enterprise Commerce",
        desc: "Scripts, checkout extensions, B2B portals, and flow automation for brands that have outgrown standard Shopify.",
        features: [
          "Checkout UI Extensions",
          "Shopify Scripts & Functions",
          "B2B / wholesale portals",
        ],
        metric: "6 wks From brief to production-ready Plus store",
        cta: "Shopify Plus project →",
      },
      {
        category: "HEADLESS SHOPIFY",
        title: "Shopify + Next.js",
        desc: "Shopify Storefront API powering a blazing-fast Next.js frontend. Best of both — commerce engine and developer freedom.",
        features: [
          "Storefront API & Hydrogen",
          "Custom cart & checkout flows",
          "Next.js ISR for product pages",
        ],
        metric: "2.1s average page load — top 5% of Shopify stores",
        cta: "Headless Shopify project →",
      },
      {
        wide: true,
        category: "THE OFFSHORE MODEL",
        title: "Gujarat-based. Globally-minded.",
        desc: "IST timezone. English-fluent team. 14 years of institutional product memory. You get offshore cost without offshore quality risk.",
        features: ["IST GMT+5:30"],
        metric: "Trusted by 80+ clients across AU, UK & US",
        cta: "Learn more →",
      },
    ],
  },
  {
    label: "Laravel",
    cards: [
      {
        featured: true,
        category: "LARAVEL · SAAS",
        title: "Backend Without Limits",
        desc: "Complex business logic, custom CRMs, SaaS platforms, and API backends built on Laravel's elegant foundation — scalable from day one and maintainable for years.",
        features: [
          "Custom SaaS application development",
          "REST & GraphQL API architecture",
          "Multi-tenant system design",
          "Laravel Horizon queue management",
          "Role & permission systems",
          "ERP / CRM integrations",
        ],
        metric: "50k+ background jobs processed per day without incident",
        cta: "Discuss your Laravel project →",
      },
      {
        category: "FILAMENT ADMIN",
        title: "Admin Panels Fast",
        desc: "Filament-powered admin interfaces built in days, not weeks. Feature-rich dashboards without reinventing every table and form.",
        features: [
          "Custom Filament resources & pages",
          "Advanced filter & bulk actions",
          "Role-gated admin panels",
        ],
        metric: "3 days Typical Filament dashboard delivery timeline",
        cta: "Filament project →",
      },
      {
        category: "LIVEWIRE · INERTIA",
        title: "Full-Stack Laravel",
        desc: "Livewire for reactive server-side UIs or Inertia.js with React/Vue for a SPA feel — without leaving Laravel's comfort zone.",
        features: [
          "Livewire v3 reactive components",
          "Inertia.js + React frontends",
          "Real-time with Laravel Echo",
        ],
        metric: "+90 Lighthouse performance score on every Livewire build",
        cta: "Full-stack Laravel project →",
      },
      {
        wide: true,
        category: "THE OFFSHORE MODEL",
        title: "Gujarat-based. Globally-minded.",
        desc: "IST timezone. English-fluent team. 14 years of institutional product memory. You get offshore cost without offshore quality risk.",
        features: ["IST GMT+5:30"],
        metric: "Trusted by 80+ clients across AU, UK & US",
        cta: "Learn more →",
      },
    ],
  },
  {
    label: "AI Layer",
    isNew: true,
    cards: [
      {
        featured: true,
        category: "AI INTEGRATION · RAG",
        title: "Intelligence, Engineered",
        desc: "Not ChatGPT wrappers. We integrate AI into product workflows — retrieval-augmented generation, fine-tuned models, structured output pipelines, and agentic task runners that actually ship.",
        features: [
          "RAG pipelines with vector search",
          "OpenAI / Claude / Gemini API",
          "Structured output & function calling",
          "Agentic task orchestration",
          "Prompt versioning & eval frameworks",
        ],
        metric:
          "80% reduction in support ticket volume via AI-first knowledge base",
        cta: "Discuss your AI project →",
      },
      {
        category: "VECTOR SEARCH",
        title: "Semantic Knowledge Bases",
        desc: "Pinecone, Weaviate, or pgvector-backed semantic search. Attach memory to your product — docs, support, product catalogues.",
        features: [
          "Embedding pipelines",
          "Semantic + keyword hybrid search",
          "Namespace & metadata filtering",
        ],
        metric: "3× faster answer retrieval vs keyword search alone",
        cta: "Vector search project →",
      },
      {
        category: "AI AGENTS",
        title: "Autonomous Task Runners",
        desc: "LangChain / LangGraph agents that browse, summarise, decide, and act — wired into your existing systems via tool calls and webhooks.",
        features: [
          "Multi-step agent workflows",
          "Tool use & API integration",
          "Human-in-the-loop checkpoints",
        ],
        metric: "12 hrs of manual work automated per week per agent deployed",
        cta: "Agent project →",
      },
      {
        wide: true,
        category: "THE OFFSHORE MODEL",
        title: "Gujarat-based. Globally-minded.",
        desc: "IST timezone. English-fluent team. 14 years of institutional product memory. You get offshore cost without offshore quality risk.",
        features: ["IST GMT+5:30"],
        metric: "Trusted by 80+ clients across AU, UK & US",
        cta: "Learn more →",
      },
    ],
  },
  {
    label: "Headless CMS",
    isNew: true,
    cards: [
      {
        featured: true,
        category: "HEADLESS CMS · SANITY",
        title: "Content Without Constraints",
        desc: "Sanity, Contentful, Payload CMS — we design content schemas, editorial workflows, and the API layer that ties them to any frontend.",
        features: [
          "Sanity Studio custom schemas",
          "Contentful content modelling",
          "Payload CMS self-hosted",
          "Structured content + rich-text",
          "Preview & draft workflows",
        ],
        metric:
          "4× faster content publishing after editorial workflow redesign",
        cta: "Discuss your CMS project →",
      },
      {
        category: "SANITY.IO",
        title: "Real-Time Collaborative CMS",
        desc: "Custom Sanity Studio setups with GROQ queries, portable text rendering, and full CDN delivery via the Content Lake.",
        features: [
          "Document & field schema design",
          "GROQ query optimisation",
          "Next.js + Sanity live preview",
        ],
        metric: "Zero downtime content migration from legacy WordPress CMS",
        cta: "Sanity project →",
      },
      {
        category: "PAYLOAD CMS",
        title: "Self-Hosted & Open Source",
        desc: "Payload CMS for teams that want full control. Runs on your infra, integrates with your codebase, zero vendor lock-in.",
        features: [
          "TypeScript-first config",
          "Custom collection hooks",
          "REST & GraphQL auto-generation",
        ],
        metric: "100% data ownership — no vendor lock-in, ever",
        cta: "Payload CMS project →",
      },
      {
        wide: true,
        category: "THE OFFSHORE MODEL",
        title: "Gujarat-based. Globally-minded.",
        desc: "IST timezone. English-fluent team. 14 years of institutional product memory. You get offshore cost without offshore quality risk.",
        features: ["IST GMT+5:30"],
        metric: "Trusted by 80+ clients across AU, UK & US",
        cta: "Learn more →",
      },
    ],
  },
  {
    label: "Mobile",
    isNew: true,
    cards: [
      {
        featured: true,
        category: "REACT NATIVE · EXPO",
        title: "One Codebase, Two Stores",
        desc: "React Native and Expo apps that feel native on iOS and Android — deployed to both stores from a single, well-architected codebase.",
        features: [
          "React Native + Expo SDK",
          "Native navigation (Expo Router)",
          "Push notifications",
          "Offline-first data (MMKV / SQLite)",
          "OTA updates with EAS",
        ],
        metric:
          "Both stores live in 6 wks from first commit to App Store approval",
        cta: "Discuss your mobile project →",
      },
      {
        category: "EXPO EAS",
        title: "Build & Deploy Pipeline",
        desc: "EAS Build and EAS Submit configured for staging and production tracks. Automated TestFlight and Play Console releases on every merge.",
        features: [
          "EAS Build for iOS & Android",
          "Automated store submissions",
          "OTA update channels",
        ],
        metric: "0 manual deployments — fully automated CI/CD pipeline",
        cta: "EAS pipeline project →",
      },
      {
        category: "REACT NATIVE UI",
        title: "Native-Feel Components",
        desc: "Custom UI component libraries for React Native — gesture-driven, animated, and indistinguishable from fully native apps.",
        features: [
          "Reanimated 3 gesture animations",
          "Bottom sheets & modal stacks",
          "Dark mode & theming system",
        ],
        metric: "4.9★ average App Store rating across delivered mobile apps",
        cta: "RN UI project →",
      },
      {
        wide: true,
        category: "THE OFFSHORE MODEL",
        title: "Gujarat-based. Globally-minded.",
        desc: "IST timezone. English-fluent team. 14 years of institutional product memory. You get offshore cost without offshore quality risk.",
        features: ["IST GMT+5:30"],
        metric: "Trusted by 80+ clients across AU, UK & US",
        cta: "Learn more →",
      },
    ],
  },
];

// ─── Gradient meshes per tab ──────────────────────────────────────────────────
const MESH_GRADIENTS = [
  "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.3) 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(225,29,143,0.25) 0%, transparent 50%)",
  "radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(124,58,237,0.3) 0%, transparent 55%)",
  "radial-gradient(ellipse at 20% 30%, rgba(16,185,129,0.35) 0%, transparent 55%), radial-gradient(ellipse at 75% 60%, rgba(0,212,255,0.3) 0%, transparent 50%)",
  "radial-gradient(ellipse at 50% 20%, rgba(239,68,68,0.3) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(124,58,237,0.35) 0%, transparent 50%)",
  "radial-gradient(ellipse at 60% 30%, rgba(251,191,36,0.25) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(225,29,143,0.4) 0%, transparent 50%)",
  "radial-gradient(ellipse at 40% 50%, rgba(0,212,255,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(124,58,237,0.3) 0%, transparent 50%)",
  "radial-gradient(ellipse at 25% 60%, rgba(52,211,153,0.35) 0%, transparent 55%), radial-gradient(ellipse at 70% 40%, rgba(0,212,255,0.3) 0%, transparent 50%)",
];

// ─── Metric split ─────────────────────────────────────────────────────────────
function parseMetric(metric: string): { highlight: string; rest: string } {
  const match = metric.match(/^([+\d.k×%★]+(?:\s+\w+)?)\s*(.*)/);
  if (match) {
    return {
      highlight: match[1]?.trim() ?? "",
      rest: match[2]?.trim() ?? metric,
    };
  }
  return { highlight: "", rest: metric };
}

// ─── FeaturedCard ─────────────────────────────────────────────────────────────
function FeaturedCard({ card, tabIdx }: { card: CardData; tabIdx: number }) {
  const { highlight, rest } = parseMetric(card.metric);
  const mesh = MESH_GRADIENTS[tabIdx % MESH_GRADIENTS.length];

  return (
    <div
      className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 0 rgba(124,58,237,0)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 40px rgba(124,58,237,0.18), 0 0 80px rgba(0,212,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(124,58,237,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 0 rgba(124,58,237,0)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.08)";
      }}
    >
      {/* Animated gradient mesh image area */}
      <div
        className="relative w-full flex-shrink-0 overflow-hidden"
        style={{ height: 200, background: "#0d0d14" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: mesh, opacity: 0.9 }}
        />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className="text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "rgba(0,212,255,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            {card.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3
          className="text-[22px] font-bold leading-tight"
          style={{ color: "#fff", letterSpacing: "-0.02em" }}
        >
          {card.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {card.desc}
        </p>

        <ul className="flex flex-col gap-1.5 my-1">
          {card.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ▸
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        {/* Metric pill */}
        <div
          className="rounded-xl px-4 py-3 mt-2"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.25)",
            boxShadow: "inset 0 1px 0 rgba(124,58,237,0.15)",
          }}
        >
          <p
            className="text-xs leading-snug"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <span
              className="font-bold text-sm mr-1"
              style={{
                background: "linear-gradient(135deg, #a855f7, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {highlight}
            </span>
            {rest}
          </p>
        </div>

        <a
          href="/#contact"
          className="text-xs font-semibold mt-2 inline-flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: "#00d4ff" }}
          data-ocid="spec.featured_card.primary_button"
        >
          {card.cta}
        </a>
      </div>
    </div>
  );
}

// ─── StandardCard ─────────────────────────────────────────────────────────────
function StandardCard({
  card,
  tabIdx,
  cardIdx,
}: { card: CardData; tabIdx: number; cardIdx: number }) {
  const { highlight, rest } = parseMetric(card.metric);
  const mesh = MESH_GRADIENTS[(tabIdx + cardIdx) % MESH_GRADIENTS.length];

  return (
    <div
      className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 32px rgba(0,212,255,0.12)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(0,212,255,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.07)";
      }}
    >
      {/* Gradient mesh image area */}
      <div
        className="relative w-full flex-shrink-0 overflow-hidden"
        style={{ height: 130, background: "#0d0d14" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: mesh, opacity: 0.85 }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute bottom-3 left-3">
          <span
            className="text-[9px] font-bold tracking-[0.15em] px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "rgba(0,212,255,0.85)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(0,212,255,0.15)",
            }}
          >
            {card.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-2.5">
        <h3
          className="text-[17px] font-bold leading-snug"
          style={{ color: "#fff", letterSpacing: "-0.02em" }}
        >
          {card.title}
        </h3>
        <p
          className="text-xs leading-relaxed flex-1"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {card.desc}
        </p>

        {/* Metric */}
        <div
          className="rounded-lg px-3 py-2.5"
          style={{
            background: "rgba(0,212,255,0.07)",
            border: "1px solid rgba(0,212,255,0.18)",
          }}
        >
          <p
            className="text-xs leading-snug"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <span
              className="font-bold mr-1"
              style={{
                background: "linear-gradient(135deg, #a855f7, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {highlight}
            </span>
            {rest}
          </p>
        </div>

        <a
          href="/#contact"
          className="text-xs font-semibold transition-opacity hover:opacity-70 inline-flex items-center gap-1"
          style={{ color: "#00d4ff" }}
          data-ocid="spec.standard_card.primary_button"
        >
          {card.cta}
        </a>
      </div>
    </div>
  );
}

// ─── WideCard (Offshore Model) ────────────────────────────────────────────────
function WideCard({ card }: { card: CardData }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-px"
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(0,212,255,0.5), rgba(225,29,143,0.5))",
      }}
    >
      <div
        className="relative flex flex-col md:flex-row items-center gap-6 rounded-2xl p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,8,40,0.95), rgba(8,16,32,0.95))",
        }}
      >
        {/* Subtle inner glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Left: text */}
        <div className="flex-1 min-w-0 relative z-10">
          <p
            className="text-[9px] font-bold tracking-[0.25em] mb-3"
            style={{ color: "rgba(0,212,255,0.6)" }}
          >
            {card.category}
          </p>
          <h3
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{
              background:
                "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.03em",
            }}
          >
            {card.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {card.desc}
          </p>
        </div>

        {/* Right: stat + CTA */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-4 relative z-10">
          <div
            className="rounded-xl px-5 py-3"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 0 20px rgba(124,58,237,0.1)",
            }}
          >
            <p
              className="text-xs font-medium text-center"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {card.metric}
            </p>
          </div>
          <a
            href="/#contact"
            className="text-sm font-bold inline-flex items-center gap-2 px-6 py-2.5 rounded-full transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #e11d8f)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
            data-ocid="spec.offshore.primary_button"
          >
            {card.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function SpecialisationsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabData = TABS[activeTab];

  const featuredCard = tabData.cards.find((c) => c.featured);
  const standardCards = tabData.cards.filter((c) => !c.featured && !c.wide);
  const wideCard = tabData.cards.find((c) => c.wide);

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: i * 0.08,
      },
    }),
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.22, ease: "easeIn" as const },
    },
  };

  return (
    <section
      className="relative w-full py-24 px-5 md:px-10 lg:px-16 overflow-hidden"
      style={{ background: "#080808" }}
      data-ocid="spec.section"
    >
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, rgba(124,58,237,0.07) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(0,212,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(225,29,143,0.04) 0%, transparent 50%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-1 h-4 rounded-full"
              style={{
                background: "linear-gradient(180deg, #7c3aed, #00d4ff)",
              }}
            />
            <p
              className="text-[11px] font-bold tracking-[0.28em]"
              style={{ color: "rgba(0,212,255,0.7)" }}
            >
              02 — WORK
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2
                className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
                style={{ color: "#fff" }}
              >
                Problems solved.
              </h2>
              <h2
                className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #e11d8f 50%, #00d4ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontStyle: "italic",
                }}
              >
                Results proven.
              </h2>
            </div>
            <p
              className="text-sm max-w-xs leading-relaxed sm:text-right"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Six specialisations. One obsession: shipping work that moves the
              needle.
            </p>
          </div>
        </div>

        {/* ── Tab bar ─────────────────────────────────────────────────────── */}
        <div
          className="flex items-end gap-1 flex-wrap mb-12 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
          role="tablist"
          aria-label="Specialisations"
          data-ocid="spec.tab"
        >
          {TABS.map((tab, i) => {
            const isActive = i === activeTab;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(i)}
                className="relative inline-flex items-center gap-2 px-4 pb-4 pt-2 text-[15px] font-semibold transition-all focus:outline-none"
                style={{
                  color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
                  letterSpacing: "-0.01em",
                }}
                data-ocid={`spec.tab.${i + 1}`}
              >
                {tab.label}
                {tab.isNew && (
                  <span
                    className="text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(225,29,143,0.2)",
                      color: "#e11d8f",
                      border: "1px solid rgba(225,29,143,0.3)",
                    }}
                  >
                    NEW
                  </span>
                )}
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #7c3aed, #e11d8f, #00d4ff)",
                      boxShadow:
                        "0 0 8px rgba(124,58,237,0.6), 0 0 16px rgba(0,212,255,0.3)",
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Card grid ───────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col gap-4"
          >
            {/* Top row: Featured (left) + 2 standard (right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredCard && (
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  className="md:col-span-1"
                >
                  <FeaturedCard card={featuredCard} tabIdx={activeTab} />
                </motion.div>
              )}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {standardCards.slice(0, 2).map((card, idx) => (
                  <motion.div
                    key={card.title}
                    custom={idx + 1}
                    variants={cardVariants}
                  >
                    <StandardCard
                      card={card}
                      tabIdx={activeTab}
                      cardIdx={idx + 1}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Wide card */}
            {wideCard && (
              <motion.div custom={3} variants={cardVariants}>
                <WideCard card={wideCard} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA bar ──────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#fff", letterSpacing: "-0.03em" }}
            >
              Have a similar challenge?{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a855f7, #e11d8f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontStyle: "italic",
                }}
              >
                Let's build it.
              </span>
            </p>
          </div>
          <a
            href="/#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #e11d8f)",
              color: "#fff",
              boxShadow:
                "0 0 30px rgba(124,58,237,0.35), 0 0 60px rgba(225,29,143,0.15)",
            }}
            data-ocid="spec.cta.primary_button"
          >
            Start a project →
          </a>
        </div>
      </div>
    </section>
  );
}
