import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminLeads, useMarkLeadHandled } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Phone } from "lucide-react";
import { toast } from "sonner";

export default function AdminLeads() {
  const { data: rows = [], isLoading } = useAdminLeads();
  const mark = useMarkLeadHandled();

  return (
    <AdminLayout title="Leads" subtitle="Quote requests, contact form, chat & exit-intent captures">
      <div className="premium-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Source</TableHead><TableHead>Name</TableHead><TableHead>Phone / Email</TableHead><TableHead>Message</TableHead><TableHead>Created</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {isLoading ? <TableRow><TableCell colSpan={7} className="text-center py-6 text-sm text-muted-foreground">Loading…</TableCell></TableRow> :
              rows.map(l => (
                <TableRow key={l.id}>
                  <TableCell><Badge variant="secondary" className="text-[10px] uppercase">{l.source}</Badge></TableCell>
                  <TableCell className="text-sm font-semibold">{l.name || "—"}</TableCell>
                  <TableCell className="text-xs">{l.phone || l.email || "—"}</TableCell>
                  <TableCell className="text-xs max-w-xs truncate">{l.message || "—"}</TableCell>
                  <TableCell className="text-xs">{new Date(l.createdAt).toLocaleString()}</TableCell>
                  <TableCell><Badge variant={l.handled ? "default" : "secondary"} className="text-[10px]">{l.handled ? "HANDLED" : "OPEN"}</Badge></TableCell>
                  <TableCell className="text-right space-x-1">
                    {l.phone && <Button asChild size="sm" variant="ghost" className="h-7 text-xs"><a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><Phone className="h-3.5 w-3.5" />WA</a></Button>}
                    {!l.handled && <Button size="sm" variant="hero" className="h-7 text-xs" onClick={async () => { await mark.mutateAsync(l.id); toast.success("Marked"); }}><Check className="h-3.5 w-3.5" />Done</Button>}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
