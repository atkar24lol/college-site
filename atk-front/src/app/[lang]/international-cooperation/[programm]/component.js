'use client';

import { PageShell } from '@/components/ui/PageShell';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ProgrammDetails({ dict }) {
  const [data, setData] = useState(null);
  const { lang, programm } = useParams();

  const load = useCallback(async () => {
    const res = await API.get(`education/courses-programms/${programm}/`);
    setData(res.data);
  }, [programm]);

  useEffect(() => {
    load();
  }, [load]);

  const title = data?.[`title_${lang}`] || '…';

  return (
    <PageShell title={title} description="">
      <Link
        href={`/${lang}/international-cooperation`}
        className="mb-6 inline-block text-sm text-[var(--color-accent)] hover:underline"
      >
        ← {dict?.header?.list?.internationalCooperation}
      </Link>

      {!data ? (
        <p className="text-sm text-neutral-500">Загрузка…</p>
      ) : (
        <div className="space-y-8 rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
          <div className="prose prose-neutral max-w-none text-sm">
            <ReactMarkdown>{data[`description_${lang}`] || ''}</ReactMarkdown>
          </div>
          {data.image ? (
            <img src={data.image} alt="" className="max-h-96 w-full rounded-md object-cover" />
          ) : null}
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            {data[`duration_${lang}`] ? (
              <>
                <dt className="font-medium text-neutral-900">Длительность</dt>
                <dd className="text-neutral-600">{data[`duration_${lang}`]}</dd>
              </>
            ) : null}
            {data.price != null ? (
              <>
                <dt className="font-medium text-neutral-900">Стоимость</dt>
                <dd className="text-neutral-600">{data.price} сом</dd>
              </>
            ) : null}
          </dl>
        </div>
      )}
    </PageShell>
  );
}
