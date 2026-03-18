import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const SpeechBubble = ({
  text,
  startFrame = 0,
  x = 0,
  y = 0,
  maxWidth = 350,
  color = "#FFF",
  textColor = "#333",
  fontSize = 18,
  tailDirection = "bottom-left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.6 },
  });

  const opacity = interpolate(relativeFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (relativeFrame < 0) return null;

  const tailStyles = {
    "bottom-left": { bottom: -10, left: 20, borderTop: `10px solid ${color}` },
    "bottom-right": { bottom: -10, right: 20, borderTop: `10px solid ${color}` },
    "top-left": { top: -10, left: 20, borderBottom: `10px solid ${color}` },
    "top-right": { top: -10, right: 20, borderBottom: `10px solid ${color}` },
  };

  const tail = tailStyles[tailDirection] || tailStyles["bottom-left"];

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: tailDirection.includes("bottom") ? "bottom left" : "top left",
        opacity,
        zIndex: 20,
      }}
    >
      <div
        style={{
          backgroundColor: color,
          borderRadius: 16,
          padding: "14px 20px",
          maxWidth,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            ...tail,
          }}
        />
        <span
          style={{
            color: textColor,
            fontSize,
            fontFamily: "Arial, sans-serif",
            fontWeight: "600",
            lineHeight: 1.5,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
