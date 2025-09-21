import { axiosInstance } from "@/lib/axios";

export const apiGet = async <TRes>(
  path: string,
  query?: string
): Promise<TRes> => {
  const res = await axiosInstance.get<TRes>(
    `${path}${query ? `?${query}` : ""}`
  );
  return res.data;
};

export const apiPost = async <TRes, TReq>(
  path: string,
  body: TReq
): Promise<TRes> => {
  const res = await axiosInstance.post<TRes>(path, body);
  return res.data;
};

export const apiPatch = async <TRes, TReq>(
  path: string,
  body: TReq
): Promise<TRes> => {
  const res = await axiosInstance.patch<TRes>(path, body);
  return res.data;
};

export const apiDelete = async <TRes>(path: string): Promise<TRes> => {
  const res = await axiosInstance.delete<TRes>(path);
  return res.data;
};
