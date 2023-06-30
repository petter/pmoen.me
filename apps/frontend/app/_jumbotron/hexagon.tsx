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
  stroke = 'black',
  strokeWidth = 2,
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
  const opacityAnimationDuration = 3;
  const randomOffsetTime = useMemo(
    () => Math.random() * opacityAnimationDuration,
    []
  );
  return (
    <polygon
      {...rest}
      points={points.map((point) => point.join(',')).join(' ')}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      {rest.opacity && Number(rest.opacity) > 0 && (
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
