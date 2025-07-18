import { generateSitemap, generateSitemapXML } from './sitemapGenerator';

// This function can be called to generate the sitemap XML
export async function getSitemapXML(): Promise<string> {
  try {
    const sitemapUrls = await generateSitemap();
    return generateSitemapXML(sitemapUrls);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return a basic sitemap with static pages only
    const staticUrls = [
      { url: 'https://luxcity.com/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly' as const, priority: 1.0 },
      { url: 'https://luxcity.com/solutions', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly' as const, priority: 0.8 },
      { url: 'https://luxcity.com/labs', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly' as const, priority: 0.8 },
      { url: 'https://luxcity.com/insights', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily' as const, priority: 0.9 },
      { url: 'https://luxcity.com/company', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly' as const, priority: 0.7 },
      { url: 'https://luxcity.com/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly' as const, priority: 0.6 }
    ];
    return generateSitemapXML(staticUrls);
  }
}

// For development/testing purposes
export async function logSitemap() {
  const xml = await getSitemapXML();
  console.log('Generated Sitemap XML:');
  console.log(xml);
} 