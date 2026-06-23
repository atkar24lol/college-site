/**
 * Заголовок и описание «героя» для шапки страницы по пути (как в старом Header).
 */
export function getHeroMeta(path, lang, dict, params = {}) {
  const { newsId, programm, teacherId } = params;
  const h = dict?.header?.previews;
  const m = dict?.mainPage?.mainInfoBlock;

  const fallback = {
    title: dict?.header?.list?.main ?? 'ATK',
    description: '',
  };

  const routes = [
    { test: (p) => p === '/' || p === '/ru' || p === `/${lang}`, title: h?.titles?.main, desc: h?.descriptions?.main },
    { test: (p) => p === `/${lang}/news`, title: h?.titles?.blogAndNews, desc: h?.descriptions?.blogAndNews },
    { test: (p) => p === `/${lang}/news/${newsId}`, title: h?.titles?.blogAndNewsDetails, desc: h?.descriptions?.blogAndNewsDetails },
    { test: (p) => p === `/${lang}/education-activity`, title: h?.titles?.educationActivity, desc: h?.descriptions?.educationActivity },
    { test: (p) => p === `/${lang}/electron-library`, title: h?.titles?.electronLibrary, desc: h?.descriptions?.electronLibrary },
    { test: (p) => p === `/${lang}/gallary`, title: h?.titles?.gallary, desc: h?.descriptions?.gallary },
    { test: (p) => p === `/${lang}/teachers`, title: h?.titles?.teachers, desc: h?.descriptions?.teachers },
    { test: (p) => p === `/${lang}/teachers/${teacherId}`, title: h?.titles?.aboutTeachers, desc: h?.descriptions?.aboutTeachers },
    { test: (p) => p === `/${lang}/contacts`, title: h?.titles?.contacts, desc: h?.descriptions?.contacts },
    { test: (p) => p === `/${lang}/entrants`, title: h?.titles?.entrants, desc: h?.descriptions?.entrants },
    { test: (p) => p === `/${lang}/graduates`, title: h?.titles?.graduates, desc: h?.descriptions?.graduates },
    { test: (p) => p === `/${lang}/about-teachers`, title: h?.titles?.aboutTeachers, desc: h?.descriptions?.aboutTeachers },
    { test: (p) => p === `/${lang}/additional-education`, title: h?.titles?.additionalEducation, desc: h?.descriptions?.additionalEducation },
    { test: (p) => p === `/${lang}/awards`, title: dict?.awards?.title || dict?.header?.list?.rewards, desc: dict?.awards?.description || '' },
    { test: (p) => p === `/${lang}/search/${params.value}`, title: h?.titles?.searchResult, desc: h?.descriptions?.searchResult },
    {
      test: (p) => p === `/${lang}/international-cooperation` || p === `/${lang}/international-cooperation/${programm}`,
      title: h?.titles?.internationalCooperation,
      desc: h?.descriptions?.internationalCooperation,
    },
    { test: (p) => p === `/${lang}/specialities`, title: h?.titles?.specialities, desc: h?.descriptions?.specialities },
    { test: (p) => p === `/${lang}/specialities/agronomy`, title: m?.titles?.two, desc: m?.descriptions?.two },
    { test: (p) => p === `/${lang}/specialities/veterinary`, title: m?.titles?.three, desc: m?.descriptions?.three },
    { test: (p) => p === `/${lang}/specialities/hydraulic_engineering`, title: m?.titles?.four, desc: m?.descriptions?.four },
    { test: (p) => p === `/${lang}/specialities/land_management`, title: m?.titles?.five, desc: m?.descriptions?.five },
    { test: (p) => p === `/${lang}/specialities/ichthyology`, title: m?.titles?.six, desc: m?.descriptions?.six },
    { test: (p) => p === `/${lang}/specialities/melioration`, title: m?.titles?.seven, desc: m?.descriptions?.seven },
    { test: (p) => p === `/${lang}/specialities/geodesy`, title: m?.titles?.eight, desc: m?.descriptions?.eight },
    { test: (p) => p === `/${lang}/specialities/informatics`, title: m?.titles?.nine, desc: m?.descriptions?.nine },
    { test: (p) => p === `/${lang}/specialities/agricultural_entrepreneurship`, title: m?.titles?.ten, desc: m?.descriptions?.ten },
    { test: (p) => p === `/${lang}/specialities/ecology`, title: m?.titles?.eleven, desc: m?.descriptions?.eleven },
  ];

  for (const r of routes) {
    if (r.test(path)) {
      return {
        title: r.title || fallback.title,
        description: r.desc || fallback.description,
      };
    }
  }

  return fallback;
}
