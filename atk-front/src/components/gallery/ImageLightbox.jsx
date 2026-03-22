'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Полноэкранный просмотр изображения. Закрытие: Escape, кнопка, клик по затемнению.
 */
export function ImageLightbox({ src, alt, title, onClose, closeLabel }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!src) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, onClose]);

  if (!mounted || !src) return null;

  const node = (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/88 p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={title || alt || 'Image'}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-3 z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={closeLabel || 'Закрыть'}
      >
        <X className="h-6 w-6" strokeWidth={2} />
      </button>

      <div
        className="flex max-h-[min(88vh,900px)] w-full max-w-[min(100%,1200px)] flex-1 flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ''}
          className="max-h-[min(85vh,880px)] w-auto max-w-full object-contain shadow-2xl"
        />
        {title ? (
          <p className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-neutral-200 md:text-base">
            {title}
          </p>
        ) : null}
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
