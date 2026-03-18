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

const WayBanner = ({ number, title, subtitle, color, startFrame, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const slideX = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        transform: `translateX(${interpolate(slideX, [0, 1], [-100, 0])}px)`,
        opacity: interpolate(relativeFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: "bold",
          color: "#1A1A2E",
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div>
        <h3 style={{ color, fontSize: 28, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ color: "#B0BEC5", fontSize: 16, fontFamily: "Arial, sans-serif", marginTop: 2 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const FlowDiagram = ({ steps, startFrame, y }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 0,
      }}
    >
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center" }}>
          <AnimatedBox
            startFrame={startFrame + i * 10}
            color={step.color}
            width={step.width || 160}
            height={70}
            x={0}
            y={0}
            borderRadius={10}
          >
            {step.label}
          </AnimatedBox>
          {i < steps.length - 1 && (
            <div
              style={{
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: frame >= startFrame + (i + 1) * 10 ? 1 : 0,
              }}
            >
              <span style={{ color: "#FFD700", fontSize: 24 }}>→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const JobAndStepsWays = () => {
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
            text="6 Ways to Build Job Flows"
            subtitle="From simple reps to complex circuits"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 1: Sequential Steps */}
      <Sequence from={80} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayBanner number={1} title="Sequential Steps" subtitle="One exercise after another" color="#4CAF50" startFrame={85} icon="🏃" />

          <FlexAnimation startFrame={90} x={50} y={140}>
            <BodybuilderCharacter
              name="Step Bro"
              color="#4CAF50"
              startFrame={90}
              x={0}
              y={0}
              scale={1.0}
              speech="Step 1 finishes, then Step 2 starts. Simple!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Sequential flow */}
          <AnimatedBox startFrame={100} color="#4CAF50" width={200} height={70} x={400} y={200} borderRadius={10}>
            Step 1: Read
          </AnimatedBox>
          <AnimatedBox startFrame={110} color="#FF9800" width={200} height={70} x={650} y={200} borderRadius={10}>
            Step 2: Process
          </AnimatedBox>
          <AnimatedBox startFrame={120} color="#2196F3" width={200} height={70} x={900} y={200} borderRadius={10}>
            Step 3: Write
          </AnimatedBox>
          <Arrow startFrame={112} fromX={600} fromY={235} toX={650} toY={235} color="#FFD700" />
          <Arrow startFrame={122} fromX={850} fromY={235} toX={900} toY={235} color="#FFD700" />

          <SpeechBubble
            text="new JobBuilder('job').start(step1).next(step2).next(step3).build()"
            startFrame={130}
            x={400}
            y={310}
            maxWidth={600}
            color="rgba(30,30,30,0.95)"
            textColor="#4CAF50"
            fontSize={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 2: Conditional Flow */}
      <Sequence from={180} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayBanner number={2} title="Conditional Flow" subtitle="Different path based on results" color="#FF9800" startFrame={185} icon="🔀" />

          <FlexAnimation startFrame={190} x={50} y={130}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={190}
              x={0}
              y={0}
              scale={1.0}
              speech="If Step 1 fails, go to recovery. If it passes, continue!"
              speechDelay={15}
            />
          </FlexAnimation>

          <AnimatedBox startFrame={200} color="#4CAF50" width={180} height={70} x={450} y={160} borderRadius={10}>
            Step 1
          </AnimatedBox>

          {/* Success path */}
          <AnimatedBox startFrame={210} color="#2196F3" width={180} height={60} x={750} y={130} borderRadius={10}>
            Step 2 (OK)
          </AnimatedBox>
          <Arrow startFrame={212} fromX={630} fromY={180} toX={750} toY={160} color="#4CAF50" label="COMPLETED" />

          {/* Fail path */}
          <AnimatedBox startFrame={215} color="#F44336" width={180} height={60} x={750} y={230} borderRadius={10}>
            Recovery Step
          </AnimatedBox>
          <Arrow startFrame={217} fromX={630} fromY={210} toX={750} toY={260} color="#F44336" label="FAILED" />

          <SpeechBubble
            text=".start(step1).on('COMPLETED').to(step2).from(step1).on('FAILED').to(recovery).build()"
            startFrame={230}
            x={400}
            y={340}
            maxWidth={650}
            color="rgba(30,30,30,0.95)"
            textColor="#FF9800"
            fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 3: Parallel Steps (Split) */}
      <Sequence from={280} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayBanner number={3} title="Parallel Steps (Split)" subtitle="Multiple exercises at the same time" color="#E91E63" startFrame={285} icon="⚡" />

          <FlexAnimation startFrame={290} x={50} y={130}>
            <BodybuilderCharacter
              name="Launcher Larry"
              color="#F44336"
              accessory="horn"
              startFrame={290}
              x={0}
              y={0}
              scale={1.0}
              speech="Run multiple steps in parallel — superset mode!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Parallel branches */}
          <AnimatedBox startFrame={300} color="#9C27B0" width={120} height={60} x={400} y={180} borderRadius={10}>
            Start
          </AnimatedBox>

          <AnimatedBox startFrame={310} color="#4CAF50" width={170} height={55} x={600} y={130} borderRadius={8}>
            Flow 1: CSV
          </AnimatedBox>
          <AnimatedBox startFrame={315} color="#FF9800" width={170} height={55} x={600} y={210} borderRadius={8}>
            Flow 2: API
          </AnimatedBox>
          <AnimatedBox startFrame={320} color="#2196F3" width={170} height={55} x={600} y={290} borderRadius={8}>
            Flow 3: DB
          </AnimatedBox>

          <Arrow startFrame={312} fromX={520} fromY={195} toX={600} toY={157} color="#4CAF50" />
          <Arrow startFrame={317} fromX={520} fromY={210} toX={600} toY={237} color="#FF9800" />
          <Arrow startFrame={322} fromX={520} fromY={225} toX={600} toY={317} color="#2196F3" />

          <AnimatedBox startFrame={330} color="#9C27B0" width={120} height={60} x={850} y={180} borderRadius={10}>
            Merge
          </AnimatedBox>

          <Arrow startFrame={332} fromX={770} fromY={157} toX={850} toY={195} color="#4CAF50" />
          <Arrow startFrame={334} fromX={770} fromY={237} toX={850} toY={210} color="#FF9800" />
          <Arrow startFrame={336} fromX={770} fromY={317} toX={850} toY={225} color="#2196F3" />

          <SpeechBubble
            text="new FlowBuilder().split(taskExecutor).add(flow1, flow2, flow3).build()"
            startFrame={340}
            x={400}
            y={380}
            maxWidth={600}
            color="rgba(30,30,30,0.95)"
            textColor="#E91E63"
            fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 4: Nested Jobs (Job within Job) */}
      <Sequence from={380} durationInFrames={90}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayBanner number={4} title="Nested Jobs" subtitle="A workout within a workout" color="#00BCD4" startFrame={385} icon="🎯" />

          <AnimatedBox startFrame={395} color="rgba(0,188,212,0.2)" width={700} height={250} x={350} y={120} borderRadius={16}>
            {""}
          </AnimatedBox>
          {frame >= 398 && (
            <span style={{
              position: "absolute", left: 380, top: 135, color: "#00BCD4",
              fontSize: 18, fontFamily: "Arial, sans-serif", fontWeight: "bold",
              opacity: interpolate(frame - 398, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              Parent Job
            </span>
          )}

          <AnimatedBox startFrame={405} color="#00BCD4" width={180} height={60} x={400} y={200} borderRadius={8}>
            Step 1
          </AnimatedBox>
          <AnimatedBox startFrame={410} color="#9C27B0" width={200} height={60} x={620} y={200} borderRadius={8}>
            Child Job Step
          </AnimatedBox>
          <AnimatedBox startFrame={415} color="#00BCD4" width={180} height={60} x={860} y={200} borderRadius={8}>
            Step 3
          </AnimatedBox>

          <SpeechBubble
            text="JobStepBuilder wraps an entire Job as a Step — modular workout routines!"
            startFrame={425}
            x={350}
            y={400}
            maxWidth={500}
            color="rgba(0,188,212,0.9)"
            textColor="#FFF"
            fontSize={16}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 5: Tasklet Steps & Way 6: Decision-based */}
      <Sequence from={470} durationInFrames={110}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayBanner number={5} title="Tasklet Steps" subtitle="Single operation — no chunk loop" color="#8BC34A" startFrame={475} icon="🤸" />

          <FlexAnimation startFrame={480} x={50} y={130}>
            <BodybuilderCharacter
              name="Tasklet Terry"
              color="#8BC34A"
              startFrame={480}
              x={0}
              y={0}
              scale={0.9}
              speech="I clean the gym, send email, archive files — one task, done!"
              speechDelay={15}
            />
          </FlexAnimation>

          <AnimatedBox startFrame={490} color="#8BC34A" width={350} height={60} x={400} y={160} borderRadius={8}>
            Tasklet: Clean temp files
          </AnimatedBox>
          <AnimatedBox startFrame={498} color="#8BC34A" width={350} height={60} x={400} y={240} borderRadius={8}>
            Tasklet: Send notification
          </AnimatedBox>

          <WayBanner number={6} title="JobExecutionDecider" subtitle="Dynamic routing at runtime" color="#FF5722" startFrame={505} icon="🧭" />

          <FlexAnimation startFrame={510} x={800} y={320}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={510}
              x={0}
              y={0}
              scale={0.9}
              speech="I decide which step is next based on conditions!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Summary */}
          {frame >= 545 && (
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 0,
                right: 0,
                textAlign: "center",
                opacity: interpolate(frame - 545, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span style={{ color: "#FFD700", fontSize: 24, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                Sequential → Conditional → Parallel → Nested → Tasklet → Decider
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
