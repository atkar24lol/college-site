'use client';

import MainFormBlock from '@/components/mainFormBlock/component';
import MainInfoBlock from '@/components/mainInfoBlock/component';
import MainNewsBlock from '@/components/mainNewsBlock/component';
import { Container } from '@/components/ui/Container';
import { heroKickerFromDict } from '@/lib/locale';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map/component'), { ssr: false });

export default function MainPage({ dict }) {
  const [news, setNews] = useState([]);
  const { lang } = useParams();
  const h = dict?.header?.previews;
  const kicker = heroKickerFromDict(dict);
  const heroTitle = h?.titles?.main || '';

  const loadNews = useCallback(async () => {
    try {
      const { data } = await API.get('news/news/', {
        params: { page: 1, ordering: '-date', page_size: 5 },
      });
      const list = Array.isArray(data) ? data : data?.results || [];
      setNews(list.slice(0, 5));
    } catch {
      setNews([]);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#map') return;
    const t = setTimeout(() => {
      document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-[var(--color-bg)]">
      <section
        className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]"
        aria-labelledby="hero-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(105deg, var(--color-accent-soft) 0%, transparent 45%),
              radial-gradient(ellipse 80% 50% at 100% 0%, rgba(12, 74, 110, 0.08), transparent)`,
          }}
        />
        <Container className="relative grid items-center gap-10 py-10 sm:py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-24">
          <div className="min-w-0 max-w-3xl">
            {kicker ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-[11px] sm:tracking-[0.2em]">
                {kicker}
              </p>
            ) : null}
            <h1
              id="hero-heading"
              className={`text-balance break-words text-3xl font-semibold leading-[1.12] tracking-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl ${kicker ? 'mt-3 sm:mt-4' : ''}`}
            >
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:mt-6 sm:text-base md:text-lg">
              {h?.descriptions?.main}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={`/${lang}/news`}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:w-auto sm:min-w-[44px] sm:px-8"
              >
                {dict?.mainPage?.mainNews?.link || 'Новости'}
              </Link>
              <Link
                href={`/${lang}/contacts#feedback`}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border-2 border-neutral-900 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:w-auto sm:min-w-[44px] sm:px-8"
              >
                {dict?.callback || 'Контакты'}
              </Link>
            </div>
          </div>
          <div className="mx-auto hidden w-full max-w-[18rem] justify-center md:flex lg:max-w-none">
            <div className="relative flex aspect-square w-full items-center justify-center rounded-full border border-amber-200 bg-[#FBFCFD] p-8 shadow-soft backdrop-blur">
              <div className="absolute inset-4 rounded-full bg-[#FBFCFD]" aria-hidden />
              <img
                src="/atk-emblem.png"
                alt={dict?.mainPage?.emblemAlt || ''}
                className="relative h-full w-full object-contain"
              />
            </div>
          </div>
        </Container>
      </section>

      <MainNewsBlock dict={dict} news={news} />
      <MainInfoBlock dict={dict} />
      <MainFormBlock dict={dict} />

      <section
        className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-16"
        aria-labelledby="main-map-heading"
      >
        <Container>
          <h2
            id="main-map-heading"
            className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
          >
            {dict?.mainPage?.mapSection?.title ?? 'Карта'}
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            {dict?.mainPage?.mapSection?.description ??
              'Интерактивная карта: масштаб и расположение колледжа в городе.'}
          </p>
          <div
            id="map"
            className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100 shadow-soft"
          >
            <Map ariaLabel={dict?.mainPage?.mapSection?.title ?? 'Карта'} />
          </div>
        </Container>
      </section>
    </div>
  );
}
