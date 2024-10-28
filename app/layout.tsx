import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navigation } from '@/components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Estate Sanctuary',
  description: 'Track your property purchase progress',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}