import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InvoiceItem { name: string; qty: number; price: number; }
interface InvoiceData {
  orderId: string;
  date: string;
  buyer: { name: string; phone: string; address: string; city: string };
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function InvoiceButton({ data }: { data: InvoiceData }) {
  const { language } = useLanguage();
  const open = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    const rows = data.items.map(i => `<tr><td>${i.name}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">Rs.${i.price.toLocaleString()}</td><td style="text-align:right">Rs.${(i.price * i.qty).toLocaleString()}</td></tr>`).join("");
    const gst = Math.round(data.subtotal * 0.17);
    w.document.write(`<!doctype html><html><head><title>Invoice ${data.orderId}</title>
      <style>
        body{font-family:Arial,sans-serif;color:#222;max-width:780px;margin:24px auto;padding:24px}
        .h{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2D7A2D;padding-bottom:12px;margin-bottom:20px}
        .logo{font-weight:900;font-size:22px;color:#2D7A2D}
        h1{font-size:18px;margin:0}
        table{width:100%;border-collapse:collapse;margin-top:12px;font-size:13px}
        th,td{padding:8px;border-bottom:1px solid #eee;text-align:left}
        th{background:#f5f5f5;text-transform:uppercase;font-size:11px;color:#666}
        .totals{margin-top:14px;float:right;width:280px;font-size:13px}
        .totals .row{display:flex;justify-content:space-between;padding:4px 0}
        .totals .grand{font-weight:900;font-size:16px;border-top:2px solid #2D7A2D;padding-top:8px;margin-top:8px;color:#2D7A2D}
        .meta{font-size:12px;color:#666;line-height:1.5}
        @media print{body{margin:0}}
      </style></head><body>
      <div class="h"><div class="logo">KISSAN CARES</div><div style="text-align:right"><h1>INVOICE</h1><p style="margin:2px 0;font-size:12px;color:#666">${data.orderId} · ${data.date}</p></div></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:12px">
        <div class="meta"><strong>Bill To:</strong><br>${data.buyer.name}<br>${data.buyer.phone}<br>${data.buyer.address}<br>${data.buyer.city}</div>
        <div class="meta" style="text-align:right"><strong>From:</strong><br>Kissan Cares (Pvt) Ltd<br>Lahore, Pakistan<br>+92 324 028 7276<br>NTN: 1234567-8</div>
      </div>
      <table><thead><tr><th>Product</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="totals">
        <div class="row"><span>Subtotal</span><span>Rs.${data.subtotal.toLocaleString()}</span></div>
        <div class="row"><span>GST (17%)</span><span>Rs.${gst.toLocaleString()}</span></div>
        <div class="row"><span>Shipping</span><span>Rs.${data.shipping.toLocaleString()}</span></div>
        <div class="row grand"><span>Total</span><span>Rs.${(data.total + gst).toLocaleString()}</span></div>
      </div>
      <div style="clear:both;margin-top:40px;padding-top:16px;border-top:1px solid #eee;font-size:11px;color:#888;text-align:center">
        Thank you for your order. Returns accepted within 7 days. Visit kissancares.com/returns
      </div>
      <script>window.onload=()=>window.print();</script>
    </body></html>`);
    w.document.close();
  };
  return <Button variant="outline" size="sm" onClick={open}><FileText className="h-4 w-4" />{language === "ru" ? "Invoice Print" : "Download Invoice"}</Button>;
}
