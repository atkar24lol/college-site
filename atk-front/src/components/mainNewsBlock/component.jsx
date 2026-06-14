'use client';

import { Container } from '@/components/ui/Container';
import { dateLocaleForLang } from '@/lib/locale';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function formatNewsDate(iso, lang) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString(dateLocaleForLang(lang), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function MainNewsBlock({ dict, news }) {
  const { lang } = useParams();
  const [first, ...rest] = Array.isArray(news) ? news : [];

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-14 md:py-16"
      aria-labelledby="main-news-heading"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="main-news-heading"
            className="heading-accent text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
          >
            {dict?.mainPage?.mainNews?.title || 'Новости'}
          </h2>
          <Link
            href={`/${lang}/news`}
            className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)] transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {dict?.mainPage?.mainNews?.link || 'Все новости'}
          </Link>
        </div>

        {!first ? (
          <p className="text-sm text-neutral-500">
            {dict?.mainPage?.mainNews?.noNewsYet ?? 'Новостей пока нет.'}
          </p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-soft">
              <Link
                href={`/${lang}/news/${first.id}`}
                className="relative block aspect-[16/10] bg-neutral-100"
              >
                {first.image ? (
                  <img
                    src={first.image}
                    alt={first[`title_${lang}`] || first.title || ''}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : null}
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <time className="text-xs text-neutral-500" dateTime={first.date || undefined}>
                  {formatNewsDate(first.date, lang)}
                </time>
                <Link
                  href={`/${lang}/news/${first.id}`}
                  className="text-lg font-semibold text-neutral-900 transition hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {first[`title_${lang}`] || first.title}
                </Link>
                <p className="line-clamp-3 text-sm text-neutral-600">
                  {first[`description_${lang}`] || first.description}
                </p>
              </div>
            </article>

            <ul className="flex flex-col gap-3">
              {rest.map((item) => {
                const title = item[`title_${lang}`] || item.title;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/${lang}/news/${item.id}`}
                      className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-soft transition hover:border-neutral-300 focus-within:border-neutral-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          width={112}
                          height={80}
                          className="h-20 w-28 shrink-0 rounded object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="h-20 w-28 shrink-0 rounded bg-neutral-100" aria-hidden />
                      )}
                      <div className="min-w-0 flex-1">
                        <time className="text-xs text-neutral-500" dateTime={item.date || undefined}>
                          {formatNewsDate(item.date, lang)}
                        </time>
                        <p className="mt-1 line-clamp-2 font-medium text-neutral-900">{title}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
