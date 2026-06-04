import AdminLayout from "@/components/admin/AdminLayout";
import { useAuditLog } from "@/hooks/api";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminAudit() {
  const { data: rows = [], isLoading } = useAuditLog();
  return (
    <AdminLayout title="Audit log" subtitle="Who did what, when">
      <div className="premium-card overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>When</TableHead><TableHead>Actor</TableHead><TableHead>Role</TableHead><TableHead>Action</TableHead><TableHead>Target</TableHead></TableRow></TableHeader>
          <TableBody>
            {isLoading ? <TableRow><TableCell colSpan={5} className="text-center py-6 text-sm text-muted-foreground">Loading…</TableCell></TableRow> :
              rows.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="text-xs">{new Date(r.createdAt).toLocaleString()}</TableCell>
                  <TableCell className="text-xs font-mono">{r.actor}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px] uppercase">{r.role}</Badge></TableCell>
                  <TableCell className="text-xs font-bold">{r.action}</TableCell>
                  <TableCell className="text-xs">{r.target}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
