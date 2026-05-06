import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CompareProvider } from "@/components/ProductCompare";
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
import GetQuote from "./pages/GetQuote.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";
import Products from "./pages/Products.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import MarketRates from "./pages/MarketRates.tsx";
import Videos from "./pages/Videos.tsx";
import Calculator from "./pages/Calculator.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import Compare from "./pages/Compare.tsx";
import Account from "./pages/Account.tsx";
import Returns from "./pages/Returns.tsx";
import Shipping from "./pages/Shipping.tsx";
import Terms from "./pages/Terms.tsx";
import Stores from "./pages/Stores.tsx";
import SEOLanding from "./pages/SEOLanding.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
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
                    <Route path="/get-quote" element={<GetQuote />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/market-rates" element={<MarketRates />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </QueryClientProvider>
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
