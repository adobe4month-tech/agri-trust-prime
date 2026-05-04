export interface Product {
  id: number;
  name: string;
  nameUrdu: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  image2?: string;
  brand: string;
  category: "pesticide" | "fertilizer" | "seed" | "machinery" | "herbicide";
  freeDelivery: boolean;
  onSale: boolean;
  badges: string[];
  rating: number;
  reviewCount: number;
  soldCount: number;
  watchingCount: number;
  stockCount: number;
  activeIngredient?: string;
  dosagePerAcre?: string;
  applicationMethod?: string;
  targetCrops?: string[];
  targetProblems?: string[];
  shortDescription?: string;
  shortDescriptionUrdu?: string;
  stockStatus?: "in-stock" | "low-stock" | "sold-out" | "coming-soon";
}

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  crop: string;
  verified: boolean;
  orderId?: string;
}

export const brands = [
  "Saver Enterprise", "LCI (Lucky Core Industries)", "BAYER", "FMC Pakistan",
  "ENGRO", "Syngenta", "FFC", "Evyol Group", "Rachna Agri Business",
  "Sohni Dharti Seeds", "Kalash Seeds", "Millan Agro Seed",
];

export const products: Product[] = [
  {
    id: 301, name: "Acubar 30WP 150gm", nameUrdu: "Acubar 30WP 150gm", slug: "acubar-30wp-150gm",
    price: 875, originalPrice: 903, brand: "Saver Enterprise",
    image: "https://kissancares.com/assets/img/product/10231220250806440.webp",
    image2: "https://kissancares.com/assets/img/product/10231220250806484.webp",
    category: "herbicide", freeDelivery: true, onSale: true,
    badges: ["Authentic Brand", "Batch Verified"],
    rating: 4.6, reviewCount: 38, soldCount: 1247, watchingCount: 14, stockCount: 23,
    activeIngredient: "Bensulfuron Methyl + Acetachlor",
    dosagePerAcre: "150gm per acre", applicationMethod: "Mix in water, broadcast spray",
    targetCrops: ["Rice"], targetProblems: ["Weed Control"],
    shortDescription: "Dual-action rice herbicide for broad-spectrum weed control in paddy fields.",
    shortDescriptionUrdu: "Chawal ke khet mein jari booti ka khatma — do taraiqe se kaam karne wali dawa.",
  },
  {
    id: 302, name: "Spectar 20EC 300ml", nameUrdu: "Spectar 20EC 300ml", slug: "spectar-20ec-300ml",
    price: 1450, originalPrice: 1480, brand: "Saver Enterprise",
    image: "https://kissancares.com/assets/img/product/36591220250806771.webp",
    image2: "https://kissancares.com/assets/img/product/36591220250806384.webp",
    category: "herbicide", freeDelivery: true, onSale: true,
    badges: ["Authentic Brand", "Expiry Checked"],
    rating: 4.8, reviewCount: 52, soldCount: 2039, watchingCount: 23, stockCount: 15,
    activeIngredient: "Cyhalofop Butyl + Metamifop",
    dosagePerAcre: "300ml per acre", applicationMethod: "Foliar spray",
    targetCrops: ["Rice"], targetProblems: ["Weed Control"],
    shortDescription: "Premium rice herbicide effective against Ghora Grass and broadleaf weeds.",
    shortDescriptionUrdu: "Chawal ki behtareen jari booti ki dawa — Ghora Grass aur chauri patti wali bootiyon ke liye.",
  },
  {
    id: 305, name: "Lambda 2.5EC 1Ltr", nameUrdu: "Lambda 2.5EC 1Ltr", slug: "lambda-25ec-1ltr",
    price: 1250, originalPrice: 1333, brand: "Saver Enterprise",
    image: "https://kissancares.com/assets/img/product/25301320250816193.webp",
    category: "pesticide", freeDelivery: false, onSale: true,
    badges: ["Authentic Brand", "Batch Verified"],
    rating: 4.5, reviewCount: 67, soldCount: 1705, watchingCount: 18, stockCount: 42,
    activeIngredient: "Lambda Cyhalothrin 2.5%",
    dosagePerAcre: "250ml per acre", applicationMethod: "Foliar spray",
    targetCrops: ["Cotton", "Wheat", "Rice", "Vegetables"],
    targetProblems: ["Pest Control"],
    shortDescription: "Broad-spectrum insecticide for control of all major insect pests.",
    shortDescriptionUrdu: "Tamam aam keeron ke khatme ke liye broad-spectrum keera maar dawa.",
  },
  {
    id: 308, name: "3575 Hybrid Corn Seed 10kg", nameUrdu: "3575 Hybrid Makki Ka Beej 10kg", slug: "3575-hybrid-corn-seed-10kg",
    price: 14950, originalPrice: 14973, brand: "Sohni Dharti Seeds",
    image: "https://kissancares.com/assets/img/product/02130020260302317.webp",
    image2: "https://kissancares.com/assets/img/product/07251220260301647.webp",
    category: "seed", freeDelivery: true, onSale: true,
    badges: ["Authentic Brand", "Expiry Checked", "High Germination"],
    rating: 4.9, reviewCount: 124, soldCount: 3421, watchingCount: 31, stockCount: 8,
    activeIngredient: "Hybrid Corn Variety 3575",
    dosagePerAcre: "10kg per acre", applicationMethod: "Direct sowing",
    targetCrops: ["Maize"], targetProblems: [],
    shortDescription: "Best corn seed for silage production. High yield, drought tolerant.",
    shortDescriptionUrdu: "Silage ke liye behtareen makki ka beej. Zyada paidawar, khushki bardasht.",
  },
  {
    id: 315, name: "Hybrid Bottle Gourd Round F1 50g", nameUrdu: "Hybrid Gol Kaddu F1 50g", slug: "hybrid-bottle-gourd-round-f1",
    price: 1450, originalPrice: 1520, brand: "Rachna Agri Business",
    image: "https://kissancares.com/assets/img/product/57181520260310719.webp",
    image2: "https://kissancares.com/assets/img/product/57181520260310501.webp",
    category: "seed", freeDelivery: true, onSale: true,
    badges: ["Authentic Brand", "High Germination"],
    rating: 4.7, reviewCount: 31, soldCount: 892, watchingCount: 9, stockCount: 35,
    activeIngredient: "F1 Hybrid Variety",
    dosagePerAcre: "50g per acre", applicationMethod: "Nursery then transplant",
    targetCrops: ["Vegetables"], targetProblems: [],
    shortDescription: "High-yield round Kaddu seeds for summer vegetable farming.",
    shortDescriptionUrdu: "Garmi ki sabzi farming ke liye zyada paidawar wale gol Kaddu ke beej.",
    stockStatus: "sold-out",
  },
  {
    id: 311, name: "Hybrid Brinjal Janak F1 10g", nameUrdu: "Hybrid Baingan Janak F1 10g", slug: "hybrid-brinjal-janak-f1",
    price: 1250, originalPrice: 1321, brand: "Millan Agro Seed",
    image: "https://kissancares.com/assets/img/product/04351520260310914.webp",
    image2: "https://kissancares.com/assets/img/product/04351520260310874.webp",
    category: "seed", freeDelivery: true, onSale: true,
    badges: ["Authentic Brand"],
    rating: 4.4, reviewCount: 19, soldCount: 456, watchingCount: 5, stockCount: 48,
    activeIngredient: "F1 Hybrid Variety",
    dosagePerAcre: "10g per acre", applicationMethod: "Nursery then transplant",
    targetCrops: ["Vegetables"], targetProblems: [],
    shortDescription: "High-yield hybrid Baingan seeds for commercial vegetable farming.",
    shortDescriptionUrdu: "Commercial sabzi farming ke liye zyada paidawar wale hybrid Baingan ke beej.",
  },
  {
    id: 303, name: "Energy 5G Monomehypo 7kg", nameUrdu: "Energy 5G Monomehypo 7kg", slug: "energy-5g-monomehypo-7kg",
    price: 1350, originalPrice: 1371, brand: "Saver Enterprise",
    image: "https://kissancares.com/assets/img/product/29441120250807805.webp",
    image2: "https://kissancares.com/assets/img/product/29441120250807818.webp",
    category: "pesticide", freeDelivery: false, onSale: true,
    badges: ["Batch Verified"],
    rating: 4.3, reviewCount: 45, soldCount: 1123, watchingCount: 12, stockCount: 30,
    activeIngredient: "Monocrotophos 5%",
    dosagePerAcre: "7kg per acre", applicationMethod: "Granular broadcast",
    targetCrops: ["Rice"], targetProblems: ["Pest Control"],
    shortDescription: "Granular insecticide for rice borer and leaf folder control.",
    shortDescriptionUrdu: "Chawal ke tana chedak aur patti lapetne wale keere ke liye daanedar dawa.",
    stockStatus: "coming-soon",
  },
  {
    id: 304, name: "Cartap Hydrochloride 4% 9kg", nameUrdu: "Cartap Hydrochloride 4% 9kg", slug: "cartap-hydrochloride-4-9kg",
    price: 3050, originalPrice: 3120, brand: "Saver Enterprise",
    image: "https://kissancares.com/assets/img/product/28311220250807881.webp",
    image2: "https://kissancares.com/assets/img/product/28311220250807579.webp",
    category: "pesticide", freeDelivery: false, onSale: true,
    badges: ["Authentic Brand", "Batch Verified"],
    rating: 4.6, reviewCount: 33, soldCount: 789, watchingCount: 7, stockCount: 18,
    activeIngredient: "Cartap Hydrochloride 4%",
    dosagePerAcre: "9kg per acre", applicationMethod: "Granular broadcast in standing water",
    targetCrops: ["Rice"], targetProblems: ["Pest Control"],
    shortDescription: "Granular insecticide for paddy rice crop borer control.",
    shortDescriptionUrdu: "Chawal ki fasal ke tana chedak ke liye daanedar keera maar dawa.",
  },
];

export const reviews: Review[] = [
  { id: 1, name: "Muhammad Aslam", location: "Multan, Punjab", rating: 5, text: "Spectar ne meri chawal ki fasal mein jari booti ka masla hal kar diya. Bohat behtareen product hai!", crop: "Rice", verified: true, orderId: "KC-2847" },
  { id: 2, name: "Abdul Rehman", location: "Rahim Yar Khan", rating: 5, text: "Sohni Dharti 3575 corn seed se bohat acha paidawar mila. Silage ke liye best hai.", crop: "Maize", verified: true, orderId: "KC-3102" },
  { id: 3, name: "Ghulam Mustafa", location: "Sahiwal, Punjab", rating: 4, text: "Lambda insecticide se keeron ka khatma ho gaya. Delivery bhi time par aayi.", crop: "Cotton", verified: true, orderId: "KC-2956" },
  { id: 4, name: "Tariq Mehmood", location: "Faisalabad", rating: 5, text: "Kissan Cares se saman mangwaya, original product mila. Trust karo is website par!", crop: "Wheat", verified: true, orderId: "KC-3215" },
  { id: 5, name: "Zahid Hussain", location: "Bahawalpur", rating: 5, text: "Pehli dafa online kharida aur bohat khush hua. Quality 100% original hai.", crop: "Vegetables", verified: true, orderId: "KC-3340" },
];

export const cropCategories = [
  { name: "Wheat", nameUrdu: "گندم", nameRoman: "Gandum", slug: "wheat", productCount: 45 },
  { name: "Cotton", nameUrdu: "کپاس", nameRoman: "Kapas", slug: "cotton", productCount: 38 },
  { name: "Rice", nameUrdu: "چاول", nameRoman: "Chawal", slug: "rice", productCount: 62 },
  { name: "Maize", nameUrdu: "مکئی", nameRoman: "Makki", slug: "maize", productCount: 28 },
  { name: "Sugarcane", nameUrdu: "گنا", nameRoman: "Ganna", slug: "sugarcane", productCount: 22 },
  { name: "Vegetables", nameUrdu: "سبزیاں", nameRoman: "Sabziyaan", slug: "vegetables", productCount: 51 },
];

export const problemCategories = [
  { name: "Weed Control", nameUrdu: "جڑی بوٹی", nameRoman: "Jari Booti", icon: "weed", slug: "weed-control", count: 45 },
  { name: "Pest Control", nameUrdu: "کیڑے مکوڑے", nameRoman: "Keere Makore", icon: "pest", slug: "pest-control", count: 78 },
  { name: "Disease Control", nameUrdu: "بیماریاں", nameRoman: "Bimariyan", icon: "disease", slug: "disease-control", count: 32 },
  { name: "Nutrition Boost", nameUrdu: "غذائیت", nameRoman: "Ghizaiyat", icon: "nutrition", slug: "nutrition-boost", count: 56 },
  { name: "Seed Treatment", nameUrdu: "بیج علاج", nameRoman: "Beej Ilaaj", icon: "seed", slug: "seed-treatment", count: 23 },
  { name: "Growth Regulators", nameUrdu: "نشوونما", nameRoman: "Nashonuma", icon: "growth", slug: "growth-regulators", count: 18 },
];

export const stats = {
  totalFarmers: 12500,
  productsDelivered: 45000,
  brandsAvailable: 35,
  citiesCovered: 120,
};
