'use client';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { lang } = useParams();
  const [dict, setDict] = useState(null);

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  const columns = [
    [
      { name: dict?.header?.list?.news, href: `/${lang}/news` },
      { name: dict?.footer?.list?.additionalEducation, href: `/${lang}/additional-education` },
      { name: dict?.footer?.list?.educationalActivity, href: `/${lang}/education-activity` },
      { name: dict?.footer?.list?.multimedia, href: `/${lang}/gallary` },
    ],
    [
      { name: dict?.footer?.list?.informationForTeachers, href: `/${lang}/teachers` },
      { name: dict?.footer?.list?.aboutTeachers, href: `/${lang}/about-teachers` },
      { name: dict?.footer?.list?.toApplicants, href: `/${lang}/entrants` },
      { name: dict?.footer?.list?.electronicLibrary, href: `/${lang}/electron-library` },
    ],
    [
      { name: dict?.footer?.list?.internationalCooperation, href: `/${lang}/international-cooperation` },
      { name: dict?.footer?.list?.contactInformation, href: `/${lang}/contacts` },
      { name: dict?.footer?.list?.rewards, href: `/${lang}/awards` },
    ],
  ];

  return (
    <footer className="mt-auto bg-[#1c1917] text-neutral-400">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex min-w-0 items-start gap-3">
              <img src="/atk-logo-footer.png" alt="" className="h-12 w-12 shrink-0 object-contain opacity-95 sm:h-14 sm:w-14" />
              <span
                className="min-w-0 break-words text-sm font-medium leading-relaxed text-neutral-200"
                dangerouslySetInnerHTML={{ __html: dict?.footer?.slogan || '' }}
              />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-neutral-500">{dict?.footer?.list?.address}</p>
            <p className="mt-1 text-sm text-neutral-500">{dict?.footer?.list?.phone}</p>
          </div>
          {columns.map((col, i) => (
            <ul key={i} className="space-y-3 text-sm">
              {col.map(
                (item) =>
                  item.name && (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-neutral-400 transition hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
          <div className="flex gap-5">
            <a href="https://www.instagram.com/atkbishkek/" target="_blank" rel="noopener noreferrer" className="opacity-80 transition hover:opacity-100">
              <img src="/insta-footer-icon.svg" alt="Instagram" className="h-7 w-7 brightness-0 invert" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100080395770610"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition hover:opacity-100"
            >
              <img src="/facebook-footer-icon.svg" alt="Facebook" className="h-7 w-7 opacity-90" />
            </a>
            <a href="https://www.tiktok.com/@atkbishkek" target="_blank" rel="noopener noreferrer" className="opacity-80 transition hover:opacity-100">
              <img src="/tiktok-footer-icon.svg" alt="TikTok" className="h-7 w-7 opacity-90" />
            </a>
          </div>
          <p className="text-xs text-neutral-600">© {new Date().getFullYear()} Агротехнический колледж</p>
        </div>
      </Container>
    </footer>
  );
}
