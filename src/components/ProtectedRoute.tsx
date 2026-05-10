import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "@/hooks/api";
import { ReactNode } from "react";

/**
 * Wrap any route that requires login.
 *   <Route path="/account" element={<ProtectedRoute><AccountProfile/></ProtectedRoute>} />
 * Redirects to /seller-login (used as the universal login screen) when there is no session.
 */
export default function ProtectedRoute({ children, role }: { children: ReactNode; role?: "customer" | "seller" | "admin" }) {
  const { data: user, isLoading } = useSession();
  const location = useLocation();

  if (isLoading) return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/seller-login" replace state={{ from: location.pathname }} />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
}
