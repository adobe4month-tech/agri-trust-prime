import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useLoyaltyRules, useSaveLoyaltyRules, useGrantCoins, useAdminCustomers } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AdminLoyalty() {
  const { data } = useLoyaltyRules();
  const save = useSaveLoyaltyRules();
  const grant = useGrantCoins();
  const { data: customers = [] } = useAdminCustomers();
  const [r, setR] = useState({ earnRate: 1, redeemRate: 2, minRedeem: 100 });
  const [g, setG] = useState({ customerId: "", coins: 100, reason: "Goodwill" });

  useEffect(() => { if (data) setR(data); }, [data]);

  return (
    <AdminLayout title="Loyalty / Coins" subtitle="Configure earn & redeem rates and grant coins manually">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="premium-card p-4 space-y-3">
          <h2 className="font-extrabold">Rules</h2>
          <div><Label>Earn rate (coins per Rs 100 spent)</Label><Input type="number" value={r.earnRate} onChange={e => setR({ ...r, earnRate: +e.target.value })} /></div>
          <div><Label>Redeem rate (coins = Rs 1)</Label><Input type="number" value={r.redeemRate} onChange={e => setR({ ...r, redeemRate: +e.target.value })} /></div>
          <div><Label>Minimum redeemable coins</Label><Input type="number" value={r.minRedeem} onChange={e => setR({ ...r, minRedeem: +e.target.value })} /></div>
          <Button variant="hero" onClick={async () => { await save.mutateAsync(r); toast.success("Saved"); }}>Save rules</Button>
        </div>

        <div className="premium-card p-4 space-y-3">
          <h2 className="font-extrabold">Manual coin grant</h2>
          <div>
            <Label>Customer</Label>
            <Select value={g.customerId} onValueChange={v => setG({ ...g, customerId: v })}>
              <SelectTrigger><SelectValue placeholder="Pick customer" /></SelectTrigger>
              <SelectContent>{customers.map(c => <SelectItem key={c.id} value={c.id}>{c.name} ({c.phone})</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Coins (negative to deduct)</Label><Input type="number" value={g.coins} onChange={e => setG({ ...g, coins: +e.target.value })} /></div>
          <div><Label>Reason</Label><Input value={g.reason} onChange={e => setG({ ...g, reason: e.target.value })} /></div>
          <Button variant="hero" disabled={!g.customerId} onClick={async () => { await grant.mutateAsync(g); toast.success("Coins granted"); }}>Grant</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
