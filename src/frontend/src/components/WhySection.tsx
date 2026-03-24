import { useState } from "react";

const items = [
  {
    num: "01",
    label: "ENGINEERING",
    title: "Plugins built from scratch",
    desc: "Not Elementor widgets. Real PHP, real architecture, built to survive the next 5 WordPress updates.",
    stat: "14 yrs",
    statLabel: "of custom builds",
  },
  {
    num: "02",
    label: "STOREFRONTS",
    title: "Themes no one can copy",
    desc: "We build custom Shopify themes and headless storefronts that no competitor can replicate from a theme marketplace.",
    stat: "200+",
    statLabel: "stores launched",
  },
  {
    num: "03",
    label: "SYSTEMS",
    title: "Workflow that fits you",
    desc: "If your business process lives in WhatsApp groups and spreadsheets, we build the system that replaces all of that.",
    stat: "100%",
    statLabel: "custom logic",
  },
  {
    num: "04",
    label: "TEAM",
    title: "Offshore cost, not quality",
    desc: "Gujarat-based team. IST timezone. English fluent. 14 years of institutional product memory.",
    stat: "IST",
    statLabel: "timezone aligned",
  },
];

function Row({ item }: { item: (typeof items)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="why-row"
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr 1fr 120px",
        alignItems: "center",
        gap: "clamp(16px, 3vw, 48px)",
        padding: "36px 0",
        borderBottom: "1px solid #D4D4CF",
        background: hovered ? "#EEEEE9" : "transparent",
        transition: "background 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#AAAAAA",
        }}
      >
        {item.num}
      </span>

      <div>
        <span
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            background: "#0D0D0D",
            color: "#F7F7F5",
            padding: "3px 8px",
            borderRadius: 3,
            marginBottom: 10,
          }}
        >
          {item.label}
        </span>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(18px, 2vw, 24px)",
            fontWeight: 700,
            color: "#0D0D0D",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {item.title}
        </p>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.75,
          color: "#666",
        }}
      >
        {item.desc}
      </p>

      <div style={{ textAlign: "right" }}>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 800,
            color: "#0D0D0D",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {item.stat}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 11,
            color: "#999",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {item.statLabel}
        </p>
      </div>
    </div>
  );
}

export function WhySection() {
  return (
    <section
      style={{
        background: "#F7F7F5",
        padding: "120px clamp(24px, 7vw, 100px) 80px",
        fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 80,
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(48px, 6vw, 88px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#0D0D0D",
              maxWidth: 580,
            }}
          >
            Why not just
            <br />
            <span
              style={{
                WebkitTextStroke: "2px #0D0D0D",
                color: "transparent",
              }}
            >
              hire anyone?
            </span>
          </h2>

          <p
            style={{
              margin: 0,
              maxWidth: 320,
              fontSize: 15,
              lineHeight: 1.8,
              color: "#666",
              alignSelf: "flex-end",
            }}
          >
            Most agencies give you a theme with your logo on it. We build with
            intent — custom everything, no templates.
          </p>
        </div>

        <div style={{ height: 1, background: "#D4D4CF" }} />

        {items.map((item) => (
          <Row key={item.num} item={item} />
        ))}

        <div
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(20px, 2.5vw, 30px)",
              fontWeight: 700,
              color: "#0D0D0D",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to work with intent?
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#0D0D0D",
              color: "#F7F7F5",
              padding: "14px 28px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Start a project <span style={{ fontSize: 18 }}>→</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-row {
            grid-template-columns: 40px 1fr !important;
          }
          .why-row > *:nth-child(3) {
            grid-column: 2;
          }
          .why-row > *:nth-child(4) {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
