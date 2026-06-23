import { Inter } from 'next/font/google';
import './[lang]/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable} suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col overflow-x-hidden ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
