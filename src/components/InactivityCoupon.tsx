import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tag, X, Copy } from "lucide-react";
import { toast } from "sonner";

export default function InactivityCoupon() {
  const [show, setShow] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const shown = sessionStorage.getItem("kc-coupon-shown");
    if (shown) return;

    let timeout: NodeJS.Timeout;
    const reset = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        sessionStorage.setItem("kc-coupon-shown", "1");
        setShow(true);
      }, 30000);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      clearTimeout(timeout);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("KISSAN5");
    toast.success(language === "ru" ? "Code copy ho gaya!" : "Code copied!");
  };

  if (!show) return null;

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary to-accent p-6 text-center">
          <Tag className="h-10 w-10 text-primary-foreground mx-auto mb-3" />
          <h2 className="text-xl font-extrabold text-primary-foreground mb-1">
            {language === "ru" ? "Ruko! 🎉" : "Wait! 🎉"}
          </h2>
          <p className="text-sm text-primary-foreground/80">
            {language === "ru" ? "Yeh 5% discount lo — sirf aapke liye!" : "Get 5% off — just for you!"}
          </p>
        </div>
        <div className="p-6 text-center">
          <div className="bg-secondary rounded-xl p-4 mb-4 flex items-center justify-center gap-3">
            <span className="text-2xl font-extrabold tracking-widest text-foreground">KISSAN5</span>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            {language === "ru" ? "Checkout par yeh code use karein" : "Use this code at checkout"}
          </p>
          <Button variant="hero" className="w-full" onClick={() => setShow(false)}>
            {language === "ru" ? "Shopping Jari Rakhein" : "Continue Shopping"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
