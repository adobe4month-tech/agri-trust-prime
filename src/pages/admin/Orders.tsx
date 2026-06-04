import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminOrders, useSetAdminOrderStatus, useRefundOrder } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/lib/api/types";
import { toast } from "sonner";

const STATUSES: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled", "returned"];

const statusColor = (s: OrderStatus) => ({
  pending: "bg-amber-100 text-amber-700", confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-indigo-100 text-indigo-700", shipped: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-purple-100 text-purple-700", delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700", returned: "bg-red-100 text-red-700",
}[s]);

export default function AdminOrders() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const { data: rows = [], isLoading } = useAdminOrders({ q: q || undefined, status: status === "all" ? undefined : status });
  const setStatusMut = useSetAdminOrderStatus();
  const refund = useRefundOrder();

  return (
    <AdminLayout title="Orders" subtitle="Manage and override platform orders">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <Input className="max-w-xs" placeholder="Search by order ID, buyer, phone…" value={q} onChange={e => setQ(e.target.value)} />
          <Select value={status} onValueChange={v => setStatus(v as any)}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map(s => <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>)}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground ml-auto">{rows.length} orders</p>
        </div>

        <div className="premium-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableRow><TableCell colSpan={9} className="text-center py-6 text-sm text-muted-foreground">Loading…</TableCell></TableRow> :
                rows.length === 0 ? <TableRow><TableCell colSpan={9} className="text-center py-6 text-sm text-muted-foreground">No orders</TableCell></TableRow> :
                rows.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="text-xs">{new Date(r.date).toLocaleDateString()}</TableCell>
                    <TableCell><div className="text-sm">{r.buyer}</div><div className="text-xs text-muted-foreground">{r.phone}</div></TableCell>
                    <TableCell className="text-xs">{r.city}</TableCell>
                    <TableCell className="text-xs">{r.sellerName}</TableCell>
                    <TableCell className="text-right font-bold">Rs {r.amountRs.toLocaleString()}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] uppercase">{r.paymentMethod}</Badge></TableCell>
                    <TableCell>
                      <Select value={r.status} onValueChange={async (v) => { await setStatusMut.mutateAsync({ id: r.id, status: v as OrderStatus }); toast.success("Status updated"); }}>
                        <SelectTrigger className={`h-7 text-xs ${statusColor(r.status)}`}><SelectValue /></SelectTrigger>
                        <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={async () => { await refund.mutateAsync(r.id); toast.success("Refund triggered"); }}>Refund</Button>
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
