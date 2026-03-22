const faviconUrl = "/favicon.ico";

export const metadata = {
  title: "КНАУ | Преподаватель",
  description: "Страница преподавателя",
  icons: faviconUrl,
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}
