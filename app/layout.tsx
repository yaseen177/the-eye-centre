import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/Providers';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'The Eye Centre Leicester | Independent Opticians',
    template: '%s | The Eye Centre Leicester',
  },
  description:
    'Trusted independent opticians in Leicester with over 35 years of experience. Same-day appointments, NHS eye tests, and a wide range of designer frames.',
  metadataBase: new URL('https://theeyecentre.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
