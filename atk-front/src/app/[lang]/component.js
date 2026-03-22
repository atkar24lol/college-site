'use client';

import MainFormBlock from '@/components/mainFormBlock/component';
import MainInfoBlock from '@/components/mainInfoBlock/component';
import MainNewsBlock from '@/components/mainNewsBlock/component';
import { Container } from '@/components/ui/Container';
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
      {/* Hero: крупная типографика и сетка в духе Compass / editorial */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(105deg, var(--color-accent-soft) 0%, transparent 45%),
              radial-gradient(ellipse 80% 50% at 100% 0%, rgba(12, 74, 110, 0.08), transparent)`,
          }}
        />
        <Container className="relative py-16 md:py-20 lg:py-24">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Агротехнический колледж
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
                {h?.titles?.main}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
                {h?.descriptions?.main}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/${lang}/news`}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-[var(--color-accent-hover)]"
                >
                  {dict?.mainPage?.mainNews?.link || 'Новости'}
                </Link>
                <Link
                  href={`/${lang}/contacts`}
                  className="inline-flex items-center justify-center rounded-full border-2 border-neutral-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                >
                  {dict?.callback || 'Контакты'}
                </Link>
              </div>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <div className="aspect-[4/5] max-h-[420px] overflow-hidden rounded-2xl bg-neutral-100 shadow-soft">
                <img
                  src="/header-main.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <MainNewsBlock dict={dict} news={news} />
      <MainInfoBlock dict={dict} />
      <MainFormBlock dict={dict} />

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-16">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {dict?.contacts?.title || 'Как добраться'}
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            {dict?.mainPage?.mainBlockFeedback?.descriptionTwo ||
              'Интерактивная карта — масштаб и точка колледжа на карте города.'}
          </p>
          <div
            id="map"
            className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100 shadow-soft"
          >
            <Map dict={dict} />
          </div>
        </Container>
      </section>
    </div>
  );
}
