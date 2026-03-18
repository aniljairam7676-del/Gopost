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
import { Dumbbell } from "../components/Dumbbell";
import { GymStation } from "../components/GymStation";
import { ProgressBar } from "../components/ProgressBar";

/* ─── Reusable story sub-components ─── */

const ActBanner = ({ act, title, subtitle, color, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, rel),
    fps,
    config: { damping: 8, stiffness: 80, mass: 0.8 },
  });

  if (rel < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          backgroundColor: `${color}22`,
          border: `3px solid ${color}`,
          borderRadius: 20,
          padding: "40px 80px",
          textAlign: "center",
        }}
      >
        <div style={{ color: "#78909C", fontSize: 18, fontFamily: "Arial, sans-serif", marginBottom: 6, letterSpacing: 4 }}>
          {act}
        </div>
        <h1 style={{ color, fontSize: 48, fontFamily: "Arial, sans-serif", fontWeight: "bold", marginBottom: 10 }}>
          {title}
        </h1>
        <p style={{ color: "#90A4AE", fontSize: 22, fontFamily: "Arial, sans-serif" }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const FailureCard = ({ icon, title, exception, symptom, color, startFrame, x, y, width = 480 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;

  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 110 } });
  if (rel < 0) return null;

  return (
    <div
      style={{
        position: "absolute", left: x, top: y, width,
        transform: `scale(${scale})`, transformOrigin: "top left",
        backgroundColor: "rgba(244,67,54,0.06)",
        borderRadius: 14, padding: 20,
        border: `2px solid ${color}44`, borderLeft: `5px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        <h3 style={{ color, fontSize: 20, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{title}</h3>
      </div>
      <div style={{ marginBottom: 6 }}>
        <span style={{ color: "#EF5350", fontSize: 13, fontFamily: "monospace" }}>{exception}</span>
      </div>
      <p style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>{symptom}</p>
    </div>
  );
};

const ResolutionCard = ({ icon, title, code, explanation, color, startFrame, x, y, width = 480 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;

  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 110 } });
  if (rel < 0) return null;

  return (
    <div
      style={{
        position: "absolute", left: x, top: y, width,
        transform: `scale(${scale})`, transformOrigin: "top left",
        backgroundColor: "rgba(76,175,80,0.06)",
        borderRadius: 14, padding: 20,
        border: `2px solid ${color}44`, borderLeft: `5px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        <h3 style={{ color, fontSize: 20, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{title}</h3>
      </div>
      {code && (
        <div style={{
          backgroundColor: "#1E1E1E", borderRadius: 6, padding: "8px 12px", marginBottom: 8, border: "1px solid #37474F",
        }}>
          <pre style={{ color: "#A5D6A7", fontSize: 12, fontFamily: "monospace", lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap" }}>{code}</pre>
        </div>
      )}
      <p style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>{explanation}</p>
    </div>
  );
};

const StoryNarration = ({ text, startFrame, y = 30 }) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0) return null;

  return (
    <div
      style={{
        position: "absolute", top: y, left: 0, right: 0, textAlign: "center",
        opacity: interpolate(rel, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <span style={{
        color: "#FFD700", fontSize: 20, fontFamily: "Arial, sans-serif", fontStyle: "italic",
        backgroundColor: "rgba(255,215,0,0.08)", padding: "8px 24px", borderRadius: 20,
      }}>
        {text}
      </span>
    </div>
  );
};

const ShakeEffect = ({ children, startFrame, intensity = 4 }) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0 || rel > 30) return <>{children}</>;

  const shakeX = Math.sin(rel * 2.5) * intensity * Math.max(0, 1 - rel / 30);
  const shakeY = Math.cos(rel * 3.1) * intensity * 0.5 * Math.max(0, 1 - rel / 30);

  return (
    <div style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}>
      {children}
    </div>
  );
};

const StatusBadge = ({ status, startFrame, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 8, stiffness: 150 } });
  if (rel < 0) return null;

  const isOk = status === "COMPLETED" || status === "RECOVERED" || status === "RESOLVED";
  const bg = isOk ? "#4CAF50" : "#F44336";
  const icon = isOk ? "✓" : "✕";

  return (
    <div style={{
      position: "absolute", left: x, top: y,
      transform: `scale(${scale})`,
      backgroundColor: bg, borderRadius: 20, padding: "6px 18px",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>{icon}</span>
      <span style={{ color: "#FFF", fontSize: 14, fontFamily: "monospace", fontWeight: "bold" }}>{status}</span>
    </div>
  );
};

/* ─── MAIN COMPOSITION ─── */

export const FailureScenarios = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0D1117, #161B22, #1A1A2E)" }}>

      {/* ═══ PROLOGUE — Title ═══ */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Title text="Spring Batch Failure Scenarios" subtitle="A bodybuilder's worst day at the gym — and how to survive it" startFrame={5} />
          {frame >= 45 && (
            <div style={{
              display: "flex", gap: 50, marginTop: 30,
              opacity: interpolate(frame - 45, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              {[
                { label: "12 Failures", icon: "💥", color: "#F44336" },
                { label: "12 Fixes", icon: "🔧", color: "#4CAF50" },
                { label: "1 Epic Story", icon: "📖", color: "#FFD700" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 36 }}>{item.icon}</span>
                  <div style={{ color: item.color, fontSize: 18, fontFamily: "Arial, sans-serif", marginTop: 6 }}>{item.label}</div>
                </div>
              ))}
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ ACT 1 BANNER — "The Gym Won't Open" ═══ */}
      <Sequence from={90} durationInFrames={70}>
        <ActBanner act="ACT I" title="The Gym Won't Open" subtitle="Job startup & configuration failures" color="#F44336" startFrame={95} />
      </Sequence>

      {/* ─── Failure 1: JobRepository DataSource Missing ─── */}
      <Sequence from={160} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="5:00 AM — Coach Job arrives at the gym, but the doors are locked..." startFrame={165} />

          <FlexAnimation startFrame={175} x={50} y={80}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={175} x={0} y={0} scale={1.1}
              speech="WHERE ARE MY KEYS?! The database is gone!" speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="🔒" title="1. JobRepository DataSource Failure"
            exception="BeanCreationException: Error creating bean 'jobRepository': DataSource not configured"
            symptom="Spring Batch REQUIRES a database for metadata tables. No DataSource bean → the entire framework refuses to start. No gym, no workout."
            color="#F44336" startFrame={185} x={450} y={80} width={550}
          />

          <ShakeEffect startFrame={190} intensity={6}>
            <Dumbbell label="LOCKED" startFrame={190} x={500} y={350} color="#F44336" size={1.5} failed />
          </ShakeEffect>

          <ResolutionCard
            icon="🔑" title="Fix: Add DataSource + Initialize Schema"
            code={`# application.yml
spring:
  datasource:
    url: jdbc:h2:mem:batchdb
    # Or use: jdbc:postgresql://...
  batch:
    jdbc:
      initialize-schema: always`}
            explanation="Provide a DataSource bean. For dev, use H2 in-memory. For prod, use a real DB. 'initialize-schema: always' creates the 6 metadata tables automatically."
            color="#4CAF50" startFrame={220} x={450} y={360} width={550}
          />

          <StatusBadge status="RESOLVED" startFrame={260} x={800} y={600} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 2: Job Already Running ─── */}
      <Sequence from={300} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Coach opens the gym... but someone is already inside doing the same workout!" startFrame={305} />

          <FlexAnimation startFrame={312} x={50} y={80}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={312} x={0} y={0} scale={1.0}
              speech="Wait — this job is ALREADY running!" speechDelay={15}
            />
          </FlexAnimation>

          <FlexAnimation startFrame={318} x={250} y={80}>
            <BodybuilderCharacter
              name="Clone Job" color="#F44336"
              startFrame={318} x={0} y={0} scale={1.0} facing="left"
              speech="I was here first, bro!" speechDelay={20}
            />
          </FlexAnimation>

          <FailureCard
            icon="👥" title="2. JobInstanceAlreadyCompleteException"
            exception="JobInstanceAlreadyCompleteException: A job instance already exists and is complete for parameters={file=data.csv}"
            symptom="Same job name + same parameters = same instance. If it completed before, Spring Batch won't re-run it. Duplicate workout detected!"
            color="#F44336" startFrame={325} x={500} y={80} width={530}
          />

          <ResolutionCard
            icon="🎫" title="Fix: Unique Parameters or Allow Restart"
            code={`// Option A: Add unique run ID
new JobParametersBuilder()
  .addLong("run.id", System.currentTimeMillis())
  .addString("file", "data.csv")
  .toJobParameters();

// Option B: Allow restart
.preventRestart()  // REMOVE this`}
            explanation="Each unique combination of parameters = unique instance. Add a timestamp or incrementing run.id to force a new instance each time."
            color="#4CAF50" startFrame={350} x={500} y={340} width={530}
          />

          <StatusBadge status="RESOLVED" startFrame={395} x={800} y={600} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 3: Bean Wiring / Missing Step ─── */}
      <Sequence from={430} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The workout plan is printed, but Step 2 is missing from the sheet..." startFrame={435} />

          <FlexAnimation startFrame={442} x={50} y={80}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={442} x={0} y={0} scale={1.0}
              speech="Step 2 doesn't EXIST! Who wrote this plan?!" speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="🧩" title="3. Missing Bean / Wiring Failure"
            exception="NoSuchBeanDefinitionException: No qualifying bean of type 'Step' named 'processStep'"
            symptom="Job references a Step that was never defined as a @Bean. Or Reader/Processor/Writer is missing. The workout plan has a gap."
            color="#F44336" startFrame={450} x={430} y={80} width={550}
          />

          {/* Broken flow diagram */}
          <AnimatedBox startFrame={460} color="#4CAF50" width={160} height={55} x={450} y={340} borderRadius={8}>Step 1 OK</AnimatedBox>
          <AnimatedBox startFrame={465} color="#F44336" width={160} height={55} x={660} y={340} borderRadius={8}>Step 2 ???</AnimatedBox>
          <AnimatedBox startFrame={470} color="#78909C" width={160} height={55} x={870} y={340} borderRadius={8}>Step 3 ???</AnimatedBox>
          <Arrow startFrame={466} fromX={610} fromY={367} toX={660} toY={367} color="#F44336" />

          <ResolutionCard
            icon="🧩" title="Fix: Define All Beans"
            code={`@Bean
public Step processStep(JobRepository repo,
    PlatformTransactionManager tx) {
  return new StepBuilder("processStep", repo)
    .<In, Out>chunk(100, tx)
    .reader(reader())
    .processor(processor()) // don't forget!
    .writer(writer())
    .build();
}`}
            explanation="Every Step referenced in the Job flow must exist as a @Bean. Check for typos in names and ensure reader/processor/writer are all defined."
            color="#4CAF50" startFrame={475} x={430} y={420} width={550}
          />

          <StatusBadge status="RESOLVED" startFrame={520} x={800} y={630} />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ ACT 2 BANNER — "The Weights Won't Move" ═══ */}
      <Sequence from={550} durationInFrames={70}>
        <ActBanner act="ACT II" title="The Weights Won't Move" subtitle="Read / Process / Write failures during execution" color="#FF9800" startFrame={555} />
      </Sequence>

      {/* ─── Failure 4: FlatFileParseException ─── */}
      <Sequence from={620} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Reader Rick picks up a dumbbell... but it's shaped WRONG. Deformed data!" startFrame={625} />

          <FlexAnimation startFrame={632} x={50} y={80}>
            <BodybuilderCharacter
              name="Reader Rick" color="#4CAF50" accessory="dumbbell"
              startFrame={632} x={0} y={0} scale={1.0}
              speech="Line 47,523 has 3 columns instead of 5! It's BROKEN!" speechDelay={15}
            />
          </FlexAnimation>

          <Dumbbell label="BAD" startFrame={640} x={300} y={250} color="#F44336" size={1.3} failed />
          <Dumbbell label="OK" startFrame={645} x={380} y={250} color="#4CAF50" size={1.0} />
          <Dumbbell label="BAD" startFrame={648} x={460} y={250} color="#F44336" size={1.3} failed />

          <FailureCard
            icon="📄" title="4. FlatFileParseException"
            exception="FlatFileParseException: Parsing error at line: 47523, input=[John,Doe,]"
            symptom="CSV/TSV has malformed rows — wrong column count, bad delimiters, encoding issues. One deformed dumbbell ruins the set."
            color="#F44336" startFrame={638} x={550} y={70} width={520}
          />

          <ResolutionCard
            icon="⏭️" title="Fix: Skip Policy + Error Logging"
            code={`stepBuilder
  .<Person, Person>chunk(1000, txMgr)
  .reader(flatFileReader())
  .processor(processor())
  .writer(writer())
  .faultTolerant()
  .skipLimit(100)
  .skip(FlatFileParseException.class)
  .listener(new SkipListener<>() {
    public void onSkipInRead(Throwable t) {
      log.warn("Skipped: " + t.getMessage());
    }
  })
  .build();`}
            explanation="Set a skipLimit and register which exceptions to skip. Add a SkipListener to log every skipped record for later investigation."
            color="#4CAF50" startFrame={665} x={550} y={310} width={520}
          />

          <StatusBadge status="RECOVERED" startFrame={720} x={900} y={620} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 5: Database Connection Lost Mid-Chunk ─── */}
      <Sequence from={750} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Mid-set, the lights go out! The database connection drops..." startFrame={755} />

          <FlexAnimation startFrame={762} x={50} y={80}>
            <BodybuilderCharacter
              name="Writer Walt" color="#2196F3" accessory="dumbbell"
              startFrame={762} x={0} y={0} scale={1.0}
              speech="I was writing chunk #500 and the DB VANISHED!" speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="⚡" title="5. Database Connection Lost (TransientDataAccessException)"
            exception="CannotGetJdbcConnectionException: Failed to obtain JDBC Connection"
            symptom="Network blip, DB restart, connection pool exhausted. Writer was mid-transaction when the connection died. Chunk rolled back."
            color="#F44336" startFrame={770} x={430} y={80} width={560}
          />

          <ProgressBar startFrame={780} x={430} y={310} width={500} height={30} fromPercent={0} toPercent={62} duration={30} label="Chunk progress before crash" color="#F44336" />

          <ResolutionCard
            icon="🔄" title="Fix: Retry + Connection Pool + Restart"
            code={`stepBuilder.faultTolerant()
  .retryLimit(3)
  .retry(TransientDataAccessException.class)
  .backOffPolicy(exponentialBackOff(1000, 2.0))
  .build();

// application.yml — HikariCP pool
spring.datasource.hikari:
  maximum-pool-size: 20
  connection-timeout: 30000
  validation-timeout: 5000`}
            explanation="Retry transient failures with exponential backoff. Tune connection pool. If job dies completely, restart picks up from last committed chunk."
            color="#4CAF50" startFrame={800} x={430} y={370} width={560}
          />

          <FlexAnimation startFrame={825} x={1050} y={300}>
            <BodybuilderCharacter
              name="Memory Marge" color="#9C27B0" accessory="book"
              startFrame={825} x={0} y={0} scale={0.9}
              speech="I saved checkpoint at chunk #499. We resume from there!" speechDelay={15}
            />
          </FlexAnimation>

          <StatusBadge status="RECOVERED" startFrame={855} x={900} y={620} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 6: Processor Throws Exception ─── */}
      <Sequence from={890} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Processor Pete tries to lift, but the weight is impossible — NullPointerException!" startFrame={895} />

          <FlexAnimation startFrame={902} x={50} y={80}>
            <BodybuilderCharacter
              name="Processor Pete" color="#FF9800" accessory="dumbbell"
              startFrame={902} x={0} y={0} scale={1.0}
              speech="ITEM #7,832 HAS A NULL FIELD! Can't transform it!" speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="💥" title="6. Processor Exception (NPE / Validation)"
            exception="NullPointerException at Processor.process() — item.getAddress() is null"
            symptom="Business logic fails on bad data. A single rotten item can crash the entire chunk if not handled."
            color="#F44336" startFrame={910} x={430} y={80} width={560}
          />

          <ResolutionCard
            icon="🛡️" title="Fix: Validate + Filter + Skip"
            code={`// Option A: Filter in processor
public Output process(Input item) {
  if (item.getAddress() == null) {
    return null; // filter out — skip item
  }
  return transform(item);
}

// Option B: Skip policy
stepBuilder.faultTolerant()
  .skipLimit(50)
  .skip(ValidationException.class)
  .noRollback(ValidationException.class)
  .build();`}
            explanation="Return null from processor to silently filter bad items. Or use skip policy for unexpected exceptions. noRollback avoids re-reading the chunk."
            color="#4CAF50" startFrame={935} x={430} y={340} width={560}
          />

          <StatusBadge status="RECOVERED" startFrame={985} x={900} y={620} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 7: Writer Constraint Violation ─── */}
      <Sequence from={1020} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Walt slams the weights on the rack, but the slot is already taken — DUPLICATE KEY!" startFrame={1025} />

          <FlexAnimation startFrame={1032} x={50} y={80}>
            <BodybuilderCharacter
              name="Writer Walt" color="#2196F3" accessory="dumbbell"
              startFrame={1032} x={0} y={0} scale={1.0}
              speech="Duplicate primary key! Row already exists!" speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="🚫" title="7. ConstraintViolationException (Duplicate Key)"
            exception="DataIntegrityViolationException: Duplicate entry '12345' for key 'PRIMARY'"
            symptom="Entire chunk of 1000 items rolls back because ONE duplicate exists. All 999 good items lost in the rollback!"
            color="#F44336" startFrame={1040} x={430} y={80} width={560}
          />

          <ResolutionCard
            icon="🔧" title="Fix: Skip + Single-Item Retry on Rollback"
            code={`stepBuilder.faultTolerant()
  .skipLimit(200)
  .skip(DataIntegrityViolationException.class)
  .processorNonTransactional()
  .build();

// Spring Batch auto-retries the chunk
// item-by-item to find the bad one(s)
// Only the offenders are skipped
// Other 999 items commit successfully!`}
            explanation="When a chunk fails, Spring Batch retries each item individually to isolate the bad ones. Only duplicates are skipped — the rest commit safely."
            color="#4CAF50" startFrame={1065} x={430} y={340} width={560}
          />

          <StatusBadge status="RECOVERED" startFrame={1115} x={900} y={620} />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ ACT 3 BANNER — "The Gym is on Fire" ═══ */}
      <Sequence from={1150} durationInFrames={70}>
        <ActBanner act="ACT III" title="The Gym Is On Fire" subtitle="Transaction, deadlock & timeout disasters" color="#E91E63" startFrame={1155} />
      </Sequence>

      {/* ─── Failure 8: Transaction Timeout ─── */}
      <Sequence from={1220} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The set is taking SO long that the gym's timer expires — TIMEOUT!" startFrame={1225} />

          <FlexAnimation startFrame={1232} x={50} y={80}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={1232} x={0} y={0} scale={1.0}
              speech="Chunk of 50,000 items took 10 minutes — TRANSACTION TIMED OUT!" speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="⏰" title="8. TransactionTimedOutException"
            exception="TransactionTimedOutException: Transaction timed out after 300 seconds"
            symptom="Chunk too large → single transaction takes too long → DB kills it. Everything rolls back."
            color="#E91E63" startFrame={1240} x={430} y={80} width={560}
          />

          <ResolutionCard
            icon="📐" title="Fix: Reduce Chunk Size + Tune Timeout"
            code={`// Reduce chunk size (was 50000!)
stepBuilder
  .<In, Out>chunk(500, txMgr) // 500, not 50000
  .reader(reader())
  .writer(writer())
  .build();

// Or increase timeout for heavy ops
@Bean
public PlatformTransactionManager txMgr() {
  var tm = new JpaTransactionManager();
  tm.setDefaultTimeout(600); // 10 min
  return tm;
}`}
            explanation="Smaller chunks = shorter transactions = fewer timeouts. Sweet spot is usually 100-1000 items per chunk."
            color="#4CAF50" startFrame={1265} x={430} y={330} width={560}
          />

          <StatusBadge status="RESOLVED" startFrame={1310} x={900} y={620} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 9: Deadlock ─── */}
      <Sequence from={1340} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Two lifters grab the same barbell from opposite ends — DEADLOCK!" startFrame={1345} />

          <FlexAnimation startFrame={1352} x={50} y={90}>
            <BodybuilderCharacter
              name="Thread-1" color="#E91E63" accessory="dumbbell"
              startFrame={1352} x={0} y={0} scale={0.9}
              speech="I locked Table A, waiting for Table B..." speechDelay={10}
            />
          </FlexAnimation>

          <FlexAnimation startFrame={1358} x={300} y={90}>
            <BodybuilderCharacter
              name="Thread-2" color="#FF5722" accessory="dumbbell"
              startFrame={1358} x={0} y={0} scale={0.9} facing="left"
              speech="I locked Table B, waiting for Table A..." speechDelay={10}
            />
          </FlexAnimation>

          <Dumbbell label="TABLE A" startFrame={1360} x={180} y={300} color="#E91E63" size={1.2} />
          <Dumbbell label="TABLE B" startFrame={1363} x={280} y={300} color="#FF5722" size={1.2} />
          <Arrow startFrame={1365} fromX={130} fromY={290} toX={280} toY={320} color="#F44336" label="WAITING" />
          <Arrow startFrame={1367} fromX={370} fromY={290} toX={220} toY={320} color="#F44336" label="WAITING" />

          <FailureCard
            icon="🔐" title="9. DeadlockLoserDataAccessException"
            exception="DeadlockLoserDataAccessException: Deadlock found when trying to get lock"
            symptom="Multi-threaded step: two threads lock resources in different order. DB picks a loser and kills their transaction."
            color="#E91E63" startFrame={1362} x={530} y={80} width={520}
          />

          <ResolutionCard
            icon="🔄" title="Fix: Retry + Consistent Lock Order"
            code={`stepBuilder.faultTolerant()
  .retryLimit(5)
  .retry(DeadlockLoserDataAccessException.class)
  .backOffPolicy(new FixedBackOffPolicy(){{
    setBackOffPeriod(500L); // 500ms
  }})
  .build();
// Also: Use ORDER BY in queries to ensure
// consistent lock acquisition order`}
            explanation="Retry is the standard fix for deadlocks — the loser retries and usually succeeds. Also ensure queries lock rows in consistent order."
            color="#4CAF50" startFrame={1390} x={530} y={340} width={520}
          />

          <StatusBadge status="RECOVERED" startFrame={1435} x={900} y={620} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 10: OutOfMemoryError ─── */}
      <Sequence from={1470} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Someone loaded ALL the weights onto one bar — the floor COLLAPSES! OOM!" startFrame={1475} />

          <FlexAnimation startFrame={1482} x={50} y={80}>
            <BodybuilderCharacter
              name="Reader Rick" color="#4CAF50" accessory="dumbbell"
              startFrame={1482} x={0} y={0} scale={1.0}
              speech="I loaded 10 MILLION rows into memory at once... oops." speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="🧠" title="10. OutOfMemoryError"
            exception="java.lang.OutOfMemoryError: Java heap space"
            symptom="Reading entire dataset into memory, huge chunk size, large ExecutionContext, or non-streaming readers. The JVM heap explodes."
            color="#B71C1C" startFrame={1490} x={430} y={70} width={560}
          />

          {/* Memory filling up animation */}
          <ProgressBar startFrame={1500} x={430} y={290} width={500} height={30} fromPercent={0} toPercent={98} duration={40} label="JVM Heap" color="#F44336" />

          <ResolutionCard
            icon="♻️" title="Fix: Streaming + Chunk Size + Fetch Size"
            code={`// 1. Use cursor/paging reader (streams)
@Bean
public JdbcCursorItemReader<Item> reader() {
  return new JdbcCursorItemReaderBuilder<>()
    .dataSource(ds)
    .fetchSize(1000) // JDBC fetch size
    .sql("SELECT * FROM items ORDER BY id")
    .rowMapper(rowMapper())
    .build();
}

// 2. Reasonable chunk size
.<Item, Item>chunk(500, txMgr) // NOT 100000

// 3. Keep ExecutionContext small
ctx.putLong("lastId", currentId);
// NOT: ctx.put("cache", hugeMap);`}
            explanation="Stream data with cursor readers + fetchSize. Keep chunk size under 1000. Never store large objects in ExecutionContext. Increase heap with -Xmx only as last resort."
            color="#4CAF50" startFrame={1520} x={430} y={340} width={560}
          />

          <StatusBadge status="RESOLVED" startFrame={1580} x={900} y={640} />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ ACT 4 BANNER — "The Team Falls Apart" ═══ */}
      <Sequence from={1610} durationInFrames={70}>
        <ActBanner act="ACT IV" title="The Team Falls Apart" subtitle="Multi-threading, partitioning & restart failures" color="#2196F3" startFrame={1615} />
      </Sequence>

      {/* ─── Failure 11: Non-Thread-Safe Reader ─── */}
      <Sequence from={1680} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Four lifters grab the SAME barbell at once — chaos! Thread safety violated!" startFrame={1685} />

          {[0, 1, 2, 3].map((i) => (
            <FlexAnimation key={i} startFrame={1692 + i * 5} x={50 + i * 130} y={70}>
              <BodybuilderCharacter
                name={`Thread-${i + 1}`} color={["#4CAF50", "#FF9800", "#2196F3", "#E91E63"][i]}
                accessory="dumbbell" startFrame={1692 + i * 5}
                x={0} y={0} scale={0.7}
              />
            </FlexAnimation>
          ))}

          <Dumbbell label="SHARED" startFrame={1700} x={250} y={280} color="#F44336" size={1.5} failed />

          <FailureCard
            icon="🧵" title="11. Non-Thread-Safe Reader = Duplicate / Lost Items"
            exception="Items read twice or skipped! FlatFileItemReader is NOT thread-safe by default."
            symptom="Multi-threaded step with a non-thread-safe reader causes race conditions. Some items processed twice, others skipped entirely."
            color="#2196F3" startFrame={1705} x={530} y={70} width={530}
          />

          <ResolutionCard
            icon="🔒" title="Fix: Synchronize or Partition"
            code={`// Option A: Synchronized decorator
@Bean
public SynchronizedItemStreamReader<Item>
    reader() {
  var delegate = flatFileReader();
  var sync = new SynchronizedItemStreamReader<>();
  sync.setDelegate(delegate);
  return sync;
}

// Option B: Use Partitioning instead
// Each worker gets its OWN reader instance
// (no shared state at all)`}
            explanation="Wrap reader in SynchronizedItemStreamReader (adds lock). Or better — use Partitioning so each thread has its own independent reader. Zero contention."
            color="#4CAF50" startFrame={1730} x={530} y={340} width={530}
          />

          <StatusBadge status="RESOLVED" startFrame={1778} x={900} y={630} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Failure 12: Job Restart After Crash ─── */}
      <Sequence from={1810} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The gym LOST POWER at chunk #5000 of 10000. Can we resume tomorrow?" startFrame={1815} />

          <FlexAnimation startFrame={1822} x={50} y={70}>
            <BodybuilderCharacter
              name="Memory Marge" color="#9C27B0" accessory="book"
              startFrame={1822} x={0} y={0} scale={1.0}
              speech="Power outage! But I saved everything up to chunk #4999..." speechDelay={15}
            />
          </FlexAnimation>

          <FailureCard
            icon="🔌" title="12. JobInterruptedException / JVM Crash"
            exception="Job FAILED at step 'processStep' — ExecutionContext saved at readCount=4999000"
            symptom="JVM crash, kill -9, server restart, deployment. Job dies mid-execution. Thousands of items already committed, but the job shows FAILED."
            color="#2196F3" startFrame={1830} x={430} y={70} width={560}
          />

          <ProgressBar startFrame={1838} x={430} y={290} width={400} height={25} fromPercent={0} toPercent={50} duration={25} label="Before crash: 50%" color="#F44336" />

          <ResolutionCard
            icon="💾" title="Fix: Restart = Resume From Checkpoint"
            code={`// Just re-launch with SAME parameters
JobParameters params =
  new JobParametersBuilder()
    .addString("file", "data.csv")
    .toJobParameters();

// Spring Batch sees: same instance, FAILED
// → restarts from last committed chunk!
jobLauncher.run(importJob, params);
// Skips chunks 1-4999, resumes at 5000

// REQUIRES:
// 1. Reader implements ItemStream
// 2. .preventRestart() NOT set
// 3. Same JobParameters as failed run`}
            explanation="Spring Batch's killer feature: restart from checkpoint. JobRepository stored the ExecutionContext with readCount. Reader reopens at that position. No duplicate processing!"
            color="#4CAF50" startFrame={1855} x={430} y={340} width={560}
          />

          <FlexAnimation startFrame={1880} x={1050} y={280}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={1880} x={0} y={0} scale={0.9}
              speech="We pick up RIGHT where we left off. That's the power of checkpointing!" speechDelay={15}
            />
          </FlexAnimation>

          <ProgressBar startFrame={1900} x={430} y={620} width={400} height={25} fromPercent={50} toPercent={100} duration={40} label="After restart: 100%!" color="#4CAF50" />

          <StatusBadge status="COMPLETED" startFrame={1920} x={900} y={660} />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ EPILOGUE — The Comeback Summary ═══ */}
      <Sequence from={1950} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "40px 60px" }}>
          <h2 style={{
            fontSize: 40, color: "#FFD700", fontFamily: "Arial, sans-serif", textAlign: "center",
            opacity: interpolate(frame - 1950, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            The Complete Failure Survival Guide
          </h2>

          {[
            { num: 1, fail: "DataSource missing", fix: "Configure DB + initialize-schema", act: "I", color: "#F44336" },
            { num: 2, fail: "Job already complete", fix: "Unique run.id parameter", act: "I", color: "#F44336" },
            { num: 3, fail: "Missing Step bean", fix: "Define all @Bean methods", act: "I", color: "#F44336" },
            { num: 4, fail: "CSV parse error", fix: "Skip policy + SkipListener", act: "II", color: "#FF9800" },
            { num: 5, fail: "DB connection lost", fix: "Retry + connection pool tuning", act: "II", color: "#FF9800" },
            { num: 6, fail: "Processor NPE", fix: "Return null to filter + skip policy", act: "II", color: "#FF9800" },
            { num: 7, fail: "Duplicate key", fix: "Skip + single-item retry isolation", act: "II", color: "#FF9800" },
            { num: 8, fail: "Transaction timeout", fix: "Smaller chunks + tune timeout", act: "III", color: "#E91E63" },
            { num: 9, fail: "Deadlock", fix: "Retry + consistent lock order", act: "III", color: "#E91E63" },
            { num: 10, fail: "OutOfMemoryError", fix: "Streaming reader + fetchSize + small chunks", act: "III", color: "#E91E63" },
            { num: 11, fail: "Non-thread-safe reader", fix: "SynchronizedReader or Partitioning", act: "IV", color: "#2196F3" },
            { num: 12, fail: "JVM crash mid-job", fix: "Restart from checkpoint (same params)", act: "IV", color: "#2196F3" },
          ].map((row, i) => {
            const rRel = frame - (1965 + i * 6);
            if (rRel < 0) return null;
            return (
              <div key={row.num} style={{
                position: "absolute", left: 60, top: 90 + i * 50,
                display: "flex", alignItems: "center", gap: 16, width: 1200,
                opacity: interpolate(rRel, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", backgroundColor: row.color,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ color: "#FFF", fontSize: 13, fontWeight: "bold" }}>{row.num}</span>
                </div>
                <span style={{ color: "#78909C", fontSize: 13, fontFamily: "monospace", width: 40 }}>
                  Act {row.act}
                </span>
                <span style={{ color: row.color, fontSize: 16, fontFamily: "Arial, sans-serif", fontWeight: "bold", width: 280 }}>
                  {row.fail}
                </span>
                <span style={{ color: "#A5D6A7", fontSize: 15, fontFamily: "Arial, sans-serif" }}>
                  {row.fix}
                </span>
              </div>
            );
          })}

          {/* Team pose at the bottom */}
          {frame >= 2050 && (
            <div style={{
              position: "absolute", bottom: 30, left: 0, right: 0, textAlign: "center",
              opacity: interpolate(frame - 2050, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#FFD700", fontSize: 30, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                Every failure has a comeback. That's the Spring Batch way.
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
