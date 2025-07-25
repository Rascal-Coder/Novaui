import * as path from 'node:path';

import type { LoaderConfig, LoaderOutput, Page } from 'fumadocs-core/source';
import type { ComponentProps, FC } from 'react';

import { defaultMdxComponents } from '@/mdx';

/**
 * Extend the default Link component to resolve relative file paths in `href`.
 *
 * @param page the current page
 * @param source the source object
 * @param OverrideLink The component to override from
 */
export function createRelativeLink(
  source: LoaderOutput<LoaderConfig>,
  page: Page,
  OverrideLink: FC<ComponentProps<'a'>> = defaultMdxComponents.a
): FC<ComponentProps<'a'>> {
  return async function RelativeLink({ href, ...props }: ComponentProps<'a'>) {
    let _href = href;
    // resolve relative href
    if (href && href.startsWith('.')) {
      const target = source.getPageByHref(href, {
        dir: path.dirname(page.path),
        language: page.locale
      });

      if (target) {
        _href = target.hash ? `${target.page.url}#${target.hash}` : target.page.url;
      }
    }

    return (
      <OverrideLink
        href={_href}
        {...props}
      />
    );
  };
}

export { defaultMdxComponents as default };
