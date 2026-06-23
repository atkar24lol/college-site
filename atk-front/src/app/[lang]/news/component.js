'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function BlogAndNews({ dict }) {
  const { lang } = useParams();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 6;

  const load = useCallback(async () => {
    try {
      const { data } = await API.get('news/news/', {
        params: { page, page_size: pageSize },
      });
      setNews(data?.results ?? []);
      setTotal(data?.count ?? 0);
    } catch {
      setNews([]);
      setTotal(0);
    }
  }, [page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <ClientPageTitle dict={dict}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/news/${item.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:shadow-md"
          >
            <div className="aspect-[16/10] shrink-0 bg-neutral-100">
              {item.image ? (
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <time className="text-xs text-neutral-500">
                {item.date ? new Date(item.date).toLocaleDateString('ru-RU') : ''}
              </time>
              <h2 className="mt-2 line-clamp-2 font-semibold text-neutral-900 group-hover:text-[var(--color-accent)]">
                {item[`title_${lang}`] || item.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                {item[`description_${lang}`] || item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {pages > 1 && (
        <nav className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`h-9 min-w-[2.25rem] rounded-md border text-sm font-medium ${
                p === page
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {p}
            </button>
          ))}
        </nav>
      )}
    </ClientPageTitle>
  );
}
