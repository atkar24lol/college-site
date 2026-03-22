'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Contacts({ dict }) {
  const [contacts, setContacts] = useState([]);
  const { lang } = useParams();

  const load = useCallback(async () => {
    try {
      const { data } = await API.get('abouts/contacts/', {
        params: { page: 1, page_size: 100 },
      });
      setContacts(Array.isArray(data) ? data : data?.results ?? []);
    } catch {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ClientPageTitle dict={dict}>
      <div id="form" className="scroll-mt-24">
        <p className="mb-8 text-sm text-neutral-600">
          {dict?.contacts?.subtitle ||
            'По вопросам поступления и сотрудничества обращайтесь по указанным контактам.'}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c, i) => (
            <article
              key={c.id ?? i}
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-[var(--color-accent)]">
                {c?.[`role_${lang} `] || c?.[`role_${lang}`]}
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-900">
                {c?.[`title_${lang} `] || c?.[`title_${lang}`]}
              </h3>
              {c?.contact ? (
                <p className="mt-3 text-sm text-neutral-600">{c.contact}</p>
              ) : null}
              {c?.email ? (
                <Link href={`mailto:${c.email}`} className="mt-2 inline-block text-sm text-[var(--color-accent)] hover:underline">
                  {c.email}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </ClientPageTitle>
  );
}
