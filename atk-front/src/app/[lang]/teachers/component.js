'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { absoluteMediaUrl } from '@/lib/mediaUrl';
import { API } from '@/requester';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

function Section({ id, title, description, children, className = '' }) {
  return (
    <section
      id={id}
      className={`border-b border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {title ? (
          <header className="mb-10 md:mb-12">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">{description}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function ScheduleRow({ item, lang, downloadLabel }) {
  const title = item?.[`title_${lang}`] ?? item?.title ?? '';
  const fileUrl = absoluteMediaUrl(item?.file);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <h3 className="min-w-0 flex-1 text-base font-semibold leading-snug text-neutral-900">{title}</h3>
      {fileUrl ? (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="shrink-0 text-sm font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          {downloadLabel}
        </a>
      ) : (
        <span className="shrink-0 text-sm text-neutral-400">—</span>
      )}
    </div>
  );
}

function MaterialCard({ title, description, fileUrl, href, downloadLabel }) {
  const cta = fileUrl ? (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
    >
      {downloadLabel}
    </a>
  ) : href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
    >
      {downloadLabel}
    </a>
  ) : null;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-soft">
      <h3 className="text-sm font-semibold leading-snug text-neutral-900 md:text-base">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{description}</p>
      {cta}
    </div>
  );
}

function PagePagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;
  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Предыдущая страница"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="min-w-[120px] text-center text-sm tabular-nums text-neutral-600">
        {page} / {pageCount}
      </span>
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Следующая страница"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

const MATERIAL_KEYS = ['materialOne', 'materialTwo', 'materialThree', 'materialFour'];

function pickLocalized(obj, lang, base) {
  if (!obj) return '';
  return obj[`${base}_${lang}`] ?? obj[base] ?? '';
}

export default function Teachers({ dict }) {
  const { lang } = useParams();
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [lectureBundle, setLectureBundle] = useState(null);
  const pageSize = 6;

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize) || 1);

  const loadPlans = useCallback(async () => {
    try {
      const { data } = await API.get('education/schedule', {
        params: { page, page_size: pageSize },
      });
      setPlans(data?.results ?? []);
      setTotalCount(data?.count ?? 0);
    } catch {
      setPlans([]);
      setTotalCount(0);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await API.get('education/lecture-materials/bundle/');
        if (!cancelled) setLectureBundle(data);
      } catch {
        if (!cancelled) setLectureBundle({ section: null, items: [] });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const materialsFromDict = useMemo(() => {
    const m = dict?.teachers?.materials;
    if (!m) return [];
    return MATERIAL_KEYS.map((key) => {
      const block = m[key];
      if (!block?.title) return null;
      return {
        key,
        title: block.title,
        description: block.description,
        fileUrl: '',
        href: '',
      };
    }).filter(Boolean);
  }, [dict]);

  const useApiMaterials = Boolean(lectureBundle?.items?.length);

  const materialCards = useMemo(() => {
    if (!useApiMaterials) return materialsFromDict;
    return lectureBundle.items.map((item) => {
      const rawFile = item.file;
      const fileUrl =
        rawFile && String(rawFile).trim()
          ? String(rawFile).startsWith('http')
            ? String(rawFile).trim()
            : absoluteMediaUrl(rawFile)
          : '';
      return {
        key: `api-${item.id}`,
        title: pickLocalized(item, lang, 'title'),
        description: pickLocalized(item, lang, 'description'),
        fileUrl,
        href: item.link ? String(item.link).trim() : '',
      };
    });
  }, [useApiMaterials, lectureBundle, materialsFromDict, lang]);

  const materialsSectionTitle = useMemo(() => {
    const fallback = dict?.teachers?.materials?.title;
    if (!useApiMaterials) return fallback;
    const raw = pickLocalized(lectureBundle.section, lang, 'section_title');
    return raw || fallback;
  }, [useApiMaterials, lectureBundle, lang, dict]);

  const materialsAside = useMemo(() => {
    const fallback = dict?.teachers?.materials?.asideNote;
    if (!useApiMaterials) return fallback;
    const raw = pickLocalized(lectureBundle.section, lang, 'aside_note');
    return raw || fallback;
  }, [useApiMaterials, lectureBundle, lang, dict]);

  const plansIntro = dict?.header?.previews?.descriptions?.teachers;
  const downloadLabel = dict?.download || 'скачать';
  const emptyPlans = dict?.teachers?.emptyPlans;

  return (
    <ClientPageTitle dict={dict}>
      <div className="bg-[var(--color-bg)]">
        <Section title={dict?.teachers?.title} description={plansIntro}>
          {plans.length > 0 ? (
            <>
              <div className="space-y-3">
                {plans.map((item, index) => (
                  <ScheduleRow
                    key={item.id ?? `${String(item.file)}-${index}`}
                    item={item}
                    lang={lang}
                    downloadLabel={downloadLabel}
                  />
                ))}
              </div>
              <PagePagination page={page} pageCount={pageCount} onChange={setPage} />
            </>
          ) : (
            <p className="text-sm text-neutral-500">{emptyPlans}</p>
          )}
        </Section>

        <Section title={materialsSectionTitle}>
          {materialsAside ? (
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-neutral-600">{materialsAside}</p>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2">
            {materialCards.map((item) => (
              <MaterialCard
                key={item.key}
                title={item.title}
                description={item.description}
                fileUrl={item.fileUrl}
                href={item.href}
                downloadLabel={downloadLabel}
              />
            ))}
          </div>
          <Link
            href={`/${lang}/contacts#feedback`}
            className="mt-8 inline-flex rounded-full border-2 border-neutral-900 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            {dict?.callback || 'Контакты'}
          </Link>
        </Section>
      </div>
    </ClientPageTitle>
  );
}
