import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const tabs = [
  {
    id: "wordpress",
    label: "WordPress",
    subLabel: "Custom plugins & WooCommerce",
    isNew: false,
    cards: [
      {
        icon: "🔌",
        iconBg: "#7c3aed",
        title: "Plugin Development",
        description:
          "Bespoke WordPress plugins engineered for performance, security, and maintainability.",
        features: [
          "Custom post types & taxonomies",
          "REST API endpoints",
          "Admin UI with React",
        ],
      },
      {
        icon: "🛒",
        iconBg: "#0e7490",
        title: "WooCommerce Engine",
        description:
          "End-to-end eCommerce solutions — from checkout flows to complex subscription models.",
        features: [
          "Custom checkout flows",
          "Subscription products",
          "Payment gateway integrations",
        ],
      },
      {
        icon: "⚡",
        iconBg: "#4f46e5",
        title: "Headless WP + Next.js",
        description:
          "Decouple your WordPress backend and pair it with a blazing-fast Next.js frontend.",
        features: ["WPGraphQL API layer", "ISR + SSG pages", "Preview mode"],
      },
    ],
  },
  {
    id: "shopify",
    label: "Shopify",
    subLabel: "Themes, Plus & headless",
    isNew: false,
    cards: [
      {
        icon: "🎨",
        iconBg: "#7c3aed",
        title: "Custom Theme",
        description:
          "Pixel-perfect Shopify themes built with Liquid and modern CSS for conversion.",
        features: [
          "Liquid templating",
          "Section schema",
          "Performance-first CSS",
        ],
      },
      {
        icon: "💎",
        iconBg: "#0e7490",
        title: "Shopify Plus",
        description:
          "Enterprise-grade Shopify Plus implementations with custom scripts and flows.",
        features: ["Checkout extensions", "Script Editor", "B2B portals"],
      },
      {
        icon: "🚀",
        iconBg: "#4f46e5",
        title: "Headless Shopify",
        description:
          "Storefront API + Hydrogen/React for a fully custom, ultra-fast front end.",
        features: ["Storefront API", "Hydrogen framework", "Custom cart logic"],
      },
    ],
  },
  {
    id: "laravel",
    label: "Laravel",
    subLabel: "SaaS, APIs & queues",
    isNew: false,
    cards: [
      {
        icon: "🏗️",
        iconBg: "#7c3aed",
        title: "SaaS Platform",
        description:
          "Multi-tenant SaaS architectures with robust auth, billing, and feature flags.",
        features: ["Multi-tenancy", "Stripe Billing", "Feature flags"],
      },
      {
        icon: "🛠️",
        iconBg: "#0e7490",
        title: "Filament Admin",
        description:
          "Beautiful, powerful admin panels with Filament v3 and custom resources.",
        features: ["Custom resources", "Advanced tables", "Role-based access"],
      },
      {
        icon: "🌐",
        iconBg: "#4f46e5",
        title: "Full-Stack Laravel",
        description:
          "Inertia.js + React/Vue for seamless full-stack apps without an API layer.",
        features: ["Inertia.js", "Livewire components", "Queue & events"],
      },
    ],
  },
  {
    id: "ai",
    label: "AI Layer",
    subLabel: "RAG, agents & LLMs",
    isNew: true,
    cards: [
      {
        icon: "🤖",
        iconBg: "#7c3aed",
        title: "AI Integration",
        description:
          "Embed LLM-powered features into your product — chat, summarisation, classification.",
        features: [
          "OpenAI / Claude",
          "Streaming responses",
          "Function calling",
        ],
      },
      {
        icon: "🔍",
        iconBg: "#0e7490",
        title: "Vector Search",
        description:
          "Semantic search and RAG pipelines using pgvector, Pinecone, or Weaviate.",
        features: ["Embedding pipeline", "Hybrid search", "Context chunking"],
      },
      {
        icon: "🧠",
        iconBg: "#4f46e5",
        title: "Autonomous Agents",
        description:
          "Multi-step AI agents with tool use, memory, and human-in-the-loop checkpoints.",
        features: ["LangGraph / CrewAI", "Tool calling", "Long-term memory"],
      },
    ],
  },
  {
    id: "cms",
    label: "Headless CMS",
    subLabel: "Sanity, Payload & more",
    isNew: true,
    cards: [
      {
        icon: "📝",
        iconBg: "#7c3aed",
        title: "Sanity.io",
        description:
          "Structured content with Sanity Studio, GROQ queries, and real-time collaboration.",
        features: ["Custom schemas", "GROQ & CDN", "Live preview"],
      },
      {
        icon: "📦",
        iconBg: "#0e7490",
        title: "Payload CMS",
        description:
          "Code-first headless CMS with TypeScript, access control, and REST/GraphQL APIs.",
        features: ["TypeScript config", "Access control", "Local API"],
      },
      {
        icon: "🔄",
        iconBg: "#4f46e5",
        title: "Content Workflows",
        description:
          "Editorial workflows, scheduling, preview environments, and CDN invalidation.",
        features: ["Draft & publish", "Scheduled content", "Webhooks"],
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    subLabel: "React Native & Expo",
    isNew: true,
    cards: [
      {
        icon: "📱",
        iconBg: "#7c3aed",
        title: "RN App",
        description:
          "Cross-platform iOS & Android apps with React Native, sharing logic with your web stack.",
        features: ["iOS & Android", "Shared codebase", "Native modules"],
      },
      {
        icon: "🔧",
        iconBg: "#0e7490",
        title: "EAS Pipeline",
        description:
          "Automated build & submission pipeline with Expo Application Services.",
        features: ["EAS Build", "OTA updates", "App store submission"],
      },
      {
        icon: "✨",
        iconBg: "#4f46e5",
        title: "Native UI",
        description:
          "Polished native-feel interfaces with Reanimated 3, gesture handling, and haptics.",
        features: ["Reanimated 3", "Gesture Handler", "Haptic feedback"],
      },
    ],
  },
];

export function VerticalTabSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      style={{ background: "#0a0e1a" }}
      className="relative overflow-hidden py-24 px-4"
    >
      {/* Background gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(124,58,237,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 60%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            className="mb-4 text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "#00d4ff" }}
          >
            02 — SPECIALISATIONS
          </p>
          <h2
            className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "#f0f4ff",
            }}
          >
            What we do{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #00d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              best.
            </span>
          </h2>
        </motion.div>

        {/* Layout: vertical tabs + cards */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Vertical tab nav */}
          <motion.nav
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 overflow-x-auto pb-2 lg:w-64 lg:flex-shrink-0 lg:flex-col lg:overflow-x-visible lg:pb-0"
            data-ocid="vtab.tab"
          >
            {tabs.map((tab, index) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(index)}
                data-ocid={`vtab.tab.${index + 1}`}
                className="relative flex-shrink-0 rounded-xl px-4 py-4 text-left transition-all duration-200 lg:flex-shrink"
                style={{
                  background:
                    activeTab === index
                      ? "rgba(124,58,237,0.15)"
                      : "rgba(255,255,255,0.03)",
                  border:
                    activeTab === index
                      ? "1px solid rgba(124,58,237,0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                  minWidth: "140px",
                }}
              >
                {/* Active left bar — desktop only */}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-3 bottom-3 hidden w-0.5 rounded-full lg:block"
                    style={{
                      background: "linear-gradient(180deg, #7c3aed, #00d4ff)",
                    }}
                  />
                )}
                <span
                  className="block text-sm font-semibold"
                  style={{
                    color:
                      activeTab === index
                        ? "#f0f4ff"
                        : "rgba(240,244,255,0.55)",
                  }}
                >
                  {tab.label}
                  {tab.isNew && (
                    <Badge
                      className="ml-2 text-[10px] py-0 px-1.5"
                      style={{
                        background: "rgba(124,58,237,0.3)",
                        color: "#a78bfa",
                        border: "1px solid rgba(124,58,237,0.4)",
                      }}
                    >
                      NEW
                    </Badge>
                  )}
                </span>
                <span
                  className="mt-0.5 hidden text-xs lg:block"
                  style={{ color: "rgba(240,244,255,0.35)" }}
                >
                  {tab.subLabel}
                </span>
              </button>
            ))}
          </motion.nav>

          {/* Card area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {tabs[activeTab].cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex flex-col rounded-2xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    data-ocid={`vtab.card.${i + 1}`}
                  >
                    {/* Icon */}
                    <div
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                      style={{
                        background: `${card.iconBg}33`,
                        border: `1px solid ${card.iconBg}55`,
                      }}
                    >
                      {card.icon}
                    </div>

                    <h3
                      className="mb-2 text-base font-bold"
                      style={{ color: "#f0f4ff" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="mb-4 text-sm leading-relaxed"
                      style={{ color: "rgba(240,244,255,0.55)" }}
                    >
                      {card.description}
                    </p>

                    <ul className="mt-auto space-y-1.5">
                      {card.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs"
                          style={{ color: "rgba(240,244,255,0.45)" }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ background: "#7c3aed" }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
