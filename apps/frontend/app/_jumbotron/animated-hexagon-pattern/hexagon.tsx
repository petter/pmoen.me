import { SVGProps, useMemo } from 'react';

type HexagonProps = {
  x: number;
  y: number;
  radius: number;
} & Omit<SVGProps<SVGPolygonElement>, 'points'>;

export function Hexagon({
  x,
  y,
  radius,
  stroke = 'white',
  strokeWidth = 2,
  opacity = 1,
  ...rest
}: HexagonProps) {
  const points = [
    [x + radius, y],
    [x + radius / 2, y + radius * (13 / 15)],
    [x - radius / 2, y + radius * (13 / 15)],
    [x - radius, y],
    [x - radius / 2, y - radius * (13 / 15)],
    [x + radius / 2, y - radius * (13 / 15)],
  ];

  const opacityAnimationDuration = 4;
  const randomOffsetTime = useMemo(() => Math.random() * 10, []);

  const shouldRender = Number(opacity) > 0;
  return (
    <polygon
      {...rest}
      points={points.map((point) => point.join(',')).join(' ')}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={0}
    >
      {shouldRender && (
        <animate
          attributeName="opacity"
          values="0;1;0"
          begin={`${randomOffsetTime}s`}
          dur={`${opacityAnimationDuration}s`}
          repeatCount="indefinite"
        />
      )}
    </polygon>
  );
}
