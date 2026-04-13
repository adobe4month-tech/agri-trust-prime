import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GuaranteeBadgeProps {
  variant?: "compact" | "full";
}

export default function GuaranteeBadge({ variant = "compact" }: GuaranteeBadgeProps) {
  const { language } = useLanguage();

  if (variant === "full") {
    return (
      <div className="flex items-center gap-3 bg-primary/5 border border-primary/15 rounded-xl px-4 py-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-extrabold text-primary">
            {language === "ru" ? "100% Asli Ya Paisa Wapas" : "100% Original or Money Back"}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {language === "ru" ? "Har product verified aur batch checked hai" : "Every product is verified & batch checked"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/8 border border-primary/15 rounded-md px-1.5 py-0.5">
      <ShieldCheck className="h-3 w-3" />
      {language === "ru" ? "Asli" : "Original"}
    </span>
  );
}
