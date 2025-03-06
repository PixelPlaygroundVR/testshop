import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/app/components/layout/site-header';
import QuantumFooter from '@/app/components/layout/QuantumFooter';
import { ThemeProvider } from '@/app/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pixel Playgrounds - Quantum Tech E-Commerce',
  description: 'Experience the future of technology with quantum computing, neural interfaces, and holographic displays.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            {children}
            <QuantumFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 