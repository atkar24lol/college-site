const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Программа дополнительного образования',
  description: 'Программа дополнительного образования',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}
