import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminKpis } from "@/hooks/api";
import { DollarSign, ShoppingCart, Users, Package, AlertTriangle, UserPlus, TrendingUp } from "lucide-react";

const Rs = (n: number) => "Rs " + n.toLocaleString("en-PK");

function Kpi({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string | number; accent?: string }) {
  return (
    <div className="premium-card p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg grid place-items-center ${accent || "bg-primary/10 text-primary"}`}><Icon className="h-5 w-5" /></div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-extrabold truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading } = useAdminKpis();
  return (
    <AdminLayout title="Dashboard" subtitle="Overview of platform performance">
      {isLoading || !data ? <div className="text-sm text-muted-foreground">Loading KPIs…</div> : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Kpi icon={DollarSign} label="Revenue today" value={Rs(data.revenueToday)} />
            <Kpi icon={TrendingUp} label="Revenue (7 days)" value={Rs(data.revenue7d)} />
            <Kpi icon={TrendingUp} label="Revenue (30 days)" value={Rs(data.revenue30d)} />
            <Kpi icon={ShoppingCart} label="Orders today" value={data.ordersToday} />
            <Kpi icon={ShoppingCart} label="Pending orders" value={data.ordersPending} accent="bg-amber-100 text-amber-700" />
            <Kpi icon={UserPlus} label="New users (7d)" value={data.newUsers7d} />
            <Kpi icon={Users} label="Active sellers" value={data.activeSellers} />
            <Kpi icon={AlertTriangle} label="Low stock SKUs" value={data.lowStock} accent="bg-red-100 text-red-700" />
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="premium-card p-4">
              <h2 className="font-extrabold mb-3 flex items-center gap-2"><Package className="h-4 w-4 text-primary" />Top SKUs</h2>
              <div className="space-y-2">
                {data.topSkus.map(s => (
                  <div key={s.productId} className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
                    <span className="truncate pr-2">{s.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{s.unitsSold} units · <span className="text-foreground font-bold">{Rs(s.revenue)}</span></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="premium-card p-4">
              <h2 className="font-extrabold mb-3 flex items-center gap-2"><UserPlus className="h-4 w-4 text-primary" />Pending seller applications</h2>
              <p className="text-3xl font-extrabold text-primary">{data.pendingSellerApplications}</p>
              <p className="text-xs text-muted-foreground mt-1">Review & approve in the Sellers section.</p>
              <a href="/admin/sellers?status=pending" className="text-xs font-bold text-primary hover:underline mt-2 inline-block">Review applications →</a>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
