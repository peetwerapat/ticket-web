import { getCookie } from "@/lib/cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const token = getCookie("token");

const handleSSRResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  }

  const text = await res.text();
  throw new Error(text);
};

export const apiSSRGet = async (path: string, query?: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}${path}${query ? `?${query}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return handleSSRResponse(res);
  } catch (error) {
    console.log(error);
  }
};
