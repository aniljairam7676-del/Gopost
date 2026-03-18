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
import { SpeechBubble } from "../components/SpeechBubble";
import { Arrow } from "../components/Arrow";
import { FlexAnimation } from "../components/FlexAnimation";

const ClipboardItem = ({ text, startFrame, index }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0) return null;

  const opacity = interpolate(relativeFrame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
        padding: "10px 16px",
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 8,
        borderLeft: "4px solid #FFD700",
      }}
    >
      <span
        style={{
          color: "#FFD700",
          fontSize: 20,
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          minWidth: 30,
        }}
      >
        #{index + 1}
      </span>
      <span
        style={{
          color: "#E0E0E0",
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {text}
      </span>
    </div>
  );
};

const ComparisonBox = ({ title, items, color, startFrame, x, y, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 500,
        transform: `scale(${scale})`,
        backgroundColor: `${color}22`,
        borderRadius: 16,
        padding: 30,
        border: `2px solid ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 32 }}>{icon}</span>
        <h3
          style={{
            color,
            fontSize: 28,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          {title}
        </h3>
      </div>
      {items.map((item, i) => {
        const itemRel = frame - (startFrame + 15 + i * 12);
        if (itemRel < 0) return null;
        return (
          <p
            key={item}
            style={{
              color: "#E0E0E0",
              fontSize: 20,
              fontFamily: "Arial, sans-serif",
              marginBottom: 12,
              paddingLeft: 16,
              opacity: interpolate(itemRel, [0, 10], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            • {item}
          </p>
        );
      })}
    </div>
  );
};

export const JobAndSteps = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)",
      }}
    >
      {/* Scene 1: Title */}
      <Sequence from={0} durationInFrames={80}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title
            text="Jobs & Steps"
            subtitle="The Workout Plan"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: What is a Job? */}
      <Sequence from={80} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "50px 100px" }}>
          <h2
            style={{
              fontSize: 44,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              marginBottom: 20,
              opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            What is a Job?
          </h2>

          <BodybuilderCharacter
            name="Coach Job"
            color="#9C27B0"
            accessory="clipboard"
            startFrame={85}
            x={80}
            y={150}
            scale={1.4}
            speech="A Job is a complete workout plan — it has Steps!"
            speechDelay={30}
          />

          {/* Clipboard / workout plan */}
          <div style={{ position: "absolute", right: 100, top: 160, width: 650 }}>
            <div
              style={{
                backgroundColor: "rgba(255,215,0,0.1)",
                borderRadius: 16,
                padding: "20px 24px",
                border: "2px solid #FFD70044",
              }}
            >
              <h3
                style={{
                  color: "#FFD700",
                  fontSize: 26,
                  fontFamily: "Arial, sans-serif",
                  marginBottom: 16,
                  opacity: interpolate(frame - 95, [0, 10], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                Today's Workout Plan
              </h3>
              <ClipboardItem text='Warm-up: Load CSV file' startFrame={105} index={0} />
              <ClipboardItem text='Main Lift: Transform records' startFrame={120} index={1} />
              <ClipboardItem text='Cool-down: Write to database' startFrame={135} index={2} />
            </div>
          </div>

          {/* Nested Job → Steps visual */}
          {frame >= 150 && (
            <div style={{ position: "absolute", right: 100, bottom: 100 }}>
              <AnimatedBox startFrame={150} color="#9C27B0" width={650} height={180} x={0} y={0} borderRadius={16}>
                {""}
              </AnimatedBox>
              {frame >= 155 && (
                <span
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 12,
                    color: "#FFD700",
                    fontSize: 18,
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    opacity: interpolate(frame - 155, [0, 10], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  Job: "data-migration"
                </span>
              )}
              <AnimatedBox startFrame={162} color="#4CAF50" width={180} height={70} x={20} y={55} borderRadius={8}>
                Step 1
              </AnimatedBox>
              <AnimatedBox startFrame={170} color="#FF9800" width={180} height={70} x={220} y={55} borderRadius={8}>
                Step 2
              </AnimatedBox>
              <AnimatedBox startFrame={178} color="#2196F3" width={180} height={70} x={420} y={55} borderRadius={8}>
                Step 3
              </AnimatedBox>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Chunk vs Tasklet */}
      <Sequence from={220} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "50px 100px" }}>
          <h2
            style={{
              fontSize: 42,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              marginBottom: 10,
              opacity: interpolate(frame - 220, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Two Types of Steps
          </h2>

          <ComparisonBox
            title="Chunk-Based Step"
            icon="🏋️‍♂️"
            color="#FF9800"
            startFrame={230}
            x={100}
            y={150}
            items={[
              "Read a batch of items (chunk)",
              "Process each item in the chunk",
              "Write the whole chunk at once",
              'Like a group exercise class!',
            ]}
          />

          <ComparisonBox
            title="Tasklet Step"
            icon="🤸"
            color="#00BCD4"
            startFrame={245}
            x={700}
            y={150}
            items={[
              "Execute a single operation",
              "No read/process/write cycle",
              "Good for one-off tasks",
              'Solo gym session — one move, done!',
            ]}
          />

          {/* Characters */}
          <FlexAnimation startFrame={260} x={300} y={560}>
            <BodybuilderCharacter
              name="The Chunk"
              color="#FF9800"
              accessory="dumbbell"
              startFrame={260}
              x={0}
              y={0}
              scale={0.9}
            />
          </FlexAnimation>

          <FlexAnimation startFrame={270} x={900} y={560}>
            <BodybuilderCharacter
              name="Tasklet Terry"
              color="#00BCD4"
              accessory="none"
              startFrame={270}
              x={0}
              y={0}
              scale={0.9}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Job Execution Flow */}
      <Sequence from={340} durationInFrames={110}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 40,
              fontSize: 42,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 340, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Job Execution Flow
          </h2>

          {/* Launcher Larry */}
          <FlexAnimation startFrame={350} x={50} y={200}>
            <BodybuilderCharacter
              name="Launcher Larry"
              color="#F44336"
              accessory="horn"
              startFrame={350}
              x={0}
              y={0}
              scale={1.0}
              speech="LET'S GO!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Coach Job */}
          <FlexAnimation startFrame={365} x={320} y={200}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={365}
              x={0}
              y={0}
              scale={1.0}
            />
          </FlexAnimation>

          {/* Steps */}
          <AnimatedBox startFrame={375} color="#4CAF50" width={140} height={80} x={600} y={260} borderRadius={10}>
            Step 1
          </AnimatedBox>
          <AnimatedBox startFrame={385} color="#FF9800" width={140} height={80} x={790} y={260} borderRadius={10}>
            Step 2
          </AnimatedBox>
          <AnimatedBox startFrame={395} color="#2196F3" width={140} height={80} x={980} y={260} borderRadius={10}>
            Step 3
          </AnimatedBox>

          {/* Memory Marge */}
          <FlexAnimation startFrame={405} x={1200} y={200}>
            <BodybuilderCharacter
              name="Memory Marge"
              color="#9C27B0"
              accessory="book"
              startFrame={405}
              x={0}
              y={0}
              scale={1.0}
              speech="All logged!"
              speechDelay={20}
            />
          </FlexAnimation>

          {/* Flow arrows */}
          <Arrow startFrame={370} fromX={200} fromY={300} toX={320} toY={300} color="#F44336" label="launch" />
          <Arrow startFrame={380} fromX={470} fromY={300} toX={600} toY={300} color="#9C27B0" label="start" />
          <Arrow startFrame={390} fromX={740} fromY={300} toX={790} toY={300} color="#FFD700" />
          <Arrow startFrame={400} fromX={930} fromY={300} toX={980} toY={300} color="#FFD700" />
          <Arrow startFrame={410} fromX={1120} fromY={300} toX={1200} toY={300} color="#FFD700" label="log" />

          {/* SLAM text */}
          {frame >= 420 && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: 0,
                right: 0,
                textAlign: "center",
                opacity: interpolate(frame - 420, [0, 8], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span
                style={{
                  color: "#FFD700",
                  fontSize: 36,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                💥 SLAM! Every step completion is logged by Memory Marge!
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
