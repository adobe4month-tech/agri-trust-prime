export interface VideoEntry {
  id: string;
  youtubeId: string;
  title: string;
  titleUrdu: string;
  category: "demos" | "crop-care" | "seasonal";
  duration: string;
}

export const videos: VideoEntry[] = [
  { id: "v1", youtubeId: "dQw4w9WgXcQ", title: "How to Spray Pesticides Correctly", titleUrdu: "Keeron Ki Dawa Ka Sahi Tareeqa", category: "demos", duration: "8:24" },
  { id: "v2", youtubeId: "dQw4w9WgXcQ", title: "Rice Weed Control — Complete Guide", titleUrdu: "Chawal Mein Jari Booti Ka Mukammal Hal", category: "crop-care", duration: "12:05" },
  { id: "v3", youtubeId: "dQw4w9WgXcQ", title: "Kharif Season Preparation Tips", titleUrdu: "Kharif Season Ki Tayyari", category: "seasonal", duration: "10:30" },
  { id: "v4", youtubeId: "dQw4w9WgXcQ", title: "Fertilizer Application Methods", titleUrdu: "Khaad Lagane Ka Sahi Tareeqa", category: "demos", duration: "7:15" },
  { id: "v5", youtubeId: "dQw4w9WgXcQ", title: "Cotton Pest Identification", titleUrdu: "Kapas Ke Keeron Ki Pehchaan", category: "crop-care", duration: "9:45" },
  { id: "v6", youtubeId: "dQw4w9WgXcQ", title: "Wheat Sowing — Rabi Season Guide", titleUrdu: "Gandum Ki Kasht — Rabi Season", category: "seasonal", duration: "11:20" },
  { id: "v7", youtubeId: "dQw4w9WgXcQ", title: "Seed Treatment Before Sowing", titleUrdu: "Beej Ka Ilaaj — Kasht Se Pehle", category: "demos", duration: "6:50" },
  { id: "v8", youtubeId: "dQw4w9WgXcQ", title: "Maize Silage Production Guide", titleUrdu: "Makki Se Silage Banana", category: "crop-care", duration: "14:10" },
];

export const videoCategories = [
  { key: "all" as const, label: "All Videos", labelUrdu: "Sab Videos" },
  { key: "demos" as const, label: "Product Demos", labelUrdu: "Product Demos" },
  { key: "crop-care" as const, label: "Crop Care", labelUrdu: "Fasal Ki Hifazat" },
  { key: "seasonal" as const, label: "Seasonal Tips", labelUrdu: "Mausmi Tips" },
];
