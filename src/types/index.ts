// ─── Service ────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
  duration: string;
  startingPrice: string;
  color: string; // gradient class
}

// ─── Portfolio ───────────────────────────────────────────────────────────────
export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  year: string;
  featured: boolean;
}

// ─── Blog ────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  image: string;
  featured: boolean;
}

// ─── Team ────────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

// ─── Author ──────────────────────────────────────────────────────────────────
export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

// ─── Stat ────────────────────────────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

// ─── NavLink ─────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}
