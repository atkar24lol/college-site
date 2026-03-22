'use client';

import { PageShell } from '@/components/ui/PageShell';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function NewsDetails({ dict }) {
  const [article, setArticle] = useState(null);
  const { lang, newsId } = useParams();

  const load = useCallback(async () => {
    const { data } = await API.get(`news/news/${newsId}/`);
    setArticle(data);
  }, [newsId]);

  useEffect(() => {
    load();
  }, [load]);

  const title = article?.[`title_${lang}`] || article?.title || '…';
  const paragraphs = article?.[`description_${lang}`]?.split('\n').filter(Boolean) || [];

  return (
    <PageShell title={title} description={article?.date ? new Date(article.date).toLocaleDateString('ru-RU') : ''}>
      <Link href={`/${lang}/news`} className="mb-6 inline-block text-sm text-[var(--color-accent)] hover:underline">
        ← {dict?.blogAndNews?.titles?.allNews || 'Новости'}
      </Link>

      {!article ? (
        <p className="text-sm text-neutral-500">Загрузка…</p>
      ) : (
        <article className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          {article.image ? (
            <div className="aspect-[21/9] bg-neutral-100">
              <img src={article.image} alt="" className="h-full w-full object-cover" />
            </div>
          ) : null}
          <div className="prose prose-neutral max-w-none p-6 sm:p-8">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 text-sm leading-relaxed text-neutral-700 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </article>
      )}
    </PageShell>
  );
}
