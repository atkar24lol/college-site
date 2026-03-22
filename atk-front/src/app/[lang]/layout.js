import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/component';
import Footer from '@/components/footer/component';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const metadata = {
  title: 'Агротехнический колледж имени Султана Ибраимова',
  description: 'Официальный сайт колледжа',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col overflow-x-hidden ${inter.className}`}>
        <Header />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
