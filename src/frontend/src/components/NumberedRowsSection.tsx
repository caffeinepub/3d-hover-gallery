export function NumberedRowsSection() {
  const rows = [
    {
      num: "01",
      title: "Global Development Reach",
      stat: "120+ Countries Served",
    },
    { num: "02", title: "Rapid Deployment", stat: "48-Hour Turnaround" },
    {
      num: "03",
      title: "Quality Assurance",
      stat: "99.8% Client Satisfaction",
    },
    {
      num: "04",
      title: "Proven Track Record",
      stat: "200+ Projects Delivered",
    },
    { num: "05", title: "Deep Expertise", stat: "8 Years Experience" },
  ];

  return (
    <section
      style={{
        background: "#f8f7f4",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        padding: "80px 0 0",
      }}
    >
      {/* Outline Headline */}
      <div
        style={{ padding: "0 60px 60px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2
          style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "2px #1a1a1a",
            margin: 0,
          }}
        >
          Why Choose Us?
        </h2>
      </div>

      {/* Numbered Rows */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {rows.map((row) => (
          <div
            key={row.num}
            data-ocid={`numbered.item.${row.num}`}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "28px 60px",
              borderBottom: "1px solid #e0ddd8",
              cursor: "default",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#fef9c3";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background =
                "transparent";
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 800,
                color: "#d0cdc8",
                minWidth: "80px",
                letterSpacing: "-0.02em",
              }}
            >
              {row.num}
            </span>

            <span
              style={{
                flex: 1,
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                fontWeight: 600,
                color: "#1a1a1a",
                letterSpacing: "-0.01em",
              }}
            >
              {row.title}
            </span>

            <span
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
                fontWeight: 700,
                background: "#1a1a1a",
                color: "#f8f7f4",
                padding: "6px 18px",
                borderRadius: "100px",
                whiteSpace: "nowrap",
              }}
            >
              {row.stat}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom CTA Bar */}
      <div
        style={{
          background: "#1a1a1a",
          marginTop: "80px",
          padding: "48px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to start your project?
          </p>
          <p style={{ color: "#888", margin: "8px 0 0", fontSize: "1rem" }}>
            Let's build something remarkable together.
          </p>
        </div>
        <button
          type="button"
          data-ocid="numbered.primary_button"
          style={{
            background: "#ffffff",
            color: "#1a1a1a",
            border: "none",
            padding: "14px 36px",
            fontSize: "1rem",
            fontWeight: 700,
            borderRadius: "100px",
            cursor: "pointer",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.04)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 32px rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          Start a Project →
        </button>
      </div>
    </section>
  );
}
