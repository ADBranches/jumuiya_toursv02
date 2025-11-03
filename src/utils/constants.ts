// src/utils/constants.ts

// 🏞️ DESTINATIONS
export const destinations = [
  {
    id: 1,
    name: "Bwindi Impenetrable Forest",
    description:
      "Home to half of the world’s mountain gorillas and a UNESCO World Heritage Site.",
    image: "/src/assets/images/bwindi.webp",
    location: "Southwestern Uganda",
  },
  {
    id: 2,
    name: "Murchison Falls National Park",
    description:
      "Uganda’s largest park, where the Nile explodes through a narrow gorge to form the falls.",
    image: "/src/assets/images/murchison.webp",
    location: "Northwestern Uganda",
  },
  {
    id: 3,
    name: "Queen Elizabeth National Park",
    description:
      "Famous for tree-climbing lions, volcanic crater lakes, and diverse wildlife.",
    image: "/src/assets/images/queen-elizabeth.webp",
    location: "Western Uganda",
  },
  {
    id: 4,
    name: "Lake Bunyonyi",
    description:
      "A serene lake surrounded by terraced hills — perfect for relaxation and canoeing.",
    image: "/src/assets/images/lake-bunyonyi.webp",
    location: "Kabale, Southwestern Uganda",
  },
  {
    id: 5,
    name: "Rwenzori Mountains",
    description:
      "Known as the ‘Mountains of the Moon,’ offering Africa’s most scenic alpine hiking.",
    image: "/src/assets/images/rwenzori.webp",
    location: "Kasese District",
  },
  {
    id: 6,
    name: "Sipi Falls",
    description:
      "A series of beautiful waterfalls at the foothills of Mount Elgon, ideal for hiking.",
    image: "/src/assets/images/sipi-falls.webp",
    location: "Eastern Uganda",
  },
];

// 🚐 POPULAR TOURS (used in PopularTours.tsx)
export const tours = [
  {
    id: 1,
    name: "3-Day Gorilla Trekking Adventure",
    description:
      "Track endangered mountain gorillas in Bwindi with expert rangers and local guides.",
    price: "$1,200",
    duration: "3 Days / 2 Nights",
    image: "/src/assets/images/bwindi.webp",
  },
  {
    id: 2,
    name: "5-Day Murchison & Ziwa Rhino Safari",
    description:
      "Discover Murchison Falls, cruise the Nile, and meet rhinos at Ziwa Sanctuary.",
    price: "$1,850",
    duration: "5 Days / 4 Nights",
    image: "/src/assets/images/murchison-rhinos.webp",
  },
  {
    id: 3,
    name: "7-Day Western Circuit Expedition",
    description:
      "Explore Fort Portal, Queen Elizabeth Park, and crater lakes — a western Uganda gem.",
    price: "$2,300",
    duration: "7 Days / 6 Nights",
    image: "/src/assets/images/birds.webp",
  },
  {
    id: 4,
    name: "Weekend at Sipi Falls",
    description:
      "Perfect for hiking, abseiling, and scenic photography — ideal short escape.",
    price: "$600",
    duration: "2 Days / 1 Night",
    image: "/src/assets/images/sipi-falls.webp",
  },
  {
    id: 5,
    name: "Rwenzori Summit Challenge",
    description:
      "A guided climb through Uganda’s alpine peaks — breathtaking adventure for hikers.",
    price: "$3,500",
    duration: "10 Days / 9 Nights",
    image: "/src/assets/images/rwenzori-challenge.webp",
  },
];

// 💬 TESTIMONIALS
export const testimonials = [
  {
    id: 1,
    name: "Grace N.",
    comment:
      "Jumuiya Tours made my gorilla trek unforgettable. The guides were knowledgeable and kind!",
  },
  {
    id: 2,
    name: "Michael T.",
    comment:
      "From Kampala to the Rwenzori peaks — every detail was perfect. Highly recommend!",
  },
  {
    id: 3,
    name: "Sarah K.",
    comment:
      "The cultural village experience in Fort Portal gave me a new appreciation for Ugandan heritage.",
  },
];

// 🖼️ GALLERY (used in GallerySection.tsx)
export const gallery = [
  {
    src: "/src/assets/images/bwindi.webp",
    alt: "Bwindi Impenetrable Forest",
  },
  {
    src: "/src/assets/images/murchison.webp",
    alt: "Murchison Falls National Park",
  },
  {
    src: "/src/assets/images/queen-elizabeth.webp",
    alt: "Queen Elizabeth National Park",
  },
  {
    src: "/src/assets/images/lake-bunyonyi.webp",
    alt: "Lake Bunyonyi",
  },
  {
    src: "/src/assets/images/rwenzori.webp",
    alt: "Rwenzori Mountains",
  },
  {
    src: "/src/assets/images/sipi-falls.webp",
    alt: "Sipi Falls",
  },
];

// 🎨 SHARED COLORS
export const colors = {
  primary: "#047857",  // Green
  accent: "#f59e0b",   // Yellow
  dark: "#111827",     // Deep Gray
  light: "#ffffff",    // White
};
