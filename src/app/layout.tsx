import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import TopAnnouncementBar from '@/components/top-announcement-bar';
import Footer from '@/components/footer';
import CartDrawer from '@/components/cart-drawer';
import FloatingWhatsAppButton from '@/components/whatsapp-floating';
import MenuBookModal from '@/components/menu-book-modal';
import PageLoader from '@/components/page-loader';
import { brandConfig } from '@/lib/brand';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#DC2626',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.appUrl),
  title: `${brandConfig.name} | ${brandConfig.tagline}`,
  description: brandConfig.meta.description,
  keywords: ['Chickado', 'fried chicken', 'zinger burger', 'fast food', 'crispy chicken', 'peshawar', 'peshawar saddar', 'sunhri masjid', 'whatsapp food order'],
  alternates: {
    canonical: 'https://chickadopk.com',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: `${brandConfig.name} - ${brandConfig.tagline}`,
    description: brandConfig.meta.description,
    url: 'https://chickadopk.com',
    siteName: brandConfig.name,
    locale: 'en_PK',
    type: 'website',
    images: [{ url: 'https://chickadopk.com/assets/banners/hero-banner.jpg', width: 1200, height: 630, alt: 'Chickado Bite into Joy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brandConfig.name} - ${brandConfig.tagline}`,
    description: brandConfig.meta.description,
    images: ['https://chickadopk.com/assets/banners/hero-banner.jpg'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Chickado',
  url: 'https://chickadopk.com/',
  logo: 'https://chickadopk.com/assets/brand/logo.webp',
  sameAs: [
    'https://facebook.com/chickado',
    'https://instagram.com/chickadopk',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased font-sans">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://chickadopk.com https://images.unsplash.com https://maps.googleapis.com https://*.googleapis.com https://*.gstatic.com; font-src 'self' https://fonts.gstatic.com data:; frame-src 'self' https://maps.google.com https://www.google.com; connect-src 'self' https://chickadopk.com; object-src 'none'; base-uri 'self'; form-action 'self' https://api.whatsapp.com whatsapp:; upgrade-insecure-requests;"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FAFAFA] text-neutral-900 selection:bg-red-600 selection:text-white relative font-sans">
        {/* Soft Ambient Blurred Red/Amber Blobs for Glass UI Depth */}
        <div className="fixed -top-40 -left-40 w-[34rem] h-[34rem] bg-red-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="fixed top-1/3 -right-40 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="fixed -bottom-40 left-1/4 w-[36rem] h-[36rem] bg-red-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />

        <PageLoader />
        <TopAnnouncementBar />
        <Navbar />
        <main className="flex-1 relative z-10 overflow-x-clip">{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingWhatsAppButton />
        <MenuBookModal />
      </body>
    </html>
  );
}
