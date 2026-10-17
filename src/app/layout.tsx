import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import TopAnnouncementBar from '@/components/top-announcement-bar';
import Footer from '@/components/footer';
import CartDrawer from '@/components/cart-drawer';
import FloatingWhatsAppButton from '@/components/whatsapp-floating';
import { brandConfig } from '@/lib/brand';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
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
