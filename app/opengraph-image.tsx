import { ImageResponse } from "next/og";

export const alt = "Boctrust Microfinance Bank: Banking for growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#142B45", padding: 70, color: "white" }}>
      <div style={{ fontSize: 34, color: "#E5C367", fontWeight: 700 }}>Boctrust Microfinance Bank Limited</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 900, lineHeight: 1, letterSpacing: -5 }}>
        <span>Banking for</span>
        <span style={{ color: "#E5C367" }}>growth.</span>
      </div>
    </div>,
    size,
  );
}
