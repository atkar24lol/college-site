'use client';

import { PageShell } from '@/components/ui/PageShell';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function CourseDetails({ dict }) {
  const [data, setData] = useState(null);
  const { lang, courseId } = useParams();
  const c = dict?.additionalEducation?.catalog;
  const cp = dict?.additionalEducation?.coursesAndPrograms;

  const load = useCallback(async () => {
    const res = await API.get(`education/courses-programms/${courseId}/`);
    setData(res.data);
  }, [courseId]);

  useEffect(() => {
    load();
  }, [load]);

  const title = data?.[`title_${lang}`] || data?.title_ru || '…';
  const category = data?.[`category_${lang}`] || data?.category_ru || '';
  const studyFormat = data?.[`study_format_${lang}`] || data?.study_format_ru || '';
  const startInfo = data?.[`start_info_${lang}`] || data?.start_info_ru || '';
  const duration = data?.[`duration_${lang}`] || data?.duration_ru || '';
  const audience =
    data?.type === 'lecturer' ? c?.audienceLecturer : c?.audienceStudent;

  return (
    <PageShell title={title} description="">
      <Link
        href={`/${lang}/additional-education`}
        className="mb-6 inline-block text-sm text-[var(--color-accent)] hover:underline"
      >
        ← {c?.back}
      </Link>

      {!data ? (
        <p className="text-sm text-neutral-500">…</p>
      ) : (
        <div className="space-y-8 rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
          {category ? (
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{category}</p>
          ) : null}
          {audience ? (
            <p className="text-sm text-[var(--color-accent)]">{audience}</p>
          ) : null}

          <div className="prose prose-neutral max-w-none text-sm">
            <ReactMarkdown>{data[`description_${lang}`] || data?.description_ru || ''}</ReactMarkdown>
          </div>

          {data.image ? (
            <div className="aspect-[16/9] overflow-hidden rounded-md">
              <img src={data.image} alt="" className="h-full w-full object-cover" />
            </div>
          ) : null}

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {studyFormat ? (
              <>
                <dt className="font-medium text-neutral-900">{c?.format}</dt>
                <dd className="text-neutral-600">{studyFormat}</dd>
              </>
            ) : null}
            {duration ? (
              <>
                <dt className="font-medium text-neutral-900">{cp?.duration}</dt>
                <dd className="text-neutral-600">{duration}</dd>
              </>
            ) : null}
            {startInfo ? (
              <>
                <dt className="font-medium text-neutral-900">{c?.start}</dt>
                <dd className="text-neutral-600">{startInfo}</dd>
              </>
            ) : null}
            {data.price != null ? (
              <>
                <dt className="font-medium text-neutral-900">{cp?.price}</dt>
                <dd className="text-neutral-600">
                  {data.price.toLocaleString()} {c?.currency}
                </dd>
              </>
            ) : null}
          </dl>
        </div>
      )}
    </PageShell>
  );
}
