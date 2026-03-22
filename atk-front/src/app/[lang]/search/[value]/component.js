'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

  const hasResults = useMemo(() => {
    if (!data) return false;
    return Boolean(
      data.news?.length ||
        data.images_for_multimedia?.length ||
        data.courses_and_programms?.length ||
        data.lecturer?.length ||
        data.faq?.length ||
        data.sertificates?.length
    );
  }, [data]);

  const q = decodeURIComponent(String(value));

  return (
    <ClientPageTitle dict={dict}>
      <p className="mb-8 text-sm text-neutral-600">
        {dict?.searchPage?.queryLabel ?? 'Запрос:'}{' '}
        <span className="font-medium text-neutral-900">{q}</span>
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
        <section className="mb-10">
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

      {data?.lecturer?.length ? (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-neutral-900">{dict?.header?.list?.teachers}</h2>
          <ul className="mt-3 space-y-2">
            {data.lecturer.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/${lang}/teachers/${l.id}`}
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 text-sm hover:border-neutral-300"
                >
                  {l.avatar ? (
                    <img src={l.avatar} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                  ) : (
                    <div className="h-12 w-12 shrink-0 rounded-full bg-neutral-100" />
                  )}
                  <span className="font-medium text-neutral-800">{l[`name_${lang}`] || l.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data?.faq?.length ? (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-neutral-900">{dict?.entrants?.faq?.title}</h2>
          <ul className="mt-3 space-y-2">
            {data.faq.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${lang}/entrants`}
                  className="block rounded-lg border border-neutral-200 bg-white p-3 text-sm hover:border-neutral-300"
                >
                  {item[`question_${lang}`] || item.question}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data?.sertificates?.length ? (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-neutral-900">{dict?.awards?.title}</h2>
          <ul className="mt-3 space-y-2">
            {data.sertificates.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/${lang}/awards`}
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 text-sm hover:border-neutral-300"
                >
                  {s.image ? (
                    <img src={s.image} alt="" className="h-14 w-20 shrink-0 rounded object-cover" />
                  ) : (
                    <div className="h-14 w-20 shrink-0 rounded bg-neutral-100" />
                  )}
                  <span>{s[`title_${lang}`] || s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data && !hasResults ? (
        <p className="text-sm text-neutral-500">{dict?.searchPage?.empty ?? 'Ничего не найдено.'}</p>
      ) : null}
    </ClientPageTitle>
  );
}
