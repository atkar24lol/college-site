'use client';

import { useParams } from 'next/navigation';

// Метка колледжа на карте.
const POINT = { lat: 42.85147, lng: 74.60669 };
const ZOOM = 17;

// Язык сайта → язык подписей и интерфейса карты (параметр hl у Google Maps).
const MAP_LANG = { ru: 'ru', ky: 'ky', en: 'en' };

const Map = ({ ariaLabel = 'Карта' }) => {
  const params = useParams();
  const hl = MAP_LANG[params?.lang] || 'ru';
  // Прямой адрес встраивания (maps.google.com/maps?output=embed редиректит сюда же).
  const src =
    `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${POINT.lat},${POINT.lng}` +
    `!6i${ZOOM}!3m1!1s${hl}!5m1!1s${hl}`;

  return (
    <div className="w-full" role="region" aria-label={ariaLabel}>
      {/* key={hl}: при смене языка iframe пересоздаётся и карта перерисовывается на новом языке */}
      <iframe
        key={hl}
        src={src}
        title={ariaLabel}
        className="z-10 block h-[280px] w-full border-0 sm:h-[320px] md:h-[400px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};

export default Map;
