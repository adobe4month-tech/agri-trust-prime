import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X, Sprout } from "lucide-react";

interface Msg { id: string; from: "user" | "bot"; text: string; }

const cannedReplies = [
  { match: /(spray|dawa|pesticide)/i, en: "Spray early morning or evening. Mix with 100L water per acre. Avoid windy days.", ru: "Subah jaldi ya shaam ko spray karein. Per acre 100L paani mein milayein. Hawa wala din na chunein." },
  { match: /(rice|chawal|paddy)/i, en: "For rice: use Spectar 20EC for weed control & Acubar 30WP for ghora grass.", ru: "Chawal: jari booti ke liye Spectar 20EC, ghora grass ke liye Acubar 30WP." },
  { match: /(wheat|gandum)/i, en: "Wheat needs Urea + DAP at sowing, plus 2nd Urea dose at tillering stage.", ru: "Gandum mein Urea + DAP boai par, doosri dose tillering par dein." },
  { match: /(cotton|kapas)/i, en: "Cotton: monitor for whitefly & pink bollworm. Use Lambda 2.5EC for control.", ru: "Kapas mein safed makkhi aur pink bollworm dekhein. Lambda 2.5EC istemal karein." },
];

export default function AgronomistChat() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "1", from: "bot", text: language === "ru" ? "Salaam! Main aapka virtual agronomist hoon. Sawal poochein." : "Hi! I'm your virtual agronomist. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), from: "user", text: input };
    setMsgs(m => [...m, userMsg]);
    const q = input; setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = cannedReplies.find(r => r.match.test(q));
      const text = reply ? (language === "ru" ? reply.ru : reply.en)
        : (language === "ru" ? "Achha sawal! Tafseeli madad ke liye WhatsApp par hamare maahir se baat karein." : "Great question! For detailed help, chat with our human agronomist on WhatsApp.");
      setMsgs(m => [...m, { id: crypto.randomUUID(), from: "bot", text }]);
      setTyping(false);
    }, 900);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-32 right-4 z-30 bg-card border border-border rounded-full shadow-lg pl-3 pr-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform">
        <div className="relative">
          <Sprout className="h-5 w-5 text-primary" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
        </div>
        <span className="text-xs font-bold">{language === "ru" ? "Maahir" : "Agronomist"}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col" style={{ height: 460 }}>
      <div className="flex items-center justify-between p-3 border-b border-border bg-primary/5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="relative"><Sprout className="h-5 w-5 text-primary" /><span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" /></div>
          <div>
            <p className="text-sm font-extrabold">{language === "ru" ? "Maahir Chat" : "Agronomist Chat"}</p>
            <p className="text-[10px] text-primary font-semibold">● {language === "ru" ? "Online" : "Online"}</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {msgs.map(m => (
          <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${m.from === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>{m.text}</div>
          </div>
        ))}
        {typing && <div className="flex justify-start"><div className="bg-secondary rounded-2xl px-3 py-2 text-xs"><span className="inline-flex gap-1"><span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" /><span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} /><span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} /></span></div></div>}
        <div ref={endRef} />
      </div>
      <div className="p-2 border-t border-border space-y-2">
        <Button asChild size="sm" variant="whatsapp" className="w-full text-[11px] h-8">
          <a href="https://wa.me/923240287276" target="_blank" rel="noreferrer"><MessageCircle className="h-3 w-3" />{language === "ru" ? "Asli Maahir Se Baat" : "Real Agronomist on WhatsApp"}</a>
        </Button>
        <form onSubmit={e => { e.preventDefault(); send(); }} className="flex gap-1">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder={language === "ru" ? "Sawal likhein..." : "Type a question..."} className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary" maxLength={200} />
          <Button type="submit" size="icon" className="h-8 w-8"><Send className="h-3.5 w-3.5" /></Button>
        </form>
      </div>
    </div>
  );
}
