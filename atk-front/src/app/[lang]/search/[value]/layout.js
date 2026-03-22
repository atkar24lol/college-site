const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Поиск по сайту',
  description: 'Поиск по сайту',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}