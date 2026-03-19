import { interpolate, useCurrentFrame } from "remotion";

export const ProgressBar = ({
  startFrame = 0,
  x = 0,
  y = 0,
  width = 600,
  height = 40,
  fromPercent = 0,
  toPercent = 100,
  duration = 60,
  label = "",
  color = "#FFD700",
  backgroundColor = "rgba(255,255,255,0.1)",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const progress = interpolate(relativeFrame, [0, duration], [fromPercent, toPercent], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        opacity,
      }}
    >
      {label && (
        <div
          style={{
            color: "#B0BEC5",
            fontSize: 16,
            fontFamily: "Arial, sans-serif",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      {/* Track */}
      <div
        style={{
          width: "100%",
          height,
          backgroundColor,
          borderRadius: height / 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Fill */}
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: height / 2,
            transition: "width 0.1s",
            boxShadow: `0 0 15px ${color}66`,
          }}
        />
        {/* Percentage label */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#FFF",
              fontSize: height * 0.45,
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
