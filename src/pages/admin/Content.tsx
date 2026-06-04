import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminContent, useSaveContent, useDeleteContent } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ContentItem } from "@/lib/api/types";

const KINDS: { v: ContentItem["kind"]; l: string }[] = [
  { v: "blog", l: "Blog post" }, { v: "video", l: "Video" }, { v: "marketRate", l: "Market rate" },
  { v: "heroBanner", l: "Hero banner" }, { v: "abVariant", l: "A/B variant" },
];

export default function AdminContent() {
  const [kindFilter, setKindFilter] = useState<string>("all");
  const { data: rows = [] } = useAdminContent(kindFilter === "all" ? undefined : (kindFilter as any));
  const save = useSaveContent();
  const del = useDeleteContent();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<ContentItem>>({ kind: "blog", published: true });

  return (
    <AdminLayout title="Content" subtitle="Blog posts, videos, banners, market rates, A/B variants">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Select value={kindFilter} onValueChange={setKindFilter}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">All types</SelectItem>{KINDS.map(k => <SelectItem key={k.v} value={k.v}>{k.l}</SelectItem>)}</SelectContent>
          </Select>
          <div className="ml-auto">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button variant="hero" size="sm" onClick={() => setEditing({ kind: "blog", published: true })}><Plus className="h-4 w-4" />New item</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>{editing.id ? "Edit" : "New"} content</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div>
                    <Label>Type</Label>
                    <Select value={editing.kind} onValueChange={(v) => setEditing({ ...editing, kind: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{KINDS.map(k => <SelectItem key={k.v} value={k.v}>{k.l}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Title</Label><Input value={editing.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
                  <div><Label>Slug (optional)</Label><Input value={editing.slug || ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></div>
                  <div><Label>Media URL (optional)</Label><Input value={editing.mediaUrl || ""} onChange={e => setEditing({ ...editing, mediaUrl: e.target.value })} /></div>
                  <div><Label>Body</Label><Textarea rows={5} value={editing.body || ""} onChange={e => setEditing({ ...editing, body: e.target.value })} /></div>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.published} onChange={e => setEditing({ ...editing, published: e.target.checked })} />Published</label>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button variant="hero" onClick={async () => { await save.mutateAsync(editing); toast.success("Saved"); setOpen(false); }}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="premium-card overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Type</TableHead><TableHead>Created</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-semibold text-sm">{c.title}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px] uppercase">{c.kind}</Badge></TableCell>
                  <TableCell className="text-xs">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant={c.published ? "default" : "secondary"} className="text-[10px]">{c.published ? "PUBLISHED" : "DRAFT"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditing(c); setOpen(true); }}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={async () => { if (confirm("Delete?")) { await del.mutateAsync(c.id); toast.success("Deleted"); } }}><Trash2 className="h-3.5 w-3.5" /></Button>
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
