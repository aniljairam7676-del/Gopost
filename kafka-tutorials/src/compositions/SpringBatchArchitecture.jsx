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
import { Arrow } from "../components/Arrow";
import { FlexAnimation } from "../components/FlexAnimation";
import { GymStation } from "../components/GymStation";
import { SpeechBubble } from "../components/SpeechBubble";

const LogbookPage = ({ title, items, startFrame, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 320,
        transform: `scale(${scale})`,
        backgroundColor: "#FFF8E1",
        borderRadius: 8,
        padding: 20,
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        border: "2px solid #FFD54F",
      }}
    >
      <h4
        style={{
          color: "#5D4037",
          fontSize: 18,
          fontFamily: "Arial, sans-serif",
          marginBottom: 12,
          borderBottom: "2px solid #BCAAA4",
          paddingBottom: 8,
        }}
      >
        {title}
      </h4>
      {items.map((item, i) => {
        const itemRel = frame - (startFrame + 10 + i * 8);
        if (itemRel < 0) return null;
        return (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              opacity: interpolate(itemRel, [0, 8], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                color: "#5D4037",
                fontSize: 14,
                fontFamily: "monospace",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                color: item.color || "#333",
                fontSize: 14,
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const UseCaseCard = ({ title, icon, description, startFrame, x, y }) => {
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
        width: 360,
        transform: `scale(${scale})`,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 24,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <h3
        style={{
          color: "#FFD700",
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "#B0BEC5",
          fontSize: 16,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const SpringBatchArchitecture = () => {
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
            text="Spring Batch Architecture"
            subtitle="The blueprint of the ultimate gym"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Full Architecture Diagram */}
      <Sequence from={80} durationInFrames={140}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 30,
              fontSize: 40,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            The Full Gym Blueprint
          </h2>

          {/* Launcher Larry at entrance */}
          <FlexAnimation startFrame={90} x={50} y={200}>
            <BodybuilderCharacter
              name="Launcher Larry"
              color="#F44336"
              accessory="horn"
              startFrame={90}
              x={0}
              y={0}
              scale={0.9}
            />
          </FlexAnimation>

          {/* Coach Job in center */}
          <FlexAnimation startFrame={100} x={280} y={180}>
            <BodybuilderCharacter
              name="Coach Job"
              color="#9C27B0"
              accessory="clipboard"
              startFrame={100}
              x={0}
              y={0}
              scale={1.0}
            />
          </FlexAnimation>

          {/* Step stations */}
          <GymStation
            label="Step 1"
            sublabel="Read CSV"
            icon="📂"
            startFrame={110}
            x={520}
            y={150}
            color="#4CAF50"
            width={160}
            height={120}
          />
          <GymStation
            label="Step 2"
            sublabel="Transform"
            icon="⚙️"
            startFrame={118}
            x={720}
            y={150}
            color="#FF9800"
            width={160}
            height={120}
          />
          <GymStation
            label="Step 3"
            sublabel="Write DB"
            icon="💾"
            startFrame={126}
            x={920}
            y={150}
            color="#2196F3"
            width={160}
            height={120}
          />

          {/* Reader/Processor/Writer characters at stations */}
          <FlexAnimation startFrame={135} x={540} y={310}>
            <BodybuilderCharacter name="Rick" color="#4CAF50" accessory="dumbbell" startFrame={135} x={0} y={0} scale={0.6} />
          </FlexAnimation>
          <FlexAnimation startFrame={140} x={740} y={310}>
            <BodybuilderCharacter name="Pete" color="#FF9800" accessory="dumbbell" startFrame={140} x={0} y={0} scale={0.6} />
          </FlexAnimation>
          <FlexAnimation startFrame={145} x={940} y={310}>
            <BodybuilderCharacter name="Walt" color="#2196F3" accessory="dumbbell" startFrame={145} x={0} y={0} scale={0.6} />
          </FlexAnimation>

          {/* Memory Marge at reception */}
          <FlexAnimation startFrame={150} x={1200} y={180}>
            <BodybuilderCharacter
              name="Memory Marge"
              color="#9C27B0"
              accessory="book"
              startFrame={150}
              x={0}
              y={0}
              scale={0.9}
            />
          </FlexAnimation>

          {/* Flow arrows */}
          <Arrow startFrame={115} fromX={200} fromY={300} toX={280} toY={300} color="#F44336" label="launch" />
          <Arrow startFrame={120} fromX={420} fromY={280} toX={520} toY={230} color="#9C27B0" label="execute" />
          <Arrow startFrame={130} fromX={680} fromY={210} toX={720} toY={210} color="#FFD700" />
          <Arrow startFrame={138} fromX={880} fromY={210} toX={920} toY={210} color="#FFD700" />
          <Arrow startFrame={155} fromX={1080} fromY={250} toX={1200} toY={280} color="#CE93D8" label="log" />

          {/* The Spotters in background */}
          {frame >= 160 && (
            <div
              style={{
                position: "absolute",
                left: 520,
                bottom: 100,
                display: "flex",
                gap: 60,
                opacity: interpolate(frame - 160, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 30 }}>👀</span>
                <div style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif" }}>
                  JobListener
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 30 }}>👀</span>
                <div style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif" }}>
                  StepListener
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 30 }}>👀</span>
                <div style={{ color: "#B0BEC5", fontSize: 14, fontFamily: "Arial, sans-serif" }}>
                  ChunkListener
                </div>
              </div>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Execution Context — Marge's Logbook */}
      <Sequence from={220} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <h2
            style={{
              fontSize: 40,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              marginBottom: 15,
              opacity: interpolate(frame - 220, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Execution Context — Marge's Giant Logbook
          </h2>

          <FlexAnimation startFrame={225} x={50} y={130}>
            <BodybuilderCharacter
              name="Memory Marge"
              color="#9C27B0"
              accessory="book"
              startFrame={225}
              x={0}
              y={0}
              scale={1.4}
              speech="I track EVERYTHING. Every. Single. Rep."
              speechDelay={20}
            />
          </FlexAnimation>

          <LogbookPage
            title="Job Parameters"
            startFrame={240}
            x={450}
            y={130}
            items={[
              { label: "input.file", value: "users.csv" },
              { label: "date", value: "2026-03-18" },
              { label: "chunk.size", value: "1000" },
            ]}
          />

          <LogbookPage
            title="Step Execution"
            startFrame={260}
            x={820}
            y={130}
            items={[
              { label: "readCount", value: "1,547,823", color: "#4CAF50" },
              { label: "writeCount", value: "1,547,100", color: "#2196F3" },
              { label: "skipCount", value: "723", color: "#F44336" },
              { label: "commitCount", value: "1,548", color: "#FFD700" },
            ]}
          />

          <LogbookPage
            title="Job Status"
            startFrame={280}
            x={1190}
            y={130}
            items={[
              { label: "status", value: "COMPLETED", color: "#4CAF50" },
              { label: "startTime", value: "10:30:00" },
              { label: "endTime", value: "10:42:15" },
              { label: "duration", value: "12m 15s" },
            ]}
          />

          {/* Animated counters */}
          {frame >= 300 && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 60,
                opacity: interpolate(frame - 300, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {[
                { label: "Records Read", value: "1.5M", color: "#4CAF50" },
                { label: "Records Written", value: "1.5M", color: "#2196F3" },
                { label: "Errors Skipped", value: "723", color: "#F44336" },
                { label: "Time", value: "12m 15s", color: "#FFD700" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: stat.color,
                      fontSize: 36,
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: "#B0BEC5",
                      fontSize: 16,
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Real World Use Cases */}
      <Sequence from={350} durationInFrames={130}>
        <AbsoluteFill style={{ padding: "40px 80px" }}>
          <h2
            style={{
              fontSize: 40,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              marginBottom: 15,
              opacity: interpolate(frame - 350, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Real World Gym Scenarios
          </h2>

          <UseCaseCard
            title="ETL Pipeline"
            icon="🏋️‍♂️"
            description="Moving weights between gyms — extract from one DB, transform, load into another"
            startFrame={360}
            x={50}
            y={120}
          />
          <UseCaseCard
            title="Report Generation"
            icon="📊"
            description="Marge creating a stats sheet — aggregate millions of records into reports"
            startFrame={375}
            x={460}
            y={120}
          />
          <UseCaseCard
            title="File Processing"
            icon="📁"
            description="Rick reading from a huge pile of files — CSVs, XMLs, and flat files"
            startFrame={390}
            x={50}
            y={430}
          />
          <UseCaseCard
            title="Data Cleanup"
            icon="🔧"
            description="Pete fixing broken dumbbells — validate, deduplicate, and enrich data"
            startFrame={405}
            x={460}
            y={430}
          />

          {/* Team pose */}
          {frame >= 430 && (
            <div
              style={{
                position: "absolute",
                right: 80,
                top: 150,
                opacity: interpolate(frame - 430, [0, 15], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  <FlexAnimation startFrame={430} x={0} y={0}>
                    <BodybuilderCharacter name="Coach" color="#9C27B0" startFrame={430} x={0} y={0} scale={0.6} />
                  </FlexAnimation>
                  <FlexAnimation startFrame={434} x={100} y={0}>
                    <BodybuilderCharacter name="Rick" color="#4CAF50" startFrame={434} x={0} y={0} scale={0.6} />
                  </FlexAnimation>
                  <FlexAnimation startFrame={438} x={200} y={0}>
                    <BodybuilderCharacter name="Pete" color="#FF9800" startFrame={438} x={0} y={0} scale={0.6} />
                  </FlexAnimation>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <FlexAnimation startFrame={442} x={0} y={0}>
                    <BodybuilderCharacter name="Walt" color="#2196F3" startFrame={442} x={0} y={0} scale={0.6} />
                  </FlexAnimation>
                  <FlexAnimation startFrame={446} x={100} y={0}>
                    <BodybuilderCharacter name="Marge" color="#9C27B0" startFrame={446} x={0} y={0} scale={0.6} />
                  </FlexAnimation>
                  <FlexAnimation startFrame={450} x={200} y={0}>
                    <BodybuilderCharacter name="Larry" color="#F44336" startFrame={450} x={0} y={0} scale={0.6} />
                  </FlexAnimation>
                </div>

                {frame >= 455 && (
                  <div
                    style={{
                      marginTop: 10,
                      opacity: interpolate(frame - 455, [0, 10], [0, 1], {
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
                      Spring Batch Team! 💪
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
