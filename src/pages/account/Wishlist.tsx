import AccountLayout from "@/components/account/AccountLayout";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { Heart } from "lucide-react";

export default function AccountWishlist() {
  const { wishlistIds } = useWishlist();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const items = products.filter(p => wishlistIds.includes(p.id));

  return (
    <AccountLayout title={t("Wishlist", "Pasandeeda")}>
      {items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground"><Heart className="h-12 w-12 mx-auto mb-3 opacity-30" /><p>{t("Your wishlist is empty.", "Aapka wishlist khali hai.")}</p></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{items.map(p => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </AccountLayout>
  );
}
