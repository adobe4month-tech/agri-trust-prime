import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Lock, ArrowRight, MessageCircle, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLogin } from "@/hooks/api";
import { defaultLandingFor } from "@/lib/api/mockAuth";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectTo?: string;
}

export default function AuthModal({ open, onOpenChange, redirectTo }: AuthModalProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login.mutateAsync({ email, password });
      toast.success(language === "ru" ? "Login kaamyab!" : "Logged in successfully");
      onOpenChange(false);
      navigate(redirectTo || defaultLandingFor(res.user.role));
    } catch (err) {
      toast.error((err as Error).message || (language === "ru" ? "Galat email ya password" : "Invalid email or password"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">
            {language === "ru" ? "Login" : "Sign In"}
          </DialogTitle>
        </DialogHeader>

        <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2 text-xs text-foreground/80">
          <div className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
            <div className="space-y-0.5">
              <p className="font-bold text-primary">{language === "ru" ? "Demo accounts:" : "Demo accounts:"}</p>
              <p>Buyer: <span className="font-mono">user@test.com</span> / <span className="font-mono">user123</span></p>
              <p>Seller: <span className="font-mono">seller@test.com</span> / <span className="font-mono">seller123</span></p>
              <p>Admin: <span className="font-mono">admin@test.com</span> / <span className="font-mono">admin123</span></p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-foreground text-sm font-semibold">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div>
            <Label className="text-foreground text-sm font-semibold">{language === "ru" ? "Password" : "Password"}</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" />
            </div>
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={login.isPending}>
            {login.isPending ? (language === "ru" ? "Login ho raha hai…" : "Signing in…") : (language === "ru" ? "Login" : "Sign In")} <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="relative text-center">
            <span className="text-xs text-muted-foreground bg-card px-3 relative z-10">{language === "ru" ? "ya" : "or"}</span>
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          </div>
          <Button asChild variant="whatsapp" className="w-full">
            <a href="https://wa.me/923240287276?text=Hi, I want to create my account" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              {language === "ru" ? "WhatsApp Par Madad" : "Need help? WhatsApp us"}
            </a>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
