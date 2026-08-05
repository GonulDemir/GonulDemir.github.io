import { ui, defaultLang, routes } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    if (path === '/' || path === '') return `/${l}/`;
    
    // Map standard route keys to language specific routes
    const cleanPath = path.replace(/^\//, '');
    const mappedRoute = routes[l as keyof typeof routes]?.[cleanPath as keyof typeof routes['tr']] || cleanPath;
    
    return `/${l}/${mappedRoute}`;
  };
}

export function getSwitchLanguageUrl(url: URL, targetLang: 'tr' | 'en') {
  const currentLang = getLangFromUrl(url);
  const segments = url.pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return `/${targetLang}/`;
  }
  
  if (segments[0] === 'tr' || segments[0] === 'en') {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }
  
  // Route translation for second segment (e.g., /tr/hakkimda -> /en/about)
  if (segments.length >= 2) {
    const second = segments[1];
    if (currentLang === 'tr') {
      if (second === 'hakkimda') segments[1] = 'about';
      else if (second === 'makaleler') segments[1] = 'articles';
      else if (second === 'projeler') segments[1] = 'projects';
      else if (second === 'iletisim') segments[1] = 'contact';
    } else {
      if (second === 'about') segments[1] = 'hakkimda';
      else if (second === 'articles') segments[1] = 'makaleler';
      else if (second === 'projects') segments[1] = 'projeler';
      else if (second === 'contact') segments[1] = 'iletisim';
    }
  }
  
  return '/' + segments.join('/');
}
