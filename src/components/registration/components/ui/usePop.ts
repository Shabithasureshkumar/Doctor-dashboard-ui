import { useCallback, useState, type AnimationEvent } from 'react';

/** A tiny "press" bounce that replays every time `trigger` is called. */
export function usePop() {
  const [popping, setPopping] = useState(false);
  const trigger = useCallback(() => {
    setPopping(false);
    requestAnimationFrame(() => setPopping(true));
  }, []);
  const onAnimationEnd = useCallback((e: AnimationEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) setPopping(false);
  }, []);
  return { popClass: popping ? 'animate-pk-pop' : '', trigger, onAnimationEnd };
}
