const faviconUrl = '/favicon.ico';

export const metadata = {
  title: 'КНАУ | Абитуриенты',
  description: 'Страница для абитуриентов и будущих студентов КНАУ',
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}