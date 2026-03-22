const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Блог и новостная лента',
  description: 'Блог и новостная лента',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}