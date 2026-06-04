import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";
import { useLogin, useSession } from "@/hooks/api";
import SEOHead from "@/components/SEOHead";

export default function AdminLogin() {
  const navigate = useNavigate();
  const login = useLogin();
  const { data: user } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => { if (user?.role === "admin") navigate("/admin", { replace: true }); }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login.mutateAsync({ email, password });
      if (res.user.role !== "admin") { toast.error("This account is not an admin"); return; }
      toast.success("Welcome back, admin");
      navigate("/admin");
    } catch (err) {
      toast.error((err as Error).message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-secondary/30 px-4">
      <SEOHead title="Admin Login - KissanCares" description="Admin sign in" canonical="https://kissancares.com/admin-login" />
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center mx-auto mb-3"><Shield className="h-7 w-7 text-primary" /></div>
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage KissanCares</p>
        </div>

        <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2 text-xs mb-4">
          <div className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
            <div>
              <p className="font-bold text-primary mb-1">Demo admin account</p>
              <p>Email: <span className="font-mono">admin@test.com</span></p>
              <p>Password: <span className="font-mono">admin123</span></p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="premium-card p-6 space-y-4">
          <div>
            <Label className="text-sm font-semibold">Email</Label>
            <Input type="email" required placeholder="admin@kissancares.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label className="text-sm font-semibold">Password</Label>
            <Input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={login.isPending}>
            {login.isPending ? "Signing in…" : "Sign In"} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
