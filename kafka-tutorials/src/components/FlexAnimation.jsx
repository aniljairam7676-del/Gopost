import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const FlexAnimation = ({
  children,
  startFrame = 0,
  x = 0,
  y = 0,
  overshoot = 1.3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  // Overshoot spring — goes past 1.0 then bounces back
  const flexScale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 6, stiffness: 180, mass: 0.8, overshootClamping: false },
  });

  const opacity = interpolate(relativeFrame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (relativeFrame < 0) return null;

  // Flash effect on entry
  const flashOpacity = interpolate(relativeFrame, [0, 5, 15], [0, 0.6, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${flexScale})`,
        transformOrigin: "center center",
        opacity,
      }}
    >
      {/* Flash glow */}
      {flashOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,215,0,${flashOpacity}) 0%, transparent 70%)`,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      )}
      {children}
    </div>
  );
};
