import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminCategories, useSaveCategory, useDeleteCategory, useAdminCrops, useSaveCrop, useDeleteCrop } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminTaxonomy() {
  const cats = useAdminCategories();
  const crops = useAdminCrops();
  const saveCat = useSaveCategory();
  const delCat = useDeleteCategory();
  const saveCrop = useSaveCrop();
  const delCrop = useDeleteCrop();
  const [newCat, setNewCat] = useState({ name: "", slug: "" });
  const [newCrop, setNewCrop] = useState<{ name: string; season: "kharif" | "rabi" | "perennial" }>({ name: "", season: "kharif" });

  return (
    <AdminLayout title="Categories & Crops" subtitle="Manage taxonomy and tagging">
      <Tabs defaultValue="cats">
        <TabsList><TabsTrigger value="cats">Categories</TabsTrigger><TabsTrigger value="crops">Crops</TabsTrigger></TabsList>

        <TabsContent value="cats" className="space-y-3">
          <div className="premium-card p-4 flex flex-wrap items-end gap-2">
            <div className="flex-1 min-w-[160px]"><Label>Name</Label><Input value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} /></div>
            <div className="flex-1 min-w-[160px]"><Label>Slug</Label><Input value={newCat.slug} onChange={e => setNewCat({ ...newCat, slug: e.target.value })} /></div>
            <Button variant="hero" onClick={async () => { if (!newCat.name) return; await saveCat.mutateAsync(newCat); setNewCat({ name: "", slug: "" }); toast.success("Category added"); }}><Plus className="h-4 w-4" />Add</Button>
          </div>
          <div className="premium-card overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead className="text-right">Products</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {(cats.data || []).map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-semibold">{c.name}</TableCell>
                    <TableCell className="text-xs font-mono">{c.slug}</TableCell>
                    <TableCell className="text-right">{c.productCount}</TableCell>
                    <TableCell className="text-right"><Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={async () => { if (confirm("Delete?")) { await delCat.mutateAsync(c.id); toast.success("Deleted"); } }}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="crops" className="space-y-3">
          <div className="premium-card p-4 flex flex-wrap items-end gap-2">
            <div className="flex-1 min-w-[160px]"><Label>Crop name</Label><Input value={newCrop.name} onChange={e => setNewCrop({ ...newCrop, name: e.target.value })} /></div>
            <div className="min-w-[160px]">
              <Label>Season</Label>
              <Select value={newCrop.season} onValueChange={(v) => setNewCrop({ ...newCrop, season: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="kharif">Kharif</SelectItem><SelectItem value="rabi">Rabi</SelectItem><SelectItem value="perennial">Perennial</SelectItem></SelectContent>
              </Select>
            </div>
            <Button variant="hero" onClick={async () => { if (!newCrop.name) return; await saveCrop.mutateAsync(newCrop); setNewCrop({ name: "", season: "kharif" }); toast.success("Crop added"); }}><Plus className="h-4 w-4" />Add</Button>
          </div>
          <div className="premium-card overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Season</TableHead><TableHead className="text-right">Products</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {(crops.data || []).map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-semibold">{c.name}</TableCell>
                    <TableCell className="text-xs uppercase">{c.season}</TableCell>
                    <TableCell className="text-right">{c.productCount}</TableCell>
                    <TableCell className="text-right"><Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={async () => { if (confirm("Delete?")) { await delCrop.mutateAsync(c.id); toast.success("Deleted"); } }}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
