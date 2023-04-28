import { useEffect, useState } from 'react';

/**
 * A hook that returns the debounced value of a string after a specified delay.
 * @param {string} value - The string value to debounce.
 * @param {number} delay - The delay in milliseconds before the debounced value is returned.
 * @returns {string} - The debounced value of the input string.
 */
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
