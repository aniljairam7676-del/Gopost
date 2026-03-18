import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const Dumbbell = ({
  label = "",
  startFrame = 0,
  x = 0,
  y = 0,
  color = "#78909C",
  highlightColor = null,
  size = 1,
  failed = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const entryScale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.7 },
  });

  // Color transition for processing
  const currentColor = highlightColor
    ? interpolate(relativeFrame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      }) > 0.5
      ? highlightColor
      : color
    : color;

  if (relativeFrame < 0) return null;

  const wobble = failed ? Math.sin(relativeFrame * 0.8) * 8 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${entryScale * size}) rotate(${wobble}deg)`,
        display: "flex",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Left weight plate */}
      <div
        style={{
          width: 14,
          height: 36,
          backgroundColor: currentColor,
          borderRadius: "4px 0 0 4px",
          border: failed ? "2px solid #F44336" : "none",
        }}
      />
      {/* Bar */}
      <div
        style={{
          width: 40,
          height: 10,
          backgroundColor: "#B0BEC5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label && (
          <span
            style={{
              color: "#333",
              fontSize: 8,
              fontFamily: "monospace",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        )}
      </div>
      {/* Right weight plate */}
      <div
        style={{
          width: 14,
          height: 36,
          backgroundColor: currentColor,
          borderRadius: "0 4px 4px 0",
          border: failed ? "2px solid #F44336" : "none",
        }}
      />
      {/* Failed X marker */}
      {failed && relativeFrame > 10 && (
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#F44336",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(relativeFrame - 10, [0, 5], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span style={{ color: "#FFF", fontSize: 12, fontWeight: "bold" }}>✕</span>
        </div>
      )}
    </div>
  );
};
