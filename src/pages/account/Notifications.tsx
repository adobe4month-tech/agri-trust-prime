import { useEffect, useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, MessageCircle, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";

const mockInbox = [
  { id: 1, title_en: "Order KC-2847 shipped", title_ru: "Order KC-2847 bhej diya", time: "2h ago", unread: true },
  { id: 2, title_en: "Kissan Coins: +14 earned", title_ru: "Kissan Coins: +14 mile", time: "1d ago", unread: false },
  { id: 3, title_en: "Wheat sowing season starts soon", title_ru: "Gandum boai ka mausam", time: "3d ago", unread: false },
];

const channels: { key: string; icon: any; label_en: string; label_ru: string }[] = [
  { key: "whatsapp", icon: MessageCircle, label_en: "WhatsApp", label_ru: "WhatsApp" },
  { key: "sms", icon: Smartphone, label_en: "SMS", label_ru: "SMS" },
  { key: "email", icon: Mail, label_en: "Email", label_ru: "Email" },
];

const categories = [
  { key: "orders", en: "Order updates", ru: "Order updates" },
  { key: "promos", en: "Deals & promos", ru: "Deals aur offers" },
  { key: "tips", en: "Crop tips", ru: "Fasal tips" },
  { key: "loyalty", en: "Coins & rewards", ru: "Coins aur rewards" },
];

export default function AccountNotifications() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});

  useEffect(() => { try { setPrefs(JSON.parse(localStorage.getItem("kc-notif-prefs") || "{}")); } catch {} }, []);
  const setPref = (k: string, v: boolean) => { const p = { ...prefs, [k]: v }; setPrefs(p); localStorage.setItem("kc-notif-prefs", JSON.stringify(p)); };

  return (
    <AccountLayout title={t("Notifications", "Notifications")}>
      <div className="premium-card p-5 mb-6 max-w-2xl">
        <h3 className="font-extrabold mb-3">{t("Preferences", "Preferences")}</h3>
        <table className="w-full text-sm">
          <thead><tr><th className="text-left text-xs text-muted-foreground font-bold pb-2">{t("Category", "Category")}</th>
            {channels.map(c => <th key={c.key} className="text-center text-xs text-muted-foreground font-bold pb-2">{language === "ru" ? c.label_ru : c.label_en}</th>)}
          </tr></thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.key} className="border-t border-border">
                <td className="py-2 text-sm font-semibold">{language === "ru" ? cat.ru : cat.en}</td>
                {channels.map(ch => {
                  const k = `${cat.key}.${ch.key}`;
                  return <td key={ch.key} className="text-center"><Switch checked={!!prefs[k]} onCheckedChange={v => setPref(k, v)} /></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-extrabold mb-3 flex items-center gap-2"><Bell className="h-4 w-4" />{t("Inbox", "Inbox")}</h3>
      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {mockInbox.map(m => (
          <div key={m.id} className={`flex items-center justify-between px-4 py-3 ${m.unread ? "bg-primary/5" : ""}`}>
            <div className="flex items-center gap-2">
              {m.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
              <p className="text-sm font-semibold">{language === "ru" ? m.title_ru : m.title_en}</p>
            </div>
            <p className="text-xs text-muted-foreground">{m.time}</p>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
