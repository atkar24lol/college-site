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
        <div className="flex w-full flex-col items-start gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between md:p-10 lg:px-12">
          <div className="max-w-xl">
            <h2
              id="main-feedback-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900"
            >
              {b?.title || 'Обратная связь'}
            </h2>
            <p className="mt-3 text-neutral-600">{b?.descriptionOne}</p>
            <p className="mt-2 text-sm text-neutral-500">{b?.descriptionTwo}</p>
          </div>
          <Link
            href={`/${lang}/contacts#feedback`}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {b?.buttonSubmit || 'Написать'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
