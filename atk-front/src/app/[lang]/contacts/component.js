'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from '@/requester';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Contacts({ dict }) {
  const [contacts, setContacts] = useState([]);
  const { lang } = useParams();
  const fb = dict?.contacts?.feedback;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [infoText, setInfoText] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await API.get('abouts/contacts/', {
        params: { page: 1, page_size: 100 },
      });
      setContacts(Array.isArray(data) ? data : data?.results ?? []);
    } catch {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#feedback') return;
    const t = setTimeout(() => {
      document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      await API.post('abouts/sending/', {
        name: name.trim(),
        email: email.trim(),
        info_text: infoText.trim(),
      });
      setStatus('success');
      setName('');
      setEmail('');
      setInfoText('');
    } catch (err) {
      setStatus('error');
      const d = err?.response?.data;
      let msg = '';
      if (d && typeof d === 'object') {
        msg = d.error || d.detail || (Array.isArray(d) ? d.join(', ') : JSON.stringify(d));
      } else if (typeof d === 'string') {
        msg = d;
      }
      setErrorMessage(msg);
    }
  };

  return (
    <ClientPageTitle dict={dict}>
      <div className="mb-10 min-w-0 sm:mb-12">
        <p className="mb-6 text-sm leading-relaxed text-neutral-600 sm:mb-8">
          {dict?.contacts?.subtitle ||
            'По вопросам поступления и сотрудничества обращайтесь по указанным контактам.'}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c, i) => (
            <article
              key={c.id ?? i}
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-[var(--color-accent)]">
                {c?.[`role_${lang} `] || c?.[`role_${lang}`]}
              </p>
              <h3 className="mt-2 break-words text-base font-semibold text-neutral-900">
                {c?.[`title_${lang} `] || c?.[`title_${lang}`]}
              </h3>
              {c?.contact ? (
                <p className="mt-3 break-words text-sm text-neutral-600">{c.contact}</p>
              ) : null}
              {c?.email ? (
                <Link
                  href={`mailto:${c.email}`}
                  className="mt-2 inline-block max-w-full break-all text-sm text-[var(--color-accent)] hover:underline"
                >
                  {c.email}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <section
        id="feedback"
        className="scroll-mt-20 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:scroll-mt-24 sm:p-8"
        aria-labelledby="feedback-heading"
      >
        <h2 id="feedback-heading" className="break-words text-xl font-semibold text-neutral-900 sm:text-2xl">
          {dict?.contacts?.formTitle || dict?.mainPage?.mainBlockFeedback?.title || 'Обратная связь'}
        </h2>
        {fb?.descriptionOne ? (
          <p className="mt-3 max-w-2xl text-sm text-neutral-600">{fb.descriptionOne}</p>
        ) : null}
        {fb?.descriptionTwo ? (
          <p className="mt-2 max-w-2xl text-sm text-neutral-500">{fb.descriptionTwo}</p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 max-w-xl min-w-0 space-y-4 sm:mt-8">
          <div>
            <label htmlFor="feedback-name" className="mb-1 block text-sm font-medium text-neutral-800">
              {fb?.name}
            </label>
            <input
              id="feedback-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none ring-[var(--color-accent)] transition focus:border-[var(--color-accent)] focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="feedback-email" className="mb-1 block text-sm font-medium text-neutral-800">
              {fb?.mail}
            </label>
            <input
              id="feedback-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none ring-[var(--color-accent)] transition focus:border-[var(--color-accent)] focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="feedback-message" className="mb-1 block text-sm font-medium text-neutral-800">
              {fb?.message}
            </label>
            <textarea
              id="feedback-message"
              name="info_text"
              rows={5}
              required
              value={infoText}
              onChange={(e) => setInfoText(e.target.value)}
              className="w-full resize-y rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none ring-[var(--color-accent)] transition focus:border-[var(--color-accent)] focus:ring-2"
            />
          </div>

          {status === 'success' ? (
            <p className="text-sm font-medium text-green-700" role="status">
              {fb?.success}
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage || fb?.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
          >
            {status === 'sending' ? '…' : fb?.enterButoon || 'Отправить'}
          </button>
        </form>
      </section>
    </ClientPageTitle>
  );
}
