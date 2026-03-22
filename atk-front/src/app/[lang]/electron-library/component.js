'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ElectronLibrary({ dict }) {
  const { lang } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('abouts/sample/', { params: { page: 1, page_size: 100 } });
        setDocuments(Array.isArray(data) ? data : data?.results ?? []);
      } catch {
        setDocuments([]);
      }
    })();
  }, []);

  return (
    <ClientPageTitle dict={dict}>
      <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {documents.map((doc, i) => (
          <li key={doc.id ?? i} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-neutral-900">{doc?.[`title_${lang}`] || doc?.title}</p>
              {doc?.created_at ? (
                <p className="text-xs text-neutral-500">{doc.created_at}</p>
              ) : null}
            </div>
            {doc?.file ? (
              <a
                href={doc.file}
                download
                className="shrink-0 rounded-md border border-neutral-200 p-2 hover:bg-neutral-50"
                aria-label={dict?.download || 'Скачать'}
              >
                <img src="/download-icon.svg" alt="" className="h-6 w-6" />
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </ClientPageTitle>
  );
}
