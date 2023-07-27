import { Inter } from 'next/font/google';
import ProviderComponent from '@/components/Provider';
import ToastComponent from '@/components/ToastComponent';
import '../css/layouts/main-layout.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderComponent>
          {children}
          <ToastComponent></ToastComponent>
        </ProviderComponent>
      </body>
    </html>
  );
}
