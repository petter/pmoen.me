import { useLayoutEffect, useState } from 'react';

export function useMouseElementPosition(
  ref: React.RefObject<HTMLElement | SVGElement>,
) {
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.onmousemove = (e) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const offsetLeft = rect.left + window.scrollX;
          const offsetTop = rect.top + window.scrollY;
          setMousePos([e.pageX - offsetLeft, e.pageY - offsetTop]);
        }
      };
    }
  }, [ref]);

  return mousePos;
}
