import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ShopByCrop from "@/components/home/ShopByCrop";
import ShopByProblem from "@/components/home/ShopByProblem";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedReviews from "@/components/home/FeaturedReviews";
import BrandCarousel from "@/components/home/BrandCarousel";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts title="Weekly Sale" icon="flame" />
        <ShopByCrop />
        <ShopByProblem />
        <FeaturedProducts title="Latest Products" filter={(p) => p.category === "seed"} icon="sparkles" />
        <FeaturedReviews />
        <TrustBar />
        <BrandCarousel />
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
};

export default Index;
