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
import Loyalty from "./pages/Loyalty.tsx";
import Refer from "./pages/Refer.tsx";
import QuoteSuccess from "./pages/QuoteSuccess.tsx";
import ReturnRequest from "./pages/ReturnRequest.tsx";
import SellerDashboard from "./pages/seller/Dashboard.tsx";
import SellerInventory from "./pages/seller/Inventory.tsx";
import SellerOrders from "./pages/seller/Orders.tsx";
import SellerPayouts from "./pages/seller/Payouts.tsx";
import AccountProfile from "./pages/account/Profile.tsx";
import AccountOrders from "./pages/account/Orders.tsx";
import AccountAddresses from "./pages/account/Addresses.tsx";
import AccountWishlist from "./pages/account/Wishlist.tsx";
import AccountCoins from "./pages/account/Coins.tsx";
import AccountCropProfile from "./pages/account/CropProfile.tsx";
import AccountNotifications from "./pages/account/Notifications.tsx";
import AbandonedCartNudge from "./components/AbandonedCartNudge.tsx";

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
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/category/:slug" element={<SEOLanding mode="category" />} />
                    <Route path="/brand/:slug" element={<SEOLanding mode="brand" />} />
                    <Route path="/crop/:slug" element={<SEOLanding mode="crop" />} />
                    <Route path="/problem/:slug" element={<SEOLanding mode="problem" />} />
                    <Route path="/loyalty" element={<Loyalty />} />
                    <Route path="/refer" element={<Refer />} />
                    <Route path="/quote-success" element={<QuoteSuccess />} />
                    <Route path="/return-request" element={<ReturnRequest />} />
                    <Route path="/seller" element={<SellerDashboard />} />
                    <Route path="/seller/inventory" element={<SellerInventory />} />
                    <Route path="/seller/orders" element={<SellerOrders />} />
                    <Route path="/seller/payouts" element={<SellerPayouts />} />
                    <Route path="/account" element={<AccountProfile />} />
                    <Route path="/account/orders" element={<AccountOrders />} />
                    <Route path="/account/addresses" element={<AccountAddresses />} />
                    <Route path="/account/wishlist" element={<AccountWishlist />} />
                    <Route path="/account/coins" element={<AccountCoins />} />
                    <Route path="/account/crops" element={<AccountCropProfile />} />
                    <Route path="/account/notifications" element={<AccountNotifications />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <AbandonedCartNudge />
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
