const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Дополнительное образование',
  description: 'Дополнительное образование',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}