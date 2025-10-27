'use client';

import { type SVGProps, useMemo } from 'react';

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
  const randomOffsetTime = useMemo(() => {
    // Deterministically stagger animation timings so cache-sensitive renders stay stable.
    const key = `${x}-${y}-${radius}`;
    let hash = 0;
    for (let index = 0; index < key.length; index++) {
      hash = (hash << 5) - hash + key.charCodeAt(index);
      hash |= 0;
    }

    const normalized = Math.abs(hash % 1000) / 1000;
    return normalized * 10;
  }, [radius, x, y]);

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
          suppressHydrationWarning
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
