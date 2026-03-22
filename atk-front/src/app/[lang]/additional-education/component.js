'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import { useEffect, useState } from 'react';

export default function AdditionalEducation({ dict }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('abouts/sertificates/', {
          params: { page: 1, page_size: 100 },
        });
        setItems(Array.isArray(data) ? data : data?.results ?? []);
      } catch {
        setItems([]);
      }
    })();
  }, []);

  return (
    <ClientPageTitle dict={dict}>
      <p className="mb-8 text-sm text-neutral-600">
        {dict?.additionalEducation?.sertificates?.subtitle ||
          'Документы об образовании и сертификаты.'}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <div
            key={s.id ?? i}
            className="flex aspect-[3/4] items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-4"
          >
            {s.image ? (
              <div
                className="h-full w-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${s.image})` }}
              />
            ) : (
              <span className="text-sm text-neutral-400">Нет изображения</span>
            )}
          </div>
        ))}
      </div>
    </ClientPageTitle>
  );
}
