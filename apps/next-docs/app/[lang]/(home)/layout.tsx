import type { ReactNode } from 'react';

import { HomeLayout } from '@/app/docs-layout/home';
import { baseOptions } from '@/app/layout.config';

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
  const { lang } = await params;

  return <HomeLayout {...baseOptions(lang)}>{children}</HomeLayout>;
}
