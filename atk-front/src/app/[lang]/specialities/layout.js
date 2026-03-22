const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Специальности',
  description: 'Специальности',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}