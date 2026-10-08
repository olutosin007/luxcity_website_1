export interface Metric {
  label: string;
  value: string;
  detail?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  productName: string;
  title: string;
  subtitle: string;
  category: 'AI & PropTech' | 'Public Sector' | 'Student Housing' | 'Market Intelligence';
  tagline: string;
  client: string;
  year: string;
  featured: boolean;
  image: string;
  tags: string[];
  metrics: Metric[];
  challenge: string;
  solution: string;
  outcome: string;
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}
