const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Контакты',
  description: 'Контакты',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}