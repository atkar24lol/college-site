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
    <header className="sticky top-0 z-50 bg-[var(--color-surface)] shadow-nav">
      {/* Верхняя панель — как у Compass: контакты + вторичные действия */}
      <div className="border-b border-neutral-200/80 bg-[#1c1917] text-[13px] text-neutral-300">
        <Container className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/contacts`} className="hidden hover:text-white sm:inline transition-colors">
              {dict?.footer?.list?.phone ?? '+996 312 …'}
            </Link>
            <button type="button" onClick={scrollToMap} className="hidden hover:text-white sm:inline transition-colors">
              {dict?.contacts?.title ?? 'Карта'}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="http://cdo.atk.kg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              CDO
            </Link>
          </div>
        </Container>
      </div>

      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href={`/${lang}`} className="flex min-w-0 shrink-0 items-center gap-3 md:gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] md:h-12 md:w-12">
            <img src="/atk-logo.png" alt="" className="h-8 w-8 object-contain md:h-9 md:w-9" />
          </div>
          <span
            className="hidden max-w-[14rem] text-[13px] font-medium leading-snug text-neutral-800 md:block lg:max-w-xs lg:text-sm"
            dangerouslySetInnerHTML={{ __html: dict?.header?.slogan || 'ATK' }}
          />
        </Link>

        {/* Десктоп: от lg (1024px) и выше — стандартные breakpoints Tailwind */}
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="Main">
          {navPrimary.map((item) =>
            item.label ? (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ) : null
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <form onSubmit={submitSearch} className="hidden items-center md:flex">
            <div className="flex h-10 items-center rounded-full border border-neutral-200 bg-neutral-50 pl-4 pr-1 transition-shadow focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent-soft)]">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={dict?.header?.searchField || 'Поиск…'}
                className="w-32 border-0 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 lg:w-40"
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[var(--color-accent-hover)]"
              >
                OK
              </button>
            </div>
          </form>

          <div className="flex h-10 items-center rounded-full border border-neutral-200 bg-white px-1">
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => switchLang(e.target.value)}
              className="cursor-pointer border-0 bg-transparent py-1 pl-2 pr-8 text-xs font-bold uppercase tracking-wider text-neutral-800 outline-none"
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
            className="flex h-10 items-center rounded-full border border-neutral-900 px-4 text-xs font-bold uppercase tracking-wider text-neutral-900 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Меню"
          >
            Меню
          </button>
        </div>
      </Container>

      <nav
        className="hidden border-t border-neutral-100 bg-[#fafaf9] lg:block"
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
        <div className="border-t border-neutral-200 bg-white lg:hidden">
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
