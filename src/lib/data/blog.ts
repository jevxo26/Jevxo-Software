import type { BlogPost, Author } from "@/types";

const authors: Record<string, Author> = {
  alex: {
    id: "alex",
    name: "Alex Rivera",
    avatar: "/authors/alex.jpg",
    role: "Co-Founder & CTO",
  },
  maya: {
    id: "maya",
    name: "Maya Chen",
    avatar: "/authors/maya.jpg",
    role: "Head of Design",
  },
  james: {
    id: "james",
    name: "James Okafor",
    avatar: "/authors/james.jpg",
    role: "Lead Engineer",
  },
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "why-nextjs-app-router-changes-everything",
    title: "Why Next.js App Router Changes Everything for Web Performance",
    excerpt:
      "The shift from Pages Router to App Router isn't just a refactor — it's a fundamentally different mental model that unlocks server-first rendering patterns we've never had before.",
    content: `The App Router represents the most significant architectural shift in Next.js history...`,
    author: authors.alex,
    category: "Engineering",
    tags: ["Next.js", "Performance", "React", "Web Dev"],
    publishedAt: "2025-11-15",
    readTime: "8 min read",
    image: "/blog/nextjs-app-router.jpg",
    featured: true,
  },
  {
    id: "2",
    slug: "design-systems-that-scale",
    title: "Design Systems That Actually Scale: Lessons from 5 Enterprise Projects",
    excerpt:
      "After building design systems for companies ranging from 10 to 10,000 employees, we've identified the patterns that separate the ones that thrive from the ones that die.",
    content: `Building a design system feels like a rite of passage for any design team...`,
    author: authors.maya,
    category: "Design",
    tags: ["Design Systems", "Figma", "Scalability", "UX"],
    publishedAt: "2025-10-28",
    readTime: "12 min read",
    image: "/blog/design-systems.jpg",
    featured: true,
  },
  {
    id: "3",
    slug: "ai-integration-production-checklist",
    title: "The Production AI Integration Checklist: What Nobody Tells You",
    excerpt:
      "Shipping an LLM-powered feature to production is nothing like the demos. Here's the real checklist we use after integrating AI into 12 client products.",
    content: `Everyone's building with AI right now. The demos are impressive...`,
    author: authors.james,
    category: "AI",
    tags: ["AI", "LLM", "Production", "Engineering"],
    publishedAt: "2025-10-10",
    readTime: "15 min read",
    image: "/blog/ai-production.jpg",
    featured: true,
  },
  {
    id: "4",
    slug: "react-native-vs-flutter-2025",
    title: "React Native vs Flutter in 2025: An Honest Comparison",
    excerpt:
      "After shipping 20+ mobile apps in both frameworks, here's our completely unbiased breakdown of which to choose for your next project.",
    content: `The framework wars never end...`,
    author: authors.alex,
    category: "Mobile",
    tags: ["React Native", "Flutter", "Mobile", "Cross-Platform"],
    publishedAt: "2025-09-22",
    readTime: "10 min read",
    image: "/blog/rn-vs-flutter.jpg",
    featured: false,
  },
  {
    id: "5",
    slug: "kubernetes-cost-optimisation",
    title: "How We Cut Kubernetes Costs by 40% Without Sacrificing Reliability",
    excerpt:
      "Cloud costs spiralling? We share the exact strategies, tools, and Terraform configs we used to dramatically reduce a client's AWS bill.",
    content: `Kubernetes is powerful. It's also expensive if you're not careful...`,
    author: authors.james,
    category: "DevOps",
    tags: ["Kubernetes", "AWS", "Cost Optimization", "DevOps"],
    publishedAt: "2025-09-05",
    readTime: "11 min read",
    image: "/blog/k8s-cost.jpg",
    featured: false,
  },
  {
    id: "6",
    slug: "ux-micro-animations-guide",
    title: "The Complete Guide to UX Micro-Animations That Delight Users",
    excerpt:
      "Micro-animations are the difference between an app that feels built and one that feels alive. Here's how to design them purposefully.",
    content: `The best micro-animations are the ones users never consciously notice...`,
    author: authors.maya,
    category: "Design",
    tags: ["UX", "Animation", "CSS", "Motion Design"],
    publishedAt: "2025-08-18",
    readTime: "9 min read",
    image: "/blog/micro-animations.jpg",
    featured: false,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = [
  "All",
  "Engineering",
  "Design",
  "AI",
  "Mobile",
  "DevOps",
];
