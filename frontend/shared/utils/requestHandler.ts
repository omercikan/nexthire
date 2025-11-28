import toast from "react-hot-toast";

/**
 * A universal asynchronous request handler.
 *
 * Executes the provided API function. If an error occurs,
 * it displays an error message using react-hot-toast.
 *
 * @async
 * @function requestHandler
 * @param {() => Promise<any>} apiFN - The async API function to be executed.
 * @param {string} errorMessage - The default error message to display if no message is returned from the API.
 * @returns {Promise<any | void>} Returns the API response or void if an error occurs.
 *
 * @example
 * await requestHandler(() => api.getUser(), "Failed to fetch user data");
 */

export const requestHandler = async (
  apiFN: () => Promise<void>,
  errorMessage: string
) => {
  try {
    const response = await apiFN();
    return response;
  } catch (err) {
    const error = err as { data: { message: string } } & { data: string };
    toast.error((error.data.message ?? error.data) || errorMessage);
  }
};
