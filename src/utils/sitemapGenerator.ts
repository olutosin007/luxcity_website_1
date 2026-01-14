import { getAllPosts } from './newsLoader';

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export async function generateSitemap(): Promise<SitemapUrl[]> {
  const baseUrl = 'https://luxcity.tech'; // Replace with your actual domain
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages: SitemapUrl[] = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/solutions`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/labs`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/insights`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/company`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/tools`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/tools/readiness-checker`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/tools/document-tracker`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/tools/viewing-tracker`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/tools/process-simulator`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/tools/timeline-generator`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    }
  ];

  // Dynamic blog posts
  try {
    const posts = await getAllPosts();
    const postUrls: SitemapUrl[] = posts.map(post => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastmod: post.date,
      changefreq: 'monthly' as const,
      priority: 0.7
    }));

    return [...staticPages, ...postUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}

export function generateSitemapXML(urls: SitemapUrl[]): string {
  const xmlUrls = urls.map(url => {
    const lastmod = url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : '';
    const changefreq = url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : '';
    const priority = url.priority ? `\n    <priority>${url.priority}</priority>` : '';
    
    return `  <url>
    <loc>${url.url}</loc>${lastmod}${changefreq}${priority}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
} 