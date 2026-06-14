'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const PAGE_SIZE = 9;

export default function AdditionalEducation({ dict }) {
  const { lang } = useParams();
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [listState, setListState] = useState({
    page: 1,
    count: 0,
  });

  const c = dict?.additionalEducation?.catalog;
  const cp = dict?.additionalEducation?.coursesAndPrograms;

  const load = useCallback(async () => {
    const { data } = await API.get('education/courses-programms', {
      params: {
        page: listState.page,
        page_size: PAGE_SIZE,
        show_on_additional_education: true,
      },
    });
    setPrograms(data?.results ?? []);
    setListState((prev) => ({ ...prev, count: data?.count ?? 0 }));
  }, [listState.page]);

  useEffect(() => {
    load();
  }, [load]);

  const pages = Math.max(1, Math.ceil(listState.count / PAGE_SIZE));

  const audienceLabel = (type) =>
    type === 'lecturer' ? c?.audienceLecturer : c?.audienceStudent;

  return (
    <ClientPageTitle dict={dict}>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-neutral-600 [overflow-wrap:anywhere]">
        {c?.intro}
      </p>

      {listState.count > 0 ? (
        <p className="mb-8 text-sm text-neutral-500">
          {c?.foundPrefix}{' '}
          <span className="font-semibold text-neutral-800">{listState.count}</span>{' '}
          {c?.foundSuffix}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => {
          const title = program?.[`title_${lang}`] || program?.title_ru || '';
          const category = program?.[`category_${lang}`] || program?.category_ru || '';
          const mini =
            program?.[`mini_description_${lang}`] || program?.mini_description_ru || '';
          const studyFormat =
            program?.[`study_format_${lang}`] || program?.study_format_ru || '';
          const duration = program?.[`duration_${lang}`] || program?.duration_ru || '';
          const startInfo =
            program?.[`start_info_${lang}`] || program?.start_info_ru || '';

          const metaItems = [studyFormat, duration, startInfo].filter(Boolean);

          return (
            <article
              key={program.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => router.push(`/${lang}/additional-education/${program.id}`)}
                className="flex flex-1 flex-col text-left"
              >
                <div className="aspect-[16/9] bg-neutral-100">
                  {program?.image ? (
                    <img src={program.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                      ATK
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {category ? (
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                      {category}
                    </p>
                  ) : null}
                  <h2 className="break-words text-base font-semibold leading-snug text-neutral-900 sm:text-lg">
                    {title}
                  </h2>
                  <p className="mt-1 text-xs text-[var(--color-accent)]">
                    {audienceLabel(program.type)}
                  </p>
                  {metaItems.length > 0 ? (
                    <ul className="mt-3 space-y-1 text-xs text-neutral-600">
                      {metaItems.map((line, idx) => (
                        <li key={`${program.id}-${idx}`} className="flex gap-2">
                          <span className="text-neutral-400" aria-hidden>
                            •
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {mini ? (
                    <p className="mt-3 line-clamp-3 flex-1 text-sm text-neutral-600">{mini}</p>
                  ) : null}
                  <div className="mt-4 flex flex-col gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
                    {program.price != null ? (
                      <p className="text-lg font-semibold tabular-nums text-neutral-900">
                        {program.price.toLocaleString()}{' '}
                        <span className="text-sm font-normal text-neutral-600">{c?.currency}</span>
                      </p>
                    ) : null}
                    <span className="text-sm font-medium text-[var(--color-accent)] sm:ml-auto sm:text-right">
                      {cp?.aboutButton}
                    </span>
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {programs.length === 0 ? (
        <p className="mt-10 text-center text-sm text-neutral-500">{c?.empty}</p>
      ) : null}

      {pages > 1 ? (
        <nav className="mt-12 flex flex-wrap justify-center gap-2" aria-label="Pagination">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setListState((prev) => ({ ...prev, page: p }))}
              className={`h-9 min-w-[2.25rem] rounded-md border text-sm font-medium ${
                p === listState.page
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {p}
            </button>
          ))}
        </nav>
      ) : null}
    </ClientPageTitle>
  );
}
