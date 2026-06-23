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
      {hall.length > 0 ? (
        <section className="mb-14">
          <h2 className="heading-accent text-xl font-semibold text-neutral-900 sm:text-2xl">{a?.hallOfFame?.title}</h2>
          {a?.hallOfFame?.lead ? (
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">{a.hallOfFame.lead}</p>
          ) : null}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hall.map((item, i) => (
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

      {partners.length > 0 ? (
        <section className="mb-14">
          <h2 className="heading-accent text-xl font-semibold text-neutral-900 sm:text-2xl">{a?.partners?.title}</h2>
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
          <h2 className="heading-accent text-xl font-semibold text-neutral-900 sm:text-2xl">{a?.general?.title}</h2>
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
