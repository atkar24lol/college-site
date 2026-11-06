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

/**
 * Переводимое поле из API (modeltranslation): `title_en`, `title_ky`…
 * Если перевод не заполнен в админке — показываем русский текст, а не пустоту.
 */
export function localizedField(item, field, lang) {
  if (!item) return '';
  return item[`${field}_${lang}`] || item[`${field}_ru`] || item[field] || '';
}
