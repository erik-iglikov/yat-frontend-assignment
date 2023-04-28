import { MutableRefObject, useEffect, useRef } from 'react';

export function useInfiniteScroll<T extends HTMLElement>(
  callback: () => void,
  threshold = 0,
): MutableRefObject<T | null> {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + threshold) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, threshold]);

  return targetRef;
}
