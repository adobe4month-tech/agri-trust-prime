import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function VoiceSearchButton({ onResult }: { onResult: (q: string) => void }) {
  const { language } = useLanguage();
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
  }, []);

  const start = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = language === "ru" ? "ur-PK" : "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => { onResult(e.results[0][0].transcript); setListening(false); };
    rec.onerror = () => { setListening(false); toast.error(language === "ru" ? "Sun nahi paaya" : "Couldn't hear"); };
    rec.onend = () => setListening(false);
    rec.start();
    recRef.current = rec;
    setListening(true);
  };

  const stop = () => { recRef.current?.stop(); setListening(false); };

  if (!supported) return null;
  return (
    <button type="button" onClick={listening ? stop : start} className={`p-1.5 rounded-lg transition-colors ${listening ? "bg-sale/10 text-sale animate-pulse" : "text-muted-foreground hover:text-primary hover:bg-secondary"}`} aria-label="Voice search">
      {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </button>
  );
}
