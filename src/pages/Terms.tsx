import PolicyPage from "@/components/PolicyPage";
export default function Terms() {
  return <PolicyPage slug="terms" title="Terms & Conditions" titleUrdu="Shara'it" sections={[
    { h: "Acceptance of Terms", hUrdu: "Shara'it ki Manzoori", p: "By placing an order with KissanCares, you agree to these terms. We reserve the right to update terms at any time.", pUrdu: "Order karne se aap shara'it se mutfaq hain." },
    { h: "Product Authenticity", hUrdu: "Asli Products", p: "All products sold are 100% original and sourced directly from authorized brand distributors. Batch numbers, manufacturing and expiry dates are verified at our warehouse before dispatch.", pUrdu: "Tamam products 100% asli hain aur authorized distributors se hain." },
    { h: "Pricing & Availability", hUrdu: "Qeematein", p: "Prices are listed in PKR and may change without notice. Stock availability is confirmed when our team verifies your WhatsApp order.", pUrdu: "Qeematein PKR mein hain aur badal sakti hain." },
    { h: "Limitation of Liability", hUrdu: "Zimedari ki Hudood", p: "KissanCares is not liable for misuse of agricultural inputs. Always read product labels and follow recommended dosage.", pUrdu: "Galat istemal ki zimedari KissanCares par nahi. Hamesha label parhein." },
    { h: "Governing Law", hUrdu: "Qanoon", p: "These terms are governed by the laws of the Islamic Republic of Pakistan. Disputes fall under the jurisdiction of Lahore courts.", pUrdu: "Shara'it Pakistan ke qanoon ke tehat hain. Lahore ki adalat ka faisla manzoor." },
  ]} />;
}
