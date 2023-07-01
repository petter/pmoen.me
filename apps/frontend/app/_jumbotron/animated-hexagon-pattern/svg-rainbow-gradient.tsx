import { SVGProps } from 'react';

type SvgRainbowGradientProps = Omit<
  SVGProps<SVGLinearGradientElement>,
  'children'
>;
export function SvgRainbowGradient(props: SvgRainbowGradientProps) {
  const colors = [
    'rgb(255, 0, 0)',
    'rgb(255, 154, 0)',
    'rgb(208, 222, 33)',
    'rgb(79, 220, 74)',
    'rgb(63, 218, 216)',
    'rgb(47, 201, 226)',
    'rgb(28, 127, 238)',
    'rgb(95, 21, 242)',
    'rgb(186, 12, 248)',
    'rgb(251, 7, 217)',
  ];
  return (
    <linearGradient gradientTransform="rotate(45)" {...props}>
      {colors.map((color, i) => {
        const offset = i / colors.length;
        return (
          <stop key={i} offset={`${offset * 100}%`} stopColor={color}>
            <animate
              attributeName="stop-color"
              values={arrayRotate([...colors], i).join(';')}
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        );
      })}
      <animateTransform
        attributeName="gradientTransform"
        attributeType="XML"
        type="rotate"
        from="0 0.5 0.5"
        to="360 0.5 0.5"
        dur="5s"
        repeatCount="indefinite"
      />
    </linearGradient>
  );
}

function arrayRotate(arr: unknown[], num = 0) {
  if (num <= 0) {
    return arr;
  }

  arr.push(arr.shift());
  return arrayRotate(arr, num - 1);
}
