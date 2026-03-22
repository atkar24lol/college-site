'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function Awards({ dict }) {
  const { lang } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('abouts/sertificates/', {
          params: { page: 1, page_size: 200 },
        });
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setItems(list);
      } catch {
        setItems([]);
      }
    })();
  }, []);

  const { hall, partners, general } = useMemo(() => {
    const hall = [];
    const partners = [];
    const general = [];
    for (const a of items) {
      if (a.section === 'hall_of_fame') hall.push(a);
      else if (a.section === 'partners') partners.push(a);
      else general.push(a);
    }
    return { hall, partners, general };
  }, [items]);

  const t = (item, field) => item?.[`${field}_${lang}`] ?? item?.[`${field}_ru`] ?? '';

  const a = dict?.awards;

  return (
    <ClientPageTitle dict={dict}>
      {a?.description ? (
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:mb-10 [overflow-wrap:anywhere]">
          {a.description}
        </p>
      ) : null}

      {hall.length > 0 ? (
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">{a?.hallOfFame?.title}</h2>
          {a?.hallOfFame?.lead ? (
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">{a.hallOfFame.lead}</p>
          ) : null}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {hall.map((item, i) => (
              <div
                key={item.id ?? i}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="aspect-[16/9] bg-neutral-100">
                  {item.image ? (
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                      —
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  {t(item, 'title') ? (
                    <h3 className="break-words text-lg font-semibold text-neutral-900">{t(item, 'title')}</h3>
                  ) : null}
                  {t(item, 'description') ? (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 [overflow-wrap:anywhere]">
                      {t(item, 'description')}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {partners.length > 0 ? (
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">{a?.partners?.title}</h2>
          {a?.partners?.lead ? (
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">{a.partners.lead}</p>
          ) : null}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((item, i) => (
              <div
                key={item.id ?? i}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
              >
                <div className="aspect-[3/4] p-4">
                  {item.image ? (
                    <div
                      className="h-full w-full bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-400">—</div>
                  )}
                </div>
                {(t(item, 'title') || t(item, 'description')) && (
                  <div className="border-t border-neutral-200 bg-white px-4 py-3">
                    {t(item, 'title') ? (
                      <p className="text-sm font-medium text-neutral-900">{t(item, 'title')}</p>
                    ) : null}
                    {t(item, 'description') ? (
                      <p className="mt-1 line-clamp-3 text-xs text-neutral-600">{t(item, 'description')}</p>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {general.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">{a?.general?.title}</h2>
          {a?.general?.lead ? (
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">{a.general.lead}</p>
          ) : null}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {general.map((item, i) => (
              <div
                key={item.id ?? i}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
              >
                <div className="aspect-[3/4] p-4">
                  {item.image ? (
                    <div
                      className="h-full w-full bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-400">—</div>
                  )}
                </div>
                {(t(item, 'title') || t(item, 'description')) && (
                  <div className="border-t border-neutral-200 bg-white px-4 py-3">
                    {t(item, 'title') ? (
                      <p className="text-sm font-medium text-neutral-900">{t(item, 'title')}</p>
                    ) : null}
                    {t(item, 'description') ? (
                      <p className="mt-1 line-clamp-3 text-xs text-neutral-600">{t(item, 'description')}</p>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {items.length === 0 ? <p className="text-sm text-neutral-500">{a?.empty}</p> : null}
    </ClientPageTitle>
  );
}
