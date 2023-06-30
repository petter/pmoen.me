'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Hexagon } from './hexagon';
import { SvgRainbowGradient } from './svg-rainbow-gradient';
import { useMouseElementPosition } from './use-mouse-element-position';

function getDistance(vector1: [number, number], vector2: [number, number]) {
  const [x1, y1] = vector1;
  const [x2, y2] = vector2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function JumbotronBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePos = useMouseElementPosition(svgRef);

  const gridSize = 1000;
  const hexagonRadius = 20;
  const hoverRadius = 150;

  const points = useMemo(() => {
    const res = [];
    for (let y = 0; y < gridSize; y += hexagonRadius * 2) {
      for (let x = 0; x < gridSize; x += hexagonRadius * 2) {
        res.push([x, y]);
      }
    }
    return res;
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1000"
      height="1000"
      viewBox={`0 0 ${gridSize} ${gridSize}`}
      ref={svgRef}
      className="bg-stone-950"
    >
      <SvgRainbowGradient id="rainbowGradient" />
      <mask id="hexMask">
        {points.map(([x, y]) => {
          const distance = getDistance(mousePos, [x, y]);
          const isWithinHoverRadius = distance < hoverRadius;
          const opacityStrength = Math.max(
            (hoverRadius - distance) / hoverRadius,
            0
          );
          return (
            <Hexagon
              key={`${x}-${y}`}
              x={x}
              y={y}
              radius={hexagonRadius}
              stroke={isWithinHoverRadius ? 'white' : 'black'}
              opacity={opacityStrength}
            />
          );
        })}
      </mask>
      <rect
        x={0}
        y={0}
        width={gridSize}
        height={gridSize}
        fill="url(#rainbowGradient)"
        mask="url(#hexMask)"
      ></rect>
    </svg>
  );
}
