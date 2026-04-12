import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error(language === "ru" ? "Sahi phone number daalein" : "Enter a valid phone number");
      return;
    }
    setStep("otp");
    toast.success(language === "ru" ? "OTP bhej diya gaya" : "OTP sent successfully");
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(language === "ru" ? "Login backend se connect hoga — jald aata hai!" : "Login will connect to backend — coming soon!");
    onOpenChange(false);
    setStep("phone");
    setPhone("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">
            {language === "ru" ? "Login / Signup" : "Login / Sign Up"}
          </DialogTitle>
        </DialogHeader>

        {step === "phone" ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <Label className="text-foreground text-sm font-semibold">
                {language === "ru" ? "Phone Number" : "Phone Number"}
              </Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="03XX-XXXXXXX"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="pl-10"
                  maxLength={12}
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {language === "ru" ? "Hum aapko OTP bhejenge" : "We'll send you an OTP to verify"}
              </p>
            </div>
            <Button type="submit" variant="hero" className="w-full">
              {language === "ru" ? "OTP Bhejein" : "Send OTP"} <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="relative text-center">
              <span className="text-xs text-muted-foreground bg-card px-3 relative z-10">
                {language === "ru" ? "ya" : "or"}
              </span>
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            </div>
            <Button asChild variant="whatsapp" className="w-full">
              <a href="https://wa.me/923240287276?text=Hi, I want to create my account" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                {language === "ru" ? "WhatsApp Se Login" : "Login via WhatsApp"}
              </a>
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              {language === "ru" ? `OTP bheja gaya: ${phone}` : `OTP sent to ${phone}`}
            </p>
            <Input type="text" placeholder="_ _ _ _ _ _" className="text-center text-lg tracking-[0.5em] font-bold" maxLength={6} />
            <Button type="submit" variant="hero" className="w-full">
              {language === "ru" ? "Tasdeeq Karein" : "Verify OTP"} <ArrowRight className="h-4 w-4" />
            </Button>
            <button type="button" onClick={() => setStep("phone")} className="text-xs text-primary hover:underline w-full text-center">
              {language === "ru" ? "Number badlein" : "Change number"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
