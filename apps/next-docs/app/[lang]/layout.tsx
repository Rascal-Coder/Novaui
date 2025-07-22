// import 'fumadocs-ui/style.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { RootProvider } from '@/provider';

import '@unocss/reset/tailwind.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin']
});

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
  const { lang } = await params;
  return (
    <html
      suppressHydrationWarning
      className={inter.className}
      lang={lang}
    >
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <RootProvider
          i18n={{
            locale: lang,
            locales: [
              {
                name: 'English',
                locale: 'en'
              },
              {
                name: 'Chinese',
                locale: 'cn'
              }
            ],
            translations: {
              cn: {
                toc: '目錄',
                search: '搜尋文檔',
                lastUpdate: '最後更新於',
                searchNoResult: '沒有結果',
                previousPage: '上一頁',
                nextPage: '下一頁',
                chooseLanguage: '選擇語言'
              }
            }[lang]
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
