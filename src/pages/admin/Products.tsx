import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminProducts, useSaveAdminProduct, useDeleteAdminProduct } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import type { AdminProductRow } from "@/lib/api/types";

function ProductForm({ initial, onSave, onCancel }: { initial?: Partial<AdminProductRow>; onSave: (p: Partial<AdminProductRow>) => void; onCancel: () => void }) {
  const [p, setP] = useState<Partial<AdminProductRow>>(initial || { status: "active" });
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2"><Label>Name</Label><Input value={p.name || ""} onChange={e => setP({ ...p, name: e.target.value })} /></div>
        <div><Label>Slug</Label><Input value={p.slug || ""} onChange={e => setP({ ...p, slug: e.target.value })} /></div>
        <div><Label>Brand</Label><Input value={p.brand || ""} onChange={e => setP({ ...p, brand: e.target.value })} /></div>
        <div><Label>Category</Label><Input value={p.category || ""} onChange={e => setP({ ...p, category: e.target.value as any })} /></div>
        <div><Label>Image URL</Label><Input value={p.image || ""} onChange={e => setP({ ...p, image: e.target.value })} /></div>
        <div><Label>Price (Rs)</Label><Input type="number" value={p.price || 0} onChange={e => setP({ ...p, price: +e.target.value })} /></div>
        <div><Label>MRP (Rs)</Label><Input type="number" value={(p as any).mrp || 0} onChange={e => setP({ ...p, mrp: +e.target.value } as any)} /></div>
        <div><Label>Stock</Label><Input type="number" value={p.stockCount || 0} onChange={e => setP({ ...p, stockCount: +e.target.value })} /></div>
        <div>
          <Label>Status</Label>
          <Select value={p.status || "active"} onValueChange={v => setP({ ...p, status: v as any })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="hero" onClick={() => onSave(p)}>Save product</Button>
      </DialogFooter>
    </div>
  );
}

export default function AdminProducts() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editing, setEditing] = useState<Partial<AdminProductRow> | null>(null);
  const [open, setOpen] = useState(false);
  const { data: rows = [], isLoading } = useAdminProducts({ q: q || undefined, status: statusFilter === "all" ? undefined : statusFilter });
  const save = useSaveAdminProduct();
  const del = useDeleteAdminProduct();

  return (
    <AdminLayout title="Products" subtitle="Full catalog management">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <Input className="max-w-xs" placeholder="Search products…" value={q} onChange={e => setQ(e.target.value)} />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info("CSV import — wire to /admin/products/import on backend")}>
              <Upload className="h-4 w-4" />Bulk import
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" size="sm" onClick={() => setEditing({})}><Plus className="h-4 w-4" />Add product</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} product</DialogTitle></DialogHeader>
                {editing && <ProductForm initial={editing} onCancel={() => setOpen(false)} onSave={async (p) => { await save.mutateAsync(p); toast.success("Product saved"); setOpen(false); }} />}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="premium-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableRow><TableCell colSpan={8} className="text-center py-6 text-sm text-muted-foreground">Loading…</TableCell></TableRow> :
                rows.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {p.image && <img src={p.image} alt="" className="w-8 h-8 rounded object-cover" />}
                        <span className="font-semibold text-sm truncate max-w-[200px]">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{p.brand}</TableCell>
                    <TableCell className="text-xs">{p.category}</TableCell>
                    <TableCell className="text-xs">{p.sellerName}</TableCell>
                    <TableCell className="text-right font-bold">Rs {p.price?.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{p.stockCount ?? 0}</TableCell>
                    <TableCell><Badge variant={p.status === "active" ? "default" : "secondary"} className="text-[10px]">{p.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditing(p); setOpen(true); }}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={async () => { if (confirm("Delete product?")) { await del.mutateAsync(p.id); toast.success("Deleted"); } }}><Trash2 className="h-3.5 w-3.5" /></Button>
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
