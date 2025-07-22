import type { ReactNode } from 'react';

import { DocsLayout } from '@/app/docs-layout/docs';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
  const { lang } = await params;

  return (
    <DocsLayout
      {...baseOptions(lang)}
      links={[]}
      tree={source.pageTree[lang]}
    >
      {children}
    </DocsLayout>
  );
}
