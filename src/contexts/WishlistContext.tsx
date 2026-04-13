import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface WishlistContextType {
  wishlistIds: number[];
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  totalWishlist: number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem("kc-wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("kc-wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (id: number) => {
    setWishlistIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const isWishlisted = (id: number) => wishlistIds.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isWishlisted, totalWishlist: wishlistIds.length, clearWishlist: () => setWishlistIds([]) }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
