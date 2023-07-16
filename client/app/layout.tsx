import './globals.css';
import { Inter } from 'next/font/google';
import ProviderComponent from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderComponent>{children}</ProviderComponent>
      </body>
    </html>
  );
}
