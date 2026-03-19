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

const ReplicationDiagram = ({ startFrame }) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const brokers = [
    { name: "Broker 1", x: 300, y: 300, color: "#1565C0", role: "Leader" },
    { name: "Broker 2", x: 800, y: 300, color: "#1976D2", role: "Follower" },
    { name: "Broker 3", x: 1300, y: 300, color: "#1E88E5", role: "Follower" },
  ];

  return (
    <>
      {brokers.map((broker, i) => (
        <AnimatedBox
          key={broker.name}
          startFrame={startFrame + i * 15}
          color={broker.color}
          width={280}
          height={200}
          x={broker.x}
          y={broker.y}
          borderRadius={12}
        >
          {""}
        </AnimatedBox>
      ))}

      {brokers.map((broker, i) => {
        const rel = frame - (startFrame + i * 15 + 10);
        if (rel < 0) return null;
        return (
          <div key={`label-${i}`}>
            <div
              style={{
                position: "absolute",
                left: broker.x + 40,
                top: broker.y + 20,
                color: "#FFF",
                fontSize: 22,
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                opacity: interpolate(rel, [0, 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {broker.name}
            </div>
            <div
              style={{
                position: "absolute",
                left: broker.x + 40,
                top: broker.y + 55,
                color: "#FFB300",
                fontSize: 18,
                fontFamily: "Arial, sans-serif",
                opacity: interpolate(rel, [0, 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {broker.role}
            </div>
            <div
              style={{
                position: "absolute",
                left: broker.x + 20,
                top: broker.y + 100,
                width: 240,
                height: 60,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: interpolate(rel, [5, 15], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span
                style={{
                  color: "#B0BEC5",
                  fontSize: 16,
                  fontFamily: "monospace",
                }}
              >
                Partition 0 (replica)
              </span>
            </div>
          </div>
        );
      })}

      {/* Replication arrows */}
      <Arrow
        startFrame={startFrame + 60}
        fromX={580}
        fromY={400}
        toX={800}
        toY={400}
        color="#66BB6A"
        label="replicate"
      />
      <Arrow
        startFrame={startFrame + 70}
        fromX={580}
        fromY={420}
        toX={1300}
        toY={420}
        color="#66BB6A"
        label="replicate"
      />
    </>
  );
};

export const KafkaArchitecture = () => {
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
            text="Kafka Architecture"
            subtitle="Brokers, Replication & ZooKeeper"
          />
        </AbsoluteFill>
      </Sequence>

      {/* ZooKeeper / KRaft */}
      <Sequence from={80} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "60px 100px" }}>
          <h2
            style={{
              fontSize: 42,
              color: "#FFB300",
              fontFamily: "Arial, sans-serif",
              marginBottom: 20,
              opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Cluster Coordination
          </h2>

          {/* ZooKeeper Box */}
          <AnimatedBox
            startFrame={95}
            color="#6A1B9A"
            width={350}
            height={100}
            x={100}
            y={200}
          >
            ZooKeeper (legacy)
          </AnimatedBox>

          {/* KRaft Box */}
          <AnimatedBox
            startFrame={105}
            color="#4A148C"
            width={350}
            height={100}
            x={100}
            y={340}
          >
            KRaft (modern)
          </AnimatedBox>

          {/* Description */}
          {frame >= 115 && (
            <div
              style={{
                position: "absolute",
                left: 550,
                top: 220,
                width: 900,
                opacity: interpolate(frame - 115, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <p
                style={{
                  fontSize: 24,
                  color: "#E0E0E0",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: 1.6,
                }}
              >
                ZooKeeper managed broker metadata, leader election, and configuration.
              </p>
              <p
                style={{
                  fontSize: 24,
                  color: "#CE93D8",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: 1.6,
                  marginTop: 20,
                }}
              >
                KRaft (Kafka Raft) replaces ZooKeeper — metadata is now managed
                within Kafka itself for simpler operations and better scaling.
              </p>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Replication Diagram */}
      <Sequence from={210} durationInFrames={150}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 60,
              fontSize: 42,
              color: "#FFB300",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 210, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Replication for Fault Tolerance
          </h2>

          <p
            style={{
              position: "absolute",
              left: 100,
              top: 120,
              fontSize: 22,
              color: "#B0BEC5",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 215, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Data is replicated across multiple brokers. If a leader fails, a
            follower takes over automatically.
          </p>

          <ReplicationDiagram startFrame={225} />
        </AbsoluteFill>
      </Sequence>

      {/* Summary */}
      <Sequence from={370} durationInFrames={110}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 200px",
          }}
        >
          <h2
            style={{
              fontSize: 48,
              color: "#FFB300",
              fontFamily: "Arial, sans-serif",
              marginBottom: 40,
              textAlign: "center",
              opacity: interpolate(frame - 370, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            Kafka Architecture Summary
          </h2>

          {[
            "Brokers store and serve data in the cluster",
            "Topics are split into partitions across brokers",
            "Replication ensures data durability",
            "KRaft simplifies cluster coordination",
          ].map((text, i) => {
            const rel = frame - (385 + i * 20);
            if (rel < 0) return null;
            return (
              <p
                key={text}
                style={{
                  fontSize: 28,
                  color: "#E0E0E0",
                  fontFamily: "Arial, sans-serif",
                  marginBottom: 20,
                  opacity: interpolate(rel, [0, 15], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <span style={{ color: "#FFB300", fontSize: 24 }}>&#x2713;</span>
                {text}
              </p>
            );
          })}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
