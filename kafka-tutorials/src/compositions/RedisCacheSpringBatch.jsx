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

/* ─── Story sub-components ─── */

const ChapterBanner = ({ chapter, title, subtitle, color, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 8, stiffness: 80, mass: 0.8 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transform: `scale(${scale})`,
    }}>
      <div style={{
        backgroundColor: `${color}15`, border: `3px solid ${color}`,
        borderRadius: 20, padding: "40px 80px", textAlign: "center",
      }}>
        <div style={{ color: "#78909C", fontSize: 16, fontFamily: "Arial, sans-serif", letterSpacing: 4, marginBottom: 6 }}>
          {chapter}
        </div>
        <h1 style={{ color, fontSize: 46, fontFamily: "Arial, sans-serif", fontWeight: "bold", marginBottom: 10 }}>
          {title}
        </h1>
        <p style={{ color: "#90A4AE", fontSize: 20, fontFamily: "Arial, sans-serif" }}>{subtitle}</p>
      </div>
    </div>
  );
};

const RedisBox = ({ label, sublabel, startFrame, x, y, width = 200, height = 80, icon = "🔴" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 120 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", left: x, top: y, width, height,
      transform: `scale(${scale})`, transformOrigin: "center",
      background: "linear-gradient(135deg, #D32F2F, #B71C1C)",
      borderRadius: 14, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      border: "2px solid #EF5350", boxShadow: "0 4px 20px rgba(211,47,47,0.3)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: sublabel ? 4 : 0 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ color: "#FFF", fontSize: 16, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{label}</span>
      </div>
      {sublabel && (
        <span style={{ color: "#FFCDD2", fontSize: 12, fontFamily: "monospace" }}>{sublabel}</span>
      )}
    </div>
  );
};

const DBBox = ({ label, sublabel, startFrame, x, y, width = 200, height = 80 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 120 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", left: x, top: y, width, height,
      transform: `scale(${scale})`, transformOrigin: "center",
      background: "linear-gradient(135deg, #1565C0, #0D47A1)",
      borderRadius: 14, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      border: "2px solid #42A5F5", boxShadow: "0 4px 20px rgba(21,101,192,0.3)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: sublabel ? 4 : 0 }}>
        <span style={{ fontSize: 18 }}>🗄️</span>
        <span style={{ color: "#FFF", fontSize: 16, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{label}</span>
      </div>
      {sublabel && (
        <span style={{ color: "#BBDEFB", fontSize: 12, fontFamily: "monospace" }}>{sublabel}</span>
      )}
    </div>
  );
};

const CodeSnippet = ({ code, language, startFrame, x, y, width = 520 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 12, stiffness: 100 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", left: x, top: y, width,
      transform: `scale(${scale})`, transformOrigin: "top left",
    }}>
      <div style={{
        backgroundColor: "#263238", borderRadius: "8px 8px 0 0",
        padding: "5px 14px", display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#F44336" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#FFB300" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#4CAF50" }} />
        <span style={{ color: "#78909C", fontSize: 11, fontFamily: "monospace", marginLeft: 8 }}>{language}</span>
      </div>
      <div style={{
        backgroundColor: "#1E1E1E", borderRadius: "0 0 8px 8px",
        padding: "12px 16px", border: "1px solid #37474F",
      }}>
        <pre style={{
          color: "#E0E0E0", fontSize: 13, fontFamily: "monospace",
          lineHeight: 1.55, margin: 0, whiteSpace: "pre-wrap",
        }}>{code}</pre>
      </div>
    </div>
  );
};

const AdvantageCard = ({ number, title, metric, description, color, startFrame, x, y, width = 440, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 110 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", left: x, top: y, width,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 20,
      border: `2px solid ${color}44`, borderLeft: `5px solid ${color}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", backgroundColor: color,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#1A1A2E", fontSize: 16, fontWeight: "bold" }}>{number}</span>
        </div>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h3 style={{ color, fontSize: 19, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{title}</h3>
      </div>
      {metric && (
        <div style={{
          backgroundColor: `${color}15`, borderRadius: 8, padding: "6px 12px",
          marginBottom: 8, display: "inline-block",
        }}>
          <span style={{ color, fontSize: 14, fontFamily: "monospace", fontWeight: "bold" }}>{metric}</span>
        </div>
      )}
      <p style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>{description}</p>
    </div>
  );
};

const StoryNarration = ({ text, startFrame, y = 30 }) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", top: y, left: 0, right: 0, textAlign: "center",
      opacity: interpolate(rel, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
    }}>
      <span style={{
        color: "#EF5350", fontSize: 19, fontFamily: "Arial, sans-serif", fontStyle: "italic",
        backgroundColor: "rgba(211,47,47,0.08)", padding: "8px 24px", borderRadius: 20,
      }}>
        {text}
      </span>
    </div>
  );
};

const SpeedComparison = ({ label1, time1, label2, time2, startFrame, x, y }) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0) return null;

  const bar1Width = interpolate(rel, [0, 30], [0, 300], { extrapolateRight: "clamp" });
  const bar2Width = interpolate(rel - 10, [0, 30], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute", left: x, top: y, width: 500,
      opacity: interpolate(rel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
    }}>
      {/* Slow bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#90A4AE", fontSize: 14, fontFamily: "Arial, sans-serif" }}>{label1}</span>
          <span style={{ color: "#F44336", fontSize: 14, fontFamily: "monospace" }}>{time1}</span>
        </div>
        <div style={{ height: 20, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ width: bar1Width, height: "100%", borderRadius: 10, backgroundColor: "#F44336" }} />
        </div>
      </div>
      {/* Fast bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#90A4AE", fontSize: 14, fontFamily: "Arial, sans-serif" }}>{label2}</span>
          <span style={{ color: "#4CAF50", fontSize: 14, fontFamily: "monospace" }}>{time2}</span>
        </div>
        <div style={{ height: 20, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ width: bar2Width, height: "100%", borderRadius: 10, backgroundColor: "#4CAF50" }} />
        </div>
      </div>
    </div>
  );
};

/* ─── MAIN COMPOSITION ─── */

export const RedisCacheSpringBatch = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0D1117, #161B22, #1A1A2E)" }}>

      {/* ═══ PROLOGUE — Title ═══ */}
      <Sequence from={0} durationInFrames={100}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Title text="Redis Cache + Spring Batch" subtitle="The Gym Gets a Supplement Store — instant energy, zero wait" startFrame={5} />
          {frame >= 40 && (
            <div style={{
              display: "flex", gap: 50, marginTop: 30,
              opacity: interpolate(frame - 40, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              {[
                { label: "In-Memory Speed", icon: "⚡", color: "#F44336" },
                { label: "6 Use Cases", icon: "🔴", color: "#EF5350" },
                { label: "Real Code", icon: "💻", color: "#FF5252" },
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

      {/* ═══ CHAPTER 1 — Why Redis? The Supplement Store Opens ═══ */}
      <Sequence from={100} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 1" title="The Supplement Store Opens"
          subtitle="Why does a gym need a supplement store right at the entrance?"
          color="#F44336" startFrame={105}
        />
      </Sequence>

      <Sequence from={170} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Coach Job's gym was slow — lifters kept running to the warehouse for every plate..." startFrame={175} />

          <FlexAnimation startFrame={185} x={50} y={80}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={185} x={0} y={0} scale={1.0}
              speech="Every chunk commit hits the DATABASE. 10,000 chunks = 10,000 round trips!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Without Redis — slow path */}
          <GymStation label="Spring Batch" sublabel="JobRepository" icon="🏋️" startFrame={195} x={450} y={100} color="#9C27B0" width={180} height={100} />
          <Arrow startFrame={200} fromX={630} fromY={150} toX={750} toY={150} color="#F44336" label="Every chunk" />
          <DBBox label="PostgreSQL" sublabel="~5-15ms per query" startFrame={200} x={750} y={110} width={200} height={80} />

          <SpeedComparison
            label1="Without Redis (DB every chunk)" time1="~15ms x 10,000 = 150 seconds overhead"
            label2="With Redis (in-memory)" time2="~0.1ms x 10,000 = 1 second overhead"
            startFrame={210} x={450} y={240}
          />

          <FlexAnimation startFrame={225} x={1000} y={180}>
            <BodybuilderCharacter
              name="Redis Rex" color="#F44336"
              startFrame={225} x={0} y={0} scale={1.1}
              speech="I live in MEMORY. Sub-millisecond. No disk. No waiting!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Key advantages list */}
          {[
            { text: "In-memory: O(1) GET/SET — microsecond latency", color: "#F44336" },
            { text: "Distributed: shared across multiple JVMs", color: "#EF5350" },
            { text: "TTL: auto-expire stale data — no cleanup jobs", color: "#FF5252" },
            { text: "Pub/Sub: notify workers in real-time", color: "#FF8A80" },
          ].map((item, i) => {
            const iRel = frame - (240 + i * 10);
            if (iRel < 0) return null;
            return (
              <div key={item.text} style={{
                position: "absolute", left: 450, top: 430 + i * 40,
                display: "flex", alignItems: "center", gap: 10,
                opacity: interpolate(iRel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: item.color }} />
                <span style={{ color: "#CFD8DC", fontSize: 16, fontFamily: "Arial, sans-serif" }}>{item.text}</span>
              </div>
            );
          })}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CHAPTER 2 — Redis as Caching Layer for JobRepository ═══ */}
      <Sequence from={310} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 2" title="The Pre-Workout Counter"
          subtitle="Redis caches JobRepository metadata — no more running to the warehouse"
          color="#FF5722" startFrame={315}
        />
      </Sequence>

      <Sequence from={380} durationInFrames={160}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Redis Rex stands at the entrance, handing out cached metadata instantly..." startFrame={385} />

          <FlexAnimation startFrame={392} x={30} y={80}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={392} x={0} y={0} scale={0.9}
              speech="Is job 'importCSV' already running? Let me check..." speechDelay={15}
            />
          </FlexAnimation>

          {/* Architecture diagram: Batch → Redis → DB */}
          <GymStation label="Spring Batch" sublabel="Step Execution" icon="🏋️" startFrame={400} x={300} y={100} color="#9C27B0" width={170} height={90} />

          <RedisBox label="Redis Cache" sublabel="TTL: 60s" startFrame={408} x={560} y={100} width={180} height={90} />

          <DBBox label="Database" sublabel="Source of truth" startFrame={412} x={830} y={100} width={180} height={90} />

          <Arrow startFrame={410} fromX={470} fromY={145} toX={560} toY={145} color="#4CAF50" label="CACHE HIT → 0.1ms" />
          <Arrow startFrame={415} fromX={740} fromY={145} toX={830} toY={145} color="#FF9800" label="CACHE MISS → DB" />

          {/* Write-through pattern */}
          <Arrow startFrame={420} fromX={650} fromY={195} toX={830} toY={195} color="#78909C" label="Write-through" />

          <CodeSnippet
            startFrame={425}
            x={300}
            y={240}
            width={700}
            language="RedisCachingJobRepository.java"
            code={`@Configuration
@EnableCaching
public class RedisBatchConfig {

  @Bean
  public CacheManager cacheManager(
      RedisConnectionFactory factory) {
    RedisCacheConfiguration config =
      RedisCacheConfiguration.defaultCacheConfig()
        .entryTtl(Duration.ofSeconds(60))
        .serializeValuesWith(
          GenericJackson2JsonRedisSerializer());

    return RedisCacheManager.builder(factory)
      .cacheDefaults(config)
      .withCacheConfiguration("jobExecutions",
        config.entryTtl(Duration.ofMinutes(5)))
      .withCacheConfiguration("stepExecutions",
        config.entryTtl(Duration.ofSeconds(30)))
      .build();
  }
}`}
          />

          <FlexAnimation startFrame={445} x={1050} y={250}>
            <BodybuilderCharacter
              name="Redis Rex" color="#F44336"
              startFrame={445} x={0} y={0} scale={1.0}
              speech="Job status? CACHED. Step progress? CACHED. Zero DB hits for reads!"
              speechDelay={15}
            />
          </FlexAnimation>

          <SpeechBubble
            text="Pattern: Cache-Aside with Write-Through. Reads hit Redis first, writes go to both Redis + DB."
            startFrame={470} x={1020} y={480} maxWidth={400}
            color="rgba(244,67,54,0.9)" textColor="#FFF" fontSize={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CHAPTER 3 — Redis as ItemReader Cache (Lookup Table) ═══ */}
      <Sequence from={540} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 3" title="The Supplement Shelf"
          subtitle="Cache reference data in Redis — Processor grabs it in microseconds"
          color="#FF9800" startFrame={545}
        />
      </Sequence>

      <Sequence from={610} durationInFrames={160}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Processor Pete needs to look up customer tiers for EVERY item — 10 million times!" startFrame={615} />

          <FlexAnimation startFrame={622} x={30} y={80}>
            <BodybuilderCharacter
              name="Processor Pete" color="#FF9800" accessory="dumbbell"
              startFrame={622} x={0} y={0} scale={1.0}
              speech="Every item needs a customer lookup. DB hit each time? That's 10M queries!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Without Redis: slow lookups */}
          <AdvantageCard
            number="!" title="Without Redis" icon="🐌"
            metric="10,000,000 DB lookups = 40+ minutes overhead"
            description="ItemProcessor calls customerRepo.findById() for each item. Each call = network round trip to PostgreSQL."
            color="#F44336" startFrame={632} x={400} y={70} width={550}
          />

          {/* With Redis: cached lookups */}
          <AdvantageCard
            number="✓" title="With Redis Cache" icon="⚡"
            metric="Cache hit ratio 99.8% → overhead drops to seconds"
            description="Pre-load reference data into Redis before the job starts. Processor reads from Redis — O(1) HashMap lookup in memory."
            color="#4CAF50" startFrame={648} x={400} y={290} width={550}
          />

          <CodeSnippet
            startFrame={660}
            x={50}
            y={360}
            width={340}
            language="ItemProcessor"
            code={`@Component
public class EnrichProcessor
  implements ItemProcessor<Order, Order> {

  @Autowired
  private RedisTemplate<String, Customer>
    redisTemplate;

  @Override
  public Order process(Order order) {
    // O(1) Redis GET — microseconds!
    Customer c = redisTemplate
      .opsForValue()
      .get("cust:" + order.getCustId());

    order.setTier(c.getTier());
    order.setDiscount(c.getDiscount());
    return order;
  }
}`}
          />

          <FlexAnimation startFrame={680} x={1050} y={350}>
            <BodybuilderCharacter
              name="Redis Rex" color="#F44336"
              startFrame={680} x={0} y={0} scale={0.9}
              speech="All 50,000 customer records fit in 20MB of my RAM. Instant lookup!"
              speechDelay={15}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CHAPTER 4 — Redis for Distributed Locking ═══ */}
      <Sequence from={770} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 4" title="The Locker Room Bouncer"
          subtitle="Redis distributed locks prevent duplicate job execution across JVMs"
          color="#9C27B0" startFrame={775}
        />
      </Sequence>

      <Sequence from={840} durationInFrames={150}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Two gyms (JVM instances) try to run the same workout at the same time!" startFrame={845} />

          {/* Two JVMs competing */}
          <GymStation label="JVM Instance 1" sublabel="Server A" icon="🖥️" startFrame={855} x={80} y={100} color="#4CAF50" width={180} height={90} />
          <GymStation label="JVM Instance 2" sublabel="Server B" icon="🖥️" startFrame={858} x={80} y={250} color="#FF9800" width={180} height={90} />

          {/* Redis lock in the middle */}
          <RedisBox label="Redis Lock" sublabel="SETNX job:importCSV" startFrame={862} x={380} y={160} width={220} height={90} icon="🔐" />

          <Arrow startFrame={865} fromX={260} fromY={145} toX={380} toY={195} color="#4CAF50" label="LOCK OK ✓" />
          <Arrow startFrame={868} fromX={260} fromY={295} toX={380} toY={225} color="#F44336" label="LOCK DENIED ✕" />

          <FlexAnimation startFrame={860} x={650} y={80}>
            <BodybuilderCharacter
              name="Server A" color="#4CAF50" accessory="dumbbell"
              startFrame={860} x={0} y={0} scale={0.85}
              speech="I got the lock! Running the import job..."
              speechDelay={15}
            />
          </FlexAnimation>

          <FlexAnimation startFrame={870} x={650} y={230}>
            <BodybuilderCharacter
              name="Server B" color="#FF9800"
              startFrame={870} x={0} y={0} scale={0.85}
              speech="Lock is taken. I'll wait or skip this run."
              speechDelay={15}
            />
          </FlexAnimation>

          <CodeSnippet
            startFrame={878}
            x={350}
            y={380}
            width={680}
            language="DistributedJobLock.java"
            code={`@Component
public class RedisJobLock {
  @Autowired private StringRedisTemplate redis;

  public boolean acquireLock(String jobName, Duration ttl) {
    // SETNX — atomic "set if not exists"
    Boolean locked = redis.opsForValue()
      .setIfAbsent("lock:job:" + jobName, instanceId(), ttl);
    return Boolean.TRUE.equals(locked);
  }

  public void releaseLock(String jobName) {
    // Only release if WE hold it (Lua script for atomicity)
    String script = "if redis.call('get',KEYS[1])==ARGV[1] "
      + "then return redis.call('del',KEYS[1]) else return 0 end";
    redis.execute(new DefaultRedisScript<>(script, Long.class),
      List.of("lock:job:" + jobName), instanceId());
  }
}`}
          />

          <SpeechBubble
            text="TTL on the lock = auto-release if the JVM crashes. No orphaned locks!"
            startFrame={905} x={1060} y={430} maxWidth={350}
            color="rgba(156,39,176,0.9)" textColor="#FFF" fontSize={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CHAPTER 5 — Redis for Inter-Step Data Sharing ═══ */}
      <Sequence from={990} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 5" title="The Gym Bulletin Board"
          subtitle="Steps share data through Redis — no bloated ExecutionContext"
          color="#2196F3" startFrame={995}
        />
      </Sequence>

      <Sequence from={1060} durationInFrames={160}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Step 1 found 3,200 invalid records. Step 3 needs that list. How to share?" startFrame={1065} />

          {/* Problem: ExecutionContext bloat */}
          <AdvantageCard
            number="!" title="Problem: ExecutionContext Bloat" icon="💣"
            metric="Serialized to DB as JSON every chunk commit"
            description="Storing 3,200 invalid IDs in ExecutionContext = massive JSON blob serialized to BATCH_STEP_EXECUTION_CONTEXT every single chunk. Slows down commits enormously."
            color="#F44336" startFrame={1075} x={50} y={70} width={500}
          />

          {/* Solution: Redis as shared bulletin board */}
          <AdvantageCard
            number="✓" title="Solution: Redis as Shared Store" icon="📌"
            metric="Store in Redis SET — O(1) add, O(1) lookup"
            description="Step 1 adds invalid IDs to a Redis SET. Step 3 checks membership with SISMEMBER. ExecutionContext stays tiny — just stores the Redis key name."
            color="#4CAF50" startFrame={1090} x={600} y={70} width={500}
          />

          {/* Flow diagram */}
          <AnimatedBox startFrame={1105} color="#4CAF50" width={160} height={55} x={100} y={350} borderRadius={8}>
            Step 1: Validate
          </AnimatedBox>
          <Arrow startFrame={1110} fromX={260} fromY={377} toX={370} toY={377} color="#F44336" label="invalid IDs" />
          <RedisBox label="Redis SET" sublabel="invalid:run123" startFrame={1112} x={370} y={345} width={170} height={65} icon="📌" />
          <Arrow startFrame={1118} fromX={540} fromY={377} toX={650} toY={377} color="#4CAF50" label="SISMEMBER" />
          <AnimatedBox startFrame={1120} color="#2196F3" width={160} height={55} x={650} y={350} borderRadius={8}>
            Step 3: Filter
          </AnimatedBox>

          <CodeSnippet
            startFrame={1125}
            x={50}
            y={440}
            width={520}
            language="Step1 — ValidationWriter.java"
            code={`// Step 1: Store invalid IDs in Redis SET
@Override
public void write(Chunk<ValidatedItem> chunk) {
  List<String> invalidIds = chunk.getItems()
    .stream()
    .filter(i -> !i.isValid())
    .map(i -> i.getId())
    .toList();

  if (!invalidIds.isEmpty()) {
    redis.opsForSet().add(
      "invalid:" + jobId,
      invalidIds.toArray(new String[0]));
  }
  // Write valid items to DB...
}`}
          />

          <CodeSnippet
            startFrame={1145}
            x={610}
            y={440}
            width={520}
            language="Step3 — FilterProcessor.java"
            code={`// Step 3: Check Redis before processing
@Override
public Order process(Order order) {
  // O(1) Redis SISMEMBER lookup
  Boolean isInvalid = redis.opsForSet()
    .isMember("invalid:" + jobId,
              order.getId());

  if (Boolean.TRUE.equals(isInvalid)) {
    return null; // skip invalid
  }
  return order;
}

// Cleanup after job completes:
// redis.delete("invalid:" + jobId);`}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CHAPTER 6 — Redis for Rate Limiting & Throttling ═══ */}
      <Sequence from={1220} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 6" title="The Energy Drink Dispenser"
          subtitle="Redis rate-limits external API calls during batch processing"
          color="#E91E63" startFrame={1225}
        />
      </Sequence>

      <Sequence from={1290} durationInFrames={150}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Processor Pete calls a payment API for each order — but the API allows only 100 req/sec!" startFrame={1295} />

          <FlexAnimation startFrame={1302} x={30} y={80}>
            <BodybuilderCharacter
              name="Processor Pete" color="#FF9800" accessory="dumbbell"
              startFrame={1302} x={0} y={0} scale={1.0}
              speech="4 threads x 1000 chunks = we'll CRUSH the API rate limit!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Rate limiting flow */}
          <GymStation label="Multi-threaded Step" sublabel="4 threads" icon="🏋️" startFrame={1312} x={380} y={90} color="#FF9800" width={180} height={90} />
          <RedisBox label="Redis Counter" sublabel="INCR + EXPIRE 1s" startFrame={1318} x={650} y={90} width={190} height={90} icon="⏱️" />
          <GymStation label="Payment API" sublabel="100 req/sec limit" icon="💳" startFrame={1322} x={930} y={90} color="#E91E63" width={180} height={90} />

          <Arrow startFrame={1320} fromX={560} fromY={135} toX={650} toY={135} color="#FFD700" label="check quota" />
          <Arrow startFrame={1325} fromX={840} fromY={135} toX={930} toY={135} color="#4CAF50" label="if allowed" />

          <CodeSnippet
            startFrame={1330}
            x={50}
            y={250}
            width={560}
            language="RedisRateLimiter.java"
            code={`@Component
public class RedisRateLimiter {
  @Autowired private StringRedisTemplate redis;

  public boolean allowRequest(String apiKey, int maxPerSec) {
    String key = "rate:" + apiKey + ":" + Instant.now().getEpochSecond();

    // Atomic increment + set TTL
    Long count = redis.opsForValue().increment(key);
    if (count == 1) {
      redis.expire(key, Duration.ofSeconds(2)); // auto-cleanup
    }
    return count <= maxPerSec;
  }
}

// In ItemProcessor:
while (!rateLimiter.allowRequest("payment-api", 100)) {
  Thread.sleep(10); // back-pressure
}
PaymentResult result = paymentApi.charge(order);`}
          />

          <FlexAnimation startFrame={1355} x={680} y={280}>
            <BodybuilderCharacter
              name="Redis Rex" color="#F44336"
              startFrame={1355} x={0} y={0} scale={1.0}
              speech="I count requests per second with INCR. Atomic. Distributed. All JVMs share the same counter!"
              speechDelay={15}
            />
          </FlexAnimation>

          <SpeechBubble
            text="Redis INCR is atomic — even 100 threads on 10 JVMs get an accurate global count!"
            startFrame={1385} x={680} y={520} maxWidth={450}
            color="rgba(233,30,99,0.9)" textColor="#FFF" fontSize={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CHAPTER 7 — Redis Pub/Sub for Job Coordination ═══ */}
      <Sequence from={1440} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 7" title="The Gym Intercom System"
          subtitle="Redis Pub/Sub coordinates workers and broadcasts job events"
          color="#00BCD4" startFrame={1445}
        />
      </Sequence>

      <Sequence from={1510} durationInFrames={150}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Coach Job finishes the import — time to announce it to all downstream workers!" startFrame={1515} />

          {/* Pub/Sub architecture */}
          <FlexAnimation startFrame={1522} x={30} y={90}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={1522} x={0} y={0} scale={0.9}
              speech="Job 'importCSV' COMPLETED! Broadcasting to all listeners..."
              speechDelay={15}
            />
          </FlexAnimation>

          <RedisBox label="Redis Pub/Sub" sublabel="Channel: batch-events" startFrame={1530} x={350} y={120} width={220} height={90} icon="📡" />

          <Arrow startFrame={1535} fromX={260} fromY={180} toX={350} toY={165} color="#FFD700" label="PUBLISH" />

          {/* Subscribers */}
          {[
            { name: "Report Worker", icon: "📊", y: 80 },
            { name: "Email Worker", icon: "📧", y: 180 },
            { name: "Cleanup Worker", icon: "🧹", y: 280 },
          ].map((worker, i) => (
            <div key={worker.name}>
              <GymStation label={worker.name} icon={worker.icon}
                startFrame={1540 + i * 8} x={700} y={worker.y}
                color="#00BCD4" width={180} height={70} sublabel="SUBSCRIBE"
              />
              <Arrow startFrame={1542 + i * 8} fromX={570} fromY={165} toX={700} toY={worker.y + 35} color="#00BCD4" />
            </div>
          ))}

          <CodeSnippet
            startFrame={1558}
            x={50}
            y={350}
            width={500}
            language="JobCompletionPublisher.java"
            code={`// After job completes — publish event
@Component
public class JobCompletionPublisher
    extends JobExecutionListenerSupport {

  @Autowired private StringRedisTemplate redis;

  @Override
  public void afterJob(JobExecution exec) {
    if (exec.getStatus() == BatchStatus.COMPLETED) {
      String event = Map.of(
        "job", exec.getJobInstance().getJobName(),
        "status", "COMPLETED",
        "readCount", exec.getStepExecutions()
          .stream().mapToLong(
            StepExecution::getReadCount).sum()
      ).toString();

      redis.convertAndSend("batch-events", event);
    }
  }
}`}
          />

          <CodeSnippet
            startFrame={1575}
            x={590}
            y={380}
            width={500}
            language="EventSubscriber.java"
            code={`// Listener on another JVM / service
@Component
public class BatchEventListener
    implements MessageListener {

  @Override
  public void onMessage(Message msg, byte[] pattern) {
    String event = new String(msg.getBody());
    log.info("Batch event: {}", event);
    // Trigger report generation,
    // send notification email, etc.
  }
}

// Config:
container.addMessageListener(listener,
  new ChannelTopic("batch-events"));`}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CHAPTER 8 — Redis Write-Behind Pattern ═══ */}
      <Sequence from={1660} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 8" title="The Quick-Drop Zone"
          subtitle="Write to Redis first, flush to DB in background — blazing fast writes"
          color="#8BC34A" startFrame={1665}
        />
      </Sequence>

      <Sequence from={1730} durationInFrames={150}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Writer Walt slams weights into the quick-drop zone — a background crew racks them properly later..." startFrame={1735} />

          <FlexAnimation startFrame={1742} x={30} y={80}>
            <BodybuilderCharacter
              name="Writer Walt" color="#2196F3" accessory="dumbbell"
              startFrame={1742} x={0} y={0} scale={1.0}
              speech="I write to Redis FIRST — sub-millisecond! Background thread flushes to DB."
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Write-behind flow */}
          <GymStation label="ItemWriter" sublabel="write(chunk)" icon="📝" startFrame={1750} x={350} y={100} color="#2196F3" width={160} height={85} />
          <Arrow startFrame={1755} fromX={510} fromY={142} toX={600} toY={142} color="#4CAF50" label="instant" />
          <RedisBox label="Redis LIST" sublabel="RPUSH batch:buffer" startFrame={1755} x={600} y={100} width={200} height={85} icon="⚡" />
          <Arrow startFrame={1762} fromX={800} fromY={142} toX={900} toY={142} color="#FF9800" label="background" />
          <DBBox label="Database" sublabel="Batch INSERT" startFrame={1762} x={900} y={100} width={180} height={85} />

          <CodeSnippet
            startFrame={1768}
            x={50}
            y={250}
            width={550}
            language="RedisBufferedWriter.java"
            code={`// Fast writer: push to Redis LIST
@Component
public class RedisBufferedWriter
    implements ItemWriter<ProcessedOrder> {

  @Autowired private RedisTemplate<String, ProcessedOrder> redis;

  @Override
  public void write(Chunk<ProcessedOrder> chunk) {
    // RPUSH all items — O(1) per item, in-memory
    chunk.getItems().forEach(item ->
      redis.opsForList().rightPush("batch:buffer", item));
  }
}

// Background flusher (separate thread / scheduled)
@Scheduled(fixedRate = 5000)
public void flushToDatabase() {
  List<ProcessedOrder> batch = new ArrayList<>();
  ProcessedOrder item;
  while ((item = redis.opsForList()
      .leftPop("batch:buffer")) != null) {
    batch.add(item);
    if (batch.size() >= 1000) break;
  }
  if (!batch.isEmpty()) {
    jdbcTemplate.batchUpdate(INSERT_SQL, batch);
  }
}`}
          />

          <FlexAnimation startFrame={1790} x={650} y={300}>
            <BodybuilderCharacter
              name="Redis Rex" color="#F44336"
              startFrame={1790} x={0} y={0} scale={1.0}
              speech="I'm the quick-drop zone! Dump the weights here. The night crew racks them into the DB later."
              speechDelay={15}
            />
          </FlexAnimation>

          <SpeechBubble
            text="Trade-off: eventual consistency. If Redis crashes before flush, buffered items are lost. Use Redis persistence (AOF) for safety!"
            startFrame={1830} x={650} y={540} maxWidth={480}
            color="rgba(139,195,74,0.9)" textColor="#FFF" fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ EPILOGUE — Advantages Summary ═══ */}
      <Sequence from={1880} durationInFrames={70}>
        <ChapterBanner
          chapter="EPILOGUE" title="The Supplement Store Advantage"
          subtitle="Every performance metric improved after Redis joined the gym"
          color="#FFD700" startFrame={1885}
        />
      </Sequence>

      <Sequence from={1950} durationInFrames={160}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2 style={{
            fontSize: 36, color: "#FFD700", fontFamily: "Arial, sans-serif", textAlign: "center",
            opacity: interpolate(frame - 1950, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            Redis + Spring Batch — Complete Advantage Map
          </h2>

          {[
            { ch: "Ch 2", use: "JobRepository Caching", advantage: "150x faster metadata reads", metric: "15ms → 0.1ms per lookup", color: "#FF5722", icon: "🔴" },
            { ch: "Ch 3", use: "Reference Data Cache", advantage: "Eliminate millions of DB lookups", metric: "99.8% cache hit ratio", color: "#FF9800", icon: "📦" },
            { ch: "Ch 4", use: "Distributed Locking", advantage: "No duplicate job execution", metric: "SETNX + TTL = crash-safe", color: "#9C27B0", icon: "🔐" },
            { ch: "Ch 5", use: "Inter-Step Data Sharing", advantage: "No ExecutionContext bloat", metric: "O(1) SET/SISMEMBER", color: "#2196F3", icon: "📌" },
            { ch: "Ch 6", use: "Rate Limiting", advantage: "Protect external APIs", metric: "Atomic INCR across JVMs", color: "#E91E63", icon: "⏱️" },
            { ch: "Ch 7", use: "Pub/Sub Coordination", advantage: "Real-time job event broadcast", metric: "Decouple producers/consumers", color: "#00BCD4", icon: "📡" },
            { ch: "Ch 8", use: "Write-Behind Buffer", advantage: "10x faster writes", metric: "In-memory RPUSH → batch flush", color: "#8BC34A", icon: "⚡" },
          ].map((row, i) => {
            const rRel = frame - (1968 + i * 10);
            if (rRel < 0) return null;
            return (
              <div key={row.ch} style={{
                position: "absolute", left: 60, top: 80 + i * 72,
                display: "flex", alignItems: "center", gap: 16, width: 1300,
                opacity: interpolate(rRel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
              }}>
                <span style={{ fontSize: 20 }}>{row.icon}</span>
                <span style={{ color: "#78909C", fontSize: 13, fontFamily: "monospace", width: 45 }}>{row.ch}</span>
                <span style={{ color: row.color, fontSize: 17, fontFamily: "Arial, sans-serif", fontWeight: "bold", width: 260 }}>{row.use}</span>
                <span style={{ color: "#CFD8DC", fontSize: 15, fontFamily: "Arial, sans-serif", width: 300 }}>{row.advantage}</span>
                <div style={{
                  backgroundColor: `${row.color}20`, borderRadius: 8, padding: "4px 12px",
                }}>
                  <span style={{ color: row.color, fontSize: 13, fontFamily: "monospace" }}>{row.metric}</span>
                </div>
              </div>
            );
          })}

          {/* Final team pose */}
          <FlexAnimation startFrame={2050} x={400} y={600}>
            <BodybuilderCharacter
              name="Redis Rex" color="#F44336"
              startFrame={2050} x={0} y={0} scale={0.8}
              speech="" speechDelay={0}
            />
          </FlexAnimation>
          <FlexAnimation startFrame={2055} x={550} y={600}>
            <BodybuilderCharacter
              name="Coach Job" color="#9C27B0" accessory="clipboard"
              startFrame={2055} x={0} y={0} scale={0.8}
              speech="" speechDelay={0}
            />
          </FlexAnimation>

          {frame >= 2060 && (
            <div style={{
              position: "absolute", bottom: 25, left: 0, right: 0, textAlign: "center",
              opacity: interpolate(frame - 2060, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#FFD700", fontSize: 28, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                Redis is the supplement store every Spring Batch gym needs.
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
