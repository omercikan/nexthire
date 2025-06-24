import axios from "axios";

/**
 * Hook to set cookie via API.
 * @returns An object with `setCookie` method to save a cookie by key and token.
 */

const useCookieSetter = () => {
  const setCookie = async (
    key: string,
    token: string
  ): Promise<{ message: string; status: number }> => {
    try {
      const res = await axios.post("/api/auth/session", { key, token });
      return res.data;
    } catch (error) {
      console.error("Cookie setting failed:", error);
      throw error;
    }
  };

  return { setCookie };
};

export default useCookieSetter;
