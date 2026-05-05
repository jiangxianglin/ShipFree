import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 55%, #f59e0b 100%)",
          color: "#ffffff",
          borderRadius: "8px",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: "Arial, sans-serif",
        }}
      >
        IB
      </div>
    ),
    {
      ...size,
    }
  );
}
