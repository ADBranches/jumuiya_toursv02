// src/services/destinationService.ts
import type { Destination } from "../types/destination";

// ✅ Safe dynamic image import (Vite 7 SSR-compatible)
const image = (name: string) =>
  new URL(`../assets/images/${name}`, import.meta.url).href;

// ✅ Mock dataset
const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Bwindi Impenetrable Forest",
    region: "Western Uganda",
    difficulty: "Moderate",
    image: image("bwindi.webp"),
    description:
      "Home to half of the world’s mountain gorillas. Trek through misty rainforests for an unforgettable encounter.",
  },
  {
    id: 2,
    name: "Murchison Falls National Park",
    region: "Northern Uganda",
    difficulty: "Easy",
    image: image("murchison.webp"),
    description:
      "Witness the world’s most powerful waterfall and diverse wildlife along the Nile River.",
  },
  {
    id: 3,
    name: "Rwenzori Mountains",
    region: "Western Uganda",
    difficulty: "Hard",
    image: image("rwenzori.webp"),
    description:
      "The mystical ‘Mountains of the Moon’ — perfect for climbers and nature lovers.",
  },
  {
    id: 4,
    name: "Queen Elizabeth National Park",
    region: "Western Uganda",
    difficulty: "Easy",
    image: image("queen-elizabeth.webp"),
    description:
      "Known for tree-climbing lions, crater lakes, and a wide range of wildlife experiences.",
  },
];

// ✅ Exported service
export const destinationService = {
  async getAll(filters?: { region?: string; difficulty?: string; search?: string }) {
    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    let results = [...DESTINATIONS];

    if (filters?.search) {
      const term = filters.search.toLowerCase();
      results = results.filter((d) => d.name?.toLowerCase().includes(term));
    }

    if (filters?.region) {
      results = results.filter(
        (d) => d.region?.toLowerCase() === filters.region.toLowerCase()
      );
    }

    if (filters?.difficulty) {
      results = results.filter(
        (d) => d.difficulty?.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }

    console.log("✅ Destinations returned:", results);
    return results;
  },
};
