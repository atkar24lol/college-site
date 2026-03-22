const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Наши преподователи',
  description: 'Страница Наши преподователи',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}