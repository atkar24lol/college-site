const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Карта сайта',
  description: 'Карта сайта',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}