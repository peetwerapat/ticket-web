"use client";

import { getCookie } from "@/lib/cookie";
import { useGlobalStore } from "@/store/globalStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const token = getCookie("token");

const handleResponse = async (res: any) => {
  try {
    const contentType = res.headers.get("content-type");
    let json;

    if (contentType && contentType.includes("application/json")) {
      json = await res.json();
    } else {
      const text = await res.text();
      throw new Error(text);
    }

    return json;
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const apiGet = async (path: string, query?: string) => {
  try {
    useGlobalStore.getState().setLoading(true);

    const res = await fetch(
      `${API_BASE_URL as string}${path}${query ? `?${query}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.log("error :", error);
  } finally {
    useGlobalStore.getState().setLoading(false);
  }
};

export const apiGetNoLoading = async (path: string, query?: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL as string}${path}${query ? `?${query}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.log("error :", error);
  }
};

export const apiPost = async (path: string, payload?: any) => {
  try {
    useGlobalStore.getState().setLoading(true);

    let body;

    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };

    if (payload instanceof FormData) {
      body = payload;
    } else {
      body = JSON.stringify(payload);
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE_URL as string}${path}`, {
      body,
      method: "POST",
      headers,
    });

    const json = await res.json();

    return json;
  } catch (error) {
    console.log("error :", error);
    throw new Error(JSON.stringify(error, null, 2));
  } finally {
    useGlobalStore.getState().setLoading(false);
  }
};

export const apiPut = async (path: string, payload?: any) => {
  try {
    useGlobalStore.getState().setLoading(true);

    let body;

    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };

    if (payload instanceof FormData) {
      body = payload;
    } else {
      body = JSON.stringify(payload);
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE_URL as string}${path}`, {
      body,
      method: "PUT",
      headers,
    });

    const json = await res.json();

    return json;
  } catch (error) {
    console.log("error :", error);
    throw new Error(JSON.stringify(error, null, 2));
  } finally {
    useGlobalStore.getState().setLoading(false);
  }
};

export const apiPatch = async (
  path: string,
  payload?: any,
  otherToken?: string
) => {
  try {
    useGlobalStore.getState().setLoading(true);

    let body: BodyInit | null = null;

    const headers: HeadersInit = {
      Authorization: otherToken ? `Bearer ${otherToken}` : `Bearer ${token}`,
    };

    if (payload) {
      if (payload instanceof FormData) {
        body = payload;
      } else {
        body = JSON.stringify(payload);
        headers["Content-Type"] = "application/json";
      }
    }

    const res = await fetch(`${API_BASE_URL as string}${path}`, {
      body,
      method: "PATCH",
      headers,
    });

    const json = await res.json();

    return json;
  } catch (error) {
    console.log("Error in apiPatch:", error);
    throw new Error(JSON.stringify(error, null, 2));
  } finally {
    useGlobalStore.getState().setLoading(false);
  }
};

export const apiDelete = async (path: string) => {
  try {
    useGlobalStore.getState().setLoading(true);

    const res = await fetch(`${API_BASE_URL as string}${path}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();

    return json;
  } catch (error) {
    console.log("error :", error);
    throw new Error(JSON.stringify(error, null, 2));
  } finally {
    useGlobalStore.getState().setLoading(false);
  }
};
