'use client';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const LANGS = [
  { code: 'ru', label: 'RU' },
  { code: 'ky', label: 'KY' },
  { code: 'en', label: 'EN' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'ru';
  const [dict, setDict] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    getDictionary(lang).then((d) => {
      if (!cancelled) setDict(d);
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const navPrimary = useMemo(
    () => [
      { href: `/${lang}/news`, label: dict?.header?.list?.news },
      { href: `/${lang}/education-activity`, label: dict?.header?.list?.educationalActivity },
      { href: `/${lang}/gallary`, label: dict?.header?.list?.gallary },
      { href: `/${lang}/entrants`, label: dict?.header?.list?.entrants },
      { href: `/${lang}/teachers`, label: dict?.header?.list?.teachers },
    ],
    [dict, lang]
  );

  const navSecondary = useMemo(
    () => [
      { href: `/${lang}/additional-education`, label: dict?.header?.list?.additionalEducation },
      { href: `/${lang}/about-teachers`, label: dict?.header?.list?.aboutTeachers },
      { href: `/${lang}/awards`, label: dict?.header?.list?.rewards },
      { href: `/${lang}/international-cooperation`, label: dict?.header?.list?.internationalCooperation },
      { href: `/${lang}/contacts`, label: dict?.header?.list?.contacts },
    ],
    [dict, lang]
  );

  const switchLang = (code) => {
    const rest = pathname.replace(/^\/[^/]+/, '') || '/';
    router.push(`/${code}${rest === '/' ? '' : rest}`);
    setMobileOpen(false);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (q) router.push(`/${lang}/search/${encodeURIComponent(q)}`);
    setMobileOpen(false);
  };

  const scrollToMap = () => {
    const el = document.getElementById('map');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else router.push(`/${lang}#map`);
  };

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 overflow-x-hidden bg-[var(--color-surface)] shadow-nav">
      {/* Верхняя панель — как у Compass: контакты + вторичные действия */}
      <div className="border-b border-neutral-200/80 bg-[#1c1917] text-[13px] text-neutral-300">
        <Container className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToMap}
              className="hidden hover:text-white sm:inline transition-colors"
            >
              {dict?.mainPage?.mapSection?.title ?? 'Карта'}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="http://cdo.atk.kg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              Ebilim
            </Link>
          </div>
        </Container>
      </div>

      <Container className="flex h-[4.5rem] min-w-0 max-w-full items-center gap-2 sm:gap-3 md:gap-4">
        <Link
          href={`/${lang}`}
          className="flex min-w-0 max-w-[min(100%,10.5rem)] shrink items-center gap-2 sm:max-w-[12rem] sm:gap-3 md:max-w-[14rem] md:gap-4 xl:max-w-[min(100%,18rem)]"
        >
          <div className="flex h-[2.4rem] w-[2.4rem] shrink-0 items-center justify-center md:h-[2.7rem] md:w-[2.7rem]">
            <img
              src="/atk-logo.png"
              alt=""
              className="h-[2.4rem] w-[2.4rem] object-contain md:h-[2.7rem] md:w-[2.7rem]"
            />
          </div>
          <span
            className="hidden min-w-0 text-[12px] font-medium leading-tight text-neutral-800 sm:text-[13px] md:block md:line-clamp-2 md:break-words xl:text-sm"
            dangerouslySetInnerHTML={{ __html: dict?.header?.slogan || 'ATK' }}
          />
        </Link>

        {/* Полная навигация только от xl — ниже кнопка «Меню» */}
        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-x-4 xl:flex xl:gap-x-6 2xl:gap-x-8"
          aria-label="Main"
        >
          {navPrimary.map((item) =>
            item.label ? (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link shrink-0 whitespace-nowrap ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ) : null
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <form onSubmit={submitSearch} className="hidden min-w-0 items-center xl:flex">
            <div className="flex h-10 max-w-full items-center rounded-full border border-neutral-200 bg-neutral-50 pl-3 pr-1 transition-shadow focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent-soft)] sm:pl-4">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={dict?.header?.searchField || 'Поиск…'}
                className="w-[6.5rem] min-w-0 flex-1 border-0 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 sm:w-28 xl:w-36"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[var(--color-accent-hover)] sm:px-4"
              >
                OK
              </button>
            </div>
          </form>

          <div className="flex h-10 shrink-0 items-center rounded-full border border-neutral-200 bg-white px-0.5 sm:px-1">
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => switchLang(e.target.value)}
              className="max-w-[5.5rem] cursor-pointer border-0 bg-transparent py-1 pl-1.5 pr-6 text-[11px] font-bold uppercase tracking-wider text-neutral-800 outline-none sm:max-w-none sm:pl-2 sm:pr-7 sm:text-xs"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="flex h-10 shrink-0 items-center rounded-full border border-neutral-900 px-2.5 text-[11px] font-bold uppercase tracking-wider text-neutral-900 sm:px-3 sm:text-xs xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Меню"
          >
            Меню
          </button>
        </div>
      </Container>

      <nav
        className="hidden border-t border-neutral-100 bg-[#fafaf9] xl:block"
        aria-label="Secondary"
      >
        <Container className="flex flex-wrap gap-x-8 gap-y-2 py-2.5">
          {navSecondary.map((item) =>
            item.label ? (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[12px] font-medium uppercase tracking-[0.08em] text-neutral-500 transition hover:text-[var(--color-accent)] ${
                  isActive(item.href) ? 'text-[var(--color-accent)]' : ''
                }`}
              >
                {item.label}
              </Link>
            ) : null
          )}
        </Container>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <form onSubmit={submitSearch} className="mb-3 flex gap-2">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={dict?.header?.searchField || 'Поиск…'}
                className="min-w-0 flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white"
              >
                OK
              </button>
            </form>
            {[...navPrimary, ...navSecondary].map((item) =>
              item.label ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : null
            )}
          </Container>
        </div>
      )}
    </header>
  );
}
