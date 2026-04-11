import { MessageCircle, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShareButtonsProps {
  productName: string;
  price: number;
}

export default function ShareButtons({ productName, price }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const url = window.location.href;

  const shareWhatsApp = () => {
    const text = `Check out ${productName} for Rs.${price.toLocaleString()} on KissanCares: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">{t("share.title")}:</span>
      <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={shareWhatsApp}>
        <MessageCircle className="h-3.5 w-3.5" /> {t("share.whatsapp")}
      </Button>
      <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={copyLink}>
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? t("share.copied") : t("share.copy")}
      </Button>
    </div>
  );
}
