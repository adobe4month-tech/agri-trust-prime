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
import { LoyaltyProvider } from "@/contexts/LoyaltyContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import Login from "./pages/Login.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
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
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminOrders from "./pages/admin/Orders.tsx";
import AdminProducts from "./pages/admin/Products.tsx";
import AdminTaxonomy from "./pages/admin/Taxonomy.tsx";
import AdminSellers from "./pages/admin/Sellers.tsx";
import AdminCustomers from "./pages/admin/Customers.tsx";
import AdminCoupons from "./pages/admin/Coupons.tsx";
import AdminLoyalty from "./pages/admin/Loyalty.tsx";
import AdminContent from "./pages/admin/Content.tsx";
import AdminReviews from "./pages/admin/Reviews.tsx";
import AdminLeads from "./pages/admin/Leads.tsx";
import AdminNotifications from "./pages/admin/Notifications.tsx";
import AdminSettings from "./pages/admin/Settings.tsx";
import AdminAudit from "./pages/admin/Audit.tsx";
import AbandonedCartNudge from "./components/AbandonedCartNudge.tsx";

const queryClient = new QueryClient();

const Protected = ({ role, children }: { role?: "customer" | "seller" | "admin"; children: JSX.Element }) => (
  <ProtectedRoute role={role}>{children}</ProtectedRoute>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <LoyaltyProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
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
                      <Route path="/login" element={<Login />} />
                      <Route path="/seller-login" element={<SellerLogin />} />
                      <Route path="/admin-login" element={<AdminLogin />} />
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

                      {/* Customer portal — requires login */}
                      <Route path="/account" element={<Protected role="customer"><AccountProfile /></Protected>} />
                      <Route path="/account/orders" element={<Protected role="customer"><AccountOrders /></Protected>} />
                      <Route path="/account/addresses" element={<Protected role="customer"><AccountAddresses /></Protected>} />
                      <Route path="/account/wishlist" element={<Protected role="customer"><AccountWishlist /></Protected>} />
                      <Route path="/account/coins" element={<Protected role="customer"><AccountCoins /></Protected>} />
                      <Route path="/account/crops" element={<Protected role="customer"><AccountCropProfile /></Protected>} />
                      <Route path="/account/notifications" element={<Protected role="customer"><AccountNotifications /></Protected>} />

                      {/* Seller portal */}
                      <Route path="/seller" element={<Protected role="seller"><SellerDashboard /></Protected>} />
                      <Route path="/seller/inventory" element={<Protected role="seller"><SellerInventory /></Protected>} />
                      <Route path="/seller/orders" element={<Protected role="seller"><SellerOrders /></Protected>} />
                      <Route path="/seller/payouts" element={<Protected role="seller"><SellerPayouts /></Protected>} />

                      {/* Admin panel */}
                      <Route path="/admin" element={<Protected role="admin"><AdminDashboard /></Protected>} />
                      <Route path="/admin/orders" element={<Protected role="admin"><AdminOrders /></Protected>} />
                      <Route path="/admin/products" element={<Protected role="admin"><AdminProducts /></Protected>} />
                      <Route path="/admin/taxonomy" element={<Protected role="admin"><AdminTaxonomy /></Protected>} />
                      <Route path="/admin/sellers" element={<Protected role="admin"><AdminSellers /></Protected>} />
                      <Route path="/admin/customers" element={<Protected role="admin"><AdminCustomers /></Protected>} />
                      <Route path="/admin/coupons" element={<Protected role="admin"><AdminCoupons /></Protected>} />
                      <Route path="/admin/loyalty" element={<Protected role="admin"><AdminLoyalty /></Protected>} />
                      <Route path="/admin/content" element={<Protected role="admin"><AdminContent /></Protected>} />
                      <Route path="/admin/reviews" element={<Protected role="admin"><AdminReviews /></Protected>} />
                      <Route path="/admin/leads" element={<Protected role="admin"><AdminLeads /></Protected>} />
                      <Route path="/admin/notifications" element={<Protected role="admin"><AdminNotifications /></Protected>} />
                      <Route path="/admin/settings" element={<Protected role="admin"><AdminSettings /></Protected>} />
                      <Route path="/admin/audit" element={<Protected role="admin"><AdminAudit /></Protected>} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <AbandonedCartNudge />
                  </BrowserRouter>
                </TooltipProvider>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </LoyaltyProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
