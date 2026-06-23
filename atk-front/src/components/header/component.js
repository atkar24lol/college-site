'use client';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const LANGS = [
  { code: 'ru', label: 'RU' },
  { code: 'ky', label: 'KY' },
  { code: 'en', label: 'EN' },
];

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="5" x2="17" y2="5" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="15" x2="17" y2="15" />
    </svg>
  );
}

function IconChevron({ open }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="2 4 6 8 10 4" />
    </svg>
  );
}

function LangDropdown({ lang, langs, onSwitch }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = langs.find((l) => l.code === lang) ?? langs[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Выбор языка"
        className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold uppercase tracking-wider transition-colors ${
          open
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
            : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
        }`}
      >
        {current.label}
        <IconChevron open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Язык"
          className="absolute right-0 top-full z-10 mt-2 min-w-[6rem] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg"
          style={{ animation: 'fadeSlideIn 0.15s ease-out' }}
        >
          {langs.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                type="button"
                onClick={() => { onSwitch(l.code); setOpen(false); }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {active && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                    <circle cx="5" cy="5" r="3.5" />
                  </svg>
                )}
                {!active && <span className="w-[10px]" />}
                {l.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="4" x2="16" y2="16" />
      <line x1="16" y1="4" x2="4" y2="16" />
    </svg>
  );
}

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
    getDictionary(lang).then((d) => { if (!cancelled) setDict(d); });
    return () => { cancelled = true; };
  }, [lang]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navPrimary = useMemo(() => [
    { href: `/${lang}/news`, label: dict?.header?.list?.news },
    { href: `/${lang}/education-activity`, label: dict?.header?.list?.educationalActivity },
    { href: `/${lang}/gallary`, label: dict?.header?.list?.gallary },
    { href: `/${lang}/entrants`, label: dict?.header?.list?.entrants },
    { href: `/${lang}/graduates`, label: dict?.header?.list?.graduates },
    { href: `/${lang}/teachers`, label: dict?.header?.list?.teachers },
  ], [dict, lang]);

  const navSecondary = useMemo(() => [
    { href: `/${lang}/additional-education`, label: dict?.header?.list?.additionalEducation },
    { href: `/${lang}/about-teachers`, label: dict?.header?.list?.aboutTeachers },
    { href: `/${lang}/awards`, label: dict?.header?.list?.rewards },
    { href: `/${lang}/international-cooperation`, label: dict?.header?.list?.internationalCooperation },
    { href: `/${lang}/contacts`, label: dict?.header?.list?.contacts },
  ], [dict, lang]);

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
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-surface)] shadow-nav">

        {/* ── Ряд 1: утилитарная тёмная полоска ── */}
        <div className="border-b border-neutral-200/80 bg-[#1c1917] text-[13px] text-neutral-300">
          <Container className="flex h-9 items-center justify-between sm:h-10">
            <button
              type="button"
              onClick={scrollToMap}
              className="hidden text-neutral-400 transition-colors hover:text-white sm:inline"
            >
              {dict?.mainPage?.mapSection?.title ?? 'Карта'}
            </button>
            <div className="ml-auto">
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

        {/* ── Ряд 2: логотип + поиск + язык + гамбургер ── */}
        <Container className="flex h-[4.25rem] items-center justify-between gap-3 sm:h-[4.5rem]">
          {/* Логотип */}
          <Link href={`/${lang}`} className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
            <img
              src="/atk-emblem.png"
              alt=""
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 md:h-[2.7rem] md:w-[2.7rem]"
            />
            <span
              className="hidden min-w-0 text-[12px] font-medium leading-tight text-neutral-800 sm:block sm:max-w-[13rem] sm:text-[13px] md:max-w-[17rem] xl:text-sm"
              dangerouslySetInnerHTML={{ __html: dict?.header?.slogan || 'ATK' }}
            />
          </Link>

          {/* Правые контролы */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Поиск — от lg */}
            <form onSubmit={submitSearch} className="hidden items-center lg:flex">
              <div className="flex h-9 items-center rounded-full border border-neutral-200 bg-neutral-50 pl-3 pr-1 transition-shadow focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent-soft)]">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={dict?.header?.searchField || 'Поиск…'}
                  className="w-28 min-w-0 border-0 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 xl:w-36"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[var(--color-accent-hover)]"
                >
                  OK
                </button>
              </div>
            </form>

            {/* Язык */}
            <LangDropdown lang={lang} langs={LANGS} onSwitch={switchLang} />

            {/* Гамбургер — скрыт от lg */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900 text-neutral-900 transition hover:bg-neutral-900 hover:text-white lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {mobileOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </Container>

        {/* ── Ряд 3: основная навигация (lg+) ── */}
        <nav
          className="hidden border-t border-neutral-200 bg-white lg:block"
          aria-label="Main"
        >
          <Container className="flex items-center justify-between">
            {navPrimary.map((item) =>
              item.label ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap border-b-2 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    isActive(item.href)
                      ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                      : 'border-transparent text-neutral-500 hover:text-[var(--color-accent)]'
                  }`}
                >
                  {item.label}
                </Link>
              ) : null
            )}
          </Container>
        </nav>

        {/* ── Ряд 4: вторичная навигация (lg+) ── */}
        <nav
          className="hidden border-t border-neutral-100 bg-[#fafaf9] lg:block"
          aria-label="Secondary"
        >
          <Container className="flex flex-wrap justify-center gap-x-8 gap-y-1.5 py-2">
            {navSecondary.map((item) =>
              item.label ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] font-medium uppercase tracking-[0.08em] transition hover:text-[var(--color-accent)] ${
                    isActive(item.href) ? 'text-[var(--color-accent)]' : 'text-neutral-500'
                  }`}
                >
                  {item.label}
                </Link>
              ) : null
            )}
          </Container>
        </nav>
      </header>

      {/* ── Мобильное меню (full-screen overlay, до lg) ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Навигация"
        >
          {/* Шапка оверлея */}
          <div className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-neutral-200 px-4 sm:h-[4.5rem] sm:px-8">
            <Link href={`/${lang}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <img src="/atk-emblem.png" alt="" className="h-9 w-9 object-contain" />
              <span
                className="max-w-[14rem] text-[12px] font-medium leading-tight text-neutral-800 sm:text-[13px]"
                dangerouslySetInnerHTML={{ __html: dict?.header?.slogan || 'ATK' }}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900 text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              aria-label="Закрыть меню"
            >
              <IconClose />
            </button>
          </div>

          {/* Прокручиваемый контент */}
          <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-8">
            {/* Поиск */}
            <form onSubmit={submitSearch} className="mb-5 flex gap-2">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={dict?.header?.searchField || 'Поиск…'}
                className="min-h-[44px] min-w-0 flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
              />
              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)]"
              >
                OK
              </button>
            </form>

            {/* Ссылки */}
            <div className="flex flex-col gap-0.5">
              {[...navPrimary, ...navSecondary].map((item) =>
                item.label ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`min-h-[44px] rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive(item.href)
                        ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                        : 'text-neutral-800 hover:bg-neutral-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
            </div>

            {/* Переключатель языка */}
            <div className="mt-6 border-t border-neutral-100 pt-5 px-1">
              <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                Язык
              </p>
              <div className="flex gap-2">
                {LANGS.map((l) => {
                  const active = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => switchLang(l.code)}
                      className={`min-h-[44px] min-w-[52px] rounded-xl px-4 text-sm font-bold uppercase tracking-wider transition ${
                        active
                          ? 'bg-[var(--color-accent)] text-white shadow-sm'
                          : 'border border-neutral-200 text-neutral-600 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                      }`}
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ebilim */}
            <div className="mt-4 px-3">
              <Link
                href="http://cdo.atk.kg/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-neutral-500 transition hover:text-[var(--color-accent)]"
              >
                Ebilim →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
