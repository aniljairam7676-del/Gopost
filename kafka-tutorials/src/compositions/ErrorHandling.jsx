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
import { Dumbbell } from "../components/Dumbbell";
import { SpeechBubble } from "../components/SpeechBubble";
import { ProgressBar } from "../components/ProgressBar";
import { FlexAnimation } from "../components/FlexAnimation";
import { AnimatedBox } from "../components/AnimatedBox";

const ShakeEffect = ({ children, active, intensity = 5 }) => {
  const frame = useCurrentFrame();
  if (!active) return <>{children}</>;

  const shakeX = Math.sin(frame * 2.5) * intensity;
  const shakeY = Math.cos(frame * 3.1) * intensity * 0.5;

  return (
    <div style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}>
      {children}
    </div>
  );
};

const RedFlash = ({ startFrame, duration = 10 }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0 || relativeFrame > duration) return null;

  const opacity = interpolate(relativeFrame, [0, 3, duration], [0, 0.3, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(244,67,54,${opacity})`,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

const RetryCounter = ({ startFrame, attempt, success }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0) return null;

  const opacity = interpolate(relativeFrame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: success ? "#4CAF50" : "#F44336",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
          {success ? "✓" : "✕"}
        </span>
      </div>
      <span
        style={{
          color: "#E0E0E0",
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
        }}
      >
        Attempt #{attempt} — {success ? "SUCCESS!" : "FAILED"}
      </span>
    </div>
  );
};

const LightsOut = ({ startFrame, duration = 30 }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0 || relativeFrame > duration) return null;

  const darkness = interpolate(relativeFrame, [0, 8, duration - 8, duration], [0, 0.85, 0.85, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(0,0,0,${darkness})`,
        pointerEvents: "none",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {darkness > 0.5 && (
        <span
          style={{
            color: "#F44336",
            fontSize: 64,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textShadow: "0 0 20px #F44336",
            opacity: interpolate(darkness, [0.5, 0.85], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          ⚡ JOB FAILURE! ⚡
        </span>
      )}
    </AbsoluteFill>
  );
};

export const ErrorHandling = () => {
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
            text="Error Handling & Restartability"
            subtitle="Even bodybuilders drop weights sometimes"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Skip Policy */}
      <Sequence from={80} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "40px 100px" }}>
          <h2
            style={{
              fontSize: 40,
              color: "#F44336",
              fontFamily: "Arial, sans-serif",
              marginBottom: 15,
              opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Skip Policy — "Just skip it, bro!"
          </h2>

          <FlexAnimation startFrame={85} x={100} y={150}>
            <BodybuilderCharacter
              name="Processor Pete"
              color="#FF9800"
              accessory="dumbbell"
              startFrame={85}
              x={0}
              y={0}
              scale={1.2}
            />
          </FlexAnimation>

          {/* Dropped dumbbell */}
          <ShakeEffect active={frame >= 105 && frame <= 115} intensity={8}>
            <Dumbbell
              label="BAD"
              startFrame={100}
              x={400}
              y={350}
              color="#F44336"
              size={1.3}
              failed
            />
          </ShakeEffect>

          <RedFlash startFrame={105} duration={8} />

          {/* The Spotters rush in */}
          <FlexAnimation startFrame={115} x={550} y={150}>
            <BodybuilderCharacter
              name="Spotter #1"
              color="#607D8B"
              startFrame={115}
              x={0}
              y={0}
              scale={1.0}
              speech="No worries! We'll SKIP that one!"
              speechDelay={15}
            />
          </FlexAnimation>

          <FlexAnimation startFrame={120} x={750} y={170}>
            <BodybuilderCharacter
              name="Spotter #2"
              color="#546E7A"
              startFrame={120}
              x={0}
              y={0}
              scale={0.9}
            />
          </FlexAnimation>

          {/* Skip pile */}
          {frame >= 140 && (
            <div
              style={{
                position: "absolute",
                right: 120,
                bottom: 120,
                opacity: interpolate(frame - 140, [0, 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(244,67,54,0.15)",
                  borderRadius: 12,
                  padding: "16px 24px",
                  border: "2px solid #F44336",
                }}
              >
                <span
                  style={{
                    color: "#F44336",
                    fontSize: 20,
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  🗑️ Skip Pile — Skips: 1/10 allowed
                </span>
              </div>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Retry Policy */}
      <Sequence from={200} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 100px" }}>
          <h2
            style={{
              fontSize: 40,
              color: "#FF9800",
              fontFamily: "Arial, sans-serif",
              marginBottom: 15,
              opacity: interpolate(frame - 200, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Retry Policy — "TRY AGAIN! You got this!"
          </h2>

          <FlexAnimation startFrame={205} x={100} y={150}>
            <BodybuilderCharacter
              name="Reader Rick"
              color="#4CAF50"
              accessory="dumbbell"
              startFrame={205}
              x={0}
              y={0}
              scale={1.2}
            />
          </FlexAnimation>

          <FlexAnimation startFrame={210} x={350} y={170}>
            <BodybuilderCharacter
              name="Spotter"
              color="#607D8B"
              startFrame={210}
              x={0}
              y={0}
              scale={0.9}
              speech="TRY AGAIN! You got this! 💪"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Retry attempts */}
          <div style={{ position: "absolute", right: 150, top: 180 }}>
            <RetryCounter startFrame={220} attempt={1} success={false} />
            <RetryCounter startFrame={240} attempt={2} success={false} />
            <RetryCounter startFrame={260} attempt={3} success={true} />

            {frame >= 275 && (
              <div
                style={{
                  marginTop: 20,
                  padding: "12px 20px",
                  backgroundColor: "rgba(255,152,0,0.15)",
                  borderRadius: 8,
                  border: "2px solid #FF9800",
                  opacity: interpolate(frame - 275, [0, 10], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <span
                  style={{
                    color: "#FF9800",
                    fontSize: 18,
                    fontFamily: "monospace",
                  }}
                >
                  maxRetries=3, backoff=2s
                </span>
              </div>
            )}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Restartability */}
      <Sequence from={300} durationInFrames={120}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 30,
              fontSize: 40,
              color: "#9C27B0",
              fontFamily: "Arial, sans-serif",
              zIndex: 60,
              opacity: interpolate(frame - 300, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Restartability — Memory Marge saves the day!
          </h2>

          {/* Lights out effect */}
          <LightsOut startFrame={330} duration={40} />

          {/* Progress bar that was running */}
          <ProgressBar
            startFrame={310}
            x={660}
            y={200}
            width={600}
            height={40}
            fromPercent={0}
            toPercent={47}
            duration={20}
            label="Processing chunks..."
            color="#FFD700"
          />

          {/* Memory Marge */}
          <FlexAnimation startFrame={375} x={200} y={300}>
            <BodybuilderCharacter
              name="Memory Marge"
              color="#9C27B0"
              accessory="book"
              startFrame={375}
              x={0}
              y={0}
              scale={1.3}
              speech="I logged everything up to Chunk #47,523!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Coach Job */}
          <FlexAnimation startFrame={385} x={600} y={300}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={385}
              x={0}
              y={0}
              scale={1.2}
              speech="Resume from where we left off!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Resumed progress bar */}
          <ProgressBar
            startFrame={395}
            x={660}
            y={550}
            width={600}
            height={40}
            fromPercent={47}
            toPercent={100}
            duration={20}
            label="Resuming from checkpoint..."
            color="#4CAF50"
          />

          <SpeechBubble
            text="JobRepository remembers your progress! 📖"
            startFrame={400}
            x={1050}
            y={700}
            color="rgba(156,39,176,0.9)"
            textColor="#FFF"
            fontSize={18}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
