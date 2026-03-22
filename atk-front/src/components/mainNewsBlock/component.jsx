'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MainNewsBlock({ dict, news }) {
  const { lang } = useParams();
  const [first, ...rest] = Array.isArray(news) ? news : [];

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-14 md:py-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {dict?.mainPage?.mainNews?.title || 'Новости'}
          </h2>
          <Link
            href={`/${lang}/news`}
            className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)] hover:underline"
          >
            {dict?.mainPage?.mainNews?.link || 'Все новости'}
          </Link>
        </div>

        {!first ? (
          <p className="text-sm text-neutral-500">Новостей пока нет.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-soft">
              <Link href={`/${lang}/news/${first.id}`} className="block aspect-[16/10] bg-neutral-100">
                {first.image ? (
                  <img src={first.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <time className="text-xs text-neutral-500">
                  {first.date ? new Date(first.date).toLocaleDateString('ru-RU') : ''}
                </time>
                <Link href={`/${lang}/news/${first.id}`} className="text-lg font-semibold text-neutral-900 hover:text-[var(--color-accent)]">
                  {first[`title_${lang}`] || first.title}
                </Link>
                <p className="line-clamp-3 text-sm text-neutral-600">
                  {first[`description_${lang}`] || first.description}
                </p>
              </div>
            </article>

            <ul className="flex flex-col gap-3">
              {rest.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${lang}/news/${item.id}`}
                    className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-soft transition hover:border-neutral-300"
                  >
                    {item.image ? (
                      <img src={item.image} alt="" className="h-20 w-28 shrink-0 rounded object-cover" />
                    ) : (
                      <div className="h-20 w-28 shrink-0 rounded bg-neutral-100" />
                    )}
                    <div className="min-w-0 flex-1">
                      <time className="text-xs text-neutral-500">
                        {item.date ? new Date(item.date).toLocaleDateString('ru-RU') : ''}
                      </time>
                      <p className="mt-1 font-medium text-neutral-900 line-clamp-2">
                        {item[`title_${lang}`] || item.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
