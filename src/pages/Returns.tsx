import PolicyPage from "@/components/PolicyPage";
export default function Returns() {
  return <PolicyPage slug="returns" title="Returns & Refunds" titleUrdu="Wapsi aur Refund" sections={[
    { h: "7-Day Return Guarantee", hUrdu: "7-Din ki Wapsi", p: "If your product arrives damaged, expired, or incorrect, you may request a free return within 7 days of delivery. Items must be unopened and in original packaging.", pUrdu: "Agar product kharab, expired ya ghalat aaye, to 7 din mein muft wapsi mumkin hai. Packaging band honi chahiye." },
    { h: "How to Request a Return", hUrdu: "Wapsi ka Tareeqa", p: "WhatsApp our team at +92 324 0287276 with your Order ID and a photo of the issue. Our agent will arrange free reverse pickup via TCS or Leopards.", pUrdu: "WhatsApp +92 324 0287276 par Order ID aur tasveer bhejein. Hamari team TCS/Leopards se muft pickup karwayegi." },
    { h: "Refund Timeline", hUrdu: "Refund ka Waqt", p: "Refunds are processed within 3–5 working days after we receive your returned product. COD orders are refunded via JazzCash/EasyPaisa.", pUrdu: "Product wapas milne ke 3–5 din mein refund. COD orders JazzCash/EasyPaisa par." },
    { h: "Non-Returnable Items", hUrdu: "Wapas Na Honay Walay Items", p: "Opened pesticide bottles, custom seed orders over 50kg, and clearance items cannot be returned for safety reasons.", pUrdu: "Khuli hui pesticide bottles, 50kg se zyada custom seeds aur clearance items wapas nahi ho saktay." },
  ]} />;
}
