import Header from '@/components/header/component';
import Footer from '@/components/footer/component';
import LangSetter from './LangSetter';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Агротехнический колледж им. С.Ибраимова — АТК при КНАУ',
    template: '%s | АТК при КНАУ',
  },
  description:
    'Официальный сайт Агротехнического колледжа им. С.Ибраимова при КНАУ им. К.И.Скрябина — поступление, специальности, новости, контакты.',
  keywords: [
    'агротехнический колледж', 'АТК', 'КНАУ', 'Кыргызстан',
    'колледж Бишкек', 'поступление в колледж', 'аграрный колледж',
  ],
  authors: [{ name: 'АТК при КНАУ' }],
  robots: { index: true, follow: true },
  icons: {
    icon: '/atk-emblem.png',
    shortcut: '/atk-emblem.png',
    apple: '/atk-emblem.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KG',
    siteName: 'АТК при КНАУ',
    title: 'Агротехнический колледж им. С.Ибраимова',
    description:
      'Официальный сайт Агротехнического колледжа им. С.Ибраимова при КНАУ им. К.И.Скрябина.',
    images: [{ url: '/atk-logo.png', width: 1200, height: 630, alt: 'АТК при КНАУ' }],
  },
};

export default function LangLayout({ children, params }) {
  const lang = params?.lang ?? 'ru';
  return (
    <>
      <LangSetter lang={lang} />
      <Header />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
