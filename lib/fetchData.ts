import axios from "axios";

export const fetchData = async <T = any>(url: string): Promise<{ data: T }> => {
  const response = await axios.get<T>(url);
  return { data: response.data };
};
