import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Title } from "../components/Title";

const KafkaLogo = ({ frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  return (
    <div
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #000000, #333333)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
        border: "3px solid #FFB300",
      }}
    >
      <span style={{ color: "#FFF", fontSize: 48, fontWeight: "bold" }}>K</span>
    </div>
  );
};

const BulletPoint = ({ text, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideX = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${interpolate(slideX, [0, 1], [-50, 0])}px)`,
        fontSize: 28,
        color: "#E0E0E0",
        fontFamily: "Arial, sans-serif",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 15,
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#FFB300",
          flexShrink: 0,
        }}
      />
      {text}
    </div>
  );
};

export const KafkaIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0D1B2A, #1B2838, #2C3E50)",
      }}
    >
      {/* Title Scene */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <KafkaLogo frame={frame} fps={fps} />
          <Title
            text="What is Apache Kafka?"
            subtitle="A Distributed Event Streaming Platform"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Key Features */}
      <Sequence from={90} durationInFrames={210}>
        <AbsoluteFill style={{ padding: "80px 150px" }}>
          <h2
            style={{
              fontSize: 48,
              color: "#FFB300",
              fontFamily: "Arial, sans-serif",
              marginBottom: 50,
              opacity: interpolate(frame - 90, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Why Kafka?
          </h2>

          <BulletPoint
            text="High throughput — millions of messages per second"
            startFrame={110}
          />
          <BulletPoint
            text="Distributed & fault-tolerant across multiple brokers"
            startFrame={140}
          />
          <BulletPoint
            text="Durable storage with configurable retention"
            startFrame={170}
          />
          <BulletPoint
            text="Real-time stream processing capabilities"
            startFrame={200}
          />
          <BulletPoint
            text="Used by LinkedIn, Netflix, Uber, and thousands more"
            startFrame={230}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
