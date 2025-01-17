import { NewsPost } from '../types/content/NewsPost';
import matter from 'gray-matter';

// In-memory storage for posts
let posts: NewsPost[] = [
  {
    id: 'ai-valuation-future',
    title: "The Future of AI in Real Estate Valuation",
    slug: "ai-valuation-future",
    category: "Research Report",
    date: "2024-03-15",
    description: "An in-depth analysis of how artificial intelligence is transforming property valuation methods and improving accuracy.",
    image: "/images/ai-valuation.jpg",
    author: {
      name: "Dr. Sarah Chen",
      role: "Chief Data Scientist",
      avatar: "/images/team/sarah-chen.jpg"
    },
    content: `# The Future of AI in Real Estate Valuation

Artificial intelligence is revolutionizing how we value properties in the real estate market. Through advanced machine learning algorithms and vast datasets, we're achieving unprecedented levels of accuracy in property valuations.

## How AI is Transforming Valuations

Traditional property valuation methods rely heavily on historical data and human expertise. While these approaches have served the industry well, they have limitations in terms of speed, scalability, and the ability to consider complex market dynamics.

AI-powered valuation systems can:
- Process thousands of data points in seconds
- Consider subtle market trends and patterns
- Adapt to changing market conditions in real-time
- Provide more objective valuations

## Key Benefits

1. **Increased Accuracy**: AI models can analyze vast amounts of data to provide more precise valuations
2. **Real-time Updates**: Valuations can be updated automatically as market conditions change
3. **Reduced Bias**: AI systems help eliminate human bias from the valuation process
4. **Faster Processing**: What used to take days can now be completed in minutes

## Looking Ahead

As AI technology continues to evolve, we expect to see even more sophisticated valuation models that can:
- Incorporate environmental factors
- Consider future development plans
- Analyze social and economic trends
- Predict property value appreciation

The future of property valuation is here, and it's powered by artificial intelligence.`,
    tags: ["AI", "Property Valuation", "Machine Learning"],
    readingTime: "8 min read"
  },
  {
    id: 'property-tech-trends',
    title: "Emerging Trends in Property Technology",
    slug: "property-tech-trends",
    category: "Market Analysis",
    date: "2024-03-10",
    description: "Exploring the latest technological innovations shaping the real estate industry and their impact on market dynamics.",
    image: "/images/Person-using-smartphone.jpg",
    author: {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      avatar: "/images/team/michael-rodriguez.jpg"
    },
    content: `# Emerging Trends in Property Technology

The real estate industry is experiencing a technological revolution, with new innovations emerging at an unprecedented pace. From blockchain to artificial intelligence, these technologies are reshaping how we buy, sell, and manage properties.

## Key Trends

### 1. Blockchain in Real Estate
- Smart contracts for property transactions
- Tokenization of real estate assets
- Transparent property records

### 2. Virtual and Augmented Reality
- Virtual property tours
- Interactive property visualization
- Remote property inspections

### 3. IoT and Smart Buildings
- Automated building management
- Energy efficiency optimization
- Predictive maintenance

## Impact on the Market

These technological advancements are creating new opportunities and challenges:
1. **Increased Efficiency**: Faster transactions and reduced paperwork
2. **Better Decision Making**: Data-driven insights for investors
3. **Enhanced User Experience**: Seamless property search and management
4. **Cost Reduction**: Automated processes and optimized operations

## Looking Forward

The future of real estate technology looks promising, with continued innovation in:
- Artificial Intelligence
- Sustainable Technology
- Digital Transactions
- Smart City Integration`,
    tags: ["PropTech", "Innovation", "Digital Transformation"],
    readingTime: "6 min read"
  }
];

export async function getAllPosts(): Promise<NewsPost[]> {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<NewsPost | null> {
  return posts.find(post => post.slug === slug) || null;
}

export async function getRecentPosts(count: number = 3): Promise<NewsPost[]> {
  return (await getAllPosts()).slice(0, count);
}

export async function createPost(post: NewsPost): Promise<NewsPost> {
  posts.push(post);
  return post;
}

export async function updatePost(post: NewsPost): Promise<NewsPost> {
  const index = posts.findIndex(p => p.id === post.id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  posts[index] = post;
  return post;
}

export async function deletePost(id: string): Promise<void> {
  posts = posts.filter(post => post.id !== id);
} 