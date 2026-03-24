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
function FeaturedCard({ card }: { card: CardData }) {
  const { highlight, rest } = parseMetric(card.metric);
  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "2px solid #7c3aed",
        boxShadow: "0 4px 24px rgba(124,58,237,0.10)",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 4,
          background: "linear-gradient(90deg,#7c3aed,#6366f1)",
        }}
      />

      <div className="flex flex-col flex-1 p-7 gap-4">
        {/* Category + FEATURED badge */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{ color: "#7c3aed" }}
          >
            {card.category}
          </span>
          <span
            className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: "#7c3aed", color: "#fff" }}
          >
            FEATURED
          </span>
        </div>

        <h3
          className="text-[22px] font-bold leading-tight"
          style={{ color: "#111", letterSpacing: "-0.02em" }}
        >
          {card.title}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
          {card.desc}
        </p>

        <ul className="flex flex-col gap-2">
          {card.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm"
              style={{ color: "#333" }}
            >
              <span
                style={{ color: "#7c3aed", fontWeight: 700, flexShrink: 0 }}
              >
                ✓
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        {/* Metric */}
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: "#f3f0ff", border: "1px solid #ddd6fe" }}
        >
          <p className="text-sm leading-snug" style={{ color: "#555" }}>
            <span
              className="font-bold text-base mr-1"
              style={{ color: "#7c3aed" }}
            >
              {highlight}
            </span>
            {rest}
          </p>
        </div>

        <a
          href="/#contact"
          className="text-sm font-semibold inline-flex items-center gap-1"
          style={{ color: "#7c3aed" }}
          data-ocid="spec.featured_card.primary_button"
        >
          {card.cta}
        </a>
      </div>
    </div>
  );
}

// ─── StandardCard ─────────────────────────────────────────────────────────────
function StandardCard({ card }: { card: CardData }) {
  const { highlight, rest } = parseMetric(card.metric);
  return (
    <div
      className="flex flex-col h-full rounded-xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex flex-col flex-1 p-5 gap-3">
        <span
          className="text-[10px] font-bold tracking-[0.15em] uppercase"
          style={{ color: "#6b7280" }}
        >
          {card.category}
        </span>

        <h3
          className="text-[17px] font-bold leading-snug"
          style={{ color: "#111", letterSpacing: "-0.02em" }}
        >
          {card.title}
        </h3>

        <p
          className="text-xs leading-relaxed flex-1"
          style={{ color: "#6b7280" }}
        >
          {card.desc}
        </p>

        {/* Metric */}
        <div
          className="rounded-lg px-3 py-2.5"
          style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <p className="text-xs leading-snug" style={{ color: "#555" }}>
            <span className="font-bold mr-1" style={{ color: "#7c3aed" }}>
              {highlight}
            </span>
            {rest}
          </p>
        </div>

        <a
          href="/#contact"
          className="text-xs font-semibold inline-flex items-center gap-1"
          style={{ color: "#7c3aed" }}
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
      className="relative flex flex-col md:flex-row items-center gap-6 rounded-2xl p-8"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
      }}
    >
      {/* Left: text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] font-bold tracking-[0.2em] mb-3 uppercase"
          style={{ color: "rgba(167,139,250,0.8)" }}
        >
          {card.category}
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ color: "#fff", letterSpacing: "-0.03em" }}
        >
          {card.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {card.desc}
        </p>
      </div>

      {/* Right: stat + CTA */}
      <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-4">
        <div
          className="rounded-xl px-5 py-3"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <p
            className="text-xs font-medium text-center"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {card.metric}
          </p>
        </div>
        <a
          href="/#contact"
          className="text-sm font-bold inline-flex items-center gap-2 px-6 py-2.5 rounded-full transition-opacity hover:opacity-90"
          style={{ background: "#7c3aed", color: "#fff" }}
          data-ocid="spec.offshore.primary_button"
        >
          {card.cta}
        </a>
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

  return (
    <section
      className="w-full py-20 px-5 md:px-10 lg:px-16"
      style={{ background: "#f8f9fa" }}
      data-ocid="spec.section"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <div
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-5"
            style={{ background: "#ede9fe", color: "#7c3aed" }}
          >
            Our Specialisations
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#111", letterSpacing: "-0.03em" }}
            >
              What We Build
            </h2>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              Six specialisations. One obsession: shipping work that moves the
              needle.
            </p>
          </div>
        </div>

        {/* ── Tab bar ─────────────────────────────────────────────────────── */}
        <div
          className="flex items-end gap-0 flex-wrap mb-10 border-b"
          style={{ borderColor: "#e5e7eb" }}
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
                className="relative inline-flex items-center gap-2 px-5 pb-3 pt-2 text-[15px] font-semibold transition-colors focus:outline-none"
                style={{
                  color: isActive ? "#7c3aed" : "#6b7280",
                  borderBottom: isActive
                    ? "2px solid #7c3aed"
                    : "2px solid transparent",
                  marginBottom: "-1px",
                  background: "transparent",
                }}
                data-ocid={`spec.tab.${i + 1}`}
              >
                {tab.label}
                {tab.isNew && (
                  <span
                    className="text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-full"
                    style={{ background: "#fce7f3", color: "#db2777" }}
                  >
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Card grid ───────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Top row: Featured (left) + 2 standard (right) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredCard && (
              <div className="md:col-span-1">
                <FeaturedCard card={featuredCard} />
              </div>
            )}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {standardCards.slice(0, 2).map((card) => (
                <StandardCard key={card.title} card={card} />
              ))}
            </div>
          </div>

          {/* Wide card */}
          {wideCard && <WideCard card={wideCard} />}
        </div>

        {/* ── Bottom CTA bar ──────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-10"
          style={{ borderTop: "1px solid #e5e7eb" }}
        >
          <div>
            <p
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#111", letterSpacing: "-0.03em" }}
            >
              Have a similar challenge?{" "}
              <span style={{ color: "#7c3aed", fontStyle: "italic" }}>
                Let's build it.
              </span>
            </p>
          </div>
          <a
            href="/#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: "#7c3aed", color: "#fff" }}
            data-ocid="spec.cta.primary_button"
          >
            Start a project →
          </a>
        </div>
      </div>
    </section>
  );
}
