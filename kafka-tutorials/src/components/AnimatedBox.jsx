import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const AnimatedBox = ({
  children,
  startFrame = 0,
  color = "#1E88E5",
  width = 200,
  height = 120,
  x = 0,
  y = 0,
  borderRadius = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        backgroundColor: color,
        borderRadius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        padding: 12,
      }}
    >
      <span
        style={{
          color: "#FFFFFF",
          fontSize: 18,
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {children}
      </span>
    </div>
  );
};
