const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Подробнее о специальности',
  description: 'Подробнее о специальности',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}