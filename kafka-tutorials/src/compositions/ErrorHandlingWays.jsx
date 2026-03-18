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
import { Dumbbell } from "../components/Dumbbell";
import { Arrow } from "../components/Arrow";

const ErrorWayCard = ({ number, title, description, code, color, startFrame, x, y, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 110 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 520,
        transform: `scale(${scale})`,
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 16,
        padding: 22,
        border: `2px solid ${color}33`,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#1A1A2E", fontSize: 18, fontWeight: "bold" }}>{number}</span>
        </div>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <h3 style={{ color, fontSize: 20, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
          {title}
        </h3>
      </div>
      <p style={{ color: "#B0BEC5", fontSize: 15, fontFamily: "Arial, sans-serif", lineHeight: 1.5, marginBottom: 10 }}>
        {description}
      </p>
      {code && (
        <div
          style={{
            backgroundColor: "#1E1E1E",
            borderRadius: 6,
            padding: "10px 14px",
            border: "1px solid #37474F",
          }}
        >
          <pre
            style={{
              color: "#E0E0E0",
              fontSize: 12,
              fontFamily: "monospace",
              lineHeight: 1.5,
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {code}
          </pre>
        </div>
      )}
    </div>
  );
};

const ListenerCard = ({ name, methods, color, startFrame, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 280,
        transform: `scale(${scale})`,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: 18,
        border: `1px solid ${color}44`,
      }}
    >
      <h4 style={{ color, fontSize: 17, fontFamily: "Arial, sans-serif", marginBottom: 10 }}>
        {name}
      </h4>
      {methods.map((m, i) => {
        const mRel = frame - (startFrame + 8 + i * 6);
        if (mRel < 0) return null;
        return (
          <div
            key={m}
            style={{
              color: "#B0BEC5",
              fontSize: 13,
              fontFamily: "monospace",
              marginBottom: 6,
              paddingLeft: 10,
              borderLeft: `2px solid ${color}66`,
              opacity: interpolate(mRel, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            {m}
          </div>
        );
      })}
    </div>
  );
};

export const ErrorHandlingWays = () => {
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
            text="7 Ways to Handle Errors"
            subtitle="The spotter's complete playbook"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 1: Skip Policy */}
      <Sequence from={80} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <ErrorWayCard
            number={1}
            title="Skip Policy"
            icon="⏭️"
            color="#FF9800"
            startFrame={85}
            x={50}
            y={60}
            description="Skip bad records and continue. Set a skip limit and specify which exceptions to skip. Like a spotter saying 'Drop it, grab the next one!'"
            code={`stepBuilder
  .<In, Out>chunk(100, txMgr)
  .reader(reader())
  .processor(processor())
  .writer(writer())
  .faultTolerant()
  .skipLimit(10)
  .skip(ValidationException.class)
  .build();`}
          />

          <FlexAnimation startFrame={100} x={650} y={100}>
            <BodybuilderCharacter
              name="Spotter #1"
              color="#607D8B"
              startFrame={100}
              x={0}
              y={0}
              scale={1.1}
              speech="Bad rep? Skip it! Only 10 skips allowed though!"
              speechDelay={15}
            />
          </FlexAnimation>

          <Dumbbell label="BAD" startFrame={120} x={750} y={350} color="#F44336" size={1.2} failed />
          <Dumbbell label="#OK" startFrame={130} x={850} y={350} color="#4CAF50" size={1.2} />
        </AbsoluteFill>
      </Sequence>

      {/* Way 2: Retry Policy */}
      <Sequence from={180} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <ErrorWayCard
            number={2}
            title="Retry Policy"
            icon="🔄"
            color="#2196F3"
            startFrame={185}
            x={50}
            y={60}
            description="Retry failed items a set number of times with optional backoff. Perfect for transient errors like network timeouts. The spotter yells 'ONE MORE REP!'"
            code={`stepBuilder
  .faultTolerant()
  .retryLimit(3)
  .retry(DeadlockLoserException.class)
  .backOffPolicy(
    new ExponentialBackOffPolicy())
  .build();`}
          />

          <FlexAnimation startFrame={200} x={650} y={100}>
            <BodybuilderCharacter
              name="Spotter #2"
              color="#546E7A"
              startFrame={200}
              x={0}
              y={0}
              scale={1.1}
              speech="ONE MORE REP! Try again... and again!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Retry arrows */}
          {[1, 2, 3].map((i) => {
            const rel = frame - (215 + i * 15);
            if (rel < 0) return null;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 700 + i * 80,
                  top: 380,
                  opacity: interpolate(rel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
                  textAlign: "center",
                }}
              >
                <div style={{
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  backgroundColor: i === 3 ? "#4CAF50" : "#F44336",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 6px",
                }}>
                  <span style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
                    {i === 3 ? "✓" : "✕"}
                  </span>
                </div>
                <span style={{ color: "#B0BEC5", fontSize: 13, fontFamily: "monospace" }}>
                  Try #{i}
                </span>
              </div>
            );
          })}
        </AbsoluteFill>
      </Sequence>

      {/* Way 3: Skip + Retry Combined & Way 4: Custom SkipPolicy */}
      <Sequence from={280} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <ErrorWayCard
            number={3}
            title="Skip + Retry Combined"
            icon="⚡"
            color="#E91E63"
            startFrame={285}
            x={50}
            y={60}
            description="Retry first, then skip if all retries fail. The ultimate safety net — try your best, but know when to move on."
            code={`stepBuilder.faultTolerant()
  .retryLimit(3)
  .retry(TimeoutException.class)
  .skipLimit(5)
  .skip(TimeoutException.class)
  .build();`}
          />

          <ErrorWayCard
            number={4}
            title="Custom SkipPolicy"
            icon="🎯"
            color="#9C27B0"
            startFrame={305}
            x={620}
            y={60}
            description="Implement SkipPolicy interface for complex skip logic. Decide at runtime based on the exception and skip count."
            code={`public class MySkipPolicy
    implements SkipPolicy {
  @Override
  public boolean shouldSkip(
      Throwable t, long skipCount) {
    if (t instanceof FatalException)
      return false; // never skip
    return skipCount < 20;
  }
}`}
          />

          <FlexAnimation startFrame={325} x={350} y={450}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={325}
              x={0}
              y={0}
              scale={0.9}
              speech="Custom rules: some exercises you NEVER skip!"
              speechDelay={15}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>

      {/* Way 5: Listeners & Way 6: No-rollback */}
      <Sequence from={380} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <ErrorWayCard
            number={5}
            title="Listeners (The Spotters)"
            icon="👀"
            color="#00BCD4"
            startFrame={385}
            x={50}
            y={60}
            description="React before/after read, process, write, and on errors. Log failures, send alerts, collect metrics. The spotters watch every move."
          />

          <ListenerCard
            name="SkipListener"
            methods={["onSkipInRead()", "onSkipInProcess()", "onSkipInWrite()"]}
            color="#00BCD4"
            startFrame={400}
            x={50}
            y={340}
          />
          <ListenerCard
            name="RetryListener"
            methods={["open()", "onError()", "close()"]}
            color="#26C6DA"
            startFrame={410}
            x={370}
            y={340}
          />
          <ListenerCard
            name="ChunkListener"
            methods={["beforeChunk()", "afterChunk()", "afterChunkError()"]}
            color="#4DD0E1"
            startFrame={420}
            x={690}
            y={340}
          />

          <ErrorWayCard
            number={6}
            title="No-Rollback Exceptions"
            icon="🛡️"
            color="#8BC34A"
            startFrame={395}
            x={620}
            y={60}
            description="Mark certain exceptions as non-rollback. The transaction won't roll back for these — like saying 'that wobble doesn't count as a failed rep!'"
            code={`.noRollback(
  ValidationException.class)`}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Way 7: Restartability */}
      <Sequence from={480} durationInFrames={100}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <ErrorWayCard
            number={7}
            title="Restartability & Checkpointing"
            icon="💾"
            color="#FFD700"
            startFrame={485}
            x={50}
            y={60}
            description="JobRepository saves execution state after each chunk commit. If a job fails, restart picks up from the last successful chunk. Memory Marge never forgets!"
            code={`// Restart from checkpoint
JobParameters params = new JobParametersBuilder()
  .addString("file", "data.csv")
  .toJobParameters();

// Re-launch same job — it resumes!
jobLauncher.run(importJob, params);
// Skips already-completed chunks`}
          />

          <FlexAnimation startFrame={500} x={650} y={100}>
            <BodybuilderCharacter
              name="Memory Marge"
              color="#9C27B0"
              accessory="book"
              startFrame={500}
              x={0}
              y={0}
              scale={1.2}
              speech="Chunk #47,523 done. If the gym closes, we resume from here!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Summary */}
          {frame >= 545 && (
            <div
              style={{
                position: "absolute",
                bottom: 50,
                left: 0,
                right: 0,
                textAlign: "center",
                opacity: interpolate(frame - 545, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span style={{ color: "#FFD700", fontSize: 24, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                Skip → Retry → Combined → Custom Policy → Listeners → No-Rollback → Restart
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
