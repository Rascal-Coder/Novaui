import { loader } from 'fumadocs-core/source';
// import { createMDXSource } from 'fumadocs-mdx';

import { i18n } from '@/lib/i18n';

import { docs } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  // source: createMDXSource(docs, meta),
  source: docs.toFumadocsSource(),
  i18n
});
