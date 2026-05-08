import { Link } from "react-router-dom";
import { Coins } from "lucide-react";
import { useLoyalty } from "@/contexts/LoyaltyContext";

export default function LoyaltyBadge() {
  const { coins } = useLoyalty();
  return (
    <Link to="/loyalty" className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-agri-gold/10 border border-agri-gold/20 hover:bg-agri-gold/20 transition-colors">
      <Coins className="h-3.5 w-3.5 text-agri-gold" />
      <span className="text-[11px] font-extrabold text-foreground">{coins}</span>
    </Link>
  );
}
