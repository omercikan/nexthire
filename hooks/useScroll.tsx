/**
 * Custom hook that provides a scroll function based on screen width.
 *
 * @returns An object containing the `applyScroll` function which scrolls to different positions
 *          depending on whether the screen width is smaller or larger than the given breakpoint.
 */
const useScroll = () => {
  /**
   * Scrolls the page vertically to a specified position depending on the screen width.
   *
   * @param breakpoint - The screen width breakpoint to determine which scroll position to use.
   * @param smallTop - The scroll position (in pixels) for screens smaller than or equal to the breakpoint.
   * @param largeTop - The scroll position (in pixels) for screens larger than the breakpoint.
   */
  const applyScroll = (
    breakpoint: number,
    smallTop: number,
    largeTop: number
  ) => {
    if (window.innerWidth <= breakpoint) {
      window.scrollTo({ top: smallTop });
    } else {
      window.scrollTo({ top: largeTop });
    }
  };

  return { applyScroll };
};

export default useScroll;
