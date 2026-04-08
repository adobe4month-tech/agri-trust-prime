import { ShieldCheck, Truck, FlaskConical, Headphones } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "100% Original Products" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: FlaskConical, label: "Agronomist Verified" },
  { icon: Headphones, label: "Expert Support" },
];

export default function TrustBar() {
  return (
    <section className="bg-secondary border-y">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <item.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
