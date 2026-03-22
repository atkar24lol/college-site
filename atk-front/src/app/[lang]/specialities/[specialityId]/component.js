'use client';

import { PageShell } from '@/components/ui/PageShell';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MAPPING = {
  agronomy: 'two',
  veterinary: 'three',
  hydraulic_engineering: 'four',
  land_management: 'five',
  ichthyology: 'six',
  melioration: 'seven',
  geodesy: 'eight',
  informatics: 'nine',
  agricultural_entrepreneurship: 'ten',
  ecology: 'eleven',
};

export default function SpecialityDetails({ dict }) {
  const { lang, specialityId } = useParams();
  const titles = dict?.specialities?.titles;
  const descriptions = dict?.specialities?.descriptions;
  const key = MAPPING[specialityId];

  if (!key || !titles || !descriptions?.[key]) {
    return (
      <PageShell title="Не найдено" description="">
        <Link href={`/${lang}/specialities`} className="text-sm text-[var(--color-accent)] hover:underline">
          ← Назад
        </Link>
      </PageShell>
    );
  }

  const paragraphs = descriptions[key].split('\n').filter(Boolean);

  return (
    <PageShell title={titles[key]} description="">
      <Link href={`/${lang}/specialities`} className="mb-6 inline-block text-sm text-[var(--color-accent)] hover:underline">
        ← {dict?.header?.previews?.titles?.specialities || 'Специальности'}
      </Link>
      <div className="prose prose-neutral max-w-none rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-4 text-sm leading-relaxed text-neutral-700 last:mb-0">
            {p}
          </p>
        ))}
      </div>
    </PageShell>
  );
}
