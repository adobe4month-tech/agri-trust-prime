import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminReviews, useSetReviewStatus } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Check, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminReviews() {
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "hidden">("all");
  const { data: rows = [], isLoading } = useAdminReviews(tab === "all" ? undefined : tab);
  const setStatus = useSetReviewStatus();

  return (
    <AdminLayout title="Reviews & Q&A" subtitle="Moderate product reviews">
      <Tabs value={tab} onValueChange={v => setTab(v as any)} className="mb-3">
        <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="pending">Pending</TabsTrigger><TabsTrigger value="approved">Approved</TabsTrigger><TabsTrigger value="hidden">Hidden</TabsTrigger></TabsList>
      </Tabs>

      <div className="space-y-3">
        {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : rows.length === 0 ? <p className="text-sm text-muted-foreground">No reviews</p> :
          rows.map(r => (
            <div key={r.id} className="premium-card p-4 flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />)}</div>
                  <span className="text-xs font-bold">{r.user}</span>
                  {r.verified && <Badge variant="secondary" className="text-[9px]">VERIFIED</Badge>}
                  <Badge variant={r.status === "approved" ? "default" : r.status === "hidden" ? "destructive" : "secondary"} className="text-[9px] uppercase">{r.status}</Badge>
                </div>
                <p className="text-sm">{r.text}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Product #{r.productId} · {new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="hero" className="h-8" onClick={async () => { await setStatus.mutateAsync({ id: r.id, status: "approved" }); toast.success("Approved"); }}><Check className="h-3.5 w-3.5" />Approve</Button>
                <Button size="sm" variant="outline" className="h-8 text-destructive" onClick={async () => { await setStatus.mutateAsync({ id: r.id, status: "hidden" }); toast.success("Hidden"); }}><EyeOff className="h-3.5 w-3.5" />Hide</Button>
              </div>
            </div>
          ))
        }
      </div>
    </AdminLayout>
  );
}
