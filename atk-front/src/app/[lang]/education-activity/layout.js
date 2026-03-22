const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Образовательная деятельность',
  description: 'Образовательная деятельность',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}