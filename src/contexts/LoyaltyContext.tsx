import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface LoyaltyEntry { id: string; date: string; type: "earn" | "redeem"; coins: number; reason: string; }
interface LoyaltyCtx {
  coins: number;
  history: LoyaltyEntry[];
  earn: (rsSpent: number, reason?: string) => void;
  redeem: (coinsToUse: number, reason?: string) => boolean;
  redemptionRate: number; // coins per Re. discount
}

const Ctx = createContext<LoyaltyCtx | undefined>(undefined);
const COIN_RATE = 2; // 2 coins = Rs.1 discount (i.e. 100 coins = Rs.50)

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState<number>(() => Number(localStorage.getItem("kc-coins") || 250));
  const [history, setHistory] = useState<LoyaltyEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem("kc-coins-history") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("kc-coins", String(coins)); }, [coins]);
  useEffect(() => { localStorage.setItem("kc-coins-history", JSON.stringify(history)); }, [history]);

  const push = (e: LoyaltyEntry) => setHistory(h => [e, ...h].slice(0, 50));

  const earn = (rsSpent: number, reason = "Order") => {
    const earned = Math.floor(rsSpent / 100);
    if (earned <= 0) return;
    setCoins(c => c + earned);
    push({ id: crypto.randomUUID(), date: new Date().toISOString(), type: "earn", coins: earned, reason });
  };
  const redeem = (coinsToUse: number, reason = "Discount") => {
    if (coinsToUse > coins) return false;
    setCoins(c => c - coinsToUse);
    push({ id: crypto.randomUUID(), date: new Date().toISOString(), type: "redeem", coins: coinsToUse, reason });
    return true;
  };

  return <Ctx.Provider value={{ coins, history, earn, redeem, redemptionRate: COIN_RATE }}>{children}</Ctx.Provider>;
}

export function useLoyalty() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLoyalty must be inside LoyaltyProvider");
  return c;
}
