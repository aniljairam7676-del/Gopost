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

/* ═══════════════════════════════════════════════════════════════
   Story sub-components
   ═══════════════════════════════════════════════════════════════ */

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

const RedisBox = ({ label, sublabel, startFrame, x, y, width = 200, height = 80, icon = "🔴", bgColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 120 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", left: x, top: y, width, height,
      transform: `scale(${scale})`, transformOrigin: "center",
      background: bgColor || "linear-gradient(135deg, #D32F2F, #B71C1C)",
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

const AdvantageCard = ({ number, title, description, color, startFrame, x, y, width = 440, icon, metric }) => {
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

const DataStructureCard = ({ name, symbol, description, operations, color, startFrame, x, y, width = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 110 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", left: x, top: y, width,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 16,
      border: `2px solid ${color}55`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 32 }}>{symbol}</span>
        <h3 style={{ color, fontSize: 20, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{name}</h3>
      </div>
      <p style={{ color: "#B0BEC5", fontSize: 13, fontFamily: "Arial, sans-serif", lineHeight: 1.4, marginBottom: 8 }}>
        {description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {operations.map((op) => (
          <span key={op} style={{
            backgroundColor: `${color}20`, color, borderRadius: 6, padding: "3px 8px",
            fontSize: 11, fontFamily: "monospace", fontWeight: "bold",
          }}>
            {op}
          </span>
        ))}
      </div>
    </div>
  );
};

const FlowStep = ({ label, sublabel, icon, startFrame, x, y, width = 160, height = 75, color = "#FF5722" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;
  const scale = spring({ frame: Math.max(0, rel), fps, config: { damping: 10, stiffness: 120 } });
  if (rel < 0) return null;

  return (
    <div style={{
      position: "absolute", left: x, top: y, width, height,
      transform: `scale(${scale})`, transformOrigin: "center",
      background: `linear-gradient(135deg, ${color}, ${color}CC)`,
      borderRadius: 12, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      border: `2px solid ${color}88`, boxShadow: `0 4px 16px ${color}40`,
    }}>
      <span style={{ fontSize: 20, marginBottom: 2 }}>{icon}</span>
      <span style={{ color: "#FFF", fontSize: 14, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{label}</span>
      {sublabel && <span style={{ color: "#FFFFFF99", fontSize: 11, fontFamily: "monospace" }}>{sublabel}</span>}
    </div>
  );
};

const PulsingGlow = ({ x, y, size, color, startFrame }) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0) return null;
  const pulse = Math.sin(rel * 0.1) * 0.3 + 0.7;

  return (
    <div style={{
      position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size,
      borderRadius: "50%", backgroundColor: `${color}15`,
      border: `2px solid ${color}`,
      opacity: pulse, boxShadow: `0 0 ${20 * pulse}px ${color}40`,
    }} />
  );
};

const MemorySlot = ({ label, value, color, startFrame, x, y, width = 180, delay = 0 }) => {
  const frame = useCurrentFrame();
  const rel = frame - (startFrame + delay);
  if (rel < 0) return null;
  const opacity = interpolate(rel, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute", left: x, top: y, width, opacity,
      display: "flex", height: 36, borderRadius: 8, overflow: "hidden",
      border: `1px solid ${color}66`,
    }}>
      <div style={{
        backgroundColor: `${color}30`, padding: "0 10px",
        display: "flex", alignItems: "center", flex: "0 0 auto",
      }}>
        <span style={{ color, fontSize: 12, fontFamily: "monospace", fontWeight: "bold" }}>{label}</span>
      </div>
      <div style={{
        backgroundColor: "rgba(0,0,0,0.3)", padding: "0 10px", flex: 1,
        display: "flex", alignItems: "center",
      }}>
        <span style={{ color: "#E0E0E0", fontSize: 12, fontFamily: "monospace" }}>{value}</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPOSITION
   ═══════════════════════════════════════════════════════════════ */

export const RedisInternals = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0D1117, #161B22, #1A1A2E)" }}>

      {/* ═══ PROLOGUE — Title ═══ */}
      <Sequence from={0} durationInFrames={110}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Title text="How Redis Works — The Kingdom of Redis" subtitle="Every internal component explained through the tale of a legendary gym kingdom" startFrame={5} />
          {frame >= 45 && (
            <div style={{
              display: "flex", gap: 40, marginTop: 30,
              opacity: interpolate(frame - 45, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              {[
                { label: "Single-Threaded King", icon: "👑", color: "#FFD700" },
                { label: "6 Weapon Vaults", icon: "⚔️", color: "#F44336" },
                { label: "Memory Kingdom", icon: "🏰", color: "#9C27B0" },
                { label: "Replication Army", icon: "🛡️", color: "#2196F3" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 36 }}>{item.icon}</span>
                  <div style={{ color: item.color, fontSize: 16, fontFamily: "Arial, sans-serif", marginTop: 6 }}>{item.label}</div>
                </div>
              ))}
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 1 — The Single-Threaded King (Event Loop) ═══ */}
      <Sequence from={110} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 1" title="The Single-Threaded King"
          subtitle="One king rules the entire kingdom — the Event Loop"
          color="#FFD700" startFrame={115}
        />
      </Sequence>

      <Sequence from={180} durationInFrames={190}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="In the Kingdom of Redis, ONE king sits on the throne. No councils. No committees. Just ONE." startFrame={185} />

          <FlexAnimation startFrame={195} x={50} y={80}>
            <BodybuilderCharacter
              name="King Event Loop" color="#FFD700" accessory="clipboard"
              startFrame={195} x={0} y={0} scale={1.1}
              speech="I am the SINGLE THREAD. Every command passes through ME. No locks. No contention. Pure speed."
              speechDelay={15}
            />
          </FlexAnimation>

          {/* The event loop cycle */}
          <FlowStep label="Client Request" sublabel="TCP socket" icon="📨" startFrame={210} x={420} y={80} color="#42A5F5" />
          <Arrow startFrame={215} fromX={580} fromY={117} toX={650} toY={117} color="#FFD700" label="epoll/kqueue" />
          <FlowStep label="Event Loop" sublabel="single thread" icon="👑" startFrame={215} x={650} y={80} color="#FFD700" width={180} height={75} />
          <Arrow startFrame={220} fromX={830} fromY={117} toX={900} toY={117} color="#4CAF50" label="execute" />
          <FlowStep label="In-Memory" sublabel="HashMap" icon="🧠" startFrame={220} x={900} y={80} color="#4CAF50" />
          <Arrow startFrame={225} fromX={980} fromY={155} toX={980} toY={200} color="#FF9800" label="result" />
          <FlowStep label="Response" sublabel="< 1μs" icon="📤" startFrame={225} x={900} y={200} color="#FF5722" />

          {/* Why single thread? */}
          <AdvantageCard
            number="1" title="No Lock Contention" icon="🔓"
            metric="Zero mutex overhead"
            description="Multi-threaded databases waste CPU on locks, context switching, and synchronization. King Event Loop has NO competitors for the throne — zero overhead."
            color="#FFD700" startFrame={235} x={420} y={195} width={440}
          />

          <AdvantageCard
            number="2" title="I/O Multiplexing" icon="📡"
            metric="epoll (Linux) / kqueue (macOS)"
            description="The king doesn't wait at one door. He uses I/O multiplexing — one thread monitors THOUSANDS of client connections simultaneously using OS-level event notification."
            color="#42A5F5" startFrame={248} x={420} y={395} width={440}
          />

          <CodeSnippet
            startFrame={260}
            x={900}
            y={310}
            width={420}
            language="redis-server pseudocode"
            code={`// The Event Loop — heart of Redis
while (server.isRunning) {
  // 1. Poll ALL sockets at once
  events = epoll_wait(readyFDs);

  // 2. Process each ready event
  for (event : events) {
    if (event.isReadable()) {
      cmd = parseCommand(event.fd);
      result = executeCommand(cmd);
      queueResponse(event.fd, result);
    }
  }

  // 3. Run background tasks
  //    (expiry, eviction, etc.)
  processTimeEvents();
}`}
          />

          <SpeechBubble
            text="Redis processes 100,000+ commands/sec on a SINGLE core. That's the power of simplicity."
            startFrame={290} x={50} y={520} maxWidth={380}
            color="rgba(255,215,0,0.9)" textColor="#1A1A2E" fontSize={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 2 — The Six Weapon Vaults (Data Structures) ═══ */}
      <Sequence from={370} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 2" title="The Six Weapon Vaults"
          subtitle="Redis's legendary data structures — each a specialized weapon"
          color="#F44336" startFrame={375}
        />
      </Sequence>

      <Sequence from={440} durationInFrames={220}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The kingdom armory holds SIX legendary weapon vaults — each forged for a different battle..." startFrame={445} />

          {/* String */}
          <DataStructureCard
            name="STRING" symbol="🗡️" color="#F44336"
            description="The Sword — simple key-value. Holds text, numbers, or serialized objects. Can increment atomically."
            operations={["SET", "GET", "INCR", "APPEND", "MGET", "SETNX"]}
            startFrame={455} x={50} y={70} width={380}
          />

          {/* List */}
          <DataStructureCard
            name="LIST" symbol="⛓️" color="#FF9800"
            description="The Chain — ordered sequence. Push/pop from both ends. Perfect for queues, timelines, recent items."
            operations={["LPUSH", "RPUSH", "LPOP", "RPOP", "LRANGE", "LLEN"]}
            startFrame={465} x={470} y={70} width={380}
          />

          {/* Set */}
          <DataStructureCard
            name="SET" symbol="🛡️" color="#4CAF50"
            description="The Shield — unordered unique collection. Lightning-fast membership check. Unions and intersections."
            operations={["SADD", "SISMEMBER", "SMEMBERS", "SUNION", "SINTER"]}
            startFrame={475} x={890} y={70} width={380}
          />

          {/* Sorted Set */}
          <DataStructureCard
            name="SORTED SET" symbol="🏹" color="#9C27B0"
            description="The Bow — each member has a score. Auto-sorted by score. Leaderboards, priority queues, range queries."
            operations={["ZADD", "ZRANGE", "ZRANK", "ZRANGEBYSCORE", "ZINCRBY"]}
            startFrame={485} x={50} y={310} width={380}
          />

          {/* Hash */}
          <DataStructureCard
            name="HASH" symbol="🗝️" color="#2196F3"
            description="The Key Ring — a mini-object with fields. Like a row in a table. Memory-efficient for small objects."
            operations={["HSET", "HGET", "HGETALL", "HINCRBY", "HDEL", "HEXISTS"]}
            startFrame={495} x={470} y={310} width={380}
          />

          {/* Stream */}
          <DataStructureCard
            name="STREAM" symbol="🌊" color="#00BCD4"
            description="The River — append-only log with consumer groups. Like Kafka inside Redis. Event sourcing."
            operations={["XADD", "XREAD", "XREADGROUP", "XACK", "XLEN"]}
            startFrame={505} x={890} y={310} width={380}
          />

          {/* Character explains */}
          <FlexAnimation startFrame={520} x={50} y={520}>
            <BodybuilderCharacter
              name="King Event Loop" color="#FFD700" accessory="clipboard"
              startFrame={520} x={0} y={0} scale={0.85}
              speech="Each vault is O(1) for basic ops! Sorted Sets use skip lists — O(log N) for range queries."
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Internal implementation hints */}
          <CodeSnippet
            startFrame={540}
            x={400}
            y={530}
            width={520}
            language="redis internal data encoding"
            code={`// Redis picks the BEST encoding automatically:
// STRING → int (if numeric) | embstr (≤44 bytes) | raw
// LIST   → listpack (small) | quicklist (large)
// SET    → listpack (small) | hashtable (large)
// ZSET   → listpack (small) | skiplist + hashtable
// HASH   → listpack (small) | hashtable (large)
// Stream → rax tree + listpacks

// Example: a HASH with 3 fields uses only ~100 bytes
// vs ~300 bytes for 3 separate STRING keys!`}
          />

          <SpeechBubble
            text="Redis auto-switches encoding when data grows. Small data = compact listpack. Large data = full structure. Genius!"
            startFrame={560} x={980} y={530} maxWidth={370}
            color="rgba(244,67,54,0.9)" textColor="#FFF" fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 3 — The Memory Palace (How Keys Are Stored) ═══ */}
      <Sequence from={660} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 3" title="The Memory Palace"
          subtitle="How Redis stores everything in RAM — the dict, db, and keyspace"
          color="#9C27B0" startFrame={665}
        />
      </Sequence>

      <Sequence from={730} durationInFrames={180}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The palace has 16 rooms (databases 0-15). Each room has a giant hash table of keys..." startFrame={735} />

          {/* The redisServer → redisDb → dict structure */}
          <FlowStep label="redisServer" sublabel="the palace" icon="🏰" startFrame={745} x={50} y={80} color="#9C27B0" width={180} height={80} />
          <Arrow startFrame={750} fromX={230} fromY={120} toX={300} toY={120} color="#FFD700" label="16 databases" />

          {/* Database boxes */}
          {[0, 1, 2].map((db, i) => (
            <div key={db}>
              <FlowStep
                label={`db[${db}]`} sublabel="redisDb" icon="🚪"
                startFrame={752 + i * 5} x={300 + i * 195} y={80}
                color={i === 0 ? "#FFD700" : "#546E7A"} width={170} height={80}
              />
            </div>
          ))}
          <FlowStep label="... db[15]" sublabel="redisDb" icon="🚪" startFrame={768} x={885} y={80} color="#546E7A" width={170} height={80} />

          {/* Zoom into db[0] */}
          <Arrow startFrame={775} fromX={385} fromY={160} toX={385} toY={200} color="#FFD700" label="keyspace" />

          {/* Hash table visualization */}
          <div style={{
            position: "absolute", left: 100, top: 210, width: 800, height: 360,
            border: "2px solid #FFD70044", borderRadius: 14,
            backgroundColor: "rgba(255,215,0,0.03)", padding: 16,
            opacity: frame >= 778 ? interpolate(frame - 778, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            <div style={{ color: "#FFD700", fontSize: 16, fontFamily: "monospace", fontWeight: "bold", marginBottom: 12 }}>
              dict (Hash Table) — db[0].keyspace
            </div>

            {/* Hash table buckets */}
            {[
              { bucket: 0, key: "user:1001", type: "HASH", value: '{name:"Rex", age:28}', color: "#2196F3" },
              { bucket: 1, key: "session:abc", type: "STRING", value: '"token_xyz_123"', color: "#F44336" },
              { bucket: 3, key: "cart:items", type: "LIST", value: '["item1","item2","item3"]', color: "#FF9800" },
              { bucket: 5, key: "online:users", type: "SET", value: '{1001, 1002, 1005}', color: "#4CAF50" },
              { bucket: 7, key: "leaderboard", type: "ZSET", value: '{Rex:2500, Max:2200}', color: "#9C27B0" },
            ].map((row, i) => {
              const rRel = frame - (785 + i * 8);
              if (rRel < 0) return null;
              return (
                <div key={row.key} style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                  opacity: interpolate(rRel, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
                }}>
                  {/* Bucket number */}
                  <div style={{
                    width: 55, height: 34, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "#78909C", fontSize: 12, fontFamily: "monospace" }}>b[{row.bucket}]</span>
                  </div>
                  <span style={{ color: "#546E7A", fontSize: 16 }}>→</span>
                  {/* Key */}
                  <div style={{
                    backgroundColor: `${row.color}20`, borderRadius: 8, padding: "6px 12px", minWidth: 140,
                  }}>
                    <span style={{ color: row.color, fontSize: 13, fontFamily: "monospace", fontWeight: "bold" }}>{row.key}</span>
                  </div>
                  {/* Type badge */}
                  <div style={{
                    backgroundColor: `${row.color}30`, borderRadius: 6, padding: "4px 8px",
                  }}>
                    <span style={{ color: row.color, fontSize: 11, fontFamily: "monospace" }}>{row.type}</span>
                  </div>
                  {/* Value */}
                  <div style={{
                    backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "6px 12px", flex: 1,
                  }}>
                    <span style={{ color: "#B0BEC5", fontSize: 12, fontFamily: "monospace" }}>{row.value}</span>
                  </div>
                </div>
              );
            })}

            {/* Metadata: TTL, LRU, encoding */}
            <div style={{
              marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12,
              opacity: frame >= 830 ? interpolate(frame - 830, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
            }}>
              <span style={{ color: "#78909C", fontSize: 13, fontFamily: "monospace" }}>
                Each key → robj = {'{'} type | encoding | lru_clock | refcount | *ptr {'}'}
              </span>
            </div>
          </div>

          <FlexAnimation startFrame={835} x={950} y={220}>
            <BodybuilderCharacter
              name="King Event Loop" color="#FFD700"
              startFrame={835} x={0} y={0} scale={0.9}
              speech="Every key is a redisObject. I know its TYPE, ENCODING, last access time, and memory address. O(1) lookup!"
              speechDelay={15}
            />
          </FlexAnimation>

          <SpeechBubble
            text="The hash table uses incremental rehashing — doubles in size gradually so no single command blocks for long."
            startFrame={870} x={950} y={470} maxWidth={380}
            color="rgba(156,39,176,0.9)" textColor="#FFF" fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 4 — The Royal Scribes (Persistence: RDB & AOF) ═══ */}
      <Sequence from={910} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 4" title="The Royal Scribes"
          subtitle="RDB snapshots vs AOF log — how Redis survives a kingdom crash"
          color="#FF5722" startFrame={915}
        />
      </Sequence>

      <Sequence from={980} durationInFrames={210}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The king rules from memory... but what if the kingdom falls? Two scribes protect the legacy!" startFrame={985} />

          {/* RDB — The Portrait Painter */}
          <FlexAnimation startFrame={995} x={30} y={80}>
            <BodybuilderCharacter
              name="RDB Scribe" color="#FF5722" accessory="clipboard"
              startFrame={995} x={0} y={0} scale={1.0}
              speech="I paint a SNAPSHOT of the entire kingdom at a point in time. Binary, compact, fast to load!"
              speechDelay={15}
            />
          </FlexAnimation>

          <AdvantageCard
            number="RDB" title="The Portrait Painter" icon="🖼️"
            metric="BGSAVE → fork() → child writes dump.rdb"
            description="Takes a full binary snapshot. Uses fork() + copy-on-write — the child process writes while the parent keeps serving. Perfect for backups, disaster recovery, and fast restart."
            color="#FF5722" startFrame={1010} x={350} y={80} width={550}
          />

          {/* AOF — The Historian */}
          <FlexAnimation startFrame={1035} x={30} y={320}>
            <BodybuilderCharacter
              name="AOF Scribe" color="#4CAF50"
              startFrame={1035} x={0} y={0} scale={1.0}
              speech="I record EVERY command the king executes, in order. If the kingdom falls, I replay the entire history!"
              speechDelay={15}
            />
          </FlexAnimation>

          <AdvantageCard
            number="AOF" title="The Royal Historian" icon="📜"
            metric="appendonly.aof → every write command logged"
            description="Logs every write command (SET, LPUSH, etc.) to an append-only file. Three fsync policies: always (safest), everysec (good balance), no (fastest). Can be rewritten to compact size."
            color="#4CAF50" startFrame={1050} x={350} y={320} width={550}
          />

          {/* Comparison table */}
          <div style={{
            position: "absolute", left: 100, top: 560, width: 1100,
            opacity: frame >= 1070 ? interpolate(frame - 1070, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            {[
              { feature: "Data Loss Risk", rdb: "Minutes of data (between snapshots)", aof: "At most 1 second (fsync everysec)", winner: "aof" },
              { feature: "File Size", rdb: "Compact binary — small", aof: "Larger (all commands)", winner: "rdb" },
              { feature: "Restart Speed", rdb: "Fast — binary load", aof: "Slower — replays commands", winner: "rdb" },
              { feature: "Write Performance", rdb: "No impact (background)", aof: "Slight (fsync overhead)", winner: "rdb" },
            ].map((row, i) => (
              <div key={row.feature} style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
              }}>
                <span style={{ color: "#CFD8DC", fontSize: 14, fontFamily: "Arial, sans-serif", width: 160 }}>{row.feature}</span>
                <div style={{
                  flex: 1, borderRadius: 8, padding: "6px 12px",
                  backgroundColor: row.winner === "rdb" ? "rgba(255,87,34,0.15)" : "rgba(255,255,255,0.05)",
                  border: row.winner === "rdb" ? "1px solid #FF572244" : "1px solid transparent",
                }}>
                  <span style={{ color: row.winner === "rdb" ? "#FF5722" : "#90A4AE", fontSize: 13, fontFamily: "monospace" }}>{row.rdb}</span>
                </div>
                <div style={{
                  flex: 1, borderRadius: 8, padding: "6px 12px",
                  backgroundColor: row.winner === "aof" ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.05)",
                  border: row.winner === "aof" ? "1px solid #4CAF5044" : "1px solid transparent",
                }}>
                  <span style={{ color: row.winner === "aof" ? "#4CAF50" : "#90A4AE", fontSize: 13, fontFamily: "monospace" }}>{row.aof}</span>
                </div>
              </div>
            ))}
          </div>

          <CodeSnippet
            startFrame={1100}
            x={950}
            y={65}
            width={380}
            language="redis.conf"
            code={`# RDB — snapshot every 60s
# if ≥1000 keys changed
save 60 1000

# AOF — append-only file
appendonly yes
appendfsync everysec

# Since Redis 7.0:
# RDB + AOF hybrid format!
aof-use-rdb-preamble yes
# → RDB header + AOF tail
# = fast restart + low data loss`}
          />

          <SpeechBubble
            text="Best practice: Enable BOTH! RDB for fast restarts + AOF for minimal data loss. Redis 7.0 hybrid = best of both."
            startFrame={1130} x={950} y={380} maxWidth={380}
            color="rgba(255,87,34,0.9)" textColor="#FFF" fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 5 — The Royal Guard (TTL & Eviction) ═══ */}
      <Sequence from={1190} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 5" title="The Royal Guard"
          subtitle="TTL expiration and memory eviction — who stays, who goes?"
          color="#E91E63" startFrame={1195}
        />
      </Sequence>

      <Sequence from={1260} durationInFrames={190}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The palace has limited rooms (memory). The Royal Guard decides who stays and who gets evicted!" startFrame={1265} />

          <FlexAnimation startFrame={1275} x={30} y={80}>
            <BodybuilderCharacter
              name="Guard TTL" color="#E91E63" accessory="dumbbell"
              startFrame={1275} x={0} y={0} scale={1.0}
              speech="I guard the gates! Keys with an expiry? I remove them. Memory full? I evict based on POLICY."
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Two expiration strategies */}
          <AdvantageCard
            number="1" title="Lazy Expiration" icon="😴"
            metric="Check TTL only when key is accessed"
            description="When a client reads key 'session:abc', Redis checks its TTL. If expired, delete it now and return nil. Efficient — no background scanning needed."
            color="#FF9800" startFrame={1290} x={350} y={70} width={500}
          />

          <AdvantageCard
            number="2" title="Active Expiration" icon="🔍"
            metric="Periodic sampling — 20 random keys × 10/sec"
            description="Every 100ms, Redis samples 20 keys from the expires dict. If >25% are expired, repeat immediately. This probabilistic approach cleans stale keys without blocking."
            color="#4CAF50" startFrame={1305} x={350} y={265} width={500}
          />

          {/* Memory eviction policies */}
          <div style={{
            position: "absolute", left: 50, top: 440, width: 1200,
            opacity: frame >= 1320 ? interpolate(frame - 1320, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            <h3 style={{ color: "#E91E63", fontSize: 20, fontFamily: "Arial, sans-serif", marginBottom: 12 }}>
              Memory Eviction Policies (maxmemory-policy)
            </h3>
            {[
              { policy: "noeviction", desc: "Return errors on write when memory full", icon: "🚫", color: "#F44336" },
              { policy: "allkeys-lru", desc: "Evict LEAST recently used key from ALL keys", icon: "🕐", color: "#FF9800" },
              { policy: "volatile-lru", desc: "Evict LRU key but only from keys WITH an expire", icon: "⏰", color: "#FFB300" },
              { policy: "allkeys-lfu", desc: "Evict LEAST frequently used key (Redis 4.0+)", icon: "📊", color: "#9C27B0" },
              { policy: "volatile-ttl", desc: "Evict key with the SHORTEST remaining TTL", icon: "⏳", color: "#2196F3" },
              { policy: "allkeys-random", desc: "Evict a random key — simple but unpredictable", icon: "🎲", color: "#4CAF50" },
            ].map((row, i) => {
              const rRel = frame - (1325 + i * 6);
              if (rRel < 0) return null;
              return (
                <div key={row.policy} style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 6,
                  opacity: interpolate(rRel, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
                }}>
                  <span style={{ fontSize: 18 }}>{row.icon}</span>
                  <div style={{
                    backgroundColor: `${row.color}20`, borderRadius: 8, padding: "5px 12px", minWidth: 180,
                  }}>
                    <span style={{ color: row.color, fontSize: 14, fontFamily: "monospace", fontWeight: "bold" }}>{row.policy}</span>
                  </div>
                  <span style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif" }}>{row.desc}</span>
                </div>
              );
            })}
          </div>

          <SpeechBubble
            text="allkeys-lru is the most common policy. Redis samples 5 keys and evicts the oldest — approximated LRU, not exact, but very efficient!"
            startFrame={1380} x={900} y={70} maxWidth={430}
            color="rgba(233,30,99,0.9)" textColor="#FFF" fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 6 — The Mirror Army (Replication) ═══ */}
      <Sequence from={1450} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 6" title="The Mirror Army"
          subtitle="Master-Replica replication — read scaling and high availability"
          color="#2196F3" startFrame={1455}
        />
      </Sequence>

      <Sequence from={1520} durationInFrames={190}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The King creates mirror copies of himself — each replica handles READ requests while he handles WRITES." startFrame={1525} />

          {/* Master */}
          <FlexAnimation startFrame={1535} x={500} y={60}>
            <BodybuilderCharacter
              name="Master" color="#FFD700" accessory="clipboard"
              startFrame={1535} x={0} y={0} scale={1.0}
              speech="I handle ALL writes. My replicas serve reads. I stream every change to them."
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Replicas */}
          {[
            { name: "Replica 1", x: 100, y: 330 },
            { name: "Replica 2", x: 500, y: 380 },
            { name: "Replica 3", x: 900, y: 330 },
          ].map((rep, i) => (
            <div key={rep.name}>
              <FlexAnimation startFrame={1550 + i * 8} x={rep.x} y={rep.y}>
                <BodybuilderCharacter
                  name={rep.name} color="#42A5F5"
                  startFrame={1550 + i * 8} x={0} y={0} scale={0.8}
                  speech="" speechDelay={0}
                />
              </FlexAnimation>
              <Arrow startFrame={1555 + i * 8} fromX={600} fromY={250} toX={rep.x + 60} toY={rep.y} color="#42A5F5" label="repl stream" />
            </div>
          ))}

          {/* Replication flow explanation */}
          <CodeSnippet
            startFrame={1580}
            x={50}
            y={530}
            width={520}
            language="replication flow"
            code={`// Step 1: Replica connects → PSYNC
REPLICA> REPLICAOF master-host 6379

// Step 2: Full sync (first time)
MASTER> BGSAVE → sends RDB snapshot → Replica
// Replica loads entire RDB into memory

// Step 3: Ongoing replication
MASTER> streams replication backlog
// Every SET, DEL, LPUSH etc. sent in real-time
// Replica replays commands → stays in sync

// Step 4: If replica disconnects briefly
// → Partial resync (only missed commands)
// Uses replication backlog buffer (1MB default)`}
          />

          <AdvantageCard
            number="R" title="Read Scaling" icon="📖"
            metric="N replicas = N× read throughput"
            description="Reads can go to ANY replica. 3 replicas = 4× total read capacity. Writes only to master."
            color="#2196F3" startFrame={1610} x={620} y={530} width={450}
          />

          <SpeechBubble
            text="Replication is ASYNC by default. Master doesn't wait for replicas to ACK. Use WAIT command for synchronous replication when needed."
            startFrame={1640} x={1100} y={530} maxWidth={350}
            color="rgba(33,150,243,0.9)" textColor="#FFF" fontSize={14}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 7 — The Kingdom Federation (Redis Cluster) ═══ */}
      <Sequence from={1710} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 7" title="The Kingdom Federation"
          subtitle="Redis Cluster — sharding data across multiple masters"
          color="#FF6F00" startFrame={1715}
        />
      </Sequence>

      <Sequence from={1780} durationInFrames={190}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="One kingdom can't hold ALL the data. The Federation splits the realm into 16,384 hash slots!" startFrame={1785} />

          {/* Hash slot distribution */}
          <div style={{
            position: "absolute", left: 80, top: 70, width: 1200,
            opacity: frame >= 1795 ? interpolate(frame - 1795, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            <h3 style={{ color: "#FF6F00", fontSize: 22, fontFamily: "Arial, sans-serif", marginBottom: 14 }}>
              16,384 Hash Slots distributed across Masters
            </h3>

            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
              {[
                { master: "Master A", slots: "0 — 5460", color: "#F44336", icon: "🏰" },
                { master: "Master B", slots: "5461 — 10922", color: "#4CAF50", icon: "🏯" },
                { master: "Master C", slots: "10923 — 16383", color: "#2196F3", icon: "🗼" },
              ].map((m, i) => {
                const mRel = frame - (1800 + i * 8);
                if (mRel < 0) return null;
                return (
                  <div key={m.master} style={{
                    flex: 1, backgroundColor: `${m.color}12`, borderRadius: 14,
                    border: `2px solid ${m.color}44`, padding: 16, textAlign: "center",
                    opacity: interpolate(mRel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
                  }}>
                    <span style={{ fontSize: 28 }}>{m.icon}</span>
                    <div style={{ color: m.color, fontSize: 18, fontFamily: "Arial, sans-serif", fontWeight: "bold", marginTop: 4 }}>{m.master}</div>
                    <div style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "monospace", marginTop: 4 }}>Slots {m.slots}</div>
                    <div style={{ color: "#78909C", fontSize: 12, fontFamily: "monospace", marginTop: 4 }}>+ 1 Replica each</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How key → slot mapping works */}
          <CodeSnippet
            startFrame={1830}
            x={80}
            y={310}
            width={520}
            language="hash slot assignment"
            code={`// How does Redis know WHICH master holds a key?
// CRC16 hash → modulo 16384

slot = CRC16("user:1001") % 16384
     = CRC16("user:1001") % 16384
     = 7438
// → Slot 7438 → Master B handles it!

// Client asks Master A for "user:1001"?
// Master A responds:
//   -MOVED 7438 master-b:6379
// Client redirects to Master B

// Hash tags force keys to same slot:
// {user}.profile and {user}.orders
// → both hash on "user" → same slot!`}
          />

          <FlexAnimation startFrame={1840} x={660} y={280}>
            <BodybuilderCharacter
              name="King Event Loop" color="#FFD700" accessory="clipboard"
              startFrame={1840} x={0} y={0} scale={0.9}
              speech="Each master is king of its OWN slots. The MOVED redirect tells clients exactly where to go!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Failover process */}
          <AdvantageCard
            number="F" title="Automatic Failover" icon="🔄"
            metric="Master dies → Replica promoted in seconds"
            description="If Master B crashes, its replica detects via heartbeat, holds an election among replicas, and promotes itself to new master. Cluster continues serving — no human intervention needed."
            color="#FF6F00" startFrame={1870} x={660} y={500} width={530}
          />

          <AdvantageCard
            number="S" title="Online Resharding" icon="📦"
            metric="redis-cli --cluster reshard"
            description="Need to add a 4th master? Move hash slots from existing masters to the new one LIVE — no downtime. Redis migrates keys slot-by-slot."
            color="#00BCD4" startFrame={1885} x={80} y={580} width={530}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 8 — The Messenger Pigeons (Pub/Sub & Streams) ═══ */}
      <Sequence from={1970} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 8" title="The Messenger Pigeons"
          subtitle="Pub/Sub for fire-and-forget, Streams for durable messaging"
          color="#00BCD4" startFrame={1975}
        />
      </Sequence>

      <Sequence from={2040} durationInFrames={180}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The kingdom has two messenger systems — fast pigeons for live broadcasts, and a river log for replay..." startFrame={2045} />

          {/* Pub/Sub — Fire and Forget */}
          <AdvantageCard
            number="P" title="Pub/Sub — The Pigeon Network" icon="🕊️"
            metric="PUBLISH channel message → all subscribers get it instantly"
            description="Fire-and-forget broadcasting. Publisher sends to a channel — ALL connected subscribers receive it in real-time. But if a subscriber is offline, the message is LOST. No persistence. No replay."
            color="#00BCD4" startFrame={2055} x={50} y={70} width={550}
          />

          <FlowStep label="Publisher" sublabel="PUBLISH" icon="📣" startFrame={2060} x={650} y={80} color="#00BCD4" />
          <Arrow startFrame={2065} fromX={810} fromY={117} toX={880} toY={80} color="#00BCD4" />
          <Arrow startFrame={2065} fromX={810} fromY={117} toX={880} toY={140} color="#00BCD4" />
          <FlowStep label="Sub A" sublabel="online ✓" icon="👂" startFrame={2068} x={880} y={55} color="#4CAF50" width={130} height={50} />
          <FlowStep label="Sub B" sublabel="online ✓" icon="👂" startFrame={2070} x={880} y={115} color="#4CAF50" width={130} height={50} />
          <FlowStep label="Sub C" sublabel="offline ✕" icon="💤" startFrame={2072} x={1050} y={85} color="#F44336" width={130} height={50} />

          {/* Streams — Durable Log */}
          <AdvantageCard
            number="S" title="Streams — The River Log" icon="🌊"
            metric="XADD stream * field value → persistent, replayable, consumer groups"
            description="Append-only log with message IDs (timestamp-sequence). Consumer groups track who read what (like Kafka). If a consumer crashes, messages wait. XACK confirms processing. XPENDING shows stuck messages."
            color="#9C27B0" startFrame={2080} x={50} y={300} width={550}
          />

          <CodeSnippet
            startFrame={2090}
            x={650}
            y={230}
            width={560}
            language="Streams vs Pub/Sub"
            code={`// ── Pub/Sub: live broadcast, no history ──
SUBSCRIBE notifications
PUBLISH notifications "new order #1001"
// Sub C was offline → message LOST forever

// ── Streams: durable, replayable ──
// Producer:
XADD orders * custId 1001 total 59.99

// Consumer Group (like Kafka):
XGROUP CREATE orders processors $ MKSTREAM
XREADGROUP GROUP processors worker1
  COUNT 10 BLOCK 5000 STREAMS orders >

// Acknowledge processed:
XACK orders processors 1678886400000-0

// Check stuck messages:
XPENDING orders processors
// → "worker2 has 3 unacked msgs for 60s"

// Claim stuck messages (like DLQ):
XAUTOCLAIM orders processors worker1 30000 0-0`}
          />

          <FlexAnimation startFrame={2120} x={1200} y={240}>
            <BodybuilderCharacter
              name="King Event Loop" color="#FFD700"
              startFrame={2120} x={0} y={0} scale={0.85}
              speech="Streams are Kafka-inside-Redis! Consumer groups, acknowledgment, pending lists — all built in!"
              speechDelay={15}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 9 — The Speed Potions (Pipelining & Transactions) ═══ */}
      <Sequence from={2220} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 9" title="The Speed Potions"
          subtitle="Pipelining batches commands, Transactions guarantee atomicity"
          color="#8BC34A" startFrame={2225}
        />
      </Sequence>

      <Sequence from={2290} durationInFrames={170}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="The ultimate speed hack — send 1000 commands at once instead of one at a time!" startFrame={2295} />

          {/* Without pipeline */}
          <AdvantageCard
            number="!" title="Without Pipelining" icon="🐌"
            metric="1000 commands = 1000 round trips ≈ 1 second"
            description="Client sends SET → waits for OK → sends GET → waits for value → ... Each command waits for the response before sending the next. Network latency dominates."
            color="#F44336" startFrame={2305} x={50} y={70} width={500}
          />

          {/* With pipeline */}
          <AdvantageCard
            number="✓" title="With Pipelining" icon="🚀"
            metric="1000 commands = 1 round trip ≈ 1 millisecond"
            description="Client sends ALL 1000 commands at once without waiting. Redis processes all, then sends ALL responses back in one batch. 1000× faster!"
            color="#4CAF50" startFrame={2320} x={600} y={70} width={500}
          />

          {/* Visual: pipeline vs sequential */}
          <div style={{
            position: "absolute", left: 50, top: 280, width: 500,
            opacity: frame >= 2335 ? interpolate(frame - 2335, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            <div style={{ color: "#F44336", fontSize: 14, fontFamily: "monospace", marginBottom: 8 }}>Sequential (slow):</div>
            {["SET a 1 →  ← OK", "SET b 2 →  ← OK", "SET c 3 →  ← OK"].map((line, i) => (
              <div key={line} style={{ color: "#90A4AE", fontSize: 13, fontFamily: "monospace", marginBottom: 3 }}>
                {line} {'  '}(wait {i + 1}×RTT)
              </div>
            ))}
            <div style={{ color: "#4CAF50", fontSize: 14, fontFamily: "monospace", marginTop: 16, marginBottom: 8 }}>Pipelined (fast):</div>
            <div style={{ color: "#90A4AE", fontSize: 13, fontFamily: "monospace" }}>
              SET a 1 | SET b 2 | SET c 3 →  ← OK | OK | OK  (1×RTT)
            </div>
          </div>

          {/* Transactions MULTI/EXEC */}
          <CodeSnippet
            startFrame={2345}
            x={600}
            y={280}
            width={520}
            language="Transactions (MULTI/EXEC)"
            code={`// Transactions = atomic command batch
// No other command can interleave!

MULTI                    // start transaction
SET account:A balance 500
SET account:B balance 1500
INCR transfer:count
EXEC                     // execute ALL atomically

// WATCH = optimistic locking
WATCH account:A          // watch for changes
balance = GET account:A
MULTI
SET account:A (balance - 100)
EXEC
// If account:A changed since WATCH → EXEC fails!
// → Retry (optimistic concurrency control)

// Lua scripts = even more powerful atomicity
EVAL "redis.call('set', KEYS[1],
  redis.call('get', KEYS[1]) + ARGV[1])"
  1 counter 10`}
          />

          <FlexAnimation startFrame={2370} x={1150} y={350}>
            <BodybuilderCharacter
              name="King Event Loop" color="#FFD700"
              startFrame={2370} x={0} y={0} scale={0.85}
              speech="Lua scripts run atomically inside ME. No other command can interrupt. Better than MULTI for complex logic!"
              speechDelay={15}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CH 10 — The Sentinel Watchtowers ═══ */}
      <Sequence from={2460} durationInFrames={70}>
        <ChapterBanner
          chapter="CHAPTER 10" title="The Sentinel Watchtowers"
          subtitle="Redis Sentinel monitors, notifies, and auto-fails over"
          color="#7B1FA2" startFrame={2465}
        />
      </Sequence>

      <Sequence from={2530} durationInFrames={170}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <StoryNarration text="Three watchtowers stand guard — if the master falls, they crown a new king within seconds!" startFrame={2535} />

          {/* Sentinel nodes */}
          {[
            { name: "Sentinel 1", x: 200, y: 80 },
            { name: "Sentinel 2", x: 550, y: 80 },
            { name: "Sentinel 3", x: 900, y: 80 },
          ].map((s, i) => (
            <FlowStep key={s.name} label={s.name} sublabel="watchtower" icon="🗼"
              startFrame={2545 + i * 5} x={s.x} y={s.y}
              color="#7B1FA2" width={170} height={75}
            />
          ))}

          {/* Master & Replicas */}
          <FlexAnimation startFrame={2555} x={450} y={200}>
            <BodybuilderCharacter
              name="Master" color="#FFD700" accessory="clipboard"
              startFrame={2555} x={0} y={0} scale={0.9}
              speech="Sentinels ping me every second. If I don't respond, they start the failover process."
              speechDelay={15}
            />
          </FlexAnimation>

          {[
            { name: "Replica 1", x: 150, y: 380 },
            { name: "Replica 2", x: 850, y: 380 },
          ].map((r, i) => (
            <FlexAnimation key={r.name} startFrame={2565 + i * 5} x={r.x} y={r.y}>
              <BodybuilderCharacter
                name={r.name} color="#42A5F5"
                startFrame={2565 + i * 5} x={0} y={0} scale={0.7}
                speech="" speechDelay={0}
              />
            </FlexAnimation>
          ))}

          {/* Arrows: Sentinels monitor Master */}
          <Arrow startFrame={2560} fromX={285} fromY={155} toX={500} toY={230} color="#7B1FA2" label="PING" />
          <Arrow startFrame={2562} fromX={635} fromY={155} toX={550} toY={230} color="#7B1FA2" label="PING" />
          <Arrow startFrame={2564} fromX={985} fromY={155} toX={600} toY={230} color="#7B1FA2" label="PING" />

          {/* Failover process */}
          <div style={{
            position: "absolute", left: 50, top: 510, width: 1200,
            opacity: frame >= 2580 ? interpolate(frame - 2580, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            <h3 style={{ color: "#7B1FA2", fontSize: 18, fontFamily: "Arial, sans-serif", marginBottom: 12 }}>
              Failover Process (automatic)
            </h3>
            {[
              { step: 1, text: "SDOWN — One sentinel marks master as Subjectively Down (no PING response)", color: "#FF9800" },
              { step: 2, text: "ODOWN — Quorum of sentinels agrees → Objectively Down (consensus)", color: "#F44336" },
              { step: 3, text: "ELECTION — Sentinels elect a leader to perform failover (Raft-like)", color: "#9C27B0" },
              { step: 4, text: "PROMOTE — Best replica promoted to master. Other replicas reconfigured", color: "#4CAF50" },
              { step: 5, text: "NOTIFY — Clients are told the new master address via Sentinel API", color: "#2196F3" },
            ].map((row, i) => {
              const rRel = frame - (2585 + i * 8);
              if (rRel < 0) return null;
              return (
                <div key={row.step} style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 6,
                  opacity: interpolate(rRel, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", backgroundColor: row.color,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ color: "#FFF", fontSize: 14, fontWeight: "bold" }}>{row.step}</span>
                  </div>
                  <span style={{ color: "#CFD8DC", fontSize: 15, fontFamily: "Arial, sans-serif" }}>{row.text}</span>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ EPILOGUE — The Complete Kingdom Map ═══ */}
      <Sequence from={2700} durationInFrames={70}>
        <ChapterBanner
          chapter="EPILOGUE" title="The Complete Kingdom Map"
          subtitle="All Redis components and how they fit together"
          color="#FFD700" startFrame={2705}
        />
      </Sequence>

      <Sequence from={2770} durationInFrames={180}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2 style={{
            fontSize: 34, color: "#FFD700", fontFamily: "Arial, sans-serif", textAlign: "center",
            opacity: interpolate(frame - 2770, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            The Kingdom of Redis — Complete Architecture
          </h2>

          {[
            { ch: "Ch 1", component: "Event Loop", role: "Single-threaded king — processes ALL commands", metaphor: "👑 The King", color: "#FFD700" },
            { ch: "Ch 2", component: "Data Structures", role: "6 specialized weapons for every battle", metaphor: "⚔️ Weapon Vaults", color: "#F44336" },
            { ch: "Ch 3", component: "Memory / Keyspace", role: "Hash table storing all keys → redisObjects", metaphor: "🏰 Memory Palace", color: "#9C27B0" },
            { ch: "Ch 4", component: "RDB + AOF", role: "Snapshot + command log for crash recovery", metaphor: "📜 Royal Scribes", color: "#FF5722" },
            { ch: "Ch 5", component: "TTL + Eviction", role: "Expire keys, enforce memory limits", metaphor: "🛡️ Royal Guard", color: "#E91E63" },
            { ch: "Ch 6", component: "Replication", role: "Master → Replica streaming for HA + reads", metaphor: "🪞 Mirror Army", color: "#2196F3" },
            { ch: "Ch 7", component: "Cluster", role: "16,384 hash slots across multiple masters", metaphor: "🏯 Federation", color: "#FF6F00" },
            { ch: "Ch 8", component: "Pub/Sub + Streams", role: "Live broadcast + durable event log", metaphor: "🕊️ Messengers", color: "#00BCD4" },
            { ch: "Ch 9", component: "Pipeline + Tx", role: "Batch commands + atomic execution", metaphor: "🧪 Speed Potions", color: "#8BC34A" },
            { ch: "Ch 10", component: "Sentinel", role: "Monitor, notify, auto-failover", metaphor: "🗼 Watchtowers", color: "#7B1FA2" },
          ].map((row, i) => {
            const rRel = frame - (2785 + i * 7);
            if (rRel < 0) return null;
            return (
              <div key={row.ch} style={{
                position: "absolute", left: 50, top: 60 + i * 62, right: 50,
                display: "flex", alignItems: "center", gap: 14,
                opacity: interpolate(rRel, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
              }}>
                <span style={{ color: "#546E7A", fontSize: 12, fontFamily: "monospace", width: 40 }}>{row.ch}</span>
                <div style={{
                  backgroundColor: `${row.color}20`, borderRadius: 8, padding: "4px 10px", width: 160,
                }}>
                  <span style={{ color: row.color, fontSize: 15, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{row.component}</span>
                </div>
                <span style={{ color: "#CFD8DC", fontSize: 14, fontFamily: "Arial, sans-serif", flex: 1 }}>{row.role}</span>
                <span style={{ color: row.color, fontSize: 14, fontFamily: "Arial, sans-serif", width: 160 }}>{row.metaphor}</span>
              </div>
            );
          })}

          {/* Final quote */}
          {frame >= 2870 && (
            <div style={{
              position: "absolute", bottom: 25, left: 0, right: 0, textAlign: "center",
              opacity: interpolate(frame - 2870, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              <span style={{ color: "#FFD700", fontSize: 26, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                One thread. In memory. Simple by design. Powerful by architecture.
              </span>
              <div style={{ color: "#78909C", fontSize: 16, fontFamily: "Arial, sans-serif", marginTop: 8 }}>
                The Kingdom of Redis — where speed is king.
              </div>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
