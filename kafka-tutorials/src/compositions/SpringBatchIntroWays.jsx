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

const CodeBlock = ({ code, language, startFrame, x, y, width = 520, color = "#1E1E1E" }) => {
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
        width,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <div
        style={{
          backgroundColor: "#263238",
          borderRadius: "8px 8px 0 0",
          padding: "6px 14px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F44336" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FFB300" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#4CAF50" }} />
        <span style={{ color: "#78909C", fontSize: 12, fontFamily: "monospace", marginLeft: 8 }}>
          {language}
        </span>
      </div>
      <div
        style={{
          backgroundColor: color,
          borderRadius: "0 0 8px 8px",
          padding: "14px 18px",
          border: "1px solid #37474F",
        }}
      >
        <pre
          style={{
            color: "#E0E0E0",
            fontSize: 13,
            fontFamily: "monospace",
            lineHeight: 1.6,
            margin: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {code}
        </pre>
      </div>
    </div>
  );
};

const WayCard = ({ number, title, description, startFrame, x, y, color = "#FFD700", icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 8, stiffness: 120, mass: 0.7 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 420,
        transform: `scale(${scale})`,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
        padding: 24,
        border: `2px solid ${color}44`,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#1A1A2E", fontSize: 20, fontWeight: "bold" }}>{number}</span>
        </div>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <h3 style={{ color, fontSize: 22, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
          {title}
        </h3>
      </div>
      <p style={{ color: "#B0BEC5", fontSize: 17, fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
};

export const SpringBatchIntroWays = () => {
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
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Title
            text="4 Ways to Configure Spring Batch"
            subtitle="Every gym has its own style of training"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Way 1 — Spring Boot Auto-Configuration */}
      <Sequence from={80} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <FlexAnimation startFrame={85} x={50} y={100}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={85}
              x={0}
              y={0}
              scale={1.2}
              speech="Way #1: Let Spring Boot do the heavy lifting!"
              speechDelay={20}
            />
          </FlexAnimation>

          <WayCard
            number={1}
            title="Spring Boot Auto-Config"
            icon="🚀"
            description="Just add spring-boot-starter-batch dependency. Spring Boot automatically creates JobRepository, JobLauncher, and DataSource. Zero manual wiring!"
            startFrame={90}
            x={450}
            y={80}
            color="#4CAF50"
          />

          <CodeBlock
            startFrame={105}
            x={450}
            y={280}
            width={550}
            language="build.gradle"
            code={`dependencies {
  implementation 'org.springframework.boot:
    spring-boot-starter-batch'
  implementation 'org.springframework.boot:
    spring-boot-starter-data-jpa'
  runtimeOnly 'com.h2database:h2'
}`}
          />

          <CodeBlock
            startFrame={120}
            x={1050}
            y={280}
            width={550}
            language="Application.java"
            code={`@SpringBootApplication
@EnableBatchProcessing
public class BatchApp {
  public static void main(String[] args) {
    SpringApplication.run(
      BatchApp.class, args
    );
  }
}`}
          />

          <SpeechBubble
            text="Like a gym with a personal trainer who sets everything up for you!"
            startFrame={140}
            x={450}
            y={580}
            color="rgba(76,175,80,0.9)"
            textColor="#FFF"
            fontSize={18}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Way 2 — Java Configuration */}
      <Sequence from={200} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayCard
            number={2}
            title="Java Configuration (@Bean)"
            icon="☕"
            description="Define Job, Steps, Reader, Processor, Writer as @Bean methods. Full control with type safety. The most popular approach in modern Spring Batch."
            startFrame={205}
            x={50}
            y={60}
            color="#FF9800"
          />

          <CodeBlock
            startFrame={215}
            x={50}
            y={270}
            width={600}
            language="BatchConfig.java"
            code={`@Configuration
public class BatchConfig {

  @Bean
  public Job importJob(JobRepository repo,
                       Step step1) {
    return new JobBuilder("importJob", repo)
      .start(step1)
      .build();
  }

  @Bean
  public Step step1(JobRepository repo,
      PlatformTransactionManager txMgr) {
    return new StepBuilder("step1", repo)
      .<Input, Output>chunk(100, txMgr)
      .reader(reader())
      .processor(processor())
      .writer(writer())
      .build();
  }
}`}
          />

          <FlexAnimation startFrame={225} x={750} y={250}>
            <BodybuilderCharacter
              name="Processor Pete"
              color="#FF9800"
              accessory="dumbbell"
              startFrame={225}
              x={0}
              y={0}
              scale={1.2}
              speech="You pick every exercise yourself — total control!"
              speechDelay={20}
            />
          </FlexAnimation>

          <SpeechBubble
            text="Most gyms use this style — flexible yet structured!"
            startFrame={260}
            x={750}
            y={550}
            color="rgba(255,152,0,0.9)"
            textColor="#FFF"
            fontSize={18}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Way 3 — XML Configuration */}
      <Sequence from={320} durationInFrames={110}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayCard
            number={3}
            title="XML Configuration (Legacy)"
            icon="📜"
            description="The original way — define jobs in XML. Still supported but rarely used in new projects. Think of it as the old-school gym with chalk and iron plates."
            startFrame={325}
            x={50}
            y={60}
            color="#78909C"
          />

          <CodeBlock
            startFrame={335}
            x={50}
            y={270}
            width={600}
            language="batch-job.xml"
            code={`<job id="importJob"
     xmlns="http://.../batch">

  <step id="step1">
    <tasklet>
      <chunk reader="csvReader"
             processor="itemProcessor"
             writer="dbWriter"
             commit-interval="100"/>
    </tasklet>
  </step>
</job>`}
          />

          <FlexAnimation startFrame={345} x={750} y={200}>
            <BodybuilderCharacter
              name="Reader Rick"
              color="#4CAF50"
              accessory="dumbbell"
              startFrame={345}
              x={0}
              y={0}
              scale={1.1}
              speech="Old school, but it still works!"
              speechDelay={15}
            />
          </FlexAnimation>

          <SpeechBubble
            text="Legacy gyms still run this way — if it ain't broke, don't fix it!"
            startFrame={370}
            x={750}
            y={480}
            color="rgba(120,144,156,0.9)"
            textColor="#FFF"
            fontSize={18}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Way 4 — Programmatic / JobBuilderFactory */}
      <Sequence from={430} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <WayCard
            number={4}
            title="Programmatic (Dynamic Jobs)"
            icon="🔧"
            description="Build jobs at runtime using JobBuilder API directly. Create dynamic workflows where steps are determined by input parameters or business logic."
            startFrame={435}
            x={50}
            y={60}
            color="#2196F3"
          />

          <CodeBlock
            startFrame={445}
            x={50}
            y={270}
            width={600}
            language="DynamicJobService.java"
            code={`@Service
public class DynamicJobService {

  public Job createJob(String inputFile) {
    StepBuilder sb = new StepBuilder(
      "dynamic-" + inputFile, jobRepo);

    Step step = sb
      .<String, String>chunk(50, txMgr)
      .reader(readerFor(inputFile))
      .processor(dynamicProcessor())
      .writer(writer())
      .build();

    return new JobBuilder("job-" + inputFile,
        jobRepo)
      .start(step)
      .build();
  }
}`}
          />

          <FlexAnimation startFrame={455} x={750} y={200}>
            <BodybuilderCharacter
              name="Launcher Larry"
              color="#F44336"
              accessory="horn"
              startFrame={455}
              x={0}
              y={0}
              scale={1.2}
              speech="I create a custom workout plan for every client!"
              speechDelay={20}
            />
          </FlexAnimation>

          <SpeechBubble
            text="Like a personal trainer who designs unique programs on the fly!"
            startFrame={490}
            x={750}
            y={500}
            color="rgba(33,150,243,0.9)"
            textColor="#FFF"
            fontSize={18}
          />

          {/* Summary */}
          {frame >= 510 && (
            <div
              style={{
                position: "absolute",
                bottom: 50,
                left: 0,
                right: 0,
                textAlign: "center",
                opacity: interpolate(frame - 510, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span style={{ color: "#FFD700", fontSize: 28, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                Spring Boot Auto-Config (recommended) → Java Config → Programmatic → XML (legacy)
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
