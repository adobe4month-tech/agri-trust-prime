import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Clock, Tag, Sprout, Bug } from "lucide-react";
import { Input } from "@/components/ui/input";
import { products, brands } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceSearchButton from "@/components/VoiceSearchButton";

export default function SearchAutocomplete({ onClose }: { onClose?: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem("kc-recent-search") || "[]")); } catch {}
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const matches = useMemo(() => {
    if (!q.trim()) return { products: [], categories: [], brands: [], crops: [] };
    const lower = q.toLowerCase();
    return {
      products: products.filter(p => p.name.toLowerCase().includes(lower) || p.nameUrdu.toLowerCase().includes(lower)).slice(0, 5),
      categories: ["pesticide", "fertilizer", "herbicide", "seed", "machinery"].filter(c => c.includes(lower)).slice(0, 3),
      brands: brands.filter(b => b.toLowerCase().includes(lower)).slice(0, 3),
      crops: Array.from(new Set(products.flatMap(p => p.targetCrops || []))).filter(c => c.toLowerCase().includes(lower)).slice(0, 3),
    };
  }, [q]);

  const submit = (term?: string) => {
    const t = (term ?? q).trim();
    if (!t) return;
    const next = [t, ...recent.filter(r => r !== t)].slice(0, 6);
    setRecent(next);
    localStorage.setItem("kc-recent-search", JSON.stringify(next));
    navigate(`/search?q=${encodeURIComponent(t)}`);
    setOpen(false); setQ(""); onClose?.();
  };

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={e => { e.preventDefault(); submit(); }} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onFocus={() => setOpen(true)}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          placeholder={language === "ru" ? "Beej, dawa, khaad talaash karein..." : "Search seeds, pesticides, fertilizers..."}
          className="pl-11 pr-12 h-11 bg-secondary/60 border border-border rounded-xl text-sm"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <VoiceSearchButton onResult={submit} />
        </div>
      </form>

      {open && (q.trim() || recent.length > 0) && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-xl z-50 max-h-[60vh] overflow-y-auto">
          {!q.trim() && recent.length > 0 && (
            <div className="p-3">
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider px-2 mb-1">{language === "ru" ? "Halia Talaash" : "Recent Searches"}</p>
              {recent.map(r => (
                <button key={r} onClick={() => submit(r)} className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-secondary rounded-lg">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />{r}
                </button>
              ))}
            </div>
          )}
          {q.trim() && (
            <>
              {matches.products.length > 0 && (
                <Section label={language === "ru" ? "Products" : "Products"}>
                  {matches.products.map(p => (
                    <Link key={p.id} to={`/product/${p.slug}`} onClick={() => { setOpen(false); onClose?.(); }} className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg">
                      <img src={p.image} alt="" className="w-9 h-9 object-contain rounded bg-secondary/40 p-1" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{language === "ru" ? p.nameUrdu : p.name}</p>
                        <p className="text-[11px] text-muted-foreground">{p.brand} · Rs.{p.price}</p>
                      </div>
                    </Link>
                  ))}
                </Section>
              )}
              {matches.categories.length > 0 && (
                <Section label={language === "ru" ? "Iqsaam" : "Categories"}>
                  {matches.categories.map(c => (
                    <Link key={c} to={`/products?category=${c}`} onClick={() => { setOpen(false); onClose?.(); }} className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg text-sm">
                      <Tag className="h-3.5 w-3.5 text-primary" /><span className="capitalize">{c}</span>
                    </Link>
                  ))}
                </Section>
              )}
              {matches.brands.length > 0 && (
                <Section label="Brands">
                  {matches.brands.map(b => (
                    <Link key={b} to={`/products?brand=${encodeURIComponent(b)}`} onClick={() => { setOpen(false); onClose?.(); }} className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg text-sm">
                      <Bug className="h-3.5 w-3.5 text-primary" />{b}
                    </Link>
                  ))}
                </Section>
              )}
              {matches.crops.length > 0 && (
                <Section label={language === "ru" ? "Fasal" : "Crops"}>
                  {matches.crops.map(c => (
                    <Link key={c} to={`/products?crop=${encodeURIComponent(c)}`} onClick={() => { setOpen(false); onClose?.(); }} className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg text-sm">
                      <Sprout className="h-3.5 w-3.5 text-primary" />{c}
                    </Link>
                  ))}
                </Section>
              )}
              {matches.products.length === 0 && matches.categories.length === 0 && matches.brands.length === 0 && matches.crops.length === 0 && (
                <p className="p-6 text-center text-sm text-muted-foreground">{language === "ru" ? "Kuch nahi mila" : "No matches"}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-2 border-b border-border last:border-0">
      <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider px-2 mb-1">{label}</p>
      {children}
    </div>
  );
}
