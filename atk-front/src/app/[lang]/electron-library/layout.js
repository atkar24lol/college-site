const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Электронная библиотека',
  description: 'Электронная библиотека',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}