import PolicyPage from "@/components/PolicyPage";
export default function Shipping() {
  return <PolicyPage slug="shipping" title="Shipping & Delivery" titleUrdu="Shipping aur Delivery" sections={[
    { h: "Nationwide Delivery", hUrdu: "Pakistan Bhar Delivery", p: "We deliver to all 4 provinces, AJK and Gilgit-Baltistan via TCS, Leopards, M&P and Daewoo Cargo. Bulk orders use dedicated logistics partners.", pUrdu: "Pakistan ke har sheher mein TCS, Leopards, M&P aur Daewoo Cargo se delivery." },
    { h: "Delivery Timeline", hUrdu: "Delivery ka Waqt", p: "Major cities (Lahore, Karachi, Islamabad, Faisalabad, Multan): 1–2 working days.\nOther cities: 2–4 working days.\nRemote areas: 3–6 working days.", pUrdu: "Bare sheher: 1–2 din. Doosray sheher: 2–4 din. Door dehat: 3–6 din." },
    { h: "Delivery Charges", hUrdu: "Delivery Kharcha", p: "FREE delivery on orders above Rs.2,500.\nStandard charge: Rs.200 per shipment under that limit.\nBulk orders (over 50kg) priced based on weight & destination.", pUrdu: "Rs.2,500 se zyada par muft delivery. Us se kam par Rs.200." },
    { h: "Order Tracking", hUrdu: "Order Tracking", p: "Once shipped, you receive a tracking ID via WhatsApp. Track on our /track page or directly with the courier.", pUrdu: "Order chalne par WhatsApp par tracking ID milegi." },
  ]} />;
}
