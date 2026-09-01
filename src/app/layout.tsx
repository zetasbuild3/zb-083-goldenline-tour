import type { Metadata, Viewport } from 'next';
import { Outfit, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ScrollRevealProvider } from '@/components/ScrollRevealProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#181513',
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.goldenlinetour.com'),
  title: 'GoldenLine TOUR | Uncover the Magic of Sri Lanka',
  description:
    'Premium tours, unforgettable experiences and reliable vehicle rental services in Sri Lanka.',
  keywords: [
    'Sri Lanka Tourism',
    'GoldenLine TOUR',
    'Sri Lanka Car Rental',
    'Sri Lanka Tour Packages',
    'Ella Sri Lanka',
    'Sigiriya',
    'Luxury Van Rental Sri Lanka',
  ],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'GoldenLine TOUR | Uncover the Magic of Sri Lanka',
    description:
      'Premium tours, unforgettable experiences and reliable vehicle rental services in Sri Lanka.',
    url: 'https://www.goldenlinetour.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'GoldenLine TOUR',
    images: [
      {
        url: '/images/og-image.jpg',
        secureUrl: 'https://www.goldenlinetour.com/images/og-image.jpg',
        width: 800,
        height: 800,
        type: 'image/jpeg',
        alt: 'GoldenLine TOUR Logo',
      },
      {
        url: '/images/logo.png',
        secureUrl: 'https://www.goldenlinetour.com/images/logo.png',
        width: 800,
        height: 800,
        type: 'image/png',
        alt: 'GoldenLine TOUR Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'GoldenLine TOUR | Uncover the Magic of Sri Lanka',
    description:
      'Premium tours, unforgettable experiences and reliable vehicle rental services in Sri Lanka.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased text-[#13261f] bg-[#FAF7EE] selection:bg-[#CBA258] selection:text-white">
        <CurrencyProvider>
          <ScrollRevealProvider>
            {children}
          </ScrollRevealProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
