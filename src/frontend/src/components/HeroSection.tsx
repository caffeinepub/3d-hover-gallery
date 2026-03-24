import { ArrowRight, BarChart3, Globe, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CardId = 1 | 2 | 3;
type FlipState = "idle" | "flipping-out" | "flipping-in";

const CARD_IMAGES: Record<0 | CardId, string> = {
  0: "/assets/generated/hero-default.dim_900x600.jpg",
  1: "/assets/generated/hero-card1.dim_900x600.jpg",
  2: "/assets/generated/hero-card2.dim_900x600.jpg",
  3: "/assets/generated/hero-card3.dim_900x600.jpg",
};

const CARDS = [
  {
    id: 1 as CardId,
    icon: Globe,
    title: "Global Reach",
    description:
      "Deploy across 120+ edge locations worldwide with sub-10ms latency to any user, anywhere on the planet.",
    color: "#2FD0C8",
  },
  {
    id: 2 as CardId,
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Process millions of events per second with live dashboards, intelligent anomaly detection, and predictive insights.",
    color: "#38E08A",
  },
  {
    id: 3 as CardId,
    icon: Shield,
    title: "Edge Security",
    description:
      "Zero-trust architecture with AI-driven threat detection, DDoS mitigation, and end-to-end encrypted tunnels.",
    color: "#2B86FF",
  },
];

const CORNER_BRACKETS = [
  {
    id: "tl",
    top: "12px",
    left: "12px",
    style: {
      borderTop: "2px solid var(--cyan)",
      borderLeft: "2px solid var(--cyan)",
      borderRadius: "2px 0 0 0",
    },
  },
  {
    id: "tr",
    top: "12px",
    right: "12px",
    style: {
      borderTop: "2px solid var(--cyan)",
      borderRight: "2px solid var(--cyan)",
      borderRadius: "0 2px 0 0",
    },
  },
  {
    id: "bl",
    bottom: "12px",
    left: "12px",
    style: {
      borderBottom: "2px solid var(--cyan)",
      borderLeft: "2px solid var(--cyan)",
      borderRadius: "0 0 0 2px",
    },
  },
  {
    id: "br",
    bottom: "12px",
    right: "12px",
    style: {
      borderBottom: "2px solid var(--cyan)",
      borderRight: "2px solid var(--cyan)",
      borderRadius: "0 0 2px 0",
    },
  },
];

const TRUST_AVATARS = [
  { id: "global", color: "#2FD0C8", letter: "G" },
  { id: "analytics", color: "#2B86FF", letter: "A" },
  { id: "security", color: "#38E08A", letter: "S" },
];

export function HeroSection() {
  const [activeCard, setActiveCard] = useState<CardId | null>(null);
  const [displayedSrc, setDisplayedSrc] = useState(CARD_IMAGES[0]);
  const [flipState, setFlipState] = useState<FlipState>("idle");
  const t1Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayedSrcRef = useRef(displayedSrc);
  const flipStateRef = useRef(flipState);

  useEffect(() => {
    displayedSrcRef.current = displayedSrc;
  }, [displayedSrc]);

  useEffect(() => {
    flipStateRef.current = flipState;
  }, [flipState]);

  useEffect(() => {
    const newSrc = activeCard ? CARD_IMAGES[activeCard] : CARD_IMAGES[0];
    if (newSrc === displayedSrcRef.current && flipStateRef.current === "idle")
      return;
    if (t1Ref.current) clearTimeout(t1Ref.current);
    if (t2Ref.current) clearTimeout(t2Ref.current);
    const pending = newSrc;
    setFlipState("flipping-out");
    t1Ref.current = setTimeout(() => {
      setDisplayedSrc(pending);
      setFlipState("flipping-in");
      t2Ref.current = setTimeout(() => setFlipState("idle"), 270);
    }, 270);
    return () => {
      if (t1Ref.current) clearTimeout(t1Ref.current);
      if (t2Ref.current) clearTimeout(t2Ref.current);
    };
  }, [activeCard]);

  const imgClass = [
    flipState === "flipping-out" ? "hero-img-flip-out flip-paused" : "",
    flipState === "flipping-in" ? "hero-img-flip-in flip-paused" : "",
    flipState === "idle" ? "hero-image-float" : "",
  ]
    .join(" ")
    .trim();

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--navy-deep)" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(oklch(0.78 0.14 195 / 0.05) 1px, transparent 1px)",
            "linear-gradient(90deg, oklch(0.78 0.14 195 / 0.05) 1px, transparent 1px)",
            "linear-gradient(oklch(0.55 0.20 255 / 0.03) 2px, transparent 2px)",
            "linear-gradient(90deg, oklch(0.55 0.20 255 / 0.03) 2px, transparent 2px)",
          ].join(", "),
          backgroundSize: "40px 40px, 40px 40px, 200px 200px, 200px 200px",
        }}
      />
      {/* Radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.55 0.20 255 / 0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 60% at 15% 85%, oklch(0.78 0.14 195 / 0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 40% at 85% 70%, oklch(0.76 0.18 150 / 0.05) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* NAV */}
      <header
        className="relative z-10 flex items-center justify-between px-8 py-5 border-b"
        style={{ borderColor: "oklch(0.78 0.14 195 / 0.15)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "var(--cyan)",
              boxShadow: "0 0 16px oklch(0.78 0.14 195 / 0.6)",
            }}
          >
            <Zap size={16} color="#07121E" />
          </div>
          <span
            className="font-display font-bold text-lg tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            EDGECORE
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Platform", href: "#platform" },
            { label: "Solutions", href: "#solutions" },
            { label: "Docs", href: "#docs" },
            { label: "Pricing", href: "#pricing" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-ocid={`nav.${item.label.toLowerCase()}.link`}
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#get-started"
          data-ocid="nav.get_started.button"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: "oklch(0.78 0.14 195 / 0.15)",
            border: "1px solid oklch(0.78 0.14 195 / 0.4)",
            color: "var(--cyan)",
          }}
        >
          Get Started <ArrowRight size={14} />
        </a>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex w-fit">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase"
                  style={{
                    background: "oklch(0.78 0.14 195 / 0.1)",
                    border: "1px solid oklch(0.78 0.14 195 / 0.4)",
                    color: "var(--cyan)",
                    animation: "badge-glow 3s ease-in-out infinite",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "var(--cyan)",
                      boxShadow: "0 0 6px var(--cyan)",
                    }}
                  />
                  Edge Computing Platform
                </span>
              </div>

              <h1
                className="font-display font-black text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                Accelerate Your{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--cyan), var(--electric-blue))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Digital
                </span>{" "}
                Future
              </h1>

              <p
                className="text-base lg:text-lg leading-relaxed max-w-md"
                style={{ color: "var(--text-secondary)" }}
              >
                Deploy globally at the speed of light. Harness distributed edge
                infrastructure to deliver sub-millisecond experiences,
                intelligent analytics, and fortress-grade security — all from a
                single unified platform.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  data-ocid="hero.primary_button"
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-100"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--cyan), oklch(0.65 0.18 205))",
                    color: "#07121E",
                    boxShadow:
                      "0 0 20px oklch(0.78 0.14 195 / 0.4), 0 4px 12px oklch(0.78 0.14 195 / 0.2)",
                  }}
                >
                  Start Building
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
                <button
                  type="button"
                  data-ocid="hero.secondary_button"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-100"
                  style={{
                    background: "transparent",
                    border: "1px solid oklch(0.78 0.14 195 / 0.4)",
                    color: "var(--text-primary)",
                  }}
                >
                  View Demo
                </button>
              </div>

              <div
                className="flex gap-8 pt-4 border-t"
                style={{ borderColor: "oklch(0.78 0.14 195 / 0.12)" }}
              >
                {[
                  { value: "120+", label: "Edge Nodes" },
                  { value: "99.99%", label: "Uptime SLA" },
                  { value: "<10ms", label: "Latency" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="font-display font-bold text-xl"
                      style={{ color: "var(--cyan)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CENTER */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center order-first lg:order-none"
            >
              <div
                className="relative"
                style={{ width: "clamp(260px, 34vw, 460px)" }}
              >
                {/* Outer glow ring */}
                <div
                  className="absolute -inset-3 rounded-2xl pointer-events-none"
                  style={{
                    background: "oklch(0.78 0.14 195 / 0.04)",
                    border: "1px solid oklch(0.78 0.14 195 / 0.18)",
                    animation: "glow-pulse 4s ease-in-out infinite",
                  }}
                />

                {/* 3D image frame */}
                <div
                  className={`relative rounded-xl overflow-hidden ${imgClass}`}
                  style={{
                    border: "1px solid oklch(0.78 0.14 195 / 0.45)",
                    boxShadow: [
                      "0 0 40px oklch(0.78 0.14 195 / 0.18)",
                      "0 0 80px oklch(0.55 0.20 255 / 0.08)",
                      "inset 0 1px 0 oklch(1 0 0 / 0.08)",
                    ].join(", "),
                  }}
                >
                  <img
                    src={displayedSrc}
                    alt="Platform visualization"
                    className="w-full block"
                    style={{ aspectRatio: "3/2", objectFit: "cover" }}
                  />
                  {/* Glass sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(1 0 0 / 0.04) 0%, transparent 50%, oklch(0.78 0.14 195 / 0.04) 100%)",
                    }}
                  />
                  {/* Corner brackets */}
                  {CORNER_BRACKETS.map((corner) => (
                    <div
                      key={corner.id}
                      className="absolute w-5 h-5 pointer-events-none"
                      style={{
                        top: corner.top,
                        left: corner.left,
                        right: corner.right,
                        bottom: corner.bottom,
                        ...corner.style,
                      }}
                    />
                  ))}
                </div>

                {/* Active label */}
                {activeCard !== null && (
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap"
                    style={{
                      background: "oklch(0.78 0.14 195 / 0.15)",
                      border: "1px solid oklch(0.78 0.14 195 / 0.5)",
                      color: "var(--cyan)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {CARDS.find((c) => c.id === activeCard)?.title}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              {CARDS.map((card, i) => {
                const Icon = card.icon;
                const isActive = activeCard === card.id;
                return (
                  <motion.div
                    key={card.id}
                    data-ocid={`hero.card.${i + 1}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                    onMouseEnter={() => setActiveCard(card.id)}
                    onMouseLeave={() => setActiveCard(null)}
                    className="relative rounded-2xl p-5 cursor-pointer transition-all duration-300"
                    style={{
                      background: isActive
                        ? "oklch(0.22 0.04 225 / 0.9)"
                        : "oklch(0.16 0.03 225 / 0.7)",
                      border: isActive
                        ? `1px solid ${card.color}88`
                        : "1px solid oklch(0.28 0.04 225 / 0.8)",
                      boxShadow: isActive
                        ? `0 0 20px ${card.color}33, 0 4px 16px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.05)`
                        : "0 2px 8px oklch(0 0 0 / 0.3)",
                      transform: isActive
                        ? "perspective(600px) translateZ(8px) translateY(-4px)"
                        : "perspective(600px) translateZ(0px) translateY(0px)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                        }}
                      />
                    )}
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-300"
                        style={{
                          background: `${card.color}18`,
                          border: `1px solid ${card.color}44`,
                          boxShadow: isActive
                            ? `0 0 14px ${card.color}44`
                            : "none",
                        }}
                      >
                        <Icon size={18} style={{ color: card.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-display font-bold text-sm uppercase tracking-wide mb-1.5 transition-colors duration-300"
                          style={{
                            color: isActive
                              ? card.color
                              : "var(--text-primary)",
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {card.description}
                        </p>
                        <button
                          type="button"
                          data-ocid={`hero.card.${i + 1}.link`}
                          className="inline-flex items-center gap-1 mt-3 text-xs font-semibold transition-all duration-200 bg-transparent border-none p-0 cursor-pointer"
                          style={{
                            color: isActive
                              ? card.color
                              : "oklch(0.55 0.04 220)",
                          }}
                        >
                          View Details
                          <ArrowRight
                            size={12}
                            style={{
                              transform: isActive
                                ? "translateX(3px)"
                                : "translateX(0)",
                              transition: "transform 0.2s",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-2 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {TRUST_AVATARS.map((avatar) => (
                    <div
                      key={avatar.id}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold"
                      style={{
                        background: `${avatar.color}22`,
                        borderColor: `${avatar.color}88`,
                        color: avatar.color,
                        fontSize: "9px",
                      }}
                    >
                      {avatar.letter}
                    </div>
                  ))}
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Trusted by{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    2,400+
                  </strong>{" "}
                  engineering teams
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="relative z-10 text-center py-5 text-xs border-t"
        style={{
          borderColor: "oklch(0.78 0.14 195 / 0.1)",
          color: "var(--text-secondary)",
        }}
      >
        © {new Date().getFullYear()}. Built with ♥ using{" "}
        <a
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary"
          style={{ color: "var(--cyan-dim)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </section>
  );
}
