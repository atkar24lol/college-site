'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const ITEMS = [
  { href: 'agronomy', image: '/agronomy.jpg', key: 'two' },
  { href: 'veterinary', image: '/veterinary.jpg', key: 'three' },
  { href: 'hydraulic_engineering', image: '/hydrotech.webp', key: 'four' },
  { href: 'land_management', image: '/zemleust.jpg', key: 'five' },
  { href: 'ichthyology', image: '/ihtiologia.jpg', key: 'six' },
  { href: 'melioration', image: '/meliorization.jpg', key: 'seven' },
  { href: 'geodesy', image: '/geodezia.jpg', key: 'eight' },
  { href: 'informatics', image: '/informatika.jpg', key: 'nine' },
  { href: 'agricultural_entrepreneurship', image: '/selhoz.jpg', key: 'ten' },
  { href: 'ecology', image: '/ecology.jpg', key: 'eleven' },
];

export default function MainInfoBlock({ dict, showHeading = true }) {
  const { lang } = useParams();
  const m = dict?.mainPage?.mainInfoBlock;
  const titles = m?.titles || {};
  const descriptions = m?.descriptions || {};

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {showHeading ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              {dict?.header?.previews?.titles?.specialities || 'Специальности'}
            </h2>
            <p className="mt-3 max-w-2xl text-neutral-600">
              Направления подготовки. Подробнее — на странице каждой специальности.
            </p>
          </>
        ) : null}
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? 'mt-10' : ''}`}>
          {ITEMS.map(({ href, image, key }) => (
            <Link
              key={href}
              href={`/${lang}/specialities/${href}`}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-soft transition hover:border-neutral-300 hover:shadow-md"
            >
              <div className="aspect-[16/10] bg-neutral-100">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-neutral-900">{titles[key]}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{descriptions[key]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
