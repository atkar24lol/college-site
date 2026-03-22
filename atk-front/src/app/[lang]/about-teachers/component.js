'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function AboutTeachers({ dict }) {
  const [teachers, setTeachers] = useState([]);
  const { lang } = useParams();

  const load = useCallback(async () => {
    const { data } = await API.get('abouts/lecturers/', { params: { page_size: 100 } });
    setTeachers(Array.isArray(data) ? data : data?.results ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ClientPageTitle dict={dict}>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teachers.map((t) => (
          <Link
            key={t.id}
            href={`/${lang}/teachers/${t.id}`}
            className="group overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-neutral-300"
          >
            <div className="aspect-square bg-neutral-100">
              {t.avatar ? (
                <img src={t.avatar} alt="" className="h-full w-full object-cover transition group-hover:opacity-95" />
              ) : null}
            </div>
            <div className="p-3">
              <p className="font-medium text-neutral-900">{t[`name_${lang}`] || t.name}</p>
              {t[`subject_${lang}`] || t.subject ? (
                <p className="mt-1 text-xs text-neutral-500">{t[`subject_${lang}`] || t.subject}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </ClientPageTitle>
  );
}
