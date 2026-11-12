import { ImageResponse } from "next/og";

export const alt = "Cheetah by Boctrust: quick on payments, patient with savings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#33608F", padding: 70, color: "white" }}>
      <div style={{ fontSize: 40, fontWeight: 800 }}>Cheetah by Boctrust</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 900, lineHeight: 1.02, letterSpacing: -4 }}>
        <span>Quick on payments.</span>
        <span style={{ color: "#E2C36B" }}>Patient with savings.</span>
      </div>
    </div>,
    size,
  );
}
