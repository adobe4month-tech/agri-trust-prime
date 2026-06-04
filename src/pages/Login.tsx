import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";
import { useLogin, useSession } from "@/hooks/api";
import { defaultLandingFor } from "@/lib/api/mockAuth";
import SEOHead from "@/components/SEOHead";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as any)?.from as string | undefined;
  const login = useLogin();
  const { data: user } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => { if (user) navigate(redirectTo || defaultLandingFor(user.role), { replace: true }); }, [user, navigate, redirectTo]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login.mutateAsync({ email, password });
      toast.success("Signed in!");
      navigate(redirectTo || defaultLandingFor(res.user.role));
    } catch (err) {
      toast.error((err as Error).message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Sign In - KissanCares" description="Sign in to your KissanCares account" canonical="https://kissancares.com/login" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0 container py-10 flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center mx-auto mb-3"><User className="h-7 w-7 text-primary" /></div>
            <h1 className="text-2xl font-extrabold">Sign In</h1>
            <p className="text-sm text-muted-foreground">Access your KissanCares account</p>
          </div>

          <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2 text-xs mb-4">
            <div className="flex items-start gap-2">
              <Info className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
              <div className="space-y-0.5">
                <p className="font-bold text-primary">Demo accounts:</p>
                <p>Buyer: <span className="font-mono">user@test.com</span> / <span className="font-mono">user123</span></p>
                <p>Seller: <span className="font-mono">seller@test.com</span> / <span className="font-mono">seller123</span></p>
                <p>Admin: <span className="font-mono">admin@test.com</span> / <span className="font-mono">admin123</span></p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="premium-card p-6 space-y-4">
            <div>
              <Label className="text-sm font-semibold">Email</Label>
              <Input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-semibold">Password</Label>
              <Input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={login.isPending}>
              {login.isPending ? "Signing in…" : "Sign In"} <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Seller? <Link to="/seller-login" className="text-primary font-semibold hover:underline">Seller login</Link> · Admin? <Link to="/admin-login" className="text-primary font-semibold hover:underline">Admin login</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
