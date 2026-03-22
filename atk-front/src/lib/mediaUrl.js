/** Абсолютный URL к /media/... относительно хоста API (для файлов из Django). */
export function absoluteMediaUrl(path) {
  if (!path) return '';
  if (typeof path === 'string' && path.startsWith('http')) return path;
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/ru/api/v1';
  const root = base.split('/ru/api')[0] || '';
  const p = String(path).startsWith('/') ? path : `/${path}`;
  return `${root}${p}`;
}
