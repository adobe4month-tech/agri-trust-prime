import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminCustomers, useAdjustCustomerCoins, useToggleBlockCustomer } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AdminCustomers() {
  const [q, setQ] = useState("");
  const { data: rows = [], isLoading } = useAdminCustomers(q || undefined);
  const adjust = useAdjustCustomerCoins();
  const toggleBlock = useToggleBlockCustomer();

  const handleAdjust = async (id: string) => {
    const v = prompt("Coin delta (positive to grant, negative to deduct):");
    if (!v) return;
    const delta = parseInt(v, 10);
    if (isNaN(delta)) return;
    await adjust.mutateAsync({ id, delta });
    toast.success("Coins updated");
  };

  return (
    <AdminLayout title="Customers" subtitle="Manage buyer accounts">
      <div className="space-y-3">
        <Input className="max-w-xs" placeholder="Search by name, phone, email…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="premium-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Email</TableHead>
                <TableHead className="text-right">Orders</TableHead><TableHead className="text-right">Lifetime</TableHead>
                <TableHead className="text-right">Coins</TableHead><TableHead>Joined</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableRow><TableCell colSpan={8} className="text-center py-6 text-sm text-muted-foreground">Loading…</TableCell></TableRow> :
                rows.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-semibold text-sm">{c.name} {c.blocked && <Badge variant="destructive" className="text-[9px] ml-1">BLOCKED</Badge>}</TableCell>
                    <TableCell className="text-xs">{c.phone}</TableCell>
                    <TableCell className="text-xs">{c.email}</TableCell>
                    <TableCell className="text-right">{c.ordersCount}</TableCell>
                    <TableCell className="text-right font-bold">Rs {c.lifetimeRs.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{c.coins}</TableCell>
                    <TableCell className="text-xs">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => handleAdjust(c.id)}>± Coins</Button>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={async () => { await toggleBlock.mutateAsync(c.id); toast.success(c.blocked ? "Unblocked" : "Blocked"); }}>{c.blocked ? "Unblock" : "Block"}</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
