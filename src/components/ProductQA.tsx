import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

const QA = [
  { q: "Is this product safe for cotton at flowering stage?", qUrdu: "Cotton ki phool wali stage par mehfooz hai?", a: "Yes, fully safe when applied at recommended dosage. Avoid spraying during peak heat hours.", aUrdu: "Ji haan, recommended dosage par bilkul mehfooz hai. Garmi mein spray na karein." },
  { q: "What is the rain-fastness time?", qUrdu: "Barish se pehle kitna waqt chahiye?", a: "2 hours. After this, rain will not affect efficacy.", aUrdu: "2 ghante. Uske baad barish se asar nahi hota." },
  { q: "Can I mix this with urea for combined application?", qUrdu: "Urea ke saath mix karkay daal sakte hain?", a: "Not recommended. Apply separately with a 7-day gap for best absorption.", aUrdu: "Mix na karein. 7 din ke faasle se daalein." },
];

export default function ProductQA() {
  const { language } = useLanguage();
  const [q, setQ] = useState("");
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (q.trim()) { toast.success(t("Question submitted! Our agronomist will reply within 24h.", "Sawaal mil gaya! 24 ghante mein jawab milega.")); setQ(""); } };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />{t("Questions & Answers", "Sawalat o Jawabat")}</h3>
      <div className="space-y-3">
        {QA.map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <p className="font-semibold text-foreground text-sm mb-2">Q: {language === "ru" ? item.qUrdu : item.q}</p>
            <p className="text-sm text-muted-foreground">A: {language === "ru" ? item.aUrdu : item.a}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <Input placeholder={t("Ask our agronomist...", "Agronomist se poochein...")} value={q} onChange={e => setQ(e.target.value)} />
        <Button type="submit" variant="hero">{t("Ask", "Poochein")}</Button>
      </form>
    </div>
  );
}
