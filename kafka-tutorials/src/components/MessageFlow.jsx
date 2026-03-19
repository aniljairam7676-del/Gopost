import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const MessageFlow = ({
  startFrame = 0,
  messages = [],
  fromX,
  fromY,
  toX,
  toY,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {messages.map((msg, i) => {
        const msgStart = startFrame + i * 15;
        const relativeFrame = frame - msgStart;
        if (relativeFrame < 0) return null;

        const progress = interpolate(relativeFrame, [0, 30], [0, 1], {
          extrapolateRight: "clamp",
        });

        const x = interpolate(progress, [0, 1], [fromX, toX]);
        const y = interpolate(progress, [0, 1], [fromY, toY]);

        const opacity =
          progress > 0.9
            ? interpolate(progress, [0.9, 1], [1, 0], { extrapolateRight: "clamp" })
            : interpolate(progress, [0, 0.1], [0, 1], { extrapolateLeft: "clamp" });

        return (
          <div
            key={`${msg}-${i}`}
            style={{
              position: "absolute",
              left: x - 15,
              top: y - 15,
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "#FF7043",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity,
              boxShadow: "0 2px 8px rgba(255,112,67,0.5)",
            }}
          >
            <span style={{ color: "#FFF", fontSize: 12, fontWeight: "bold" }}>
              {msg}
            </span>
          </div>
        );
      })}
    </>
  );
};
