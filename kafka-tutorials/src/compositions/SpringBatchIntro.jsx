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
import { GymStation } from "../components/GymStation";
import { Arrow } from "../components/Arrow";
import { FlexAnimation } from "../components/FlexAnimation";

const Barbell = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const drop = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 8, stiffness: 100, mass: 1.2 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${interpolate(drop, [0, 1], [-80, 0])}px) scale(${drop})`,
      }}
    >
      {/* Left plate */}
      <div style={{ width: 24, height: 50, backgroundColor: "#FFD700", borderRadius: 4 }} />
      <div style={{ width: 18, height: 40, backgroundColor: "#FFA000", borderRadius: 4, marginLeft: 2 }} />
      {/* Bar */}
      <div style={{ width: 120, height: 12, backgroundColor: "#B0BEC5", borderRadius: 6 }} />
      {/* Right plate */}
      <div style={{ width: 18, height: 40, backgroundColor: "#FFA000", borderRadius: 4, marginRight: 2 }} />
      <div style={{ width: 24, height: 50, backgroundColor: "#FFD700", borderRadius: 4 }} />
    </div>
  );
};

const BulletPoint = ({ text, startFrame, icon = "💪" }) => {
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
        opacity: interpolate(relativeFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateX(${interpolate(slideX, [0, 1], [-60, 0])}px)`,
        fontSize: 28,
        color: "#E0E0E0",
        fontFamily: "Arial, sans-serif",
        marginBottom: 22,
        display: "flex",
        alignItems: "center",
        gap: 15,
      }}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      {text}
    </div>
  );
};

export const SpringBatchIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)",
      }}
    >
      {/* Scene 1: Title Card */}
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
          <Barbell startFrame={5} />
          <Title
            text="Spring Batch"
            subtitle='The Gym of Data Processing — Where your data gets JACKED'
            startFrame={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Meet Coach Job */}
      <Sequence from={90} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "50px 120px" }}>
          <h2
            style={{
              fontSize: 44,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              marginBottom: 20,
              opacity: interpolate(frame - 90, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Meet Coach Job
          </h2>

          <BodybuilderCharacter
            name="Coach Job"
            color="#9C27B0"
            accessory="clipboard"
            startFrame={100}
            x={100}
            y={200}
            scale={1.5}
            speech="Alright team, we've got 10 million records to process today!"
            speechDelay={25}
          />

          <div style={{ position: "absolute", right: 120, top: 200 }}>
            <BulletPoint
              text="Spring Batch = framework for batch processing"
              startFrame={120}
              icon="🏗️"
            />
            <BulletPoint
              text="Handles massive data — millions of records"
              startFrame={135}
              icon="📊"
            />
            <BulletPoint
              text="Reliable, restartable, and scalable"
              startFrame={150}
              icon="🔄"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: The Gym Overview */}
      <Sequence from={190} durationInFrames={110}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 40,
              fontSize: 42,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 190, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            The Gym Floor Plan
          </h2>

          {/* Gym stations */}
          <GymStation
            label="Weight Rack"
            sublabel="ItemReader"
            icon="🗄️"
            startFrame={200}
            x={150}
            y={250}
            color="#4CAF50"
            width={240}
            height={180}
          />

          <GymStation
            label="Curl Station"
            sublabel="ItemProcessor"
            icon="💪"
            startFrame={215}
            x={600}
            y={250}
            color="#FF9800"
            width={240}
            height={180}
          />

          <GymStation
            label="Finished Rack"
            sublabel="ItemWriter"
            icon="🏆"
            startFrame={230}
            x={1050}
            y={250}
            color="#2196F3"
            width={240}
            height={180}
          />

          <GymStation
            label="Reception Desk"
            sublabel="JobRepository"
            icon="📖"
            startFrame={245}
            x={1500}
            y={250}
            color="#9C27B0"
            width={240}
            height={180}
          />

          {/* Flow arrows */}
          <Arrow startFrame={240} fromX={390} fromY={340} toX={600} toY={340} color="#FFD700" label="read" />
          <Arrow startFrame={250} fromX={840} fromY={340} toX={1050} toY={340} color="#FFD700" label="process" />
          <Arrow startFrame={260} fromX={1290} fromY={340} toX={1500} toY={340} color="#FFD700" label="write" />

          {/* Mini bodybuilders at stations */}
          <FlexAnimation startFrame={250} x={190} y={480}>
            <BodybuilderCharacter name="Reader Rick" color="#4CAF50" accessory="dumbbell" startFrame={250} x={0} y={0} scale={0.8} />
          </FlexAnimation>

          <FlexAnimation startFrame={260} x={640} y={480}>
            <BodybuilderCharacter name="Processor Pete" color="#FF9800" accessory="dumbbell" startFrame={260} x={0} y={0} scale={0.8} />
          </FlexAnimation>

          <FlexAnimation startFrame={270} x={1090} y={480}>
            <BodybuilderCharacter name="Writer Walt" color="#2196F3" accessory="dumbbell" startFrame={270} x={0} y={0} scale={0.8} />
          </FlexAnimation>

          {/* Bottom tagline */}
          {frame >= 275 && (
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: 0,
                right: 0,
                textAlign: "center",
                opacity: interpolate(frame - 275, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span
                style={{
                  color: "#FFD700",
                  fontSize: 32,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Read → Process → Write — The ultimate data workout!
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
