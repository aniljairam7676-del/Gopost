import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Title } from "../components/Title";
import { BodybuilderCharacter } from "../components/BodybuilderCharacter";
import { AnimatedBox } from "../components/AnimatedBox";
import { FlexAnimation } from "../components/FlexAnimation";
import { SpeechBubble } from "../components/SpeechBubble";
import { Arrow } from "../components/Arrow";
import { GymStation } from "../components/GymStation";
import { ProgressBar } from "../components/ProgressBar";

const ScalingDiagram = ({ title, description, startFrame, children }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(relativeFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      {children}
    </div>
  );
};

export const ScalingWays = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)",
      }}
    >
      {/* Title */}
      <Sequence from={0} durationInFrames={80}>
        <AbsoluteFill
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Title
            text="5 Ways to Scale Spring Batch"
            subtitle="From solo workouts to full gym franchise"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 1: Multi-threaded Step */}
      <Sequence from={80} durationInFrames={110}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 15 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", backgroundColor: "#4CAF50",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: interpolate(frame - 80, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#1A1A2E", fontSize: 22, fontWeight: "bold" }}>1</span>
            </div>
            <h2 style={{
              fontSize: 36, color: "#4CAF50", fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 80, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              Multi-threaded Step — "Multiple lifters, one station"
            </h2>
          </div>

          <FlexAnimation startFrame={88} x={50} y={120}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={88}
              x={0}
              y={0}
              scale={1.0}
              speech="Add a TaskExecutor — multiple threads process chunks in parallel!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Multiple threads = multiple bodybuilders at same station */}
          {[0, 1, 2, 3].map((i) => (
            <FlexAnimation key={i} startFrame={100 + i * 8} x={400 + i * 150} y={130}>
              <BodybuilderCharacter
                name={`Thread ${i + 1}`}
                color="#4CAF50"
                accessory="dumbbell"
                startFrame={100 + i * 8}
                x={0}
                y={0}
                scale={0.7}
              />
            </FlexAnimation>
          ))}

          <AnimatedBox startFrame={105} color="rgba(76,175,80,0.15)" width={650} height={70} x={380} y={350} borderRadius={10}>
            {""}
          </AnimatedBox>
          {frame >= 108 && (
            <span style={{
              position: "absolute", left: 420, top: 365, color: "#4CAF50",
              fontSize: 16, fontFamily: "monospace",
              opacity: interpolate(frame - 108, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              .taskExecutor(new SimpleAsyncTaskExecutor()).throttleLimit(4)
            </span>
          )}

          <SpeechBubble
            text="Simplest scaling! But ItemReader must be thread-safe. Use synchronized readers."
            startFrame={130}
            x={400}
            y={440}
            maxWidth={500}
            color="rgba(76,175,80,0.9)"
            textColor="#FFF"
            fontSize={16}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 2: Parallel Steps (AsyncItemProcessor) */}
      <Sequence from={190} durationInFrames={110}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 15 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", backgroundColor: "#FF9800",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: interpolate(frame - 190, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#1A1A2E", fontSize: 22, fontWeight: "bold" }}>2</span>
            </div>
            <h2 style={{
              fontSize: 36, color: "#FF9800", fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 190, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              Async Processor/Writer — "Delegate the curls"
            </h2>
          </div>

          <FlexAnimation startFrame={198} x={50} y={120}>
            <BodybuilderCharacter
              name="Processor Pete"
              color="#FF9800"
              accessory="dumbbell"
              startFrame={198}
              x={0}
              y={0}
              scale={1.0}
              speech="I hand off processing to a thread pool — I don't wait!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Async flow diagram */}
          <GymStation label="Reader" sublabel="Main Thread" icon="📂" startFrame={205} x={400} y={130} color="#4CAF50" width={160} height={100} />
          <GymStation label="Async Processor" sublabel="Thread Pool" icon="⚡" startFrame={215} x={620} y={130} color="#FF9800" width={180} height={100} />
          <GymStation label="Async Writer" sublabel="Collects Futures" icon="💾" startFrame={225} x={860} y={130} color="#2196F3" width={170} height={100} />

          <Arrow startFrame={218} fromX={560} fromY={180} toX={620} toY={180} color="#FFD700" />
          <Arrow startFrame={228} fromX={800} fromY={180} toX={860} toY={180} color="#FFD700" />

          <SpeechBubble
            text="AsyncItemProcessor wraps your processor. Returns Future<O>. AsyncItemWriter unwraps results. Reader stays single-threaded!"
            startFrame={240}
            x={400}
            y={290}
            maxWidth={600}
            color="rgba(255,152,0,0.9)"
            textColor="#FFF"
            fontSize={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 3: Partitioning */}
      <Sequence from={300} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 15 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", backgroundColor: "#E91E63",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: interpolate(frame - 300, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#FFF", fontSize: 22, fontWeight: "bold" }}>3</span>
            </div>
            <h2 style={{
              fontSize: 36, color: "#E91E63", fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 300, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              Partitioning — "Split the weight rack into sections"
            </h2>
          </div>

          {/* Manager step */}
          <AnimatedBox startFrame={310} color="#9C27B0" width={200} height={80} x={100} y={150} borderRadius={12}>
            Manager Step
          </AnimatedBox>

          {/* Partitions */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <AnimatedBox
                startFrame={320 + i * 8}
                color="#E91E63"
                width={200}
                height={65}
                x={450}
                y={120 + i * 85}
                borderRadius={8}
              >
                {`Worker ${i + 1}: rows ${i * 250 + 1}-${(i + 1) * 250}`}
              </AnimatedBox>
              <Arrow
                startFrame={322 + i * 8}
                fromX={300}
                fromY={190}
                toX={450}
                toY={152 + i * 85}
                color="#E91E63"
              />
            </div>
          ))}

          {/* Workers */}
          {[0, 1, 2, 3].map((i) => (
            <FlexAnimation key={`w-${i}`} startFrame={340 + i * 6} x={700} y={110 + i * 85}>
              <BodybuilderCharacter
                name={`Worker ${i + 1}`}
                color="#E91E63"
                accessory="dumbbell"
                startFrame={340 + i * 6}
                x={0}
                y={0}
                scale={0.55}
              />
            </FlexAnimation>
          ))}

          <SpeechBubble
            text="Partitioner splits data into ranges. Each worker processes its own partition independently. Can run locally (threads) or remotely (across JVMs)!"
            startFrame={365}
            x={850}
            y={120}
            maxWidth={500}
            color="rgba(233,30,99,0.9)"
            textColor="#FFF"
            fontSize={15}
          />

          <FlexAnimation startFrame={315} x={80} y={300}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={315}
              x={0}
              y={0}
              scale={0.8}
              speech="I divide the rack — each lifter gets their own section!"
              speechDelay={15}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>

      {/* Way 4: Remote Chunking */}
      <Sequence from={420} durationInFrames={110}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 15 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", backgroundColor: "#00BCD4",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: interpolate(frame - 420, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#1A1A2E", fontSize: 22, fontWeight: "bold" }}>4</span>
            </div>
            <h2 style={{
              fontSize: 36, color: "#00BCD4", fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 420, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              Remote Chunking — "Send weights to other gyms"
            </h2>
          </div>

          {/* Manager reads, sends to remote workers */}
          <GymStation label="Manager" sublabel="Reads data" icon="📂" startFrame={430} x={100} y={150} color="#4CAF50" width={180} height={110} />

          <GymStation label="Middleware" sublabel="JMS / RabbitMQ / Kafka" icon="📨" startFrame={440} x={400} y={150} color="#78909C" width={200} height={110} />

          {[0, 1, 2].map((i) => (
            <GymStation
              key={i}
              label={`Remote Worker ${i + 1}`}
              sublabel="Process + Write"
              icon="🏋️"
              startFrame={450 + i * 8}
              x={720}
              y={100 + i * 130}
              color="#00BCD4"
              width={200}
              height={100}
            />
          ))}

          <Arrow startFrame={445} fromX={280} fromY={205} toX={400} toY={205} color="#FFD700" label="chunks" />
          <Arrow startFrame={455} fromX={600} fromY={180} toX={720} toY={150} color="#00BCD4" />
          <Arrow startFrame={460} fromX={600} fromY={205} toX={720} toY={265} color="#00BCD4" />
          <Arrow startFrame={465} fromX={600} fromY={230} toX={720} toY={365} color="#00BCD4" />

          <SpeechBubble
            text="Manager reads and sends chunks via messaging. Remote workers process + write. Perfect when processing is the bottleneck!"
            startFrame={475}
            x={950}
            y={120}
            maxWidth={500}
            color="rgba(0,188,212,0.9)"
            textColor="#FFF"
            fontSize={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 5: Remote Partitioning + Summary */}
      <Sequence from={530} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 15 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", backgroundColor: "#FFD700",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: interpolate(frame - 530, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#1A1A2E", fontSize: 22, fontWeight: "bold" }}>5</span>
            </div>
            <h2 style={{
              fontSize: 36, color: "#FFD700", fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 530, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              Remote Partitioning — "Gym franchise model"
            </h2>
          </div>

          <SpeechBubble
            text="Like partitioning, but workers run on separate JVMs/machines. Manager assigns partition metadata via messaging. Each remote worker reads, processes, and writes its own partition independently!"
            startFrame={540}
            x={50}
            y={100}
            maxWidth={600}
            color="rgba(255,215,0,0.15)"
            textColor="#FFD700"
            fontSize={17}
          />

          {/* Summary comparison */}
          <h3
            style={{
              position: "absolute",
              left: 100,
              top: 300,
              fontSize: 32,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 555, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            Scaling Comparison
          </h3>

          {[
            { name: "Multi-threaded", complexity: "Low", speed: "2-4x", color: "#4CAF50", note: "Same JVM, thread-safe reader needed" },
            { name: "Async Proc/Write", complexity: "Low", speed: "2-4x", color: "#FF9800", note: "Same JVM, reader stays single-thread" },
            { name: "Partitioning", complexity: "Medium", speed: "4-10x", color: "#E91E63", note: "Local or remote, data split by ranges" },
            { name: "Remote Chunking", complexity: "High", speed: "10x+", color: "#00BCD4", note: "Distributed processing via messaging" },
            { name: "Remote Partition", complexity: "High", speed: "10x+", color: "#FFD700", note: "Distributed, each worker fully independent" },
          ].map((item, i) => {
            const rel = frame - (560 + i * 10);
            if (rel < 0) return null;
            return (
              <div
                key={item.name}
                style={{
                  position: "absolute",
                  left: 100,
                  top: 360 + i * 55,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: interpolate(rel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", backgroundColor: item.color, flexShrink: 0,
                }} />
                <span style={{ color: item.color, fontSize: 18, fontFamily: "Arial, sans-serif", fontWeight: "bold", width: 200 }}>
                  {item.name}
                </span>
                <span style={{ color: "#B0BEC5", fontSize: 16, fontFamily: "monospace", width: 100 }}>
                  {item.speed}
                </span>
                <span style={{ color: "#78909C", fontSize: 14, fontFamily: "Arial, sans-serif" }}>
                  {item.note}
                </span>
              </div>
            );
          })}

          {/* Team pose */}
          {frame >= 620 && (
            <div
              style={{
                position: "absolute",
                right: 80,
                bottom: 60,
                textAlign: "center",
                opacity: interpolate(frame - 620, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span style={{ color: "#FFD700", fontSize: 28, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                Scale your data gym! 💪
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
