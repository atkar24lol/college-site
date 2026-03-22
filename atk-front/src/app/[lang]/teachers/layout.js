const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Для преподователей',
  description: 'Страница для преподователей',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}