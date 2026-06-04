import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminSellers, useSetSellerStatus } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Ban } from "lucide-react";
import { toast } from "sonner";
import type { AdminSellerRow } from "@/lib/api/types";

export default function AdminSellers() {
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "suspended">("all");
  const { data: rows = [], isLoading } = useAdminSellers(tab === "all" ? undefined : tab);
  const setStatus = useSetSellerStatus();

  const act = async (id: string, status: AdminSellerRow["status"], msg: string) => {
    await setStatus.mutateAsync({ id, status });
    toast.success(msg);
  };

  return (
    <AdminLayout title="Sellers" subtitle="Manage seller accounts and applications">
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="mb-3">
        <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="pending">Pending</TabsTrigger><TabsTrigger value="approved">Approved</TabsTrigger><TabsTrigger value="suspended">Suspended</TabsTrigger></TabsList>
      </Tabs>

      <div className="premium-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead><TableHead>Owner</TableHead><TableHead>City</TableHead>
              <TableHead className="text-right">Lifetime</TableHead><TableHead>Rating</TableHead>
              <TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? <TableRow><TableCell colSpan={7} className="text-center py-6 text-sm text-muted-foreground">Loading…</TableCell></TableRow> :
              rows.map(s => (
                <TableRow key={s.id}>
                  <TableCell><div className="font-semibold text-sm">{s.brand}</div><div className="text-xs text-muted-foreground">{s.phone}</div></TableCell>
                  <TableCell className="text-xs">{s.ownerName}</TableCell>
                  <TableCell className="text-xs">{s.city}</TableCell>
                  <TableCell className="text-right font-bold">Rs {s.lifetimeRs.toLocaleString()}</TableCell>
                  <TableCell className="text-xs">{s.rating || "—"}</TableCell>
                  <TableCell><Badge className="text-[10px] uppercase" variant={s.status === "approved" ? "default" : s.status === "pending" ? "secondary" : "destructive"}>{s.status}</Badge></TableCell>
                  <TableCell className="text-right space-x-1">
                    {s.status === "pending" && (<>
                      <Button size="sm" variant="hero" className="h-7" onClick={() => act(s.id, "approved", "Approved")}><Check className="h-3.5 w-3.5" />Approve</Button>
                      <Button size="sm" variant="outline" className="h-7" onClick={() => act(s.id, "suspended", "Rejected")}><X className="h-3.5 w-3.5" />Reject</Button>
                    </>)}
                    {s.status === "approved" && <Button size="sm" variant="outline" className="h-7 text-destructive" onClick={() => act(s.id, "suspended", "Suspended")}><Ban className="h-3.5 w-3.5" />Suspend</Button>}
                    {s.status === "suspended" && <Button size="sm" variant="hero" className="h-7" onClick={() => act(s.id, "approved", "Reactivated")}><Check className="h-3.5 w-3.5" />Reactivate</Button>}
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
