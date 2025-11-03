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


export const countries = [
  { name: "Uganda", dial_code: "+256", code: "UG" },
  { name: "Kenya", dial_code: "+254", code: "KE" },
  { name: "Tanzania", dial_code: "+255", code: "TZ" },
  { name: "Rwanda", dial_code: "+250", code: "RW" },
  { name: "South Sudan", dial_code: "+211", code: "SS" },
  { name: "United States", dial_code: "+1", code: "US" },
  { name: "United Kingdom", dial_code: "+44", code: "GB" },
  { name: "Canada", dial_code: "+1", code: "CA" },
  { name: "Australia", dial_code: "+61", code: "AU" },
  { name: "New Zealand", dial_code: "+64", code: "NZ" },
  { name: "India", dial_code: "+91", code: "IN" },
  { name: "Brazil", dial_code: "+55", code: "BR" },
  { name: "Argentina", dial_code: "+54", code: "AR" },
  { name: "Mexico", dial_code: "+52", code: "MX" },
  { name: "Colombia", dial_code: "+57", code: "CO" },
  { name: "Peru", dial_code: "+51", code: "PE" },
  { name: "Chile", dial_code: "+56", code: "CL" },
  { name: "Ecuador", dial_code: "+593", code: "EC" },
  { name: "Paraguay", dial_code: "+595", code: "PY" },
  { name: "Bolivia", dial_code: "+591", code: "BO" },
  { name: "Venezuela", dial_code: "+58", code: "VE" },
  { name: "Guyana", dial_code: "+592", code: "GY" },
  { name: "Suriname", dial_code: "+597", code: "SR" },
  { name: "French Guiana", dial_code: "+594", code: "GF" },
  { name: "Uruguay", dial_code: "+598", code: "UY" },
  { name: "Panama", dial_code: "+507", code: "PA" },
  { name: "Costa Rica", dial_code: "+506", code: "CR" },
  { name: "Nicaragua", dial_code: "+505", code: "NI" },
  { name: "El Salvador", dial_code: "+503", code: "SV" },
  { name: "Honduras", dial_code: "+504", code: "HN" },
  { name: "Guatemala", dial_code: "+502", code: "GT" },
  { name: "Belize", dial_code: "+501", code: "BZ" },
  { name: "Cuba", dial_code: "+53", code: "CU" },
  { name: "Dominican Republic", dial_code: "+1", code: "DO" },
  { name: "Jamaica", dial_code: "+1", code: "JM" },
  { name: "Barbados", dial_code: "+1", code: "BB" },
  { name: "Trinidad and Tobago", dial_code: "+1", code: "TT" },
  { name: "Bahamas", dial_code: "+1", code: "BS" },
  { name: "Cayman Islands", dial_code: "+1", code: "KY" },
  { name: "Turks and Caicos Islands", dial_code: "+1", code: "TC" },
  { name: "Greenland", dial_code: "+299", code: "GL" },
  { name: "Iceland", dial_code: "+354", code: "IS" },
  { name: "Faroe Islands", dial_code: "+298", code: "FO" },
  { name: "Norway", dial_code: "+47", code: "NO" },
  { name: "Sweden", dial_code: "+46", code: "SE" },
  { name: "Denmark", dial_code: "+45", code: "DK" },
  { name: "Finland", dial_code: "+358", code: "FI" },
  { name: "Estonia", dial_code: "+372", code: "EE" },
  { name: "Latvia", dial_code: "+371", code: "LV" },
  { name: "Lithuania", dial_code: "+370", code: "LT" },
  { name: "Malta", dial_code: "+356", code: "MT" },
  { name: "Cyprus", dial_code: "+357", code: "CY" },
  { name: "Greece", dial_code: "+30", code: "GR" },
  { name: "Ireland", dial_code: "+353", code: "IE" },
  { name: "Democratic Republic of the Congo", dial_code: "+243", code: "CD" },
  { name: "Republic of the Congo", dial_code: "+242", code: "CG" },
  { name: "Angola", dial_code: "+244", code: "AO" },
  { name: "Zambia", dial_code: "+260", code: "ZM" },
  { name: "Malawi", dial_code: "+265", code: "MW" },
  { name: "Mozambique", dial_code: "+258", code: "MZ" },
  { name: "Zimbabwe", dial_code: "+263", code: "ZW" },
  { name: "Botswana", dial_code: "+267", code: "BW" },
  { name: "Namibia", dial_code: "+264", code: "NA" },
  { name: "South Africa", dial_code: "+27", code: "ZA" },
  { name: "Lesotho", dial_code: "+266", code: "LS" },
  { name: "Swaziland", dial_code: "+268", code: "SZ" },
  { name: "Mauritius", dial_code: "+230", code: "MU" },
  { name: "Mauritania", dial_code: "+222", code: "MR" },
  { name: "Senegal", dial_code: "+221", code: "SN" },
  { name: "Gambia", dial_code: "+220", code: "GM" },
  { name: "Sierra Leone", dial_code: "+232", code: "SL" },
  { name: "Liberia", dial_code: "+231", code: "LR" },
  { name: "Togo", dial_code: "+228", code: "TG" },
  { name: "Burkina Faso", dial_code: "+226", code: "BF" },
  { name: "Niger", dial_code: "+227", code: "NE" },
  { name: "Tunisia", dial_code: "+216", code: "TN" },
  { name: "Libya", dial_code: "+218", code: "LY" },
  { name: "Algeria", dial_code: "+213", code: "DZ" },
  { name: "Morocco", dial_code: "+212", code: "MA" },
  { name: "Egypt", dial_code: "+20", code: "EG" },
  { name: "Sudan", dial_code: "+249", code: "SD" },
  { name : "Ethiopia", dial_code: "+251", code: "ET" },
  { name : "Somalia", dial_code: "+252", code: "SO" },
  { name : "Djibouti", dial_code: "+253", code: "DJ" },
  { name : "France", dial_code: "+33", code: "FR" },
  { name : "Germany", dial_code: "+49", code: "DE" },
  { name : "Italy", dial_code: "+39", code: "IT" },
  { name : "Spain", dial_code: "+34", code: "ES" },
  { name : "Portugal", dial_code: "+351", code: "PT" },
  { name : "Netherlands", dial_code: "+31", code: "NL" },
  { name : "Belgium", dial_code: "+32", code: "BE" },
  { name : "Switzerland", dial_code: "+41", code: "CH" },
  { name : "Austria", dial_code: "+43", code: "AT" },
  
];
