import { PropsWithChildren } from 'react';
import { AnimatedHexagonPattern } from './animated-hexagon-pattern/animated-hexagon-pattern';

type JumbotronProps = PropsWithChildren<{}>;

export function Jumbotron({ children }: JumbotronProps) {
  return (
    <div className="relative z-10 h-screen w-full overflow-hidden bg-stone-950 p-8 text-white">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <AnimatedHexagonPattern width={400} height={400} hexagonRadius={20} />
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
