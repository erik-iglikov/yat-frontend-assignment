import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Defines the useInfiniteScroll custom hook, which receives a callback function and an optional threshold value.
 *
 * @template T - The type of the HTML element that the hook will be attached to.
 * @param {() => void} callback - The function to be executed when the target element is scrolled into view.
 * @param {number} [threshold=0] - Optional. The additional number of pixels from the viewport bottom to trigger the callback.
 *
 * @returns {MutableRefObject<T | null>} - A ref object to be attached to the target element.
 */
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
