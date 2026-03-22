const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | О новости',
  description: 'О новости',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}