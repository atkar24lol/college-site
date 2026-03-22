'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MainFormBlock({ dict }) {
  const { lang } = useParams();
  const b = dict?.mainPage?.mainBlockFeedback;

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-14 md:py-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between md:p-10 lg:px-12">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{b?.title || 'Обратная связь'}</h2>
          <p className="mt-3 text-neutral-600">{b?.descriptionOne}</p>
          <p className="mt-2 text-sm text-neutral-500">{b?.descriptionTwo}</p>
        </div>
        <Link
          href={`/${lang}/contacts#form`}
          className="inline-flex shrink-0 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-[var(--color-accent-hover)]"
        >
          {b?.buttonSubmit || 'Написать'}
        </Link>
      </div>
    </section>
  );
}
