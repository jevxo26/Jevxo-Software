import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "web-development",
    title: "Web Development",
    tagline: "High-performance websites built to convert.",
    description:
      "We craft blazing-fast, accessible, and SEO-optimized web experiences using Next.js, React, and modern tooling. From landing pages to complex SaaS dashboards, we deliver pixel-perfect results.",
    icon: "💻",
    features: [
      "Next.js & React applications",
      "Custom CMS integrations",
      "E-commerce & Shopify",
      "REST & GraphQL APIs",
      "Performance optimization",
      "Accessibility (WCAG 2.1)",
    ],
    deliverables: [
      "Fully responsive website",
      "Source code & deployment",
      "CMS training session",
      "30-day post-launch support",
    ],
    duration: "4–12 weeks",
    startingPrice: "$4,000",
    color: "from-violet-500 to-indigo-600",
  },
  {
    id: "2",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Interfaces users fall in love with.",
    description:
      "Our design team creates stunning, user-centred interfaces backed by research and tested with real users. We bridge the gap between beautiful aesthetics and functional experiences.",
    icon: "🎨",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Design systems & tokens",
      "Interactive Figma prototypes",
      "Usability testing",
      "Motion & micro-animation design",
    ],
    deliverables: [
      "Full Figma design file",
      "Design system documentation",
      "Exported assets & specs",
      "Handoff to development team",
    ],
    duration: "2–6 weeks",
    startingPrice: "$2,500",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "3",
    slug: "mobile-apps",
    title: "Mobile Apps",
    tagline: "Native-quality apps on any device.",
    description:
      "Cross-platform mobile applications built with React Native and Expo that feel truly native. Ship to iOS and Android from a single, maintainable codebase.",
    icon: "📱",
    features: [
      "React Native & Expo",
      "iOS & Android publishing",
      "Push notifications",
      "Offline-first architecture",
      "In-app purchases",
      "Analytics integration",
    ],
    deliverables: [
      "Published app (App Store / Play Store)",
      "Source code repository",
      "CI/CD pipeline setup",
      "60-day post-launch support",
    ],
    duration: "8–20 weeks",
    startingPrice: "$8,000",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "4",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Infrastructure that scales with you.",
    description:
      "We design, automate, and manage cloud infrastructure on AWS, GCP, and Azure. From containerization to CI/CD pipelines and zero-downtime deployments.",
    icon: "☁️",
    features: [
      "AWS / GCP / Azure setup",
      "Docker & Kubernetes",
      "CI/CD pipelines (GitHub Actions)",
      "Infrastructure as Code (Terraform)",
      "Monitoring & alerting",
      "Security hardening",
    ],
    deliverables: [
      "Fully automated deployment pipeline",
      "Infrastructure documentation",
      "Runbook & incident playbook",
      "Team onboarding session",
    ],
    duration: "2–8 weeks",
    startingPrice: "$3,500",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "5",
    slug: "ai-integration",
    title: "AI Integration",
    tagline: "Supercharge your product with intelligence.",
    description:
      "We integrate large language models, computer vision, and AI-driven automation into your existing product or build AI-native features from the ground up.",
    icon: "🤖",
    features: [
      "LLM integration (OpenAI, Anthropic)",
      "Custom AI chatbots",
      "RAG & vector databases",
      "Image & document processing",
      "Workflow automation with AI",
      "AI evaluation & fine-tuning",
    ],
    deliverables: [
      "Production-ready AI feature",
      "Evaluation framework",
      "Cost & usage dashboard",
      "Team training session",
    ],
    duration: "3–10 weeks",
    startingPrice: "$5,000",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "6",
    slug: "digital-strategy",
    title: "Digital Strategy",
    tagline: "Clarity on where to invest and why.",
    description:
      "We audit your digital presence, benchmark against competitors, and build a clear roadmap that aligns technology investment with business outcomes.",
    icon: "📊",
    features: [
      "Digital audit & gap analysis",
      "Competitive benchmarking",
      "Technology roadmapping",
      "OKR & KPI definition",
      "Stakeholder workshops",
      "Quarterly review cadence",
    ],
    deliverables: [
      "Comprehensive audit report",
      "12-month digital roadmap",
      "Executive presentation deck",
      "Implementation kickoff session",
    ],
    duration: "2–4 weeks",
    startingPrice: "$2,000",
    color: "from-purple-500 to-violet-600",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
