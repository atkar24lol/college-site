'use client';

import { getHeroMeta } from '@/lib/routeMeta';
import { PageShell } from './PageShell';
import { useParams, usePathname } from 'next/navigation';

/** Оборачивает контент страницы заголовком из словаря по текущему URL */
export function ClientPageTitle({ dict, children }) {
  const pathname = usePathname() || '';
  const params = useParams();
  const lang = params?.lang || 'ru';
  const meta = getHeroMeta(pathname, lang, dict || {}, {
    newsId: params?.newsId,
    programm: params?.programm,
    teacherId: params?.teacherId,
    value: params?.value,
  });

  return (
    <PageShell title={meta.title} description={meta.description}>
      {children}
    </PageShell>
  );
}
