import type { TeamMember, Testimonial, Stat } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Co-Founder & CEO",
    bio: "10+ years building digital products for startups and Fortune 500 companies. Previously led engineering at TechCorp and founded two acquired startups.",
    avatar: "/team/alex.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
  {
    id: "2",
    name: "Maya Chen",
    role: "Co-Founder & Head of Design",
    bio: "Award-winning product designer with a background in cognitive psychology. Passionate about creating interfaces that feel effortless to use.",
    avatar: "/team/maya.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: "3",
    name: "James Okafor",
    role: "Lead Engineer",
    bio: "Full-stack engineer specialising in distributed systems and developer experience. Open source contributor with 4,000+ GitHub stars.",
    avatar: "/team/james.jpg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "4",
    name: "Sofia Martinez",
    role: "Head of Client Success",
    bio: "Former management consultant turned tech strategist. Ensures every project delivers measurable business outcomes, not just beautiful code.",
    avatar: "/team/sofia.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jordan Lee",
    role: "CTO",
    company: "Nova Analytics",
    avatar: "/testimonials/jordan.jpg",
    rating: 5,
    quote:
      "Jevxo didn't just build our dashboard — they transformed how our customers experience our product. The performance gains alone paid for the project within 90 days.",
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Founder",
    company: "Bloom Botanics",
    avatar: "/testimonials/priya.jpg",
    rating: 5,
    quote:
      "From day one, the team understood our brand vision better than any agency we'd worked with. The result exceeded every metric we set. Truly remarkable work.",
  },
  {
    id: "3",
    name: "Marcus Williams",
    role: "VP Product",
    company: "Orion Health",
    avatar: "/testimonials/marcus.jpg",
    rating: 5,
    quote:
      "We had a brutal 14-week deadline for our app launch. Jevxo delivered on time, on budget, and the app has a 4.7-star rating. I cannot recommend them highly enough.",
  },
];

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered", description: "Across 18 countries" },
  { value: 98, suffix: "%", label: "Client Satisfaction", description: "Based on post-project surveys" },
  { value: 7, suffix: "yr", label: "In Business", description: "Founded in 2018" },
  { value: 40, suffix: "M+", label: "End Users Reached", description: "Through our client products" },
];
