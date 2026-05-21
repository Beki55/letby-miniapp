// Mock data for Letby marketplace UI

export type Category =
  | "All"
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Beauty"
  | "Sports"
  | "Vehicles";

export const categories: Category[] = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Vehicles",
];

export interface Seller {
  id: string;
  name: string;
  username: string;
  avatar: string;
  trustScore: number;
  verified: boolean;
  totalSales: number;
  joinedYear: number;
  responseTime: string;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  minPrice: number;
  stock: number;
  category: Category;
  image: string;
  images: string[];
  description: string;
  city: string;
  postedAt: string;
  negotiable: boolean;
  seller: Seller;
  views: number;
}

export interface Review {
  id: string;
  buyer: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const sellers: Seller[] = [
  {
    id: "s1",
    name: "Hanna M.",
    username: "@hanna_addis",
    avatar: "https://i.pravatar.cc/120?img=47",
    trustScore: 96,
    verified: true,
    totalSales: 142,
    joinedYear: 2023,
    responseTime: "~12 min",
  },
  {
    id: "s2",
    name: "Yonas T.",
    username: "@yonas_t",
    avatar: "https://i.pravatar.cc/120?img=12",
    trustScore: 88,
    verified: true,
    totalSales: 56,
    joinedYear: 2024,
    responseTime: "~1 hr",
  },
  {
    id: "s3",
    name: "Selam B.",
    username: "@selam_b",
    avatar: "https://i.pravatar.cc/120?img=32",
    trustScore: 74,
    verified: false,
    totalSales: 18,
    joinedYear: 2025,
    responseTime: "~3 hr",
  },
];

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=80&sig=${seed}`;

export const listings: Listing[] = [
  {
    id: "l1",
    title: "iPhone 13 Pro 256GB — Sierra Blue",
    price: 78000,
    minPrice: 72000,
    stock: 1,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611077544449-5f00f0c1c7c8?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Lightly used, no scratches. Comes with original box, cable and 86% battery health. Open to inspection in Bole.",
    city: "Addis Ababa",
    postedAt: "2h ago",
    negotiable: true,
    seller: sellers[0],
    views: 412,
  },
  {
    id: "l2",
    title: "Habesha Kemis — handwoven cotton",
    price: 4200,
    minPrice: 3500,
    stock: 6,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=800&q=80"],
    description: "Authentic handwoven Habesha kemis with tilet embroidery. Multiple sizes available.",
    city: "Addis Ababa",
    postedAt: "5h ago",
    negotiable: true,
    seller: sellers[1],
    views: 184,
  },
  {
    id: "l3",
    title: "MacBook Air M2 — 8GB / 256GB",
    price: 132000,
    minPrice: 125000,
    stock: 1,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"],
    description: "Sealed box, 1 year international warranty. Bought from Dubai.",
    city: "Addis Ababa",
    postedAt: "1d ago",
    negotiable: false,
    seller: sellers[0],
    views: 902,
  },
  {
    id: "l4",
    title: "Ethiopian leather sofa — 3 seater",
    price: 28500,
    minPrice: 25000,
    stock: 2,
    category: "Home",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"],
    description: "Locally made, real leather, delivery within Addis included.",
    city: "Addis Ababa",
    postedAt: "1d ago",
    negotiable: true,
    seller: sellers[2],
    views: 76,
  },
  {
    id: "l5",
    title: "Nike Air Max 90 — Size 42",
    price: 6800,
    minPrice: 6000,
    stock: 1,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
    description: "Worn twice, like new. Original receipt available.",
    city: "Addis Ababa",
    postedAt: "3d ago",
    negotiable: true,
    seller: sellers[1],
    views: 233,
  },
  {
    id: "l6",
    title: "Toyota Corolla 2014 — Silver",
    price: 1850000,
    minPrice: 1750000,
    stock: 1,
    category: "Vehicles",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"],
    description: "Well maintained, full service history, libre ready.",
    city: "Addis Ababa",
    postedAt: "4d ago",
    negotiable: true,
    seller: sellers[0],
    views: 1402,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    buyer: "Mekdes A.",
    avatar: "https://i.pravatar.cc/80?img=23",
    rating: 5,
    comment: "Fast response and item was exactly as described. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    id: "r2",
    buyer: "Daniel K.",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 5,
    comment: "Smooth negotiation through the bot. Got a fair price.",
    date: "1 month ago",
  },
  {
    id: "r3",
    buyer: "Liya G.",
    avatar: "https://i.pravatar.cc/80?img=44",
    rating: 4,
    comment: "Good seller, slight delay on delivery but otherwise great.",
    date: "1 month ago",
  },
];

export function getListing(id: string) {
  return listings.find((l) => l.id === id) ?? listings[0];
}

export function getSeller(id: string) {
  return sellers.find((s) => s.id === id) ?? sellers[0];
}

export function formatETB(n: number) {
  return new Intl.NumberFormat("en-ET").format(n);
}
