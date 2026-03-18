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
import { Arrow } from "../components/Arrow";
import { SpeechBubble } from "../components/SpeechBubble";
import { ProgressBar } from "../components/ProgressBar";
import { FlexAnimation } from "../components/FlexAnimation";

const WeightRack = ({ startFrame, x, y, label }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0) return null;

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
      }}
    >
      {/* Rack frame */}
      <div
        style={{
          width: 180,
          height: 240,
          backgroundColor: "rgba(78,52,46,0.6)",
          borderRadius: 8,
          border: "3px solid #5D4037",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 10,
          gap: 6,
        }}
      >
        {/* Shelf lines */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: "90%",
              height: 3,
              backgroundColor: "#8D6E63",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
      {/* Label */}
      <div
        style={{
          textAlign: "center",
          marginTop: 8,
          color: "#B0BEC5",
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const TransformMachine = ({ startFrame, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0) return null;

  const scale = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Gear rotation
  const rotation = relativeFrame * 3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 200,
          height: 160,
          backgroundColor: "#37474F",
          borderRadius: 12,
          border: "3px solid #FF9800",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "0 4px 20px rgba(255,152,0,0.3)",
        }}
      >
        {/* Gear icon */}
        <div
          style={{
            fontSize: 36,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          ⚙️
        </div>
        <span
          style={{
            color: "#FF9800",
            fontSize: 16,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          TRANSFORM
        </span>
      </div>
    </div>
  );
};

const MovingDumbbell = ({ startFrame, fromX, fromY, toX, toY, label, duration = 30, color = "#78909C", toColor = null }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0 || relativeFrame > duration + 10) return null;

  const progress = interpolate(relativeFrame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });

  const x = interpolate(progress, [0, 1], [fromX, toX]);
  const y = interpolate(progress, [0, 0.5, 1], [fromY, fromY - 40, toY]);

  const currentColor = toColor
    ? progress > 0.5 ? toColor : color
    : color;

  const opacity = relativeFrame > duration
    ? interpolate(relativeFrame - duration, [0, 10], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  return (
    <div style={{ position: "absolute", left: x, top: y, opacity }}>
      <Dumbbell label={label} startFrame={0} x={0} y={0} color={currentColor} size={1.2} />
    </div>
  );
};

export const ChunkProcessing = () => {
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
            text="Chunk Processing"
            subtitle="Read → Process → Write — The ultimate superset"
            startFrame={5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Reader Rick */}
      <Sequence from={80} durationInFrames={120}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 30,
              fontSize: 40,
              color: "#4CAF50",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Step 1: Reader Rick grabs the data
          </h2>

          <WeightRack startFrame={85} x={100} y={150} label="Database / CSV / API" />

          <FlexAnimation startFrame={90} x={350} y={200}>
            <BodybuilderCharacter
              name="Reader Rick"
              color="#4CAF50"
              accessory="dumbbell"
              startFrame={90}
              x={0}
              y={0}
              scale={1.3}
              speech="I grab the data, one item at a time!"
              speechDelay={25}
            />
          </FlexAnimation>

          {/* Dumbbells being picked up */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Dumbbell
              key={`read-${i}`}
              label={`#${i + 1}`}
              startFrame={110 + i * 10}
              x={650 + i * 85}
              y={320}
              color="#4CAF50"
              size={1.1}
            />
          ))}

          <SpeechBubble
            text="Chunk size = 5 — I read 5 items before passing them on!"
            startFrame={165}
            x={600}
            y={430}
            maxWidth={500}
            color="rgba(76,175,80,0.9)"
            textColor="#FFF"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Processor Pete */}
      <Sequence from={200} durationInFrames={120}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 30,
              fontSize: 40,
              color: "#FF9800",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 200, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Step 2: Processor Pete transforms each record
          </h2>

          <FlexAnimation startFrame={205} x={100} y={180}>
            <BodybuilderCharacter
              name="Processor Pete"
              color="#FF9800"
              accessory="dumbbell"
              startFrame={205}
              x={0}
              y={0}
              scale={1.3}
              speech="I validate, transform, and enrich each record!"
              speechDelay={20}
            />
          </FlexAnimation>

          <TransformMachine startFrame={210} x={450} y={200} />

          {/* Raw dumbbells going in */}
          {[0, 1, 2, 3, 4].map((i) => (
            <MovingDumbbell
              key={`proc-${i}`}
              startFrame={220 + i * 12}
              fromX={350}
              fromY={280}
              toX={700}
              toY={280}
              label={`#${i + 1}`}
              color="#78909C"
              toColor="#FFD700"
              duration={25}
            />
          ))}

          {/* Gold processed dumbbells */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Dumbbell
              key={`gold-${i}`}
              label={`#${i + 1}`}
              startFrame={250 + i * 12}
              x={750 + i * 85}
              y={280}
              color="#FFD700"
              size={1.1}
            />
          ))}

          {/* Trash can for filtered item */}
          {frame >= 280 && (
            <div
              style={{
                position: "absolute",
                left: 700,
                top: 430,
                opacity: interpolate(frame - 280, [0, 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div style={{ fontSize: 40, textAlign: "center" }}>🗑️</div>
              <span
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Filtered out (invalid)
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Writer Walt */}
      <Sequence from={320} durationInFrames={100}>
        <AbsoluteFill>
          <h2
            style={{
              position: "absolute",
              left: 100,
              top: 30,
              fontSize: 40,
              color: "#2196F3",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 320, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Step 3: Writer Walt slams them home!
          </h2>

          <FlexAnimation startFrame={325} x={100} y={180}>
            <BodybuilderCharacter
              name="Writer Walt"
              color="#2196F3"
              accessory="dumbbell"
              startFrame={325}
              x={0}
              y={0}
              scale={1.3}
              speech="I write the whole chunk at once — EFFICIENT!"
              speechDelay={20}
            />
          </FlexAnimation>

          {/* Moving chunk to target */}
          {[0, 1, 2, 3, 4].map((i) => (
            <MovingDumbbell
              key={`write-${i}`}
              startFrame={345 + i * 5}
              fromX={350}
              fromY={300}
              toX={800 + i * 80}
              toY={300}
              label={`#${i + 1}`}
              color="#FFD700"
              duration={20}
            />
          ))}

          <WeightRack startFrame={330} x={780} y={180} label="Output DB / File / Queue" />

          {/* SLAM effect */}
          {frame >= 375 && (
            <div
              style={{
                position: "absolute",
                left: 800,
                top: 140,
                opacity: interpolate(frame - 375, [0, 3, 15], [0, 1, 0], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span
                style={{
                  color: "#FFD700",
                  fontSize: 60,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                💥 SLAM!
              </span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: The Loop */}
      <Sequence from={420} durationInFrames={60}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <h2
            style={{
              fontSize: 42,
              color: "#FFD700",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame - 420, [0, 10], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            Read → Process → Write → REPEAT!
          </h2>

          <ProgressBar
            startFrame={425}
            x={660}
            y={450}
            width={600}
            height={45}
            fromPercent={0}
            toPercent={100}
            duration={45}
            label="Processing 2,000,000 chunks..."
            color="#FFD700"
          />

          {/* Mini characters in a row */}
          <div style={{ display: "flex", gap: 80, marginTop: 20 }}>
            <FlexAnimation startFrame={430} x={400} y={530}>
              <BodybuilderCharacter name="Rick" color="#4CAF50" startFrame={430} x={0} y={0} scale={0.7} />
            </FlexAnimation>
            <FlexAnimation startFrame={435} x={600} y={530}>
              <BodybuilderCharacter name="Pete" color="#FF9800" startFrame={435} x={0} y={0} scale={0.7} />
            </FlexAnimation>
            <FlexAnimation startFrame={440} x={800} y={530}>
              <BodybuilderCharacter name="Walt" color="#2196F3" startFrame={440} x={0} y={0} scale={0.7} />
            </FlexAnimation>
          </div>

          <SpeechBubble
            text="That's what I call GAINS! 💪"
            startFrame={445}
            x={1050}
            y={540}
            color="rgba(156,39,176,0.9)"
            textColor="#FFF"
            fontSize={20}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
