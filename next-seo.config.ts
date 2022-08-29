const SEO = {
  title: 'Tweeter',
  description:
    'Tweeter is a simple Twitter client built with React and Next.js.',
  canonical: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000/',
    site_name: 'Tweeter',
  },
};

export default SEO;
