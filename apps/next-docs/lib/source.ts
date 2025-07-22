import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

import { i18n } from '@/lib/i18n';

import { docs } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
  // source: createMDXSource(docs, meta),
  source: docs.toFumadocsSource(),
  i18n
});
