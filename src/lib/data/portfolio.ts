import type { PortfolioItem } from "@/types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    slug: "nova-saas-dashboard",
    title: "Nova SaaS Dashboard",
    client: "Nova Analytics Inc.",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    description:
      "A comprehensive real-time analytics dashboard serving 50,000+ active users across 40 countries with sub-200ms response times.",
    challenge:
      "Nova needed to replace their aging legacy dashboard that was causing customer churn due to slow load times and a dated UI.",
    solution:
      "We rebuilt the entire frontend with Next.js App Router and implemented server-side streaming, reducing Time-to-Interactive by 73%.",
    result: "42% reduction in churn, NPS score improved from 31 to 68.",
    image: "/portfolio/nova.jpg",
    year: "2025",
    featured: true,
  },
  {
    id: "2",
    slug: "bloom-e-commerce",
    title: "Bloom E-Commerce Platform",
    client: "Bloom Botanics",
    category: "E-Commerce",
    tags: ["Shopify", "React", "Tailwind", "Klaviyo"],
    description:
      "A luxury plant e-commerce experience with AR plant preview, subscription boxes, and a personalised recommendation engine.",
    challenge:
      "A niche botanical brand with a strong Instagram following needed an e-commerce presence that matched their premium aesthetic.",
    solution:
      "We built a headless Shopify storefront with custom AR integration and a quiz-driven plant recommendation flow.",
    result: "$1.2M GMV in first 6 months, 3.8× conversion rate vs. industry average.",
    image: "/portfolio/bloom.jpg",
    year: "2025",
    featured: true,
  },
  {
    id: "3",
    slug: "orion-mobile-app",
    title: "Orion Fitness App",
    client: "Orion Health",
    category: "Mobile Apps",
    tags: ["React Native", "Expo", "HealthKit", "Node.js"],
    description:
      "A cross-platform fitness and nutrition tracking app with AI-powered workout generation and wearable integration.",
    challenge:
      "The client had a strong brand concept but zero technical foundation and a hard launch deadline of 14 weeks.",
    solution:
      "We built with React Native and Expo for speed, integrating Apple HealthKit and Google Fit from day one with a shared backend API.",
    result: "Launched on time, 80k downloads in 90 days, 4.7★ App Store rating.",
    image: "/portfolio/orion.jpg",
    year: "2024",
    featured: true,
  },
  {
    id: "4",
    slug: "pulse-fintech",
    title: "Pulse Fintech Dashboard",
    client: "Pulse Capital",
    category: "UI/UX Design",
    tags: ["Figma", "Design System", "Prototyping"],
    description:
      "A complete design system and product redesign for a B2B fintech platform managing $500M+ in assets.",
    challenge:
      "An inconsistent UI was causing compliance issues and slowing down their sales cycle with enterprise clients.",
    solution:
      "A six-week design sprint delivered 340 Figma components, 12 page templates, and a comprehensive token library.",
    result: "Sales cycle shortened by 3 weeks; passed SOC 2 audit with zero design-related findings.",
    image: "/portfolio/pulse.jpg",
    year: "2024",
    featured: false,
  },
  {
    id: "5",
    slug: "terra-ai-platform",
    title: "Terra AI Research Platform",
    client: "Terra Climate Labs",
    category: "AI Integration",
    tags: ["OpenAI", "LangChain", "Python", "Next.js"],
    description:
      "An AI-powered climate data research platform that ingests satellite imagery, runs analysis pipelines, and generates natural-language reports.",
    challenge:
      "Researchers were spending 40% of their time on manual report writing rather than actual analysis.",
    solution:
      "We integrated GPT-4 with a custom RAG pipeline over a vector database of climate datasets, automating 85% of report generation.",
    result: "Researchers reclaimed 15 hours/week; platform licensed to 3 universities.",
    image: "/portfolio/terra.jpg",
    year: "2025",
    featured: false,
  },
  {
    id: "6",
    slug: "stack-devops-migration",
    title: "Stack DevOps Migration",
    client: "Stack Ventures",
    category: "Cloud & DevOps",
    tags: ["AWS", "Terraform", "Kubernetes", "GitHub Actions"],
    description:
      "Zero-downtime migration of a monolithic Rails app to a containerised microservices architecture on AWS EKS.",
    challenge:
      "An aging monolith was causing frequent outages during peak traffic and blocking a Series B fundraise.",
    solution:
      "We designed a strangler-fig migration plan, containerised services incrementally, and set up blue/green deployments with Kubernetes.",
    result: "99.98% uptime since migration; infra costs reduced by 34%; Series B closed successfully.",
    image: "/portfolio/stack.jpg",
    year: "2024",
    featured: false,
  },
];

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.slug === slug);
}

export const portfolioCategories = [
  "All",
  "Web Development",
  "E-Commerce",
  "Mobile Apps",
  "UI/UX Design",
  "AI Integration",
  "Cloud & DevOps",
];
