'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

function GraduateCard({ item }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-soft">
      {item.image ? (
        <div className="aspect-[4/3] bg-neutral-100">
          <img src={item.image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="p-6">
        {item.label ? (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            {item.label}
          </p>
        ) : null}
        {item.title ? (
          <h2 className="mt-3 text-xl font-semibold leading-snug text-neutral-900">{item.title}</h2>
        ) : null}
        {item.description ? (
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">{item.description}</p>
        ) : null}
      </div>
    </article>
  );
}

export default function Graduates({ dict }) {
  const { lang } = useParams();
  const [graduates, setGraduates] = useState([]);
  const fallbackCards = dict?.graduates?.cards ?? [];

  const text = useCallback(
    (item, field) => item?.[`${field}_${lang}`] ?? item?.[`${field}_ru`] ?? item?.[field] ?? '',
    [lang]
  );

  const loadGraduates = useCallback(async () => {
    try {
      const { data } = await API.get('abouts/graduates/', {
        params: { page_size: 100, is_published: true },
      });
      setGraduates(Array.isArray(data) ? data : data?.results ?? []);
    } catch {
      setGraduates([]);
    }
  }, []);

  useEffect(() => {
    loadGraduates();
  }, [loadGraduates]);

  const cards = useMemo(() => {
    if (graduates.length > 0) {
      return graduates.map((item) => ({
        id: item.id,
        image: item.image,
        label: text(item, 'label'),
        title: text(item, 'title'),
        description: text(item, 'description'),
      }));
    }
    return fallbackCards;
  }, [fallbackCards, graduates, text]);

  return (
    <ClientPageTitle dict={dict}>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <GraduateCard key={card.id ?? `${card?.title ?? 'graduate'}-${index}`} item={card} />
        ))}
      </section>

      {graduates.length === 0 ? (
        <section className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-neutral-900">
            {dict?.graduates?.emptyTitle ?? 'Истории выпускников скоро появятся'}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
            {dict?.graduates?.emptyDescription ??
              'Здесь можно будет размещать успешные истории, фотографии, достижения и контакты выпускников колледжа.'}
          </p>
        </section>
      ) : null}
    </ClientPageTitle>
  );
}
