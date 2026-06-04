import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminSettings, useSaveAdminSettings } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { AdminSettings as S } from "@/lib/api/types";

export default function AdminSettingsPage() {
  const { data } = useAdminSettings();
  const save = useSaveAdminSettings();
  const [s, setS] = useState<S | null>(null);

  useEffect(() => { if (data) setS(data); }, [data]);
  if (!s) return <AdminLayout title="Settings">Loading…</AdminLayout>;

  const submit = async () => { await save.mutateAsync(s); toast.success("Settings saved"); };

  return (
    <AdminLayout title="Settings" subtitle="Site configuration, payments, shipping, SEO">
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
        <div className="premium-card p-4 space-y-3">
          <h2 className="font-extrabold">Site info</h2>
          <div><Label>Site name</Label><Input value={s.siteName} onChange={e => setS({ ...s, siteName: e.target.value })} /></div>
          <div><Label>WhatsApp number</Label><Input value={s.whatsappNumber} onChange={e => setS({ ...s, whatsappNumber: e.target.value })} /></div>
          <div><Label>Support email</Label><Input type="email" value={s.supportEmail} onChange={e => setS({ ...s, supportEmail: e.target.value })} /></div>
        </div>

        <div className="premium-card p-4 space-y-3">
          <h2 className="font-extrabold">Payments & shipping</h2>
          <label className="flex items-center justify-between text-sm"><span>Cash on Delivery enabled</span><Switch checked={s.codEnabled} onCheckedChange={v => setS({ ...s, codEnabled: v })} /></label>
          <label className="flex items-center justify-between text-sm"><span>Online payment enabled</span><Switch checked={s.onlinePayEnabled} onCheckedChange={v => setS({ ...s, onlinePayEnabled: v })} /></label>
          <div><Label>Free shipping above (Rs)</Label><Input type="number" value={s.freeShippingMin} onChange={e => setS({ ...s, freeShippingMin: +e.target.value })} /></div>
          <div><Label>Tax %</Label><Input type="number" value={s.taxPercent} onChange={e => setS({ ...s, taxPercent: +e.target.value })} /></div>
        </div>

        <div className="premium-card p-4 space-y-3 md:col-span-2">
          <h2 className="font-extrabold">SEO defaults</h2>
          <div><Label>Default title</Label><Input value={s.seoTitle} onChange={e => setS({ ...s, seoTitle: e.target.value })} maxLength={60} /></div>
          <div><Label>Default description</Label><Textarea rows={3} value={s.seoDescription} onChange={e => setS({ ...s, seoDescription: e.target.value })} maxLength={160} /></div>
        </div>

        <div className="md:col-span-2"><Button variant="hero" onClick={submit} disabled={save.isPending}>Save all settings</Button></div>
      </div>
    </AdminLayout>
  );
}
