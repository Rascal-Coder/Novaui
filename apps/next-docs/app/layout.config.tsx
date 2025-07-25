import type { BaseLayoutProps } from '@/app/docs-layout/shared';
import { i18n } from '@/lib/i18n';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: locale === 'cn' ? 'Chinese Docs' : 'English Docs',
      url: `/${locale}`
    },
    githubUrl: 'https://github.com/Rascal-Coder/Novaui',
    links: [
      {
        type: 'main',
        text: locale === 'cn' ? '文檔' : 'Documentation',
        url: `/${locale}/docs/ui`
      }
    ]
  };
}
