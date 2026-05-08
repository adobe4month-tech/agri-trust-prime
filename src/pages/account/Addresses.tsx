import { useEffect, useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

interface Address { id: string; label: string; line: string; city: string; phone: string; isDefault?: boolean; }

export default function AccountAddresses() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [list, setList] = useState<Address[]>([]);
  const [editing, setEditing] = useState<Address | null>(null);

  useEffect(() => { try { setList(JSON.parse(localStorage.getItem("kc-addresses") || "[]")); } catch {} }, []);
  const persist = (l: Address[]) => { setList(l); localStorage.setItem("kc-addresses", JSON.stringify(l)); };

  const save = () => {
    if (!editing || !editing.label || !editing.line || !editing.city) return toast.error(t("Fill all fields", "Fields bharein"));
    const exists = list.find(a => a.id === editing.id);
    persist(exists ? list.map(a => a.id === editing.id ? editing : a) : [...list, editing]);
    setEditing(null);
    toast.success(t("Saved", "Mehfooz"));
  };
  const remove = (id: string) => persist(list.filter(a => a.id !== id));
  const setDefault = (id: string) => persist(list.map(a => ({ ...a, isDefault: a.id === id })));

  return (
    <AccountLayout title={t("Saved Addresses", "Mehfooz Pate")}>
      <div className="space-y-3 mb-4">
        {list.map(a => (
          <div key={a.id} className="premium-card p-4 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2"><p className="font-extrabold">{a.label}</p>{a.isDefault && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">{t("Default", "Default")}</span>}</div>
              <p className="text-sm text-muted-foreground">{a.line}, {a.city}</p>
              <p className="text-xs text-muted-foreground">{a.phone}</p>
            </div>
            <div className="flex flex-col gap-1">
              {!a.isDefault && <Button size="sm" variant="ghost" onClick={() => setDefault(a.id)}><Star className="h-3 w-3" /></Button>}
              <Button size="sm" variant="ghost" onClick={() => setEditing(a)}>{t("Edit", "Edit")}</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(a.id)}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <div className="premium-card p-5 space-y-3 max-w-lg">
          <h3 className="font-extrabold">{editing.id ? t("Edit Address", "Pata Edit") : t("New Address", "Naya Pata")}</h3>
          <div className="space-y-2"><Label>{t("Label", "Label")}</Label><Input placeholder="Home / Farm" value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} /></div>
          <div className="space-y-2"><Label>{t("Address Line", "Pata")}</Label><Input value={editing.line} onChange={e => setEditing({ ...editing, line: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2"><Label>{t("City", "Shehar")}</Label><Input value={editing.city} onChange={e => setEditing({ ...editing, city: e.target.value })} /></div>
            <div className="space-y-2"><Label>{t("Phone", "Phone")}</Label><Input value={editing.phone} onChange={e => setEditing({ ...editing, phone: e.target.value })} /></div>
          </div>
          <div className="flex gap-2">
            <Button variant="hero" onClick={save}>{t("Save", "Mehfooz")}</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>{t("Cancel", "Cancel")}</Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setEditing({ id: crypto.randomUUID(), label: "", line: "", city: "", phone: "" })}><Plus className="h-4 w-4" />{t("Add Address", "Pata Daalein")}</Button>
      )}
    </AccountLayout>
  );
}
