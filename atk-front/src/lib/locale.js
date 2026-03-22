/** Локаль для Intl / toLocaleDateString по коду языка из [lang] */
export function dateLocaleForLang(lang) {
  const map = { ru: 'ru-RU', ky: 'ky-KG', en: 'en-US' };
  return map[lang] || 'ru-RU';
}

/** Первая строка слогана без HTML — подзаголовок hero */
export function heroKickerFromDict(dict) {
  const raw = dict?.header?.slogan;
  if (!raw || typeof raw !== 'string') return '';
  const first = raw.split(/<br\s*\/?>/i)[0];
  return first.replace(/<[^>]+>/g, '').trim();
}
