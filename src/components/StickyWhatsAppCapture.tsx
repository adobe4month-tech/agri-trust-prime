import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, X } from "lucide-react";

export default function StickyWhatsAppCapture() {
  const { language } = useLanguage();
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 lg:hidden">
      <div className="mx-3 bg-gradient-to-r from-primary to-trust-green text-primary-foreground rounded-xl shadow-lg flex items-center gap-2 px-3 py-2">
        <MessageCircle className="h-4 w-4 shrink-0" />
        <a href="https://wa.me/923240287276?text=Salaam,%20mujhe%20personalized%20crop%20advice%20chahiye" target="_blank" rel="noreferrer" className="text-[11px] font-bold flex-1">
          {language === "ru" ? "Apni fasal ki personalized advice WhatsApp par lein →" : "Get personalized crop advice on WhatsApp →"}
        </a>
        <button onClick={() => setHidden(true)}><X className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}
