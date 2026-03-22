'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function SearchResult({ dict }) {
  const [data, setData] = useState(null);
  const { value, lang } = useParams();
  const router = useRouter();

  const load = useCallback(async () => {
    const { data: res } = await API.get('abouts/global-search/', {
      params: { q: decodeURIComponent(String(value)) },
    });
    setData(res);
  }, [value]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ClientPageTitle dict={dict}>
      <p className="mb-8 text-sm text-neutral-600">
        Запрос: <span className="font-medium text-neutral-900">{decodeURIComponent(String(value))}</span>
      </p>

      {data?.news?.length ? (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-neutral-900">{dict?.header?.list?.news}</h2>
          <ul className="mt-3 space-y-3">
            {data.news.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => router.push(`/${lang}/news/${n.id}`)}
                  className="flex w-full gap-4 rounded-lg border border-neutral-200 bg-white p-3 text-left transition hover:border-neutral-300"
                >
                  {n.image ? (
                    <img src={n.image} alt="" className="h-16 w-24 shrink-0 rounded object-cover" />
                  ) : (
                    <div className="h-16 w-24 shrink-0 rounded bg-neutral-100" />
                  )}
                  <span className="text-sm font-medium text-neutral-800">{n[`title_${lang}`]}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data?.images_for_multimedia?.length ? (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-neutral-900">{dict?.header?.list?.gallary}</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.images_for_multimedia.map((m) => (
              <Link
                key={m.id}
                href={`/${lang}/gallary`}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
              >
                {m.type === 'video' ? (
                  <div className="aspect-video bg-neutral-900/5 text-center text-xs text-neutral-500 flex items-center justify-center">
                    Video
                  </div>
                ) : (
                  <img src={m.image} alt="" className="aspect-video w-full object-cover" />
                )}
                <p className="p-2 text-xs font-medium text-neutral-800">{m[`title_${lang}`]}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {data?.courses_and_programms?.length ? (
        <section>
          <h2 className="text-sm font-semibold text-neutral-900">{dict?.footer?.list?.additionalEducation}</h2>
          <ul className="mt-3 space-y-2">
            {data.courses_and_programms.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/${lang}/international-cooperation/${c.id}`}
                  className="block rounded-lg border border-neutral-200 bg-white p-3 text-sm hover:border-neutral-300"
                >
                  {c[`title_${lang}`] || c.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data && !data.news?.length && !data.images_for_multimedia?.length && !data.courses_and_programms?.length ? (
        <p className="text-sm text-neutral-500">Ничего не найдено.</p>
      ) : null}
    </ClientPageTitle>
  );
}
