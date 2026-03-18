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
import { MessageFlow } from "../components/MessageFlow";

export const ProducersAndConsumers = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
            text="Producers & Consumers"
            subtitle="The data pipeline in action"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Diagram */}
      <Sequence from={80} durationInFrames={340}>
        <AbsoluteFill>
          {/* Producer boxes */}
          <AnimatedBox
            startFrame={80}
            color="#43A047"
            width={220}
            height={80}
            x={100}
            y={250}
          >
            Producer A
          </AnimatedBox>
          <AnimatedBox
            startFrame={90}
            color="#2E7D32"
            width={220}
            height={80}
            x={100}
            y={380}
          >
            Producer B
          </AnimatedBox>
          <AnimatedBox
            startFrame={100}
            color="#1B5E20"
            width={220}
            height={80}
            x={100}
            y={510}
          >
            Producer C
          </AnimatedBox>

          {/* Kafka Broker */}
          <AnimatedBox
            startFrame={115}
            color="#0D47A1"
            width={350}
            height={380}
            x={780}
            y={190}
            borderRadius={16}
          >
            {""}
          </AnimatedBox>

          {frame >= 120 && (
            <div
              style={{
                position: "absolute",
                left: 870,
                top: 210,
                color: "#FFB300",
                fontSize: 24,
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                opacity: interpolate(frame - 120, [0, 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              Kafka Broker
            </div>
          )}

          {/* Topic partitions inside broker */}
          {[0, 1, 2].map((i) => (
            <AnimatedBox
              key={i}
              startFrame={130 + i * 10}
              color={`hsl(${210 + i * 10}, 60%, ${35 + i * 5}%)`}
              width={280}
              height={70}
              x={815}
              y={270 + i * 90}
              borderRadius={8}
            >
              Partition {i}
            </AnimatedBox>
          ))}

          {/* Consumer boxes */}
          <AnimatedBox
            startFrame={170}
            color="#E65100"
            width={220}
            height={80}
            x={1550}
            y={280}
          >
            Consumer X
          </AnimatedBox>
          <AnimatedBox
            startFrame={180}
            color="#BF360C"
            width={220}
            height={80}
            x={1550}
            y={440}
          >
            Consumer Y
          </AnimatedBox>

          {/* Arrows: Producers -> Broker */}
          <Arrow
            startFrame={150}
            fromX={320}
            fromY={290}
            toX={780}
            toY={310}
            color="#66BB6A"
            label="publish"
          />
          <Arrow
            startFrame={155}
            fromX={320}
            fromY={420}
            toX={780}
            toY={380}
            color="#66BB6A"
            label="publish"
          />
          <Arrow
            startFrame={160}
            fromX={320}
            fromY={550}
            toX={780}
            toY={450}
            color="#66BB6A"
            label="publish"
          />

          {/* Arrows: Broker -> Consumers */}
          <Arrow
            startFrame={195}
            fromX={1130}
            fromY={330}
            toX={1550}
            toY={320}
            color="#FF8A65"
            label="consume"
          />
          <Arrow
            startFrame={200}
            fromX={1130}
            fromY={430}
            toX={1550}
            toY={480}
            color="#FF8A65"
            label="consume"
          />

          {/* Message Flow Animation */}
          <MessageFlow
            startFrame={220}
            messages={["m1", "m2", "m3", "m4"]}
            fromX={320}
            fromY={290}
            toX={780}
            toY={310}
          />
          <MessageFlow
            startFrame={280}
            messages={["m5", "m6", "m7"]}
            fromX={1130}
            fromY={330}
            toX={1550}
            toY={320}
          />

          {/* Labels */}
          {frame >= 200 && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 100,
                  top: 180,
                  fontSize: 28,
                  color: "#66BB6A",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  opacity: interpolate(frame - 200, [0, 15], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                Producers write data
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 100,
                  top: 180,
                  fontSize: 28,
                  color: "#FF8A65",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  opacity: interpolate(frame - 210, [0, 15], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                Consumers read data
              </div>
            </>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
