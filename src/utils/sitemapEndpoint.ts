import { generateSitemap, generateSitemapXML } from './sitemapGenerator';

// This function can be called to generate the sitemap XML
export async function getSitemapXML(): Promise<string> {
  try {
    const sitemapUrls = await generateSitemap();
    return generateSitemapXML(sitemapUrls);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return a basic sitemap with static pages only
    const currentDate = new Date().toISOString().split('T')[0];
    const staticUrls = [
      { url: 'https://luxcity.tech/', lastmod: currentDate, changefreq: 'weekly' as const, priority: 1.0 },
      { url: 'https://luxcity.tech/solutions', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.8 },
      { url: 'https://luxcity.tech/labs', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.8 },
      { url: 'https://luxcity.tech/insights', lastmod: currentDate, changefreq: 'daily' as const, priority: 0.9 },
      { url: 'https://luxcity.tech/company', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.7 },
      { url: 'https://luxcity.tech/contact', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.6 },
      { url: 'https://luxcity.tech/tools', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.8 },
      { url: 'https://luxcity.tech/tools/readiness-checker', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.7 },
      { url: 'https://luxcity.tech/tools/document-tracker', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.7 },
      { url: 'https://luxcity.tech/tools/viewing-tracker', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.7 },
      { url: 'https://luxcity.tech/tools/process-simulator', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.7 },
      { url: 'https://luxcity.tech/tools/timeline-generator', lastmod: currentDate, changefreq: 'monthly' as const, priority: 0.7 },
      { url: 'https://luxcity.tech/privacy-policy', lastmod: currentDate, changefreq: 'yearly' as const, priority: 0.3 }
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