import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aire It Out — Voice Journal with AI Reflections";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#FAF8F4",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Soft green glow top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse at 80% 30%, rgba(107,143,113,0.13) 0%, transparent 70%)",
          }}
        />
        {/* Soft green glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 400,
            height: 300,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(107,143,113,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Logo circle mark */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: "1.5px solid rgba(107,143,113,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#6B8F71",
            }}
          />
        </div>

        {/* App name label */}
        <div
          style={{
            fontSize: 15,
            color: "#6B8F71",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 28,
            fontFamily: "Georgia, serif",
          }}
        >
          AIRE IT OUT
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 300,
            color: "#1C1A17",
            lineHeight: 1,
            marginBottom: 28,
            textAlign: "center",
            fontFamily: "Georgia, serif",
            display: "flex",
            gap: 0,
          }}
        >
          <span>Say it.&nbsp;</span>
          <span style={{ color: "#6B8F71", fontStyle: "italic" }}>Feel it.</span>
          <span>&nbsp;Let go.</span>
        </div>

        {/* Waveform decoration */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 28,
          }}
        >
          {[4, 8, 14, 10, 18, 12, 20, 14, 16, 8, 18, 12, 10, 16, 6].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: h,
                  borderRadius: 2.5,
                  backgroundColor: "#6B8F71",
                  opacity: 0.18 + (i / 15) * 0.35,
                }}
              />
            )
          )}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#8A8078",
            fontWeight: 300,
            letterSpacing: "0.04em",
            fontFamily: "Georgia, serif",
          }}
        >
          Voice Journal with AI Reflections
        </div>

        {/* Bottom tag */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 13,
            color: "rgba(138,128,120,0.55)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "Georgia, serif",
          }}
        >
          Free on iOS &amp; Android
        </div>
      </div>
    ),
    { ...size }
  );
}
