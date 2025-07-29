interface PostData {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  content?: string;
}

// Base industry keywords that apply to most posts
const BASE_KEYWORDS = [
  'real estate technology',
  'PropTech',
  'Luxcity'
];

// Category-specific keyword mappings
const CATEGORY_KEYWORDS = {
  'technology': [
    'AI property search',
    'smart buildings',
    'digital transformation',
    'automation',
    'machine learning',
    'IoT real estate',
    'property technology'
  ],
  'market-analysis': [
    'rental market trends',
    'property market analysis',
    'housing market insights',
    'market intelligence',
    'property forecasting',
    'real estate predictions'
  ],
  'industry-news': [
    'real estate industry trends',
    'property market updates',
    'housing market news',
    'industry insights',
    'market updates'
  ],
  'guides': [
    'property search tips',
    'real estate advice',
    'property buying guide',
    'rental tips',
    'property investment'
  ]
};

// Title-based keyword extraction
const extractKeywordsFromTitle = (title: string): string[] => {
  const titleLower = title.toLowerCase();
  const keywords: string[] = [];

  if (titleLower.includes('ai') || titleLower.includes('artificial intelligence')) {
    keywords.push('AI real estate', 'artificial intelligence property', 'smart property search');
  }
  
  if (titleLower.includes('rental') || titleLower.includes('rent')) {
    keywords.push('rental market', 'rental property', 'rental trends', 'rental search');
  }
  
  if (titleLower.includes('london') || titleLower.includes('uk')) {
    keywords.push('UK property market', 'London real estate', 'UK rental market');
  }
  
  if (titleLower.includes('trend') || titleLower.includes('forecast')) {
    keywords.push('property trends', 'market trends', 'real estate forecasting');
  }
  
  if (titleLower.includes('smart') || titleLower.includes('technology')) {
    keywords.push('smart buildings', 'property technology', 'real estate tech');
  }
  
  if (titleLower.includes('search') || titleLower.includes('discovery')) {
    keywords.push('property search', 'home discovery', 'property matching');
  }

  return keywords;
};

// Generate related terms based on keywords
const generateRelatedTerms = (keywords: string[]): string[] => {
  const relatedTerms: string[] = [];
  
  keywords.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    
    if (lowerKeyword.includes('ai') || lowerKeyword.includes('artificial intelligence')) {
      relatedTerms.push(
        'machine learning property',
        'automated property matching',
        'intelligent home discovery',
        'AI-powered platforms'
      );
    }
    
    if (lowerKeyword.includes('rental')) {
      relatedTerms.push(
        'rental property search',
        'rental market analysis',
        'rental trends 2025',
        'rental property management'
      );
    }
    
    if (lowerKeyword.includes('market')) {
      relatedTerms.push(
        'market research',
        'trend analysis',
        'market intelligence',
        'property market insights'
      );
    }
    
    if (lowerKeyword.includes('technology') || lowerKeyword.includes('tech')) {
      relatedTerms.push(
        'digital transformation',
        'PropTech innovations',
        'real estate automation',
        'smart property solutions'
      );
    }
    
    if (lowerKeyword.includes('search')) {
      relatedTerms.push(
        'property search tools',
        'home discovery platforms',
        'property matching algorithms',
        'real estate search technology'
      );
    }
  });
  
  return [...new Set(relatedTerms)]; // Remove duplicates
};

export const generatePostKeywords = (post: PostData) => {
  const keywords: string[] = [...BASE_KEYWORDS];
  
  // Add category-specific keywords
  if (post.category && CATEGORY_KEYWORDS[post.category as keyof typeof CATEGORY_KEYWORDS]) {
    keywords.push(...CATEGORY_KEYWORDS[post.category as keyof typeof CATEGORY_KEYWORDS]);
  }
  
  // Add title-based keywords
  keywords.push(...extractKeywordsFromTitle(post.title));
  
  // Add tags as keywords
  if (post.tags) {
    keywords.push(...post.tags);
  }
  
  // Remove duplicates and limit to reasonable number
  const uniqueKeywords = [...new Set(keywords)].slice(0, 15);
  
  // Generate related terms
  const relatedTerms = generateRelatedTerms(uniqueKeywords);
  
  return {
    keywords: uniqueKeywords,
    relatedTerms: relatedTerms.slice(0, 12) // Limit related terms too
  };
};

// Example usage for different post types
export const getExampleKeywords = () => ({
  'AI Property Search Revolution': {
    keywords: [
      'real estate technology',
      'PropTech',
      'Luxcity',
      'AI property search',
      'smart buildings',
      'digital transformation',
      'automation',
      'machine learning',
      'property technology',
      'AI real estate',
      'artificial intelligence property',
      'smart property search',
      'property search',
      'home discovery',
      'property matching'
    ],
    relatedTerms: [
      'machine learning property',
      'automated property matching',
      'intelligent home discovery',
      'AI-powered platforms',
      'property search tools',
      'home discovery platforms',
      'property matching algorithms',
      'real estate search technology',
      'digital transformation',
      'PropTech innovations',
      'real estate automation',
      'smart property solutions'
    ]
  },
  
  'London Rental Market Trends 2025': {
    keywords: [
      'real estate technology',
      'PropTech',
      'Luxcity',
      'rental market trends',
      'property market analysis',
      'housing market insights',
      'market intelligence',
      'property forecasting',
      'real estate predictions',
      'rental market',
      'rental property',
      'rental trends',
      'rental search',
      'UK property market',
      'London real estate'
    ],
    relatedTerms: [
      'rental property search',
      'rental market analysis',
      'rental trends 2025',
      'rental property management',
      'market research',
      'trend analysis',
      'market intelligence',
      'property market insights',
      'UK rental market',
      'London property trends',
      'rental market forecasting',
      'property market predictions'
    ]
  }
}); 