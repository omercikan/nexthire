import axios, { AxiosRequestConfig } from "axios";

export const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<{ data: T }> => {
  const response = await axios.get<T>(url, config);
  return { data: response.data };
};
