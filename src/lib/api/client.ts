/**
 * Lightweight typed fetch wrapper.
 * - Reads VITE_API_BASE_URL at build time.
 * - Attaches Bearer token from localStorage("kc-auth-token") if present.
 * - Throws ApiError on non-2xx with parsed JSON body when available.
 */

export const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") || "";
export const USE_MOCK = !API_BASE;

const TOKEN_KEY = "kc-auth-token";

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (t: string | null) => t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

type Options = Omit<RequestInit, "body"> & { body?: unknown; query?: Record<string, string | number | boolean | undefined> };

export async function api<T = unknown>(path: string, opts: Options = {}): Promise<T> {
  if (USE_MOCK) throw new ApiError(0, "API_BASE not configured (running in mock mode)");

  const url = new URL(API_BASE + path);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }

  const headers = new Headers(opts.headers);
  if (!(opts.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const token = auth.getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(url.toString(), {
    ...opts,
    headers,
    body: opts.body instanceof FormData ? opts.body : opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    credentials: "include",
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const msg = (data && typeof data === "object" && "message" in data && (data as any).message) || res.statusText;
    throw new ApiError(res.status, String(msg), data);
  }
  return data as T;
}

/** Helper: try real api, fall back to mock implementation if USE_MOCK or network error. */
export async function withMock<T>(real: () => Promise<T>, mock: () => T | Promise<T>): Promise<T> {
  if (USE_MOCK) return mock();
  try { return await real(); } catch (e) {
    if (e instanceof ApiError && e.status === 0) return mock();
    throw e;
  }
}
