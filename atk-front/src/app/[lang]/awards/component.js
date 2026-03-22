'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import { useEffect, useState } from 'react';

export default function Awards({ dict }) {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('abouts/awards/', { params: { page: 1, page_size: 100 } });
        setAwards(Array.isArray(data) ? data : data?.results ?? []);
      } catch {
        setAwards([]);
      }
    })();
  }, []);

  return (
    <ClientPageTitle dict={dict}>
      {dict?.awards?.description ? (
        <p className="mb-8 text-sm text-neutral-600">{dict.awards.description}</p>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((a, i) => (
          <div
            key={a.id ?? i}
            className="flex aspect-[3/4] items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-4"
          >
            {a.image ? (
              <div
                className="h-full w-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${a.image})` }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </ClientPageTitle>
  );
}
