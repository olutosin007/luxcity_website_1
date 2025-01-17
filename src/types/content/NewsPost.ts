export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  description: string;
  image: string;
  content: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: string;
} 