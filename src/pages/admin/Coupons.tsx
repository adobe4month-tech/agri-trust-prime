import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useCoupons, useSaveCoupon, useDeleteCoupon } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Coupon } from "@/lib/api/types";

const today = () => new Date().toISOString().slice(0, 10);

export default function AdminCoupons() {
  const { data: rows = [] } = useCoupons();
  const save = useSaveCoupon();
  const del = useDeleteCoupon();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Coupon>>({ type: "percent", value: 10, active: true, validFrom: today(), validTo: today() });

  return (
    <AdminLayout title="Coupons" subtitle="Discount codes and promotions">
      <div className="space-y-3">
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button variant="hero" size="sm" onClick={() => setEditing({ type: "percent", value: 10, active: true, validFrom: today(), validTo: today() })}><Plus className="h-4 w-4" />New coupon</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing.id ? "Edit" : "New"} coupon</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Code</Label><Input value={editing.code || ""} onChange={e => setEditing({ ...editing, code: e.target.value.toUpperCase() })} /></div>
                  <div>
                    <Label>Type</Label>
                    <Select value={editing.type} onValueChange={(v) => setEditing({ ...editing, type: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="percent">Percent</SelectItem><SelectItem value="flat">Flat Rs</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div><Label>Value</Label><Input type="number" value={editing.value || 0} onChange={e => setEditing({ ...editing, value: +e.target.value })} /></div>
                  <div><Label>Min cart (Rs)</Label><Input type="number" value={editing.minCart || 0} onChange={e => setEditing({ ...editing, minCart: +e.target.value })} /></div>
                  <div><Label>Usage cap</Label><Input type="number" value={editing.usageCap || 0} onChange={e => setEditing({ ...editing, usageCap: +e.target.value })} /></div>
                  <div><Label>Valid from</Label><Input type="date" value={(editing.validFrom || "").slice(0, 10)} onChange={e => setEditing({ ...editing, validFrom: e.target.value })} /></div>
                  <div><Label>Valid to</Label><Input type="date" value={(editing.validTo || "").slice(0, 10)} onChange={e => setEditing({ ...editing, validTo: e.target.value })} /></div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="hero" onClick={async () => { await save.mutateAsync(editing); toast.success("Saved"); setOpen(false); }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="premium-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Code</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Value</TableHead><TableHead className="text-right">Min</TableHead><TableHead className="text-right">Used</TableHead><TableHead>Validity</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono font-bold">{c.code}</TableCell>
                  <TableCell className="text-xs uppercase">{c.type}</TableCell>
                  <TableCell className="text-right font-bold">{c.type === "percent" ? `${c.value}%` : `Rs ${c.value}`}</TableCell>
                  <TableCell className="text-right">Rs {(c.minCart || 0).toLocaleString()}</TableCell>
                  <TableCell className="text-right text-xs">{c.usedCount} / {c.usageCap || "∞"}</TableCell>
                  <TableCell className="text-xs">{new Date(c.validFrom).toLocaleDateString()} → {new Date(c.validTo).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant={c.active ? "default" : "secondary"} className="text-[10px]">{c.active ? "ACTIVE" : "OFF"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditing(c); setOpen(true); }}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={async () => { if (confirm("Delete coupon?")) { await del.mutateAsync(c.id); toast.success("Deleted"); } }}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
