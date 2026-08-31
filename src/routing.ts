export type Route =
  | { page: 'home' }
  | { page: 'catalog' }
  | { page: 'labs' }
  | { page: 'chapter'; chapter: number }
  | { page: 'section'; section: number };

export type RouteLanguage = 'ru' | 'en';
let fallbackLanguage: RouteLanguage = 'ru';

export function setRouteLanguageFallback(language: RouteLanguage) {
  fallbackLanguage = language;
}

export function routeLanguage(hash = typeof window === 'undefined' ? '' : window.location.hash): RouteLanguage | undefined {
  const first = hash.replace(/^#\/?/, '').split('/').filter(Boolean)[0];
  return first === 'ru' || first === 'en' ? first : undefined;
}

export function parseRoute(hash = typeof window === 'undefined' ? '' : window.location.hash): Route {
  const path = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (path[0] === 'ru' || path[0] === 'en') path.shift();
  if (path[0] === 'catalog') return { page: 'catalog' };
  if (path[0] === 'labs') return { page: 'labs' };
  const number = Number(path[1]);
  if (path[0] === 'chapter' && Number.isInteger(number) && number >= 1 && number <= 18) return { page: 'chapter', chapter: number };
  if (path[0] === 'section' && Number.isInteger(number) && number >= 1 && number <= 80) return { page: 'section', section: number };
  return { page: 'home' };
}

export function routeHref(route: Route, language: RouteLanguage = routeLanguage() ?? fallbackLanguage) {
  const prefix = `#/${language}`;
  if (route.page === 'home') return `${prefix}/`;
  if (route.page === 'catalog') return `${prefix}/catalog`;
  if (route.page === 'labs') return `${prefix}/labs`;
  if (route.page === 'chapter') return `${prefix}/chapter/${route.chapter}`;
  return `${prefix}/section/${route.section}`;
}
