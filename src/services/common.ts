import { axiosInstance } from "@/lib/axios";

export const apiGet = async (path: string, query?: string) => {
  const res = await axiosInstance.get(`${path}${query ? `?${query}` : ""}`);
  return res.data;
};

export const apiPost = async (path: string, body: unknown) => {
  const res = await axiosInstance.post(path, body);
  return res.data;
};

export const apiPatch = async (path: string, body: unknown) => {
  const res = await axiosInstance.patch(path, body);
  return res.data;
};

export const apiDelete = async (path: string) => {
  const res = await axiosInstance.delete(path);
  return res.data;
};
