import { ui } from './ui';

export function getLangFromUrl(_url: URL) {
  return 'en' as const;
}

export function useTranslations(_lang?: string) {
  return function t(key: keyof typeof ui['en']) {
    return ui['en'][key] || '';
  };
}

export function useTranslatedPath(_lang?: string) {
  return function translatePath(path: string) {
    if (!path.startsWith('/')) return `/${path}`;
    return path;
  };
}
