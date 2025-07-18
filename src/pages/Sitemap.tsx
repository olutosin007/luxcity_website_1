import { useEffect, useState } from 'react';
import { getSitemapXML } from '../utils/sitemapEndpoint';

export default function Sitemap() {
  const [sitemapXML, setSitemapXML] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        const xml = await getSitemapXML();
        setSitemapXML(xml);
      } catch (error) {
        console.error('Error generating sitemap:', error);
        setSitemapXML('Error generating sitemap');
      } finally {
        setLoading(false);
      }
    };

    generateSitemap();
  }, []);

  if (loading) {
    return <div>Generating sitemap...</div>;
  }

  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {sitemapXML}
    </pre>
  );
} 