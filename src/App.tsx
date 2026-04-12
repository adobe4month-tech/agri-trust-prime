import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Education from "./pages/Education.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import SellWithUs from "./pages/SellWithUs.tsx";
import FAQ from "./pages/FAQ.tsx";
import TrackOrder from "./pages/TrackOrder.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Coupons from "./pages/Coupons.tsx";
import Brands from "./pages/Brands.tsx";
import SellerLogin from "./pages/SellerLogin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/education" element={<Education />} />
                <Route path="/education/:slug" element={<BlogPost />} />
                <Route path="/sell-with-us" element={<SellWithUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/track" element={<TrackOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/seller-login" element={<SellerLogin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </CartProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
