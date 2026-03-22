'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const SECTIONS = (lang, dict) => [
  {
    title: dict?.siteMap?.atk,
    links: [
      { name: dict?.siteMap?.main, href: `/${lang}` },
      { name: dict?.header?.list?.news, href: `/${lang}/news` },
      { name: dict?.footer?.list?.multimedia, href: `/${lang}/gallary` },
      { name: dict?.footer?.list?.contactInformation, href: `/${lang}/contacts` },
      { name: dict?.footer?.list?.toApplicants, href: `/${lang}/entrants` },
    ],
  },
  {
    title: dict?.siteMap?.invite,
    links: [
      { name: dict?.siteMap?.entrants, href: `/${lang}/entrants` },
      { name: dict?.siteMap?.students, href: `/${lang}/teachers` },
    ],
  },
  {
    title: dict?.siteMap?.educationWithAtk,
    links: [
      { name: dict?.siteMap?.educationActivity, href: `/${lang}/education-activity` },
      { name: dict?.siteMap?.gallary, href: `/${lang}/gallary` },
      { name: dict?.siteMap?.aboutTeachers, href: `/${lang}/about-teachers` },
      { name: dict?.siteMap?.blogAndNews, href: `/${lang}/news` },
      { name: dict?.siteMap?.teachers, href: `/${lang}/teachers` },
    ],
  },
];

export default function SiteMap({ dict }) {
  const { lang } = useParams();

  return (
    <ClientPageTitle dict={dict}>
      <div className="space-y-10">
        {SECTIONS(lang, dict).map((section) => (
          <div key={section.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              {section.title}
            </h2>
            <ul className="mt-3 space-y-2">
              {section.links.map((l) =>
                l.name ? (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-neutral-700 hover:text-[var(--color-accent)] hover:underline">
                      {l.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        ))}
      </div>
    </ClientPageTitle>
  );
}
