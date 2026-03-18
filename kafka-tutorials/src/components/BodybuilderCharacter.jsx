import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

const ACCESSORIES = {
  whistle: "🏋️",
  horn: "📢",
  dumbbell: "💪",
  clipboard: "📋",
  book: "📖",
  none: "",
};

export const BodybuilderCharacter = ({
  name,
  color = "#9C27B0",
  accessory = "none",
  startFrame = 0,
  x = 0,
  y = 0,
  scale: baseScale = 1,
  speech = "",
  speechDelay = 20,
  facing = "right",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const entryScale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 8, stiffness: 120, mass: 0.8 },
  });

  // Muscle flex bounce — overshoot effect
  const flexBounce = spring({
    frame: Math.max(0, relativeFrame - 10),
    fps,
    config: { damping: 6, stiffness: 200, mass: 0.5 },
  });

  // Idle breathing animation
  const breathe = Math.sin((relativeFrame / fps) * 2 * Math.PI) * 2;

  if (relativeFrame < 0) return null;

  const flipX = facing === "left" ? -1 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${entryScale * baseScale}) scaleX(${flipX})`,
        transformOrigin: "center bottom",
      }}
    >
      {/* Body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Head */}
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#FFCC80",
            border: `3px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Eyes */}
          <div style={{ display: "flex", gap: 8, marginTop: -4 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#333",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#333",
              }}
            />
          </div>
          {/* Mouth — grin */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: 16,
              height: 8,
              borderBottom: "3px solid #333",
              borderRadius: "0 0 10px 10px",
            }}
          />
          {/* Headband */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: -2,
              right: -2,
              height: 8,
              backgroundColor: color,
              borderRadius: 4,
              opacity: 0.9,
            }}
          />
        </div>

        {/* Torso */}
        <div
          style={{
            width: 70 + flexBounce * 5,
            height: 60 + breathe,
            backgroundColor: color,
            borderRadius: "12px 12px 8px 8px",
            marginTop: -5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: `0 2px 10px ${color}66`,
          }}
        >
          {/* Accessory icon */}
          <span
            style={{
              fontSize: 24,
              transform: `scaleX(${flipX})`,
            }}
          >
            {ACCESSORIES[accessory] || ""}
          </span>
        </div>

        {/* Arms */}
        <div
          style={{
            position: "absolute",
            top: 55,
            left: -15,
            width: 20 + flexBounce * 3,
            height: 45,
            backgroundColor: "#FFCC80",
            borderRadius: 10,
            transform: `rotate(${15 + flexBounce * 5}deg)`,
            transformOrigin: "top center",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 55,
            right: -15,
            width: 20 + flexBounce * 3,
            height: 45,
            backgroundColor: "#FFCC80",
            borderRadius: 10,
            transform: `rotate(${-15 - flexBounce * 5}deg)`,
            transformOrigin: "top center",
          }}
        />

        {/* Legs */}
        <div style={{ display: "flex", gap: 6, marginTop: -2 }}>
          <div
            style={{
              width: 22,
              height: 40,
              backgroundColor: "#37474F",
              borderRadius: "0 0 8px 8px",
            }}
          />
          <div
            style={{
              width: 22,
              height: 40,
              backgroundColor: "#37474F",
              borderRadius: "0 0 8px 8px",
            }}
          />
        </div>

        {/* Name tag */}
        <div
          style={{
            marginTop: 8,
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "4px 12px",
            borderRadius: 6,
            transform: `scaleX(${flipX})`,
          }}
        >
          <span
            style={{
              color: "#FFF",
              fontSize: 13,
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        </div>
      </div>

      {/* Speech bubble */}
      {speech && relativeFrame >= speechDelay && (
        <SpeechBubbleInline
          text={speech}
          frame={relativeFrame - speechDelay}
          flipX={flipX}
        />
      )}
    </div>
  );
};

const SpeechBubbleInline = ({ text, frame, flipX }) => {
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 10], [0.5, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: -30,
        left: 80,
        transform: `scale(${scale}) scaleX(${flipX})`,
        transformOrigin: "bottom left",
        opacity,
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: "10px 16px",
        maxWidth: 280,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 10,
      }}
    >
      {/* Triangle */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: 10,
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid #FFF",
        }}
      />
      <span
        style={{
          color: "#333",
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
          fontWeight: "600",
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};
