'use client';

import { PageShell } from '@/components/ui/PageShell';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function TeacherDetails({ dict }) {
  const [teacher, setTeacher] = useState(null);
  const { lang, teacherId } = useParams();

  const load = useCallback(async () => {
    const { data } = await API.get(`abouts/lecturers/${teacherId}/`);
    setTeacher(data);
  }, [teacherId]);

  useEffect(() => {
    load();
  }, [load]);

  const name = teacher?.[`name_${lang}`] || teacher?.name;

  return (
    <PageShell title={name || '…'} description={teacher?.[`subject_${lang}`] || teacher?.subject || ''}>
      <Link
        href={`/${lang}/about-teachers`}
        className="mb-6 inline-block text-sm text-[var(--color-accent)] hover:underline"
      >
        ← {dict?.header?.list?.aboutTeachers}
      </Link>

      {!teacher ? (
        <p className="text-sm text-neutral-500">Загрузка…</p>
      ) : (
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="mx-auto w-full max-w-sm shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 md:mx-0 aspect-square">
            {teacher.avatar ? (
              <img src={teacher.avatar} alt="" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div className="min-w-0 flex-1 space-y-4 text-sm text-neutral-700">
            {teacher[`bio_${lang}`] ? <p className="leading-relaxed">{teacher[`bio_${lang}`]}</p> : null}
            {teacher[`subject_${lang}`] ? (
              <p>
                <span className="font-semibold text-neutral-900">
                  {dict?.teachers?.details?.subjects || 'Дисциплины'}:
                </span>{' '}
                {teacher[`subject_${lang}`]}
              </p>
            ) : null}
            {teacher.email ? (
              <p>
                <span className="font-semibold text-neutral-900">{dict?.teachers?.details?.email || 'Почта'}:</span>{' '}
                <a href={`mailto:${teacher.email}`} className="text-[var(--color-accent)] hover:underline">
                  {teacher.email}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      )}
    </PageShell>
  );
}
