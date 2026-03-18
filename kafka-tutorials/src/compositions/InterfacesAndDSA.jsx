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

/* ─── Reusable sub-components ─── */

const InterfaceCard = ({
  name,
  methods,
  analogy,
  color,
  startFrame,
  x,
  y,
  width = 460,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, rel),
    fps,
    config: { damping: 10, stiffness: 110 },
  });

  if (rel < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 14,
        padding: 20,
        border: `2px solid ${color}44`,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <h3
          style={{
            color,
            fontSize: 21,
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
          {name}
        </h3>
      </div>

      {methods.map((m, i) => {
        const mRel = frame - (startFrame + 8 + i * 6);
        if (mRel < 0) return null;
        return (
          <div
            key={m}
            style={{
              color: "#CFD8DC",
              fontSize: 14,
              fontFamily: "monospace",
              marginBottom: 5,
              paddingLeft: 12,
              borderLeft: `2px solid ${color}55`,
              opacity: interpolate(mRel, [0, 6], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {m}
          </div>
        );
      })}

      {analogy && (
        <p
          style={{
            color: "#90A4AE",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            fontStyle: "italic",
            marginTop: 10,
            lineHeight: 1.4,
            opacity: interpolate(
              frame - (startFrame + 8 + methods.length * 6),
              [0, 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          🏋️ {analogy}
        </p>
      )}
    </div>
  );
};

const DSACard = ({
  name,
  description,
  howItHelps,
  color,
  startFrame,
  x,
  y,
  width = 480,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, rel),
    fps,
    config: { damping: 10, stiffness: 110 },
  });

  if (rel < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 14,
        padding: 20,
        border: `2px solid ${color}33`,
        borderTop: `4px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <h3
          style={{
            color,
            fontSize: 22,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          {name}
        </h3>
      </div>
      <p
        style={{
          color: "#B0BEC5",
          fontSize: 15,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.5,
          marginBottom: 8,
        }}
      >
        {description}
      </p>
      <div
        style={{
          backgroundColor: `${color}15`,
          borderRadius: 8,
          padding: "8px 12px",
          marginTop: 6,
          opacity: interpolate(rel - 15, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            color,
            fontSize: 13,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Performance win:{" "}
        </span>
        <span
          style={{
            color: "#CFD8DC",
            fontSize: 13,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {howItHelps}
        </span>
      </div>
    </div>
  );
};

const CodeSnippet = ({ code, language, startFrame, x, y, width = 520 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, rel),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (rel < 0) return null;

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
          padding: "5px 14px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#F44336" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#FFB300" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#4CAF50" }} />
        <span style={{ color: "#78909C", fontSize: 11, fontFamily: "monospace", marginLeft: 8 }}>
          {language}
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#1E1E1E",
          borderRadius: "0 0 8px 8px",
          padding: "12px 16px",
          border: "1px solid #37474F",
        }}
      >
        <pre
          style={{
            color: "#E0E0E0",
            fontSize: 13,
            fontFamily: "monospace",
            lineHeight: 1.55,
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

const MemoryBar = ({ label, used, total, color, startFrame, x, y, width = 350 }) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0) return null;

  const pct = Math.min((used / total) * 100, 100);
  const fillWidth = interpolate(rel, [0, 30], [0, (pct / 100) * (width - 20)], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", left: x, top: y, width }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
          opacity: interpolate(rel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif" }}>
          {label}
        </span>
        <span style={{ color, fontSize: 14, fontFamily: "monospace" }}>
          {used}/{total} MB
        </span>
      </div>
      <div
        style={{
          width: width - 20,
          height: 18,
          borderRadius: 9,
          backgroundColor: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: fillWidth,
            height: "100%",
            borderRadius: 9,
            backgroundColor: color,
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
};

/* ─── Main composition ─── */

export const InterfacesAndDSA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0D1117, #161B22, #1A1A2E)",
      }}
    >
      {/* ═══════════ SCENE 1 — TITLE ═══════════ */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title
            text="Interfaces & Data Structures"
            subtitle="The biomechanics behind Spring Batch's power"
            startFrame={5}
          />
          {frame >= 40 && (
            <div
              style={{
                display: "flex",
                gap: 60,
                marginTop: 30,
                opacity: interpolate(frame - 40, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {[
                { label: "Interfaces", icon: "🔌", color: "#4CAF50" },
                { label: "DSA Structures", icon: "🧬", color: "#FF9800" },
                { label: "Memory Mgmt", icon: "🧠", color: "#2196F3" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 36 }}>{item.icon}</span>
                  <div
                    style={{
                      color: item.color,
                      fontSize: 18,
                      fontFamily: "Arial, sans-serif",
                      marginTop: 6,
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════ SCENE 2 — ItemReader / ItemStream ═══════════ */}
      <Sequence from={90} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2
            style={{
              fontSize: 34,
              color: "#4CAF50",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 90, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Core Reading Interfaces
          </h2>

          <InterfaceCard
            name="ItemReader&lt;T&gt;"
            icon="📂"
            color="#4CAF50"
            startFrame={98}
            x={50}
            y={80}
            width={440}
            methods={[
              "T read() throws Exception",
              "// Returns null → signals end of input",
              "// Called once per item in chunk loop",
            ]}
            analogy="The barbell rack — hand me one plate at a time until empty."
          />

          <InterfaceCard
            name="ItemStream"
            icon="💾"
            color="#66BB6A"
            startFrame={112}
            x={540}
            y={80}
            width={440}
            methods={[
              "void open(ExecutionContext ctx)",
              "void update(ExecutionContext ctx)",
              "void close()",
            ]}
            analogy="The gym logbook — open it, record progress after each set, close when done."
          />

          <FlexAnimation startFrame={100} x={1050} y={120}>
            <BodybuilderCharacter
              name="Reader Rick"
              color="#4CAF50"
              accessory="dumbbell"
              startFrame={100}
              x={0}
              y={0}
              scale={1.0}
              speech="ItemStream saves my position — if the gym closes, I resume from rep #47,523!"
              speechDelay={20}
            />
          </FlexAnimation>

          <InterfaceCard
            name="ItemStreamReader&lt;T&gt;"
            icon="🔗"
            color="#81C784"
            startFrame={130}
            x={50}
            y={360}
            width={440}
            methods={[
              "extends ItemReader<T>, ItemStream",
              "// Combines reading + checkpointing",
              "// Most built-in readers implement this",
            ]}
            analogy="A spotter who hands you plates AND tracks your reps."
          />

          <DSACard
            name="Cursor vs Paging"
            icon="📊"
            description="Cursor: holds a DB connection open, streams rows one-by-one. Paging: fetches a page of N rows, closes connection, fetches next page."
            howItHelps="Cursor = lower latency, but holds connection. Paging = connection-friendly, thread-safe, ideal for partitioning."
            color="#4CAF50"
            startFrame={140}
            x={540}
            y={360}
            width={480}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════ SCENE 3 — ItemProcessor / ItemWriter ═══════════ */}
      <Sequence from={210} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2
            style={{
              fontSize: 34,
              color: "#FF9800",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 210, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Processing & Writing Interfaces
          </h2>

          <InterfaceCard
            name="ItemProcessor&lt;I, O&gt;"
            icon="⚙️"
            color="#FF9800"
            startFrame={218}
            x={50}
            y={80}
            width={440}
            methods={[
              "O process(@NonNull I item)",
              "// Return null → filter/skip item",
              "// Single item in, single item out",
              "// Stateless is best for threading",
            ]}
            analogy="The spotter transforms your form — one rep at a time, drop the bad ones."
          />

          <InterfaceCard
            name="ItemWriter&lt;T&gt;"
            icon="💾"
            color="#2196F3"
            startFrame={228}
            x={540}
            y={80}
            width={440}
            methods={[
              "void write(Chunk<T> chunk)",
              "// Receives ENTIRE chunk at once",
              "// Chunk<T> = List + metadata",
              "// Batch insert for performance!",
            ]}
            analogy="Slam the entire set of plates onto the rack at once — not one by one!"
          />

          <FlexAnimation startFrame={220} x={1050} y={80}>
            <BodybuilderCharacter
              name="Processor Pete"
              color="#FF9800"
              accessory="dumbbell"
              startFrame={220}
              x={0}
              y={0}
              scale={0.9}
              speech="Writer gets the whole chunk — that's why batch inserts are FAST!"
              speechDelay={20}
            />
          </FlexAnimation>

          <DSACard
            name="Chunk&lt;T&gt; — The Core Data Structure"
            icon="📦"
            description="Internally wraps a List<T> plus skip/retry metadata. Items flow: Reader→List (one-by-one) → Processor→filtered List → Writer gets entire Chunk."
            howItHelps="Batching N items per transaction amortizes commit overhead. Chunk size = commit interval. Too small = overhead. Too large = memory + long rollbacks."
            color="#FF9800"
            startFrame={245}
            x={50}
            y={380}
            width={950}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════ SCENE 4 — ExecutionContext / JobRepository ═══════════ */}
      <Sequence from={330} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2
            style={{
              fontSize: 34,
              color: "#9C27B0",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 330, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            State Management Interfaces
          </h2>

          <InterfaceCard
            name="ExecutionContext"
            icon="📋"
            color="#9C27B0"
            startFrame={338}
            x={50}
            y={80}
            width={440}
            methods={[
              "// Backed by ConcurrentHashMap<String, Object>",
              "void putString(String key, String val)",
              "void putLong(String key, long val)",
              "void put(String key, Object val)",
              "// Serialized to DB after each chunk commit",
            ]}
            analogy="Your gym journal — records sets completed, weight used, where you stopped."
          />

          <InterfaceCard
            name="JobRepository"
            icon="🗄️"
            color="#7B1FA2"
            startFrame={350}
            x={540}
            y={80}
            width={440}
            methods={[
              "JobExecution createJobExecution(...)",
              "void update(JobExecution exec)",
              "void update(StepExecution exec)",
              "StepExecution getLastStepExecution(...)",
              "// 6 metadata tables in the DB",
            ]}
            analogy="The gym's central database — knows every member's history."
          />

          {/* The 6 metadata tables */}
          <h3
            style={{
              position: "absolute",
              left: 60,
              top: 380,
              color: "#CE93D8",
              fontSize: 20,
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 365, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            6 Metadata Tables (HashMap-like schema)
          </h3>

          {[
            { name: "BATCH_JOB_INSTANCE", desc: "Unique job identity (name + params hash)", color: "#CE93D8" },
            { name: "BATCH_JOB_EXECUTION", desc: "Each run attempt — status, start/end time", color: "#BA68C8" },
            { name: "BATCH_JOB_EXECUTION_PARAMS", desc: "Key-value pairs of job parameters", color: "#AB47BC" },
            { name: "BATCH_STEP_EXECUTION", desc: "Per-step metrics — read/write/skip counts", color: "#9C27B0" },
            { name: "BATCH_STEP_EXECUTION_CONTEXT", desc: "Serialized ExecutionContext (checkpoint state)", color: "#8E24AA" },
            { name: "BATCH_JOB_EXECUTION_CONTEXT", desc: "Job-level shared context between steps", color: "#7B1FA2" },
          ].map((table, i) => {
            const tRel = frame - (370 + i * 8);
            if (tRel < 0) return null;
            return (
              <div
                key={table.name}
                style={{
                  position: "absolute",
                  left: 60,
                  top: 415 + i * 38,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: interpolate(tRel, [0, 8], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: table.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: table.color,
                    fontSize: 14,
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    width: 320,
                  }}
                >
                  {table.name}
                </span>
                <span
                  style={{
                    color: "#90A4AE",
                    fontSize: 13,
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {table.desc}
                </span>
              </div>
            );
          })}

          <FlexAnimation startFrame={345} x={1050} y={300}>
            <BodybuilderCharacter
              name="Memory Marge"
              color="#9C27B0"
              accessory="book"
              startFrame={345}
              x={0}
              y={0}
              scale={1.0}
              speech="ConcurrentHashMap gives O(1) lookup for checkpoint state!"
              speechDelay={20}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════ SCENE 5 — DSA: Queues, Paging, Partitioning ═══════════ */}
      <Sequence from={460} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2
            style={{
              fontSize: 34,
              color: "#FF9800",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 460, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Data Structures That Power Performance
          </h2>

          <DSACard
            name="Blocking Queue (Multi-threaded Step)"
            icon="📥"
            description="When using TaskExecutor, chunks are submitted to a thread pool. Internally uses BlockingQueue (bounded) to throttle concurrent chunk processing."
            howItHelps="Bounded queue prevents OOM — throttleLimit caps concurrent threads. Like having max 4 lifting platforms, lifters wait for an open slot."
            color="#4CAF50"
            startFrame={470}
            x={50}
            y={80}
            width={550}
          />

          <DSACard
            name="Sorted Map (Paging Readers)"
            icon="🗂️"
            description="JdbcPagingItemReader uses a SortedMap<String,Order> for sort keys. Generates WHERE clauses like 'id > :lastId ORDER BY id' for keyset pagination."
            howItHelps="Keyset pagination is O(log n) per page vs OFFSET which is O(n). 10M rows? OFFSET skips all preceding rows. Keyset uses the index directly."
            color="#FF9800"
            startFrame={485}
            x={650}
            y={80}
            width={550}
          />

          <DSACard
            name="Range Partitioning (ColumnRangePartitioner)"
            icon="📐"
            description="Divides data range into N non-overlapping partitions: [1-250], [251-500], etc. Each partition stored in ExecutionContext as min/max values."
            howItHelps="Each worker reads only its range — zero contention, linear scalability. Like splitting a 1000-plate rack into 4 sections of 250."
            color="#E91E63"
            startFrame={500}
            x={50}
            y={380}
            width={550}
          />

          <DSACard
            name="HashMap (Skip/Retry Tracking)"
            icon="🔄"
            description="FaultTolerantChunkProcessor uses HashMap to track skipped item counts per exception type. RetryTemplate uses a similar map for retry state per item."
            howItHelps="O(1) lookup to check if skip limit reached. No scanning — instant decision on each failed item."
            color="#2196F3"
            startFrame={515}
            x={650}
            y={380}
            width={550}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════ SCENE 6 — Memory Management Patterns ═══════════ */}
      <Sequence from={590} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2
            style={{
              fontSize: 34,
              color: "#2196F3",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 590, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Memory Management Patterns
          </h2>

          {/* Pattern 1: Chunk-scoped GC */}
          <DSACard
            name="Chunk-Scoped Object Lifecycle"
            icon="♻️"
            description="Items are read into a List, processed, written, then the chunk list is discarded. Only 'chunk-size' items live in memory at once — not the entire dataset."
            howItHelps="Processing 10M rows with chunk=1000 → only 1000 items in heap at any time. GC reclaims each chunk after commit."
            color="#2196F3"
            startFrame={600}
            x={50}
            y={80}
            width={520}
          />

          <FlexAnimation startFrame={605} x={620} y={80}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={605}
              x={0}
              y={0}
              scale={0.9}
              speech="You don't load ALL the weights at once — just one set at a time!"
              speechDelay={15}
            />
          </FlexAnimation>

          {/* Memory visualization */}
          <MemoryBar label="chunk=10 (tiny sets)" used={12} total={512} color="#4CAF50" startFrame={615} x={50} y={360} width={400} />
          <MemoryBar label="chunk=1000 (normal)" used={48} total={512} color="#FF9800" startFrame={625} x={50} y={410} width={400} />
          <MemoryBar label="chunk=100000 (heavy!)" used={380} total={512} color="#F44336" startFrame={635} x={50} y={460} width={400} />
          <MemoryBar label="No chunking (all in memory)" used={510} total={512} color="#B71C1C" startFrame={645} x={50} y={510} width={400} />

          {/* Pattern 2: Cursor streaming */}
          <DSACard
            name="Cursor Streaming (ResultSet)"
            icon="🌊"
            description="JdbcCursorItemReader sets fetchSize on the JDBC Statement. Database streams rows in small batches rather than loading all into memory."
            howItHelps="fetchSize=1000 means only 1000 rows buffered in JDBC driver memory. Prevents OOM on million-row queries."
            color="#00BCD4"
            startFrame={640}
            x={520}
            y={340}
            width={500}
          />

          {/* Pattern 3: ExecutionContext pruning */}
          <DSACard
            name="ExecutionContext Serialization"
            icon="📏"
            description="ExecutionContext is serialized to DB as JSON/BLOB after each chunk. Keep it small! Only store cursor position, not cached data."
            howItHelps="Large contexts slow down chunk commits (serialization overhead). Store just readCount or lastId — not the items themselves."
            color="#9C27B0"
            startFrame={660}
            x={520}
            y={560}
            width={500}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════ SCENE 7 — RepeatOperations / CompletionPolicy ═══════════ */}
      <Sequence from={730} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "30px 60px" }}>
          <h2
            style={{
              fontSize: 34,
              color: "#00BCD4",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 730, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Control Flow Interfaces
          </h2>

          <InterfaceCard
            name="RepeatOperations"
            icon="🔁"
            color="#00BCD4"
            startFrame={740}
            x={50}
            y={80}
            width={440}
            methods={[
              "RepeatStatus iterate(RepeatCallback cb)",
              "// Drives the chunk loop internally",
              "// RepeatTemplate is the implementation",
              "// Controls WHEN to stop reading",
            ]}
            analogy="The rep counter — keeps going until CompletionPolicy says stop."
          />

          <InterfaceCard
            name="CompletionPolicy"
            icon="🏁"
            color="#26C6DA"
            startFrame={752}
            x={540}
            y={80}
            width={440}
            methods={[
              "boolean isComplete(RepeatContext ctx)",
              "// SimpleCompletionPolicy → count-based",
              "// TimeoutTerminationPolicy → time-based",
              "// You can write CUSTOM policies!",
            ]}
            analogy="Decides when a set is done — after 10 reps? After 60 seconds? Your call!"
          />

          <InterfaceCard
            name="Tasklet"
            icon="🤸"
            color="#4DD0E1"
            startFrame={764}
            x={50}
            y={370}
            width={440}
            methods={[
              "RepeatStatus execute(StepContribution,",
              "    ChunkContext ctx)",
              "// Return FINISHED or CONTINUABLE",
              "// No read/process/write — one operation",
            ]}
            analogy="A single exercise — clean the equipment, send email, done."
          />

          <InterfaceCard
            name="StepExecutionListener"
            icon="👂"
            color="#80DEEA"
            startFrame={776}
            x={540}
            y={370}
            width={440}
            methods={[
              "void beforeStep(StepExecution exec)",
              "ExitStatus afterStep(StepExecution exec)",
              "// Also: ChunkListener, ItemReadListener,",
              "//   ItemProcessListener, ItemWriteListener",
            ]}
            analogy="The referee watching every lift — records form, flags bad reps."
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════ SCENE 8 — Performance Summary ═══════════ */}
      <Sequence from={850} durationInFrames={120}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <h2
            style={{
              fontSize: 38,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              opacity: interpolate(frame - 850, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Performance Cheat Sheet
          </h2>

          {[
            {
              iface: "ItemReader.read()",
              dsa: "Cursor / Keyset Pagination",
              perf: "O(1) per item, O(log n) per page seek",
              color: "#4CAF50",
            },
            {
              iface: "ItemWriter.write(Chunk)",
              dsa: "Batch insert (List → single SQL)",
              perf: "1 round-trip per chunk, not per item",
              color: "#2196F3",
            },
            {
              iface: "ExecutionContext",
              dsa: "ConcurrentHashMap",
              perf: "O(1) put/get, thread-safe checkpointing",
              color: "#9C27B0",
            },
            {
              iface: "FaultTolerantChunkProcessor",
              dsa: "HashMap (skip counts)",
              perf: "O(1) skip-limit check per failure",
              color: "#F44336",
            },
            {
              iface: "Partitioner",
              dsa: "Range partitioning (min/max)",
              perf: "Linear scalability, zero contention",
              color: "#E91E63",
            },
            {
              iface: "TaskExecutor + throttleLimit",
              dsa: "Bounded BlockingQueue",
              perf: "Back-pressure prevents OOM",
              color: "#FF9800",
            },
            {
              iface: "CompletionPolicy",
              dsa: "Counter / Timer",
              perf: "Controls chunk size → memory footprint",
              color: "#00BCD4",
            },
          ].map((row, i) => {
            const rRel = frame - (865 + i * 10);
            if (rRel < 0) return null;
            return (
              <div
                key={row.iface}
                style={{
                  position: "absolute",
                  left: 80,
                  top: 110 + i * 68,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: interpolate(rRel, [0, 10], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  width: 1200,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: row.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: row.color,
                    fontSize: 17,
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    width: 340,
                  }}
                >
                  {row.iface}
                </span>
                <span
                  style={{
                    color: "#CFD8DC",
                    fontSize: 16,
                    fontFamily: "Arial, sans-serif",
                    width: 340,
                  }}
                >
                  {row.dsa}
                </span>
                <span
                  style={{
                    color: "#90A4AE",
                    fontSize: 14,
                    fontFamily: "monospace",
                  }}
                >
                  {row.perf}
                </span>
              </div>
            );
          })}

          {/* Final bodybuilder team */}
          {frame >= 940 && (
            <div
              style={{
                position: "absolute",
                bottom: 50,
                left: 0,
                right: 0,
                textAlign: "center",
                opacity: interpolate(frame - 940, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span
                style={{
                  color: "#FFD700",
                  fontSize: 28,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Interfaces define the contract. Data structures deliver the speed.
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
