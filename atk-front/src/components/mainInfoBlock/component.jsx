'use client';

import { Container } from '@/components/ui/Container';
import { MAIN_SPECIALITY_ITEMS } from '@/data/mainSpecialityItems';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MainInfoBlock({ dict, showHeading = true }) {
  const { lang } = useParams();
  const m = dict?.mainPage?.mainInfoBlock;
  const titles = m?.titles || {};
  const descriptions = m?.descriptions || {};
  const sectionIntro =
    dict?.header?.previews?.descriptions?.specialities ||
    'Направления подготовки. Подробнее — на странице каждой специальности.';

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-16"
      aria-labelledby="main-specialities-heading"
    >
      <Container>
        {showHeading ? (
          <>
            <h2
              id="main-specialities-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
            >
              {dict?.header?.previews?.titles?.specialities || 'Специальности'}
            </h2>
            <p className="mt-3 max-w-2xl text-neutral-600">{sectionIntro}</p>
          </>
        ) : null}
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? 'mt-10' : ''}`}>
          {MAIN_SPECIALITY_ITEMS.map(({ href, image, key }) => {
            const title = titles[key] || '';
            const desc = descriptions[key] || '';
            return (
              <Link
                key={href}
                href={`/${lang}/specialities/${href}`}
                className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-soft transition hover:border-neutral-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <div className="relative aspect-[16/10] bg-neutral-100">
                  <Image
                    src={image}
                    alt={title || desc || 'Специальность'}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900">{title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
