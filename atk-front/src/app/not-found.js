import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden
          className="select-none text-[9rem] font-black leading-none text-neutral-100 sm:text-[13rem]"
        >
          404
        </span>
        <img
          src="/atk-emblem.png"
          alt=""
          className="absolute h-20 w-20 object-contain opacity-25 sm:h-28 sm:w-28"
        />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
        Возможно, вы перешли по устаревшей ссылке или допустили опечатку в адресе.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/ru"
          className="inline-flex h-11 items-center rounded-lg px-6 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: '#0c4a6e' }}
        >
          На главную
        </Link>
        <Link
          href="/ru/contacts"
          className="inline-flex h-11 items-center rounded-lg border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300"
        >
          Написать нам
        </Link>
      </div>
    </main>
  );
}
