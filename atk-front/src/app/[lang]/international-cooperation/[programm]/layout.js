const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Программа международного образования',
  description: 'Программа международного образования',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}