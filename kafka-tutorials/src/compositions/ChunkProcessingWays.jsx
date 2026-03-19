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
import { GymStation } from "../components/GymStation";

const ImplementationCard = ({ number, title, items, color, startFrame, x, y, icon }) => {
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
        width: 440,
        transform: `scale(${scale})`,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
        padding: 22,
        border: `2px solid ${color}44`,
        borderTop: `4px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
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
      {items.map((item, i) => {
        const itemRel = frame - (startFrame + 10 + i * 8);
        if (itemRel < 0) return null;
        return (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              opacity: interpolate(itemRel, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
            <span style={{ color: "#E0E0E0", fontSize: 15, fontFamily: "Arial, sans-serif" }}>
              <strong style={{ color }}>{item.name}</strong> — {item.desc}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const ChunkProcessingWays = () => {
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
            text="Ways to Implement Read / Process / Write"
            subtitle="Every lifter has their preferred equipment"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: ItemReader Implementations */}
      <Sequence from={80} durationInFrames={140}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <h2
            style={{
              fontSize: 38,
              color: "#4CAF50",
              fontFamily: "Arial, sans-serif",
              marginBottom: 10,
              opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            7 Ways to Read Data (ItemReader)
          </h2>

          <FlexAnimation startFrame={85} x={30} y={100}>
            <BodybuilderCharacter
              name="Reader Rick"
              color="#4CAF50"
              accessory="dumbbell"
              startFrame={85}
              x={0}
              y={0}
              scale={1.0}
              speech="I can grab weights from ANY rack in ANY gym!"
              speechDelay={15}
            />
          </FlexAnimation>

          <ImplementationCard
            number={1}
            title="Flat File Readers"
            icon="📄"
            color="#4CAF50"
            startFrame={95}
            x={280}
            y={80}
            items={[
              { name: "FlatFileItemReader", desc: "CSV, TSV, fixed-width files" },
              { name: "JsonItemReader", desc: "JSON array files" },
              { name: "StaxEventItemReader", desc: "XML documents" },
            ]}
          />

          <ImplementationCard
            number={2}
            title="Database Readers"
            icon="🗄️"
            color="#66BB6A"
            startFrame={115}
            x={780}
            y={80}
            items={[
              { name: "JdbcCursorItemReader", desc: "JDBC cursor — streams rows" },
              { name: "JdbcPagingItemReader", desc: "JDBC pagination — page by page" },
              { name: "JpaPagingItemReader", desc: "JPA with paging support" },
              { name: "HibernateCursorReader", desc: "Hibernate cursor streaming" },
            ]}
          />

          <ImplementationCard
            number={3}
            title="Message & Custom"
            icon="📨"
            color="#81C784"
            startFrame={135}
            x={280}
            y={380}
            items={[
              { name: "KafkaItemReader", desc: "Read from Kafka topics" },
              { name: "AmqpItemReader", desc: "Read from RabbitMQ" },
              { name: "Custom ItemReader", desc: "Implement the interface yourself" },
            ]}
          />

          <SpeechBubble
            text="Pro tip: Use Paging readers for large datasets, Cursor for streaming!"
            startFrame={155}
            x={780}
            y={440}
            maxWidth={450}
            color="rgba(76,175,80,0.9)"
            textColor="#FFF"
            fontSize={16}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: ItemProcessor Implementations */}
      <Sequence from={220} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <h2
            style={{
              fontSize: 38,
              color: "#FF9800",
              fontFamily: "Arial, sans-serif",
              marginBottom: 10,
              opacity: interpolate(frame - 220, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            5 Ways to Process Data (ItemProcessor)
          </h2>

          <FlexAnimation startFrame={225} x={30} y={100}>
            <BodybuilderCharacter
              name="Processor Pete"
              color="#FF9800"
              accessory="dumbbell"
              startFrame={225}
              x={0}
              y={0}
              scale={1.0}
              speech="Every transformation needs a different technique!"
              speechDelay={15}
            />
          </FlexAnimation>

          <ImplementationCard
            number={1}
            title="Custom Processor"
            icon="💪"
            color="#FF9800"
            startFrame={235}
            x={280}
            y={80}
            items={[
              { name: "ItemProcessor<I,O>", desc: "Implement process() — most common" },
              { name: "Return null", desc: "to filter/skip an item" },
            ]}
          />

          <ImplementationCard
            number={2}
            title="Composite Processor"
            icon="🔗"
            color="#FFA726"
            startFrame={250}
            x={780}
            y={80}
            items={[
              { name: "CompositeItemProcessor", desc: "Chain multiple processors" },
              { name: "Validate → Transform → Enrich", desc: "Pipeline pattern" },
            ]}
          />

          <ImplementationCard
            number={3}
            title="Adapters & Validation"
            icon="🔌"
            color="#FFB74D"
            startFrame={265}
            x={280}
            y={310}
            items={[
              { name: "ItemProcessorAdapter", desc: "Wrap existing service methods" },
              { name: "ValidatingItemProcessor", desc: "Built-in Bean Validation" },
              { name: "ClassifierProcessor", desc: "Route items to different processors" },
            ]}
          />

          <SpeechBubble
            text="CompositeItemProcessor is like a superset — validate, then transform, then enrich!"
            startFrame={285}
            x={780}
            y={380}
            maxWidth={450}
            color="rgba(255,152,0,0.9)"
            textColor="#FFF"
            fontSize={16}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: ItemWriter Implementations */}
      <Sequence from={350} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <h2
            style={{
              fontSize: 38,
              color: "#2196F3",
              fontFamily: "Arial, sans-serif",
              marginBottom: 10,
              opacity: interpolate(frame - 350, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            6 Ways to Write Data (ItemWriter)
          </h2>

          <FlexAnimation startFrame={355} x={30} y={100}>
            <BodybuilderCharacter
              name="Writer Walt"
              color="#2196F3"
              accessory="dumbbell"
              startFrame={355}
              x={0}
              y={0}
              scale={1.0}
              speech="I can slam weights onto ANY shelf!"
              speechDelay={15}
            />
          </FlexAnimation>

          <ImplementationCard
            number={1}
            title="Database Writers"
            icon="💾"
            color="#2196F3"
            startFrame={365}
            x={280}
            y={80}
            items={[
              { name: "JdbcBatchItemWriter", desc: "JDBC batch insert/update" },
              { name: "JpaItemWriter", desc: "JPA entity persistence" },
              { name: "HibernateItemWriter", desc: "Hibernate session writer" },
            ]}
          />

          <ImplementationCard
            number={2}
            title="File Writers"
            icon="📝"
            color="#42A5F5"
            startFrame={380}
            x={780}
            y={80}
            items={[
              { name: "FlatFileItemWriter", desc: "CSV, TSV output files" },
              { name: "JsonFileItemWriter", desc: "JSON array output" },
              { name: "StaxEventItemWriter", desc: "XML output" },
            ]}
          />

          <ImplementationCard
            number={3}
            title="Advanced Writers"
            icon="🚀"
            color="#64B5F6"
            startFrame={395}
            x={280}
            y={340}
            items={[
              { name: "CompositeItemWriter", desc: "Write to multiple destinations" },
              { name: "ClassifierWriter", desc: "Route items to different writers" },
              { name: "KafkaItemWriter", desc: "Publish to Kafka topics" },
            ]}
          />

          <SpeechBubble
            text="CompositeItemWriter = slam the same weights onto multiple racks at once!"
            startFrame={415}
            x={780}
            y={400}
            maxWidth={450}
            color="rgba(33,150,243,0.9)"
            textColor="#FFF"
            fontSize={16}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Summary */}
      <Sequence from={480} durationInFrames={60}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 25,
          }}
        >
          <h2
            style={{
              fontSize: 42,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 480, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            The Complete Equipment Catalog
          </h2>

          <div style={{ display: "flex", gap: 60, marginTop: 10 }}>
            {[
              { label: "Readers", count: "7+", color: "#4CAF50" },
              { label: "Processors", count: "5+", color: "#FF9800" },
              { label: "Writers", count: "6+", color: "#2196F3" },
            ].map((item, i) => {
              const rel = frame - (490 + i * 8);
              if (rel < 0) return null;
              return (
                <div
                  key={item.label}
                  style={{
                    textAlign: "center",
                    opacity: interpolate(rel, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
                  }}
                >
                  <div style={{ color: item.color, fontSize: 56, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                    {item.count}
                  </div>
                  <div style={{ color: "#B0BEC5", fontSize: 24, fontFamily: "Arial, sans-serif" }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          <FlexAnimation startFrame={510} x={700} y={450}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={510}
              x={0}
              y={0}
              scale={0.8}
              speech="Mix and match for your perfect workout!"
              speechDelay={10}
            />
          </FlexAnimation>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
