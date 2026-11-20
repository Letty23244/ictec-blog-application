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
  imageFit?: "cover" | "contain";
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Mobile",
    price: "Paid",
    amount: "USD 15.000",
    date: "Oct 24, 2026",
    read: "8 min read",
    title: "Building a Flutter Savings Dashboard",
    excerpt:
      "A clear mobile money home screen with an account balance, quick actions and savings goals, built with Flutter.",
    image: "/images/blogs/flutter-state.png",
    imageFit: "contain",
  },
  {
    id: 2,
    category: "Mobile",
    price: "Free",
    date: "Nov 02, 2026",
    read: "5 min read",
    title: "The Creator Studio React Native Dashboard",
    excerpt:
      "A mobile creator workspace with at-a-glance insights, recent activity and quick access to the actions creators use most.",
    image: "/images/blogs/dashboard.png",
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
    image: "/images/blogs/laravelFilament.png",
  },

];
