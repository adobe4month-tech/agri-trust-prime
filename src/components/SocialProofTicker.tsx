import { useEffect, useState } from "react";
import { ShoppingBag, MapPin } from "lucide-react";

const mockOrders = [
  { name: "Muhammad Aslam", city: "Multan", product: "Spectar 20EC" },
  { name: "Abdul Rehman", city: "Rahim Yar Khan", product: "3575 Hybrid Corn Seed" },
  { name: "Ghulam Mustafa", city: "Sahiwal", product: "Lambda 2.5EC" },
  { name: "Tariq Mehmood", city: "Faisalabad", product: "Energy 5G" },
  { name: "Zahid Hussain", city: "Bahawalpur", product: "Acubar 30WP" },
  { name: "Imran Khan", city: "Lahore", product: "Cartap Hydrochloride" },
  { name: "Waqas Ahmed", city: "Hyderabad", product: "Hybrid Bottle Gourd" },
  { name: "Shahbaz Ali", city: "Gujranwala", product: "Hybrid Brinjal Janak" },
];

export default function SocialProofTicker() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 8 seconds
    const initialDelay = setTimeout(() => {
      setCurrent(0);
      setVisible(true);
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (current === null) return;

    // Hide after 4 seconds
    const hideTimer = setTimeout(() => setVisible(false), 4000);

    // Show next after 15 seconds
    const nextTimer = setTimeout(() => {
      setCurrent(prev => (prev !== null ? (prev + 1) % mockOrders.length : 0));
      setVisible(true);
    }, 15000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [current]);

  if (current === null || !visible) return null;

  const order = mockOrders[current];
  const minAgo = Math.floor(Math.random() * 10) + 1;

  return (
    <div
      className="fixed bottom-20 lg:bottom-6 left-4 z-30 max-w-[300px] animate-slide-up"
      style={{ animation: visible ? "fade-up 0.4s ease-out both" : "fade-out 0.3s ease-out both" }}
    >
      <div className="bg-card border border-border/50 rounded-xl shadow-elevated p-3 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <ShoppingBag className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground leading-tight">
            {order.name}
          </p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
            <MapPin className="h-2.5 w-2.5" /> {order.city} • {minAgo} min pehle
          </p>
          <p className="text-[10px] font-semibold text-primary mt-1 truncate">
            {order.product}
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-muted-foreground hover:text-foreground text-xs shrink-0 ml-auto"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
