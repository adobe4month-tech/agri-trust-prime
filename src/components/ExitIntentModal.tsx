import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Gift } from "lucide-react";
import { toast } from "sonner";

export default function ExitIntentModal() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("kc-exit-shown")) return;
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem("kc-exit-shown", "1");
      setOpen(true);
    };
    const onMouseLeave = (e: MouseEvent) => { if (e.clientY < 10) trigger(); };
    let lastY = window.scrollY;
    const onScroll = () => {
      if (lastY - window.scrollY > 80 && window.innerWidth < 768) trigger();
      lastY = window.scrollY;
    };
    document.addEventListener("mouseout", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { document.removeEventListener("mouseout", onMouseLeave); window.removeEventListener("scroll", onScroll); };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) { toast.error(language === "ru" ? "Sahi phone likhein" : "Enter a valid phone"); return; }
    localStorage.setItem("kc-lead-phone", phone);
    toast.success(language === "ru" ? "Mubarak! PDF WhatsApp par ja rahi hai." : "Done! PDF on its way to your WhatsApp.");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <div className="text-center space-y-4 py-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center"><Gift className="h-7 w-7 text-primary" /></div>
          <h2 className="text-xl font-extrabold">{language === "ru" ? "Ruko! Muft Crop Calendar Lein" : "Wait! Get Free Crop Calendar"}</h2>
          <p className="text-sm text-muted-foreground">{language === "ru" ? "Phone number dein, hum Kharif/Rabi calendar PDF WhatsApp par bhejenge." : "Enter your phone, we'll send the Kharif/Rabi calendar PDF on WhatsApp."}</p>
          <form onSubmit={submit} className="flex gap-2">
            <Input type="tel" placeholder="03XX-XXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} maxLength={15} />
            <Button type="submit" variant="hero">{language === "ru" ? "Bhejein" : "Send"}</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
