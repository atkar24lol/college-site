'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MainFormBlock({ dict }) {
  const { lang } = useParams();
  const b = dict?.mainPage?.mainBlockFeedback;

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-14 md:py-16"
      aria-labelledby="main-feedback-heading"
    >
      <Container>
        <div className="flex w-full min-w-0 flex-col items-stretch gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8 md:p-10 lg:px-12">
          <div className="min-w-0 max-w-xl">
            <h2
              id="main-feedback-heading"
              className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl"
            >
              {b?.title || 'Обратная связь'}
            </h2>
            <p className="mt-3 text-sm text-neutral-600 sm:text-base">{b?.descriptionOne}</p>
            <p className="mt-2 text-xs text-neutral-500 sm:text-sm">{b?.descriptionTwo}</p>
          </div>
          <Link
            href={`/${lang}/contacts#feedback`}
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:w-auto sm:px-8"
          >
            {b?.buttonSubmit || 'Написать'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
