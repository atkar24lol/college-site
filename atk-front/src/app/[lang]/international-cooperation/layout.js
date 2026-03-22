const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Международное сотрудничество',
  description: 'Международное сотрудничество',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}