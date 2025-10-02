/**
 * Converts a file size in bytes to a human-readable format.
 *
 * Returns the size in B, KB, or MB depending on the value.
 *
 * @param {number} size - The size of the file in bytes.
 * @returns {string} The formatted file size with units.
 */

export const calculateCVSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
};
