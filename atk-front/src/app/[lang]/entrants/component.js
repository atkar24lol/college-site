'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { dateLocaleForLang } from '@/lib/locale';
import { API } from '@/requester';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

function Section({ id, title, description, children, className = '' }) {
  return (
    <section
      id={id}
      className={`border-b border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {title ? (
          <header className="mb-10 md:mb-12">
            <h2 className="heading-accent text-balance text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">{description}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function PriorityCard({ lines, imageSrc, imageAlt, reverse }) {
  return (
    <div className="grid gap-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-soft md:grid-cols-2 md:items-center md:gap-12 md:p-10">
      <div className={`min-w-0 space-y-4 ${reverse ? 'md:order-2' : ''}`}>
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              i === 0
                ? 'text-xl font-semibold leading-snug text-[var(--color-accent)] md:text-2xl'
                : 'text-sm leading-relaxed text-neutral-600 md:text-base'
            }
          >
            {line}
          </p>
        ))}
      </div>
      <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 shadow-inner ${reverse ? 'md:order-1' : ''}`}>
        <Image src={imageSrc} alt={imageAlt || ''} fill className="object-cover" sizes="(max-width:768px) 100vw, 45vw" />
      </div>
    </div>
  );
}

function AdmissionDateCard({ data, lang, dateLocale }) {
  const title = data?.[`title_${lang}`];
  const description = data?.[`description_${lang}`];
  const raw = data?.event_date;
  const d = raw ? new Date(raw) : null;
  const valid = d && !Number.isNaN(d.getTime());
  const year = valid ? d.getFullYear() : null;
  const dateLine = valid
    ? d.toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <article className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {year ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{year}</p>
          ) : null}
          <h3 className="mt-1 text-lg font-semibold leading-snug text-neutral-900">{title}</h3>
          {dateLine ? (
            <p className="mt-3 text-sm font-medium text-[var(--color-accent)]">{dateLine}</p>
          ) : null}
        </div>
        <div className="relative h-10 w-10 shrink-0 opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/calendar-preview.svg" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
        </div>
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{description}</p>
      ) : null}
    </article>
  );
}

function ProcedureStep({ index, title, description, iconSrc }) {
  return (
    <div className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-soft)]">
        <Image src={iconSrc} alt="" width={32} height={48} className="object-contain" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
        {index + 1}. {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
    </div>
  );
}

function FaqItem({ question, answer }) {
  return (
    <details className="group rounded-2xl border border-[var(--color-border)] bg-white shadow-soft open:ring-1 open:ring-[var(--color-accent-soft)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-neutral-900 marker:content-none [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <span className="shrink-0 text-neutral-400 transition group-open:rotate-180" aria-hidden>
          ▼
        </span>
      </summary>
      <div className="border-t border-[var(--color-border)] px-5 pb-5 pt-3 text-sm leading-relaxed text-neutral-600">
        {answer}
      </div>
    </details>
  );
}

export default function Entrants({ dict }) {
  const { lang } = useParams();
  const dateLocale = dateLocaleForLang(lang);

  const [dates, setDates] = useState([]);
  const [faq, setFaq] = useState([]);

  const loadDates = useCallback(async () => {
    try {
      const { data } = await API.get('education/admission-dates', { params: { page_size: 100 } });
      setDates(Array.isArray(data) ? data : data?.results ?? []);
    } catch {
      setDates([]);
    }
  }, []);

  const loadFaq = useCallback(async () => {
    try {
      const { data } = await API.get('abouts/faq', { params: { page_size: 100 } });
      setFaq(Array.isArray(data) ? data : data?.results ?? []);
    } catch {
      setFaq([]);
    }
  }, []);

  useEffect(() => {
    loadDates();
  }, [loadDates]);

  useEffect(() => {
    loadFaq();
  }, [loadFaq]);

  const blockOneLines = useMemo(
    () =>
      [
        dict?.entrants?.prioretyInformation?.blockOne?.title,
        dict?.entrants?.prioretyInformation?.blockOne?.textOne,
        dict?.entrants?.prioretyInformation?.blockOne?.textTwo,
        dict?.entrants?.prioretyInformation?.blockOne?.textThree,
        dict?.entrants?.prioretyInformation?.blockOne?.textFour,
        dict?.entrants?.prioretyInformation?.blockOne?.textFive,
      ].filter(Boolean),
    [dict]
  );

  const blockTwoLines = useMemo(
    () =>
      [
        dict?.entrants?.prioretyInformation?.blockTwo?.title,
        dict?.entrants?.prioretyInformation?.blockTwo?.textOne,
        dict?.entrants?.prioretyInformation?.blockTwo?.textTwo,
        dict?.entrants?.prioretyInformation?.blockTwo?.textThree,
        dict?.entrants?.prioretyInformation?.blockTwo?.textFour,
        dict?.entrants?.prioretyInformation?.blockTwo?.textFive,
      ].filter(Boolean),
    [dict]
  );

  const procedures = useMemo(
    () => [
      dict?.entrants?.admissionProcedures?.blockOne,
      dict?.entrants?.admissionProcedures?.blockTwo,
      dict?.entrants?.admissionProcedures?.blockThree,
      dict?.entrants?.admissionProcedures?.blockFour,
      dict?.entrants?.admissionProcedures?.blockFive,
      dict?.entrants?.admissionProcedures?.blockSix,
    ].filter((b) => b?.title),
    [dict]
  );

  const priAlt = dict?.entrants?.prioretyInformation?.blockOne?.title || '';

  return (
    <ClientPageTitle dict={dict}>
      <div className="bg-[var(--color-bg)]">
        {/* Важная информация */}
        <Section title={dict?.entrants?.prioretyInformation?.title}>
          <div className="space-y-10">
            {blockOneLines.length > 0 ? (
              <PriorityCard
                lines={blockOneLines}
                imageSrc="/entrants-priorety-preview.png"
                imageAlt={priAlt}
                reverse={false}
              />
            ) : null}
            {blockTwoLines.length > 0 ? (
              <PriorityCard
                lines={blockTwoLines}
                imageSrc="/entrants-priorety-preview.png"
                imageAlt={priAlt}
                reverse
              />
            ) : null}
          </div>
        </Section>

        {/* Сроки приёмной */}
        <Section title={dict?.entrants?.dateReception?.title}>
          {dates.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dates.map((item) => (
                <AdmissionDateCard key={item.id} data={item} lang={lang} dateLocale={dateLocale} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">{dict?.entrants?.emptyDates || 'Даты будут объявлены позже.'}</p>
          )}
        </Section>

        {/* Этапы поступления */}
        <Section title={dict?.entrants?.admissionProcedures?.title}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {procedures.map((item, index) => (
              <ProcedureStep
                key={item.title + String(index)}
                index={index}
                title={item.title}
                description={item.description}
                iconSrc="/education-route-icon.svg"
              />
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-14 md:py-16">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="heading-accent text-balance text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                  {dict?.entrants?.faq?.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                  {dict?.entrants?.faq?.lead ||
                    'Если не нашли ответ — напишите через форму на странице контактов.'}
                </p>
                <Link
                  href={`/${lang}/contacts#feedback`}
                  className="mt-6 inline-flex rounded-full border-2 border-neutral-900 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                >
                  {dict?.callback || 'Контакты'}
                </Link>
                <div className="relative mx-auto mt-10 hidden aspect-[4/3] max-w-sm lg:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/faq-preview.svg" alt="" className="h-full w-full object-contain" />
                </div>
              </div>
              <div className="space-y-3 lg:col-span-7">
                {faq.map((item, index) => (
                  <FaqItem
                    key={item.id ?? index}
                    question={item?.[`question_${lang}`]}
                    answer={item?.[`answer_${lang}`]}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientPageTitle>
  );
}
