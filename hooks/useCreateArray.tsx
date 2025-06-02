import { useMemo } from "react";

/**
 * Generates a memoized array of numbers from 0 to length - 1.
 * @param length Number of items to generate.
 * @returns An array of numbers from 0 to length - 1.
 */

const useCreateArray = (length: number): number[] => {
  return useMemo(() => Array.from({ length }, (_, i) => i), [length]);
};

export default useCreateArray;
