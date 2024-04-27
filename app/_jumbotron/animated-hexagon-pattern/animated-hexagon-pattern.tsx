'use client';

import { SVGProps, useMemo } from 'react';
import { Hexagon } from './hexagon';
import { SvgRainbowGradient } from './svg-rainbow-gradient';

type AnimatedHexagonPatternProps = {
  width: number;
  height: number;
  hexagonRadius: number;
} & Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'width' | 'height'>;

export function AnimatedHexagonPattern({
  width,
  height,
  hexagonRadius,
  ...rest
}: AnimatedHexagonPatternProps) {
  const points = useMemo(() => {
    return generatePoints(width, height, hexagonRadius);
  }, [height, hexagonRadius, width]);

  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <SvgRainbowGradient id="rainbowGradient" />
      <mask id="hexMask">
        {points.map(([x, y]) => {
          return (
            <Hexagon key={`${x}-${y}`} x={x} y={y} radius={hexagonRadius} />
          );
        })}
      </mask>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="url(#rainbowGradient)"
        mask="url(#hexMask)"
      ></rect>
    </svg>
  );
}

function generatePoints(
  width: number,
  height: number,
  hexagonRadius: number
): (readonly [number, number])[] {
  const res = [];

  const middlePoint = [width / 2, height / 2] as const;
  const renderDistance = (width / 2 + height / 2) / 2;

  for (let y = hexagonRadius; y < height; y += hexagonRadius * 2) {
    for (let x = hexagonRadius; x < width; x += hexagonRadius * 2) {
      if (getDistance(middlePoint, [x, y]) < renderDistance) {
        res.push([x, y] as const);
      }
    }
  }

  return res;
}

function getDistance(
  vector1: readonly [number, number],
  vector2: readonly [number, number]
) {
  const [x1, y1] = vector1;
  const [x2, y2] = vector2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
