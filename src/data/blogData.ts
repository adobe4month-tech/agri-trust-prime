export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  titleUrdu: string;
  excerpt: string;
  excerptUrdu: string;
  category: "crop-guides" | "pest-disease" | "seasonal" | "product-guides";
  image: string;
  date: string;
  readTime: number;
  author: string;
  content: string;
  contentUrdu: string;
  relatedProductIds: number[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "gandum-ki-fasal-mein-jari-booti-ka-ilaaj",
    title: "Complete Guide to Wheat Weed Control",
    titleUrdu: "Gandum Ki Fasal Mein Jari Booti Ka Mukammal Ilaaj",
    excerpt: "Learn how to effectively control weeds in wheat crops using modern herbicides and traditional methods.",
    excerptUrdu: "Gandum ki fasal mein jari booti ka masla aur uska hal — jadeed dawaiyon aur purane tariqon se.",
    category: "crop-guides",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
    date: "2026-03-15",
    readTime: 8,
    author: "Dr. Ahmad Raza",
    content: `## Why Weed Control Matters in Wheat

Weeds compete with wheat for water, nutrients, and sunlight. Uncontrolled weeds can reduce yield by 20-40%.

### Common Weeds in Pakistani Wheat Fields

1. **Bathu (Chenopodium)** — Most common broadleaf weed
2. **Dumbi Sitti (Phalaris minor)** — Grassy weed, very competitive
3. **Lehli (Wild Oat)** — Difficult to distinguish from wheat

### When to Spray

- **Pre-emergence**: Within 2-3 days after sowing
- **Post-emergence**: 30-35 days after sowing (best time)
- **Avoid** spraying during frost or extreme cold

### Recommended Products

For broadleaf weeds, use a selective herbicide. For grassy weeds, Clodinafop or Isoproturon-based products work best.

### Tips for Best Results

- Spray early morning or late evening
- Use clean water for mixing
- Don't spray if rain is expected within 6 hours
- Maintain correct dosage per acre`,
    contentUrdu: `## Gandum Mein Jari Booti Ka Nuqsan

Jari booti gandum se paani, ghiza aur dhoop cheenti hai. Agar control na kiya jaye to 20-40% tak paidawar kam ho sakti hai.

### Pakistan Mein Aam Jari Bootiyaan

1. **Bathu** — Sab se zyada payi jane wali chauri patti wali booti
2. **Dumbi Sitti** — Ghaas wali booti, bohat muqabla karti hai
3. **Lehli (Jangli Jai)** — Gandum se milti julti hai

### Spray Kab Karein

- **Ugne Se Pehle**: Buwai ke 2-3 din baad
- **Ugne Ke Baad**: Buwai ke 30-35 din baad (sab se acha waqt)
- **Na Karein** kora ya shadeed sardi mein

### Tajweez Karda Products

Chauri patti bootiyon ke liye selective herbicide. Ghaas bootiyon ke liye Clodinafop ya Isoproturon wali dawai.

### Behtareen Nateeje Ke Liye

- Subah sawere ya shaam ko spray karein
- Saaf paani istemal karein
- Agar 6 ghante mein baarish hone wali ho to spray na karein
- Sahi miqdar per acre rakhein`,
    relatedProductIds: [301, 302],
  },
  {
    id: 2,
    slug: "chawal-ke-keere-aur-unka-ilaaj",
    title: "Rice Pest Management: A Complete Guide",
    titleUrdu: "Chawal Ke Keere Aur Unka Mukammal Ilaaj",
    excerpt: "Identify and control common rice pests including stem borer, leaf folder, and BPH with effective pesticide solutions.",
    excerptUrdu: "Chawal ke aam keeron ki pehchaan aur unka ilaaj — tana chedak, patti lapetne wala keera, aur BPH.",
    category: "pest-disease",
    image: "https://images.unsplash.com/photo-1536304993881-460346389360?w=600&h=400&fit=crop",
    date: "2026-03-10",
    readTime: 10,
    author: "Prof. Tariq Mehmood",
    content: `## Common Rice Pests in Pakistan

### 1. Rice Stem Borer
The most damaging pest. Larvae bore into stems causing "dead hearts" in vegetative stage and "white heads" at maturity.

**Control**: Apply granular insecticide (Cartap Hydrochloride 4%) at 9kg/acre in standing water.

### 2. Rice Leaf Folder
Larvae fold leaves and feed inside, creating white streaks.

**Control**: Use Lambda Cyhalothrin spray at first sign of damage.

### 3. Brown Plant Hopper (BPH)
Sucks sap from base of plant, causing "hopper burn" — plants dry from center outward.

**Control**: Avoid excessive nitrogen. Use targeted insecticides.

### Integrated Pest Management Tips

- Monitor fields weekly
- Use pheromone traps for stem borer
- Maintain proper water management
- Avoid indiscriminate pesticide use
- Release Trichogramma parasitoids for biological control`,
    contentUrdu: `## Pakistan Mein Chawal Ke Aam Keere

### 1. Tana Chedak
Sab se zyada nuqsan dene wala keera. Larvae tane mein daakhil ho kar "dead hearts" aur "white heads" banate hain.

**Ilaaj**: Cartap Hydrochloride 4% daanedar dawa 9kg/acre khari paani mein daalein.

### 2. Patti Lapetne Wala Keera
Larvae patti ko lapet kar andar se khaate hain, safed dhaarian banti hain.

**Ilaaj**: Pehli nishani par Lambda Cyhalothrin spray karein.

### 3. Bhura Paudha Choosne Wala (BPH)
Paudhe ki buniyad se ras choosta hai, paudhe beech se sukh jaate hain.

**Ilaaj**: Zyada nitrogen se bachein. Nishana banakar dawa lagayein.

### IPM Tips

- Hafta war khet ka muaina karein
- Tana chedak ke liye pheromone traps lagayein
- Paani ka sahi intezam rakhein
- Be-soch samajh dawa na lagayein`,
    relatedProductIds: [303, 304, 305],
  },
  {
    id: 3,
    slug: "kapas-ki-bimariyan-aur-ilaaj",
    title: "Cotton Disease Control: Prevention & Treatment",
    titleUrdu: "Kapas Ki Bimariyan Aur Unka Ilaaj",
    excerpt: "Learn to identify and treat cotton diseases like CLCV, bacterial blight, and fusarium wilt in Pakistani conditions.",
    excerptUrdu: "Kapas ki aam bimariyan jaise CLCV, jraseem ka asar, aur murjhana — pehchaan aur ilaaj.",
    category: "pest-disease",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=400&fit=crop",
    date: "2026-02-28",
    readTime: 7,
    author: "Dr. Saima Naz",
    content: `## Major Cotton Diseases

### Cotton Leaf Curl Virus (CLCV)
Most devastating disease of cotton in Pakistan. Spread by whitefly.

**Symptoms**: Upward/downward curling of leaves, thickened veins, stunted growth.

**Prevention**: Use CLCV-tolerant varieties. Control whitefly population early.

### Bacterial Blight
Angular water-soaked lesions on leaves that turn brown.

**Treatment**: Copper-based fungicides. Remove infected plant debris.

### Fusarium Wilt
Plants wilt despite adequate water. Brown discoloration inside stem.

**Prevention**: Resistant varieties. Crop rotation with cereals.

### Best Practices
- Scout fields twice weekly
- Control sucking pests early
- Use balanced fertilization
- Avoid water stress during flowering`,
    contentUrdu: `## Kapas Ki Aham Bimariyan

### Cotton Leaf Curl Virus (CLCV)
Pakistan mein kapas ki sab se tabah kun bimari. Safed makhi se phelti hai.

**Nishaniyan**: Patton ka upar/neeche mudna, moteen nasen, pauda ruk jana.

**Bachao**: CLCV bardasht karne wali aqsaam lagayein. Safed makhi jaldi control karein.

### Jraseem Ka Asar
Patton par kone dar paani bhare nishaan jo bhure ho jaate hain.

**Ilaaj**: Copper wali fungicide. Mutasira paudon ke hisse hatayein.

### Murjhana
Paani hone ke bawajood paudhe murjha jaate hain. Tane ke andar bhura rang.

**Bachao**: Muzaham aqsaam. Anaaj ke saath badal badal kar kashtkari.

### Behtareen Tareeqe
- Hafte mein do baar khet dekhein
- Choosne wale keere jaldi control karein
- Mutawazin khaad dein
- Phool ke waqt paani ki kami na hone dein`,
    relatedProductIds: [305],
  },
  {
    id: 4,
    slug: "kharif-season-ki-tayyari",
    title: "Kharif Season Preparation Guide 2026",
    titleUrdu: "Kharif Season 2026 Ki Tayyari Ka Mukammal Guide",
    excerpt: "Complete preparation checklist for the Kharif (summer) cropping season — from soil preparation to seed selection.",
    excerptUrdu: "Kharif (garmi) ke mausam ki kasht ki mukammal tayyari — zameen ki tayyari se beej ke intikhab tak.",
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    date: "2026-03-25",
    readTime: 6,
    author: "Dr. Ahmad Raza",
    content: `## Kharif Season 2026 Planning

### Key Crops
- **Rice** — Punjab & Sindh lowlands
- **Cotton** — Southern Punjab
- **Maize** — KPK & Northern Punjab
- **Sugarcane** — All irrigated areas
- **Vegetables** — Periurban areas

### Soil Preparation Timeline
1. **March**: Get soil tested for pH and nutrients
2. **April**: Deep plowing and leveling
3. **May**: Pre-sowing irrigation and seed bed preparation

### Seed Selection Tips
- Always buy certified/hybrid seeds
- Check germination rate (should be >90%)
- Match variety to your area's climate
- Buy from authorized dealers only

### Essential Inputs to Stock
- DAP & Urea for basal application
- Pre-emergence herbicides
- Seed treatment chemicals
- Micronutrient sprays (Zinc, Boron)`,
    contentUrdu: `## Kharif Season 2026 Ki Planning

### Aham Faslen
- **Chawal** — Punjab aur Sindh ke neechle ilaaqe
- **Kapas** — Junoobi Punjab
- **Makki** — KPK aur Shumali Punjab
- **Ganna** — Tamam aabpashi ilaaqe
- **Sabziyan** — Shehron ke qareeb

### Zameen Ki Tayyari Ka Schedule
1. **March**: Mitti ka test karwayein pH aur ghizaiyat ke liye
2. **April**: Gehri hel aur zameen barabar karein
3. **May**: Buwai se pehle paani lagayein aur bistar tayyar karein

### Beej Ka Intikhab
- Hamesha certified/hybrid beej khareedein
- Ugne ki dar check karein (90% se zyada ho)
- Apne ilaaqe ki aab-o-hawa ke mutabiq qism chunein
- Sirf authorized dealer se khareedein

### Zaruri Cheezein Jo Jama Karein
- DAP aur Urea buniyadi khaad ke liye
- Ugne se pehle jari booti ki dawa
- Beej ka ilaaj karne wali dawaiyan
- Micronutrient spray (Zinc, Boron)`,
    relatedProductIds: [308, 315],
  },
  {
    id: 5,
    slug: "herbicide-ka-sahi-istemal",
    title: "How to Use Herbicides Correctly",
    titleUrdu: "Herbicide Ka Sahi Istemal Kaise Karein",
    excerpt: "A practical guide on herbicide application — timing, mixing, spraying techniques, and common mistakes to avoid.",
    excerptUrdu: "Jari booti ki dawa ka amal — waqt, mixture, spray technique, aur aam ghaltiyon se bachao.",
    category: "product-guides",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop",
    date: "2026-03-20",
    readTime: 5,
    author: "Prof. Tariq Mehmood",
    content: `## Herbicide Application Guide

### Step 1: Read the Label
Always read the product label carefully. Note:
- Target weeds
- Recommended dosage
- Crops where it can be used
- Safety precautions

### Step 2: Timing is Everything
- **Pre-emergence**: Apply 1-3 days after sowing, before weeds appear
- **Post-emergence**: Apply when weeds are 2-4 leaf stage
- Best time: Early morning or late evening
- Avoid windy conditions (>10 km/h)

### Step 3: Proper Mixing
1. Fill tank half with clean water
2. Add measured herbicide
3. Fill remaining water
4. Agitate well before spraying

### Step 4: Calibrate Your Sprayer
- Walk at consistent speed
- Use flat fan nozzles for even coverage
- Maintain 40-50 PSI pressure
- Spray volume: 100-120 liters per acre

### Common Mistakes
- Using dirty water (reduces effectiveness by 30%)
- Spraying in hot afternoon (herbicide evaporates)
- Under/over-dosing (resistance or crop damage)
- Not cleaning sprayer after use`,
    contentUrdu: `## Herbicide Lagane Ka Tareeqa

### Qadam 1: Label Parhein
Hamesha product ka label ghour se parhein:
- Nishana bootiyan
- Sahi miqdar
- Kin faslon mein istemal ho sakta hai
- Hifazati tadabeer

### Qadam 2: Waqt Sab Se Aham Hai
- **Ugne Se Pehle**: Buwai ke 1-3 din baad
- **Ugne Ke Baad**: Jab bootiyon ke 2-4 patte hon
- Behtareen waqt: Subah sawere ya shaam ko
- Hawa mein na karein (10 km/h se zyada)

### Qadam 3: Sahi Mixture
1. Tank aadha saaf paani se bharein
2. Naapi hui dawa daalein
3. Baaqi paani bhardein
4. Achhi tarah hilayein

### Qadam 4: Sprayer Set Karein
- Ek jaisi raftaar se chalein
- Flat fan nozzle istemal karein
- 40-50 PSI pressure rakhein
- 100-120 liter per acre spray karein

### Aam Ghaltiyaan
- Ganda paani (asar 30% kam)
- Dopehar ki garmi mein spray (dawa urr jaati hai)
- Kam ya zyada miqdar (muzahimat ya fasal ka nuqsan)
- Spray ke baad sprayer saaf na karna`,
    relatedProductIds: [301, 302],
  },
  {
    id: 6,
    slug: "makki-ke-beej-ka-intikhab",
    title: "Choosing the Right Corn/Maize Seed",
    titleUrdu: "Makki Ke Beej Ka Sahi Intikhab",
    excerpt: "How to select the best corn hybrid for your farm — factors like maturity, yield potential, and drought tolerance.",
    excerptUrdu: "Apne khet ke liye behtareen makki ka hybrid kaise chunein — pakne ka waqt, paidawar, aur khushk-sali bardasht.",
    category: "crop-guides",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=400&fit=crop",
    date: "2026-02-20",
    readTime: 6,
    author: "Dr. Saima Naz",
    content: `## Corn Seed Selection Guide

### Why Hybrid Seeds?
Hybrid corn seeds offer:
- 30-40% higher yield than open-pollinated varieties
- Better disease resistance
- Uniform maturity
- Drought tolerance

### Key Factors to Consider

**1. Purpose**
- Grain production → Choose grain-type hybrids
- Silage/fodder → Choose tall, leafy varieties (like 3575)
- Baby corn → Early maturity varieties

**2. Maturity Days**
- Early: 90-100 days
- Medium: 100-115 days
- Late: 115-130 days

**3. Climate Match**
- Hot, dry areas → Drought-tolerant hybrids
- Irrigated areas → High-yield potential varieties
- Rain-fed areas → Medium maturity, hardy varieties

### Recommended Sowing Practices
- Seed rate: 8-10 kg per acre
- Row spacing: 75 cm
- Plant spacing: 20-25 cm
- Depth: 5-7 cm
- Soak seeds in water for 12 hours before sowing for better germination`,
    contentUrdu: `## Makki Ka Beej Chunne Ka Guide

### Hybrid Beej Kyun?
- 30-40% zyada paidawar
- Bimariyon se zyada bachao
- Ek saath pakti hai
- Khushki bardasht karti hai

### Aham Baatein

**1. Maqsad**
- Daana → Daane wali hybrid
- Silage/chara → Lambi, patti wali qism (jaise 3575)
- Baby corn → Jaldi pakne wali

**2. Pakne Ka Waqt**
- Jaldi: 90-100 din
- Darmiyani: 100-115 din
- Der Se: 115-130 din

**3. Mausam Se Match**
- Garm, khushk → Khushki bardasht wali hybrid
- Aabpashi → Zyada paidawar wali
- Baarani → Darmiyani, mazboot qism

### Buwai Ka Tareeqa
- Beej ki miqdar: 8-10 kg per acre
- Qataaron mein faasla: 75 cm
- Paudon mein faasla: 20-25 cm
- Gehrai: 5-7 cm
- Buwai se pehle beej 12 ghante paani mein bhigo lein`,
    relatedProductIds: [308],
  },
  {
    id: 7,
    slug: "sabziyon-ki-nursery-ka-tareeqa",
    title: "Vegetable Nursery Raising Guide",
    titleUrdu: "Sabziyon Ki Nursery Tayyar Karne Ka Tareeqa",
    excerpt: "Step-by-step guide to raising healthy vegetable nurseries for brinjal, bottle gourd, peppers, and tomatoes.",
    excerptUrdu: "Baingan, kaddu, mirch aur tamatar ki nursery tayyar karne ka qadam ba qadam tareeqa.",
    category: "crop-guides",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    date: "2026-02-15",
    readTime: 7,
    author: "Dr. Ahmad Raza",
    content: `## Vegetable Nursery Guide

### Why Raise a Nursery?
- Better germination control
- Stronger seedlings
- Earlier transplanting
- Reduced seed wastage

### Materials Needed
- Seed trays or raised beds
- Well-decomposed compost/FYM
- Seed treatment fungicide
- Shade net (for summer)
- Watering can with fine rose

### Step-by-Step Process

**1. Prepare Growing Medium**
Mix: 1 part garden soil + 1 part compost + 1 part sand

**2. Seed Treatment**
Treat seeds with Thiram or Carbendazim to prevent damping off disease.

**3. Sowing**
- Make shallow furrows 1 cm deep
- Space seeds 2 cm apart
- Cover lightly with soil
- Water gently

**4. Care**
- Water twice daily (morning + evening)
- Protect from direct sun for first week
- Thin out weak seedlings after 2 weeks
- Transplant when 4-6 true leaves appear (25-30 days)`,
    contentUrdu: `## Sabzi Ki Nursery Guide

### Nursery Kyun Banayein?
- Ugne par behtar control
- Mazboot paudhe
- Jaldi lagayein
- Beej ka zaya kam

### Zaruri Cheezein
- Beej ki tray ya oonchi kyaari
- Gali sari khaad
- Beej ke ilaaj ki dawa
- Shade net (garmi ke liye)
- Barish ki shower wali can

### Qadam Ba Qadam

**1. Ugane Ka Mixture**
Milayein: 1 hissa mitti + 1 hissa khaad + 1 hissa ret

**2. Beej Ka Ilaaj**
Thiram ya Carbendazim se beej ka ilaaj karein.

**3. Buwai**
- 1 cm gehri lakeerin banayein
- Beej 2 cm ke faasle par rakhein
- Halki mitti se dhakein
- Ahista paani dein

**4. Dekhbhaal**
- Din mein do baar paani (subah + shaam)
- Pehle hafte seedhi dhoop se bachayein
- 2 hafte baad kamzor paudhe nikaalein
- 4-6 patte aane par lagayein (25-30 din)`,
    relatedProductIds: [311, 315],
  },
  {
    id: 8,
    slug: "pesticide-safety-guide",
    title: "Pesticide Safety: Protect Yourself & Your Crop",
    titleUrdu: "Dawa Ki Hifazat: Apni Aur Fasal Ki Hifazat Karein",
    excerpt: "Essential safety guidelines when handling and applying pesticides — PPE, storage, and emergency procedures.",
    excerptUrdu: "Dawa istemal karte waqt zaroori hifazati guidelines — PPE, storage, aur emergency.",
    category: "product-guides",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop",
    date: "2026-01-30",
    readTime: 5,
    author: "Prof. Tariq Mehmood",
    content: `## Pesticide Safety Guide

### Before Spraying
- Read the label completely
- Wear PPE: gloves, mask, goggles, long sleeves
- Check sprayer for leaks
- Don't eat, drink or smoke while handling pesticides

### During Application
- Spray with the wind, not against it
- Keep children and animals away
- Don't spray near water sources
- Take breaks every 30 minutes in hot weather

### After Spraying
- Wash hands and face with soap
- Change clothes immediately
- Clean sprayer thoroughly
- Store leftover pesticide in original container
- Don't reuse pesticide containers for food/water

### Emergency
- If skin contact: Wash with plenty of water
- If swallowed: Don't induce vomiting, rush to hospital
- If eye contact: Flush with clean water for 15 minutes
- Always keep the product label to show the doctor`,
    contentUrdu: `## Dawa Ki Hifazat Ka Guide

### Spray Se Pehle
- Label poora parhein
- PPE pehnein: dastane, mask, chasma, lambi aasteen
- Sprayer mein leakage check karein
- Dawa sambhalte waqt kuch khayein piyein na

### Spray Karte Waqt
- Hawa ki taraf spray karein, ulti taraf nahi
- Bachon aur jaanwaron ko door rakhein
- Paani ke qareeb spray na karein
- Garmi mein har 30 minute baad break lein

### Spray Ke Baad
- Saabun se haath mooh dhoyein
- Kapre foran badlein
- Sprayer achhi tarah saaf karein
- Bachi hui dawa asli bottle mein rakhein
- Dawa ke bartan khane peene ke liye istemal na karein

### Emergency
- Jild par lage: Bohat paani se dhoyein
- Nigal lein: Ulti na karayein, foran hospital jayein
- Aankhon mein: 15 minute saaf paani se dhoyein
- Doctor ko dikhane ke liye label saath rakhein`,
    relatedProductIds: [305, 303],
  },
];
