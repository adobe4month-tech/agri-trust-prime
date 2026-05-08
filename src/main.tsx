import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoyaltyProvider } from "@/contexts/LoyaltyContext";

createRoot(document.getElementById("root")!).render(
  <LoyaltyProvider>
    <App />
  </LoyaltyProvider>
);
