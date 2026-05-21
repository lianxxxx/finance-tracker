import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Trackr — Know where your money actually goes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #dbeafe 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontStyle: "italic",
            color: "#93c5fd",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Trackr
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            color: "#0f172a",
            fontFamily: "sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Know where your money actually goes.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#64748b",
            fontFamily: "sans-serif",
          }}
        >
          Personal finance tracker · Philippines
        </div>
      </div>
    ),
    { ...size },
  );
}
