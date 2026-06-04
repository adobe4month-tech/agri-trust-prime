/**
 * Demo / mock authentication used when VITE_API_BASE_URL is not set.
 * Three seeded accounts cover the three role-based portals.
 * When a real PHP backend is attached, AuthApi automatically switches
 * to the real endpoints via the `withMock` helper in client.ts.
 */
import type { AuthResponse, SessionUser } from "./types";
import { auth } from "./client";

export const DEMO_ACCOUNTS: Array<{ email: string; password: string; user: SessionUser }> = [
  {
    email: "user@test.com",
    password: "user123",
    user: { id: "u_demo_user", phone: "03001112233", name: "Demo Buyer", role: "customer" },
  },
  {
    email: "seller@test.com",
    password: "seller123",
    user: { id: "u_demo_seller", phone: "03002223344", name: "Demo Seller", role: "seller" },
  },
  {
    email: "admin@test.com",
    password: "admin123",
    user: { id: "u_demo_admin", phone: "03003334455", name: "Demo Admin", role: "admin" },
  },
];

const SESSION_KEY = "kc-auth-user";

export function mockLogin(email: string, password: string): AuthResponse {
  const match = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
  );
  if (!match) throw new Error("Invalid email or password");
  const token = "mock." + btoa(match.email) + "." + Date.now();
  auth.setToken(token);
  localStorage.setItem(SESSION_KEY, JSON.stringify(match.user));
  return { token, user: match.user };
}

export function mockGetSession(): SessionUser {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) throw new Error("Not authenticated");
  return JSON.parse(raw) as SessionUser;
}

export function mockLogout(): void {
  auth.setToken(null);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("kc-user-phone");
  localStorage.removeItem("kc-seller");
}

/** Helper for redirect after login based on role. */
export function defaultLandingFor(role: SessionUser["role"]): string {
  if (role === "admin") return "/admin";
  if (role === "seller") return "/seller";
  return "/account";
}
