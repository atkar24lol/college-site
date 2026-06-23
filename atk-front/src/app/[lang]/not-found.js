'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const text = {
  ru: {
    code: '404',
    title: 'Страница не найдена',
    desc: 'Возможно, вы перешли по устаревшей ссылке или допустили опечатку в адресе.',
    home: 'На главную',
    contacts: 'Написать нам',
  },
  en: {
    code: '404',
    title: 'Page not found',
    desc: 'The page you are looking for might have been removed or is temporarily unavailable.',
    home: 'Go home',
    contacts: 'Contact us',
  },
  ky: {
    code: '404',
    title: 'Барак табылган жок',
    desc: 'Белки, сиз эскирген шилтеме аркылуу өттүңүз же дарекке ката киргиздиңиз.',
    home: 'Башкы бетке',
    contacts: 'Байланышуу',
  },
};

export default function NotFound() {
  const { lang = 'ru' } = useParams() ?? {};
  const t = text[lang] ?? text.ru;

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden
          className="select-none text-[9rem] font-black leading-none text-neutral-100 sm:text-[13rem]"
        >
          404
        </span>
        <img
          src="/atk-emblem.png"
          alt=""
          className="absolute h-20 w-20 object-contain opacity-30 sm:h-28 sm:w-28"
        />
      </div>

      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{t.title}</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">{t.desc}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={`/${lang}`}
          className="inline-flex h-11 items-center rounded-lg bg-[var(--color-accent)] px-6 text-sm font-semibold text-white shadow-soft transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          {t.home}
        </Link>
        <Link
          href={`/${lang}/contacts`}
          className="inline-flex h-11 items-center rounded-lg border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-700 shadow-soft transition hover:border-neutral-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-300"
        >
          {t.contacts}
        </Link>
      </div>
    </main>
  );
}
