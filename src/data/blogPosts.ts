export type BlogCategory = "Mobile" | "Web" | "Backend";

export type BlogPost = {
  id: number;
  category: BlogCategory;
  price: "Paid" | "Free";
  amount?: string;
  date: string;
  read: string;
  title: string;
  excerpt: string;
  image: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Mobile",
    price: "Paid",
    amount: "USD 15.000",
    date: "Oct 24, 2026",
    read: "8 min read",
    title: "Shipping a Flutter App: From Emulator to Codemagic",
    excerpt:
      "An inquiry into building, signing and deploying Flutter apps, examining the build errors nobody warns you about and...",
    image: "/images/post-1.jpg",
  },
  {
    id: 2,
    category: "Web",
    price: "Free",
    date: "Nov 02, 2026",
    read: "5 min read",
    title: "Flask and Streamlit: Two Ways to Demo a Project",
    excerpt:
      "Exploring lightweight dashboards and quick prototypes to revitalize how student projects are presented to supervisors and...",
    image: "/images/post-2.jpg",
  },
  {
    id: 3,
    category: "Backend",
    price: "Paid",
    amount: "USD 5.000",
    date: "Nov 14, 2026",
    read: "12 min read",
    title: "Laravel APIs: Building an Admin Panel with Filament",
    excerpt:
      "Lessons drawn from building a Laravel backend for a mobile client: authentication, resource design, and admin tooling...",
    image: "/images/post-3.jpg",
  },
  {
    id: 4,
    category: "Mobile",
    price: "Free",
    date: "Nov 18, 2026",
    read: "6 min read",
    title: "Debugging Expo Bundling Errors in React Native",
    excerpt:
      "A practical look at tracing a broken bundle back to its cause, and the checks that save hours of guessing...",
    image: "/images/post-4.jpg",
  },
  {
    id: 5,
    category: "Backend",
    price: "Free",
    date: "Nov 21, 2026",
    read: "7 min read",
    title: "Deploying Flask and Laravel Apps to Render",
    excerpt:
      "What changes between local and production, covering environment variables, databases and the first deploy that fails...",
    image: "/images/post-5.jpg",
  },
  {
    id: 6,
    category: "Web",
    price: "Paid",
    amount: "USD 5.000",
    date: "Nov 25, 2026",
    read: "9 min read",
    title: "Building a Security Dashboard with Flask",
    excerpt:
      "Structuring models, routes and charts for a small operations dashboard that stays readable as it grows...",
    image: "/images/post-6.jpg",
  },
];
