import { Metadata } from 'next';

export interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  authors?: string[];
  url?: string;
  noIndex?: boolean;
}

const defaultSEO = {
  siteName: "Galib's Portfolio",
  defaultTitle: "Galib's Portfolio | Full Stack Developer & UI/UX Designer",
  defaultDescription: "Explore the portfolio of Galib, a passionate full-stack developer specializing in modern web technologies including Next.js, React, TypeScript, and more.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://galib-remo.vercel.app',
  image: '/hero-section-me.jpg',
  locale: 'en_US',
  type: 'website',
  keywords: [
    'Full Stack Developer',
    'Web Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Portfolio',
    'UI/UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript',
    'Node.js',
  ],
};

export function generateMetadata({
  title,
  description,
  image,
  keywords,
  type = 'website',
  publishedTime,
  authors,
  url,
  noIndex = false,
}: SEOConfig = {}): Metadata {
  const pageTitle = title 
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle;
  
  const pageDescription = description || defaultSEO.defaultDescription;
  const pageImage = image || defaultSEO.image;
  const pageUrl = url ? `${defaultSEO.siteUrl}${url}` : defaultSEO.siteUrl;
  const pageKeywords = keywords || defaultSEO.keywords;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(', '),
    authors: authors ? authors.map(name => ({ name })) : [{ name: 'Galib' }],
    creator: 'Galib',
    publisher: 'Galib',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(defaultSEO.siteUrl),
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': '/en',
        'bn': '/bn',
      },
    },
    openGraph: {
      type: type,
      locale: defaultSEO.locale,
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: '@yourusername', // Replace with your Twitter handle
    },
    robots: noIndex ? {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your Google Search Console verification
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };

  // Add article-specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
    };
  }

  return metadata;
}

// JSON-LD structured data for better SEO
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Galib',
    jobTitle: 'Full Stack Developer',
    url: defaultSEO.siteUrl,
    sameAs: [
      // Add your social media profiles
      'https://github.com/yourusername',
      'https://linkedin.com/in/yourusername',
      'https://twitter.com/yourusername',
    ],
    image: `${defaultSEO.siteUrl}${defaultSEO.image}`,
    description: defaultSEO.defaultDescription,
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    url: defaultSEO.siteUrl,
    description: defaultSEO.defaultDescription,
    inLanguage: ['en', 'bn'],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultSEO.siteUrl}${item.url}`,
    })),
  };
}
