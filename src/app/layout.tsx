import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import TopAnnouncementBar from '@/components/top-announcement-bar';
import Footer from '@/components/footer';
import CartDrawer from '@/components/cart-drawer';
import FloatingWhatsAppButton from '@/components/whatsapp-floating';
import { brandConfig } from '@/lib/brand';

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.appUrl),
  title: `${brandConfig.name} | ${brandConfig.tagline}`,
  description: brandConfig.meta.description,
  keywords: ['Chickado', 'fried chicken', 'zinger burger', 'fast food', 'crispy chicken', 'peshawar', 'peshawar saddar', 'sunhri masjid', 'whatsapp food order', 'pos'],
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
    images: [{ url: '/assets/hero-banner.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased font-sans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FAFAFA] text-neutral-900 selection:bg-red-600 selection:text-white relative overflow-x-hidden font-sans">
        {/* Soft Ambient Blurred Red/Amber Blobs for Glass UI Depth */}
        <div className="fixed -top-40 -left-40 w-[34rem] h-[34rem] bg-red-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="fixed top-1/3 -right-40 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="fixed -bottom-40 left-1/4 w-[36rem] h-[36rem] bg-red-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />

        <TopAnnouncementBar />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
