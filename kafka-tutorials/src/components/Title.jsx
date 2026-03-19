import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const Title = ({ text, subtitle, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const titleOpacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(relativeFrame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1
        style={{
          fontSize: 72,
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "#FFFFFF",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleY, [0, 1], [50, 0])}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {text}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: 32,
            fontFamily: "Arial, sans-serif",
            color: "#B0BEC5",
            textAlign: "center",
            opacity: subtitleOpacity,
            marginTop: 10,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
