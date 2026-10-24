import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/403'],
    },
    sitemap: 'https://cusco-luxury-expeditions.com/sitemap.xml',
  };
}
