import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://galib-remo.vercel.app';
  const currentDate = new Date();
  
  // Define your locales
  const locales = ['en', 'bn'];
  
  // Define your main pages
  const pages = [
    {
      url: '',
      priority: 1.0,
      changeFrequency: 'monthly' as const,
    },
    // Add more pages as your portfolio grows
    // {
    //   url: '/projects',
    //   priority: 0.8,
    //   changeFrequency: 'weekly' as const,
    // },
    // {
    //   url: '/about',
    //   priority: 0.8,
    //   changeFrequency: 'monthly' as const,
    // },
    // {
    //   url: '/contact',
    //   priority: 0.7,
    //   changeFrequency: 'monthly' as const,
    // },
  ];

  // Generate sitemap entries for all locale-page combinations
  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    pages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page.url}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${page.url}`])
          ),
        },
      });
    });
  });

  return sitemap;
}
