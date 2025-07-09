import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

import { baseOptions } from '@/app/layout.config';

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
  const { lang } = await params;

  return (
    <HomeLayout
      {...baseOptions(lang)}
      // links={[
      //   {
      //     type: 'custom',
      //     on: 'nav',
      //     children: (
      //       <div>
      //         <p>Hello</p>
      //       </div>
      //     )
      //   }
      // ]}
    >
      {children}
    </HomeLayout>
  );
}
