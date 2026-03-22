const dictionaries = {
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ky: () => import('@/dictionaries/ky.json').then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
