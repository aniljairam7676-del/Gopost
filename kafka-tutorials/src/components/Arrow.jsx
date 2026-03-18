import { interpolate, useCurrentFrame } from "remotion";

export const Arrow = ({
  startFrame = 0,
  fromX,
  fromY,
  toX,
  toY,
  color = "#FFB300",
  label = "",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const progress = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (relativeFrame < 0) return null;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  const currentLength = length * progress;
  const endX = fromX + Math.cos(angle) * currentLength;
  const endY = fromY + Math.sin(angle) * currentLength;

  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2 - 20;

  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <marker
          id={`arrowhead-${fromX}-${toX}`}
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <line
        x1={fromX}
        y1={fromY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={3}
        markerEnd={progress > 0.9 ? `url(#arrowhead-${fromX}-${toX})` : undefined}
      />
      {label && progress > 0.5 && (
        <text
          x={midX}
          y={midY}
          textAnchor="middle"
          fill={color}
          fontSize={16}
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          opacity={interpolate(relativeFrame, [10, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          {label}
        </text>
      )}
    </svg>
  );
};
