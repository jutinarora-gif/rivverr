import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d3742",
          color: "#eef5fb",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, opacity: 0.7, textTransform: "uppercase" }}>
          Design & development studio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 160, fontWeight: 700, lineHeight: 0.9 }}>Rivverr</div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 24, color: "#8fd3c0" }}>
            Custom websites for US businesses, from $600.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
