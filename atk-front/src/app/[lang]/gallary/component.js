'use client';

import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';
import { useParams } from 'next/navigation';
import { API } from '@/requester';

const SWIPER_COMMON = {
  modules: [Pagination],
  pagination: { clickable: true },
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 16 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
};

function GallerySection({ title, children, emptyHint }) {
  return (
    <section className="border-b border-[var(--color-border)] py-12 last:border-b-0 md:py-14">
      <h2 className="heading-accent text-balance text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
        {title}
      </h2>
      {children ?? (
        <p className="mt-8 text-sm text-neutral-500">{emptyHint}</p>
      )}
    </section>
  );
}

/** Видео: загруженный файл (MP4/WebM) или встраивание по ссылке (embed_url с бэка). */
function GalleryVideoCard({ video, lang }) {
  const title = video?.[`title_${lang}`];
  const iframeSrc = video?.embed_url || video?.link;
  const poster = video?.image || undefined;

  if (video?.video_file) {
    return (
      <article className="flex h-full flex-col">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black shadow-soft">
          <video
            className="absolute inset-0 h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster={poster}
            src={video.video_file}
          />
        </div>
        <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug text-neutral-900">{title}</h3>
      </article>
    );
  }

  if (!iframeSrc) {
    return (
      <article className="flex h-full flex-col">
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100 p-4 text-center text-sm text-neutral-500 shadow-soft">
          {title || '—'}
        </div>
        <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug text-neutral-900">{title}</h3>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-900/5 shadow-soft">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={iframeSrc}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug text-neutral-900">{title}</h3>
    </article>
  );
}

function GalleryPhotoCard({ item, lang, openLabel, onOpen }) {
  const title = item?.[`title_${lang}`];
  const src = item?.image;

  return (
    <article className="flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen({ src, alt: title || '', title })}
        className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100 text-left shadow-soft transition hover:ring-2 hover:ring-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        aria-label={title ? `${openLabel}: ${title}` : openLabel}
      >
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
      </button>
      <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug text-neutral-900">
        {title}
      </h3>
    </article>
  );
}

export default function Gallary({ dict }) {
  const [gallery, setGallery] = useState({
    pictures: [],
    videos: [],
  });
  const [lightbox, setLightbox] = useState(null);
  const { lang } = useParams();

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const loadMedia = useCallback(async () => {
    try {
      const { data } = await API.get('abouts/images-of-multimedia/', { params: { page_size: 100 } });
      const raw = Array.isArray(data) ? data : data?.results ?? [];
      setGallery({
        pictures: raw.filter((item) => item.type === 'picture'),
        videos: raw.filter((item) => item.type === 'video'),
      });
    } catch {
      setGallery({ pictures: [], videos: [] });
    }
  }, []);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const empty = dict?.gallary?.empty ?? 'В этом разделе пока нет материалов.';
  const openLabel = dict?.gallary?.openPhoto ?? 'Открыть фото';
  const closeLabel = dict?.gallary?.closeLightbox ?? 'Закрыть';

  return (
    <ClientPageTitle dict={dict}>
      {lightbox?.src ? (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          title={lightbox.title}
          onClose={closeLightbox}
          closeLabel={closeLabel}
        />
      ) : null}

      <div className="flex flex-col">
        <GallerySection title={dict?.gallary?.titleImages} emptyHint={empty}>
          {gallery.pictures.length > 0 ? (
            <Swiper
              {...SWIPER_COMMON}
              loop={gallery.pictures.length > 3}
              className="gallery-swiper mt-10 !pb-12"
            >
              {gallery.pictures.map((picture, index) => (
                <SwiperSlide key={picture.id ?? `picture-${index}`} className="!h-auto">
                  <GalleryPhotoCard
                    item={picture}
                    lang={lang}
                    openLabel={openLabel}
                    onOpen={setLightbox}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </GallerySection>

        <GallerySection title={dict?.gallary?.titleVideos} emptyHint={empty}>
          {gallery.videos.length > 0 ? (
            <Swiper
              {...SWIPER_COMMON}
              loop={gallery.videos.length > 3}
              className="gallery-swiper mt-10 !pb-12"
            >
              {gallery.videos.map((video, index) => (
                <SwiperSlide key={video.id ?? `video-${index}`} className="!h-auto">
                  <GalleryVideoCard video={video} lang={lang} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </GallerySection>
      </div>
    </ClientPageTitle>
  );
}
