const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Галерея',
  description: 'Галерея',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}