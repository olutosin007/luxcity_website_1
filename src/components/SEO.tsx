import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  keywords?: string[];
  relatedTerms?: string[];
}

export default function SEO({
  title,
  description,
  canonical,
  image = '/images/luxcity_logo_clr_6.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  category,
  readingTime,
  keywords = [],
  relatedTerms = []
}: SEOProps) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://luxcity.tech';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : window.location.href;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  // Combine all keywords for meta tags
  const allKeywords = [
    ...keywords,
    ...relatedTerms,
    ...tags,
    'real estate technology',
    'PropTech',
    'AI real estate',
    'property search',
    'Luxcity'
  ].filter((keyword, index, arr) => arr.indexOf(keyword) === index); // Remove duplicates

  // Generate structured data for articles
  const generateStructuredData = () => {
    if (type === 'article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: fullImageUrl,
        author: {
          '@type': 'Person',
          name: author || 'Luxcity Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Luxcity',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/luxcity_logo_clr_6.png`
          }
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl
        },
        ...(category && { articleSection: category }),
        ...(tags.length > 0 && { keywords: tags.join(', ') }),
        ...(readingTime && { wordCount: readingTime }),
        // Add related terms for better semantic understanding
        ...(relatedTerms.length > 0 && { 
          about: relatedTerms.map(term => ({ '@type': 'Thing', name: term }))
        })
      };
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: fullUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Luxcity',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/luxcity_logo_clr_6.png`
        }
      },
      // Add related terms for better semantic understanding
      ...(relatedTerms.length > 0 && { 
        about: relatedTerms.map(term => ({ '@type': 'Thing', name: term }))
      })
    };
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Enhanced Keywords Meta Tags */}
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="subject" content={category || 'Real Estate Technology'} />
      <meta name="classification" content="Technology, Real Estate, PropTech" />
      <meta name="category" content={category || 'Real Estate Technology'} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Luxcity" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@luxcity" />

      {/* Article-specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {category && <meta property="article:section" content={category} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={author || 'Luxcity Team'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Related terms for semantic search */}
      {relatedTerms.length > 0 && (
        <meta name="related" content={relatedTerms.join(', ')} />
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
    </Helmet>
  );
} 