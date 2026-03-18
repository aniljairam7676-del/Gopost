import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const GymStation = ({
  label,
  icon = "🏋️",
  startFrame = 0,
  x = 0,
  y = 0,
  color = "#1565C0",
  width = 200,
  height = 150,
  sublabel = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {/* Station base */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: `0 4px 20px ${color}44`,
          border: `2px solid ${color}88`,
          padding: 12,
        }}
      >
        <span style={{ fontSize: 36 }}>{icon}</span>
        <span
          style={{
            color: "#FFF",
            fontSize: 16,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 12,
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
