import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, RotateCcw, Upload } from "lucide-react";
import { toast } from "sonner";

export default function ReturnRequest() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [rma, setRma] = useState("");
  const [form, setForm] = useState({ orderId: "", reason: "", details: "", photo: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.orderId || !form.reason) { toast.error(t("Fill all required fields", "Tamam fields bharein")); return; }
    setRma("RMA-" + Math.floor(Math.random() * 9000 + 1000));
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEOHead title="Return Request Submitted" description="Return request submitted." />
        <Header />
        <main className="flex-1 max-w-xl mx-auto px-4 py-12 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6"><CheckCircle2 className="h-12 w-12 text-primary" /></div>
          <h1 className="text-3xl font-extrabold mb-2">{t("Return Initiated", "Return Shuru Ho Gaya")}</h1>
          <p className="text-muted-foreground mb-6">{t("Pickup will be arranged within 48 hours.", "Pickup 48 ghante mein hogi.")}</p>
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 inline-block">
            <p className="text-xs text-muted-foreground">RMA ID</p>
            <p className="text-3xl font-extrabold tracking-wider text-primary">{rma}</p>
          </div>
          <Button onClick={() => navigate("/account")} variant="outline">{t("Back to Account", "Account Par")}</Button>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="Request Return — KissanCares" description="Request a return or refund." />
      <Header />
      <main className="flex-1 max-w-xl mx-auto px-4 py-8 pb-24 lg:pb-8 w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3"><RotateCcw className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-extrabold">{t("Request a Return", "Return Ki Darkhwast")}</h1>
        </div>
        <form onSubmit={submit} className="premium-card p-6 space-y-4">
          <div className="space-y-2">
            <Label>{t("Order ID *", "Order ID *")}</Label>
            <Input placeholder="KC-2847" value={form.orderId} onChange={e => setForm({ ...form, orderId: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>{t("Reason *", "Wajah *")}</Label>
            <Select value={form.reason} onValueChange={v => setForm({ ...form, reason: v })}>
              <SelectTrigger><SelectValue placeholder={t("Select reason", "Wajah chunein")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="damaged">{t("Damaged on arrival", "Kharab haalat mein mila")}</SelectItem>
                <SelectItem value="wrong-item">{t("Wrong item received", "Galat product mila")}</SelectItem>
                <SelectItem value="expired">{t("Expired product", "Tareekh guzra")}</SelectItem>
                <SelectItem value="not-effective">{t("Not effective", "Asar nahi hua")}</SelectItem>
                <SelectItem value="other">{t("Other", "Doosri wajah")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("Details", "Tafseel")}</Label>
            <Textarea rows={3} value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} maxLength={500} />
          </div>
          <div className="space-y-2">
            <Label>{t("Upload Photo (optional)", "Photo (optional)")}</Label>
            <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/30 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>{form.photo || t("Choose file...", "File chunein...")}</span>
              <input type="file" accept="image/*" className="hidden" onChange={e => setForm({ ...form, photo: e.target.files?.[0]?.name || "" })} />
            </label>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">{t("Submit Return Request", "Darkhwast Bhejein")}</Button>
        </form>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
