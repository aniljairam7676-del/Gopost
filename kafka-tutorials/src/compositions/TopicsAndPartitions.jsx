import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Title } from "../components/Title";
import { AnimatedBox } from "../components/AnimatedBox";

const Partition = ({ index, startFrame, x, y, messages = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          backgroundColor: "#1565C0",
          borderRadius: 8,
          padding: "10px 16px",
          marginBottom: 8,
          color: "#FFF",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Partition {index}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {messages.map((msg, i) => {
          const msgFrame = startFrame + 20 + i * 10;
          const msgRelative = frame - msgFrame;
          if (msgRelative < 0) return null;

          const msgOpacity = interpolate(msgRelative, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                width: 50,
                height: 40,
                backgroundColor: `hsl(${200 + i * 15}, 70%, ${45 + i * 5}%)`,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: msgOpacity,
                fontSize: 12,
                color: "#FFF",
                fontFamily: "monospace",
              }}
            >
              {msg}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TopicsAndPartitions = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0D1B2A, #1B2838, #2C3E50)",
      }}
    >
      {/* Title */}
      <Sequence from={0} durationInFrames={80}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title
            text="Topics & Partitions"
            subtitle="How Kafka organizes data"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Topic Explanation */}
      <Sequence from={80} durationInFrames={160}>
        <AbsoluteFill style={{ padding: "60px 100px" }}>
          <h2
            style={{
              fontSize: 42,
              color: "#FFB300",
              fontFamily: "Arial, sans-serif",
              marginBottom: 30,
              opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            A Topic is like a category or feed name
          </h2>

          {/* Topic box */}
          <AnimatedBox
            startFrame={95}
            color="#0D47A1"
            width={1720}
            height={500}
            x={0}
            y={130}
            borderRadius={16}
          >
            {""}
          </AnimatedBox>

          {/* Topic label */}
          {frame >= 100 && (
            <div
              style={{
                position: "absolute",
                left: 130,
                top: 210,
                color: "#FFB300",
                fontSize: 28,
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                opacity: interpolate(frame - 100, [0, 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              Topic: "user-events"
            </div>
          )}

          {/* Partitions */}
          <Partition
            index={0}
            startFrame={120}
            x={130}
            y={290}
            messages={["e1", "e2", "e3", "e4", "e5"]}
          />
          <Partition
            index={1}
            startFrame={140}
            x={130}
            y={400}
            messages={["e6", "e7", "e8", "e9"]}
          />
          <Partition
            index={2}
            startFrame={160}
            x={130}
            y={510}
            messages={["e10", "e11", "e12"]}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Key Concepts */}
      <Sequence from={250} durationInFrames={200}>
        <AbsoluteFill style={{ padding: "80px 150px" }}>
          <h2
            style={{
              fontSize: 42,
              color: "#FFB300",
              fontFamily: "Arial, sans-serif",
              marginBottom: 40,
            }}
          >
            Key Concepts
          </h2>
          {[
            { text: "Each partition is an ordered, immutable log", f: 260 },
            { text: "Messages have offsets — sequential IDs", f: 285 },
            { text: "Partitions enable parallel processing", f: 310 },
            { text: "Keys determine partition assignment", f: 335 },
          ].map(({ text, f }) => {
            const rel = frame - f;
            if (rel < 0) return null;
            return (
              <p
                key={text}
                style={{
                  fontSize: 28,
                  color: "#E0E0E0",
                  fontFamily: "Arial, sans-serif",
                  marginBottom: 25,
                  opacity: interpolate(rel, [0, 15], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  paddingLeft: 30,
                  borderLeft: "4px solid #1E88E5",
                }}
              >
                {text}
              </p>
            );
          })}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
