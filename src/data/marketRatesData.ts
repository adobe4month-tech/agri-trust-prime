export interface CropRate {
  crop: string;
  cropUrdu: string;
  unit: string;
  cities: Record<string, number>;
}

export const marketRates: CropRate[] = [
  { crop: "Wheat", cropUrdu: "گندم", unit: "40kg", cities: { Lahore: 4200, Multan: 4100, Faisalabad: 4150, Sargodha: 4050, Rawalpindi: 4300, Bahawalpur: 4000 } },
  { crop: "Rice (IRRI-6)", cropUrdu: "چاول", unit: "40kg", cities: { Lahore: 5800, Multan: 5600, Faisalabad: 5700, Sargodha: 5500, Rawalpindi: 5900, Bahawalpur: 5400 } },
  { crop: "Rice (Super Basmati)", cropUrdu: "باسمتی چاول", unit: "40kg", cities: { Lahore: 12500, Multan: 12000, Faisalabad: 12200, Sargodha: 11800, Rawalpindi: 12800, Bahawalpur: 11500 } },
  { crop: "Cotton (Phutti)", cropUrdu: "پھٹی", unit: "40kg", cities: { Lahore: 8500, Multan: 8200, Faisalabad: 8300, Sargodha: 8000, Rawalpindi: 8600, Bahawalpur: 8100 } },
  { crop: "Maize", cropUrdu: "مکئی", unit: "40kg", cities: { Lahore: 3200, Multan: 3100, Faisalabad: 3150, Sargodha: 3000, Rawalpindi: 3300, Bahawalpur: 2950 } },
  { crop: "Sugarcane", cropUrdu: "گنا", unit: "40kg", cities: { Lahore: 450, Multan: 420, Faisalabad: 440, Sargodha: 410, Rawalpindi: 460, Bahawalpur: 400 } },
  { crop: "Mustard (Sarson)", cropUrdu: "سرسوں", unit: "40kg", cities: { Lahore: 7200, Multan: 7000, Faisalabad: 7100, Sargodha: 6900, Rawalpindi: 7400, Bahawalpur: 6800 } },
  { crop: "Gram (Chana)", cropUrdu: "چنا", unit: "40kg", cities: { Lahore: 6800, Multan: 6500, Faisalabad: 6600, Sargodha: 6400, Rawalpindi: 7000, Bahawalpur: 6300 } },
];

export const cities = ["Lahore", "Multan", "Faisalabad", "Sargodha", "Rawalpindi", "Bahawalpur"];
