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
import { Arrow } from "../components/Arrow";

const InfoCard = ({ title, description, startFrame, x, y }) => {
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
        width: 380,
        transform: `scale(${scale})`,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 24,
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <h3
        style={{
          color: "#FFB300",
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "#B0BEC5",
          fontSize: 17,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const ConsumerGroups = () => {
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
            text="Consumer Groups"
            subtitle="Scaling consumption with load balancing"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Diagram: partitions -> consumer group */}
      <Sequence from={80} durationInFrames={180}>
        <AbsoluteFill>
          {/* Partitions on the left */}
          {[0, 1, 2, 3].map((i) => (
            <AnimatedBox
              key={`p-${i}`}
              startFrame={85 + i * 8}
              color={`hsl(${210 + i * 10}, 60%, 40%)`}
              width={200}
              height={65}
              x={200}
              y={230 + i * 100}
              borderRadius={8}
            >
              Partition {i}
            </AnimatedBox>
          ))}

          {/* Consumer Group box */}
          <AnimatedBox
            startFrame={120}
            color="rgba(255,179,0,0.15)"
            width={420}
            height={430}
            x={900}
            y={210}
            borderRadius={16}
          >
            {""}
          </AnimatedBox>

          {frame >= 125 && (
            <div
              style={{
                position: "absolute",
                left: 1010,
                top: 225,
                color: "#FFB300",
                fontSize: 22,
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                opacity: interpolate(frame - 125, [0, 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              Consumer Group A
            </div>
          )}

          {/* Consumers inside group */}
          {[0, 1].map((i) => (
            <AnimatedBox
              key={`c-${i}`}
              startFrame={135 + i * 10}
              color="#E65100"
              width={180}
              height={60}
              x={1020}
              y={310 + i * 120}
              borderRadius={8}
            >
              Consumer {i + 1}
            </AnimatedBox>
          ))}

          {/* Arrows: partitions to consumers */}
          <Arrow startFrame={155} fromX={400} fromY={262} toX={1020} toY={340} color="#66BB6A" />
          <Arrow startFrame={160} fromX={400} fromY={362} toX={1020} toY={340} color="#66BB6A" />
          <Arrow startFrame={165} fromX={400} fromY={462} toX={1020} toY={460} color="#FF8A65" />
          <Arrow startFrame={170} fromX={400} fromY={562} toX={1020} toY={460} color="#FF8A65" />

          {/* Labels */}
          {frame >= 175 && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 500,
                  top: 700,
                  fontSize: 22,
                  color: "#B0BEC5",
                  fontFamily: "Arial, sans-serif",
                  textAlign: "center",
                  opacity: interpolate(frame - 175, [0, 15], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                Each partition is consumed by exactly one consumer in the group
              </div>
            </>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Key points */}
      <Sequence from={270} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "60px 100px" }}>
          <h2
            style={{
              fontSize: 42,
              color: "#FFB300",
              fontFamily: "Arial, sans-serif",
              marginBottom: 30,
            }}
          >
            How Consumer Groups Work
          </h2>

          <InfoCard
            title="Load Balancing"
            description="Partitions are distributed among consumers in a group. Adding more consumers increases throughput."
            startFrame={280}
            x={100}
            y={180}
          />
          <InfoCard
            title="Rebalancing"
            description="When a consumer joins or leaves, Kafka automatically redistributes partitions across the remaining consumers."
            startFrame={295}
            x={530}
            y={180}
          />
          <InfoCard
            title="Offset Tracking"
            description="Each consumer group tracks its own offset per partition, enabling independent progress."
            startFrame={310}
            x={960}
            y={180}
          />
          <InfoCard
            title="Multiple Groups"
            description="Different consumer groups can independently read the same topic — like independent subscribers."
            startFrame={325}
            x={1390}
            y={180}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
