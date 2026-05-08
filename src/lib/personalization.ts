import { products, type Product } from "@/data/mockData";

export interface CropProfile { crops: string[]; acreage: number; province?: string; }

export function getCropProfile(): CropProfile {
  try { return JSON.parse(localStorage.getItem("kc-crop-profile") || ""); }
  catch { return { crops: [], acreage: 0 }; }
}

export function saveCropProfile(p: CropProfile) {
  localStorage.setItem("kc-crop-profile", JSON.stringify(p));
}

export function getRecommendedProducts(limit = 6): Product[] {
  const { crops } = getCropProfile();
  let recentIds: number[] = [];
  try { recentIds = JSON.parse(localStorage.getItem("kc-recent") || "[]"); } catch {}

  const scored = products.map(p => {
    let score = p.soldCount / 1000;
    if (crops.length && p.targetCrops?.some(c => crops.includes(c))) score += 50;
    if (recentIds.includes(p.id)) score += 10;
    score += p.rating * 2;
    return { p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.p);
}
