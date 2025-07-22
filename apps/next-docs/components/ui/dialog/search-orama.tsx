'use client';

import { type OramaCloudOptions, useDocsSearch } from 'fumadocs-core/search/client';
import type { SortedResult } from 'fumadocs-core/server';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { type ReactNode, useMemo, useState } from 'react';

import { useI18n } from '@/contexts/i18n';
import type { SearchLink, SharedProps, TagItem } from '@/contexts/search';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem
} from './search';

export interface OramaSearchDialogProps extends SharedProps {
  links?: SearchLink[];
  client: OramaCloudOptions['client'];
  searchOptions?: OramaCloudOptions['params'];
  index?: OramaCloudOptions['index'];

  footer?: ReactNode;

  defaultTag?: string;
  tags?: TagItem[];

  /**
   * Add the "Powered by Orama" label
   *
   * @defaultValue false
   */
  showOrama?: boolean;

  /**
   * Allow to clear tag filters
   *
   * @defaultValue false
   */
  allowClear?: boolean;
}

/** Orama Cloud integration */
export default function OramaSearchDialog({
  client,
  searchOptions,
  tags = [],
  defaultTag,
  showOrama = false,
  allowClear = false,
  index,
  footer,
  links = [],
  ...props
}: OramaSearchDialogProps) {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);
  const { search, setSearch, query } = useDocsSearch({
    type: 'orama-cloud',
    client,
    index,
    params: searchOptions,
    locale,
    tag
  });

  const defaultItems = useMemo<SortedResult[] | null>(() => {
    if (links.length === 0) return null;

    return links.map(([name, link]) => ({
      type: 'page',
      id: name,
      content: name,
      url: link
    }));
  }, [links]);

  useOnChange(defaultTag, v => {
    setTag(v);
  });

  const label = showOrama && <Label />;

  return (
    <SearchDialog
      isLoading={query.isLoading}
      search={search}
      onSearchChange={setSearch}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : defaultItems} />
        <SearchDialogFooter>
          {tags.length > 0 ? (
            <TagsList
              allowClear={allowClear}
              tag={tag}
              onTagChange={setTag}
            >
              {tags.map(tagItem => (
                <TagsListItem
                  key={tagItem.value}
                  value={tagItem.value}
                >
                  {tagItem.name}
                </TagsListItem>
              ))}
              {label}
            </TagsList>
          ) : (
            label
          )}
          {footer}
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}

function Label() {
  return (
    <a
      className="text-fd-muted-foreground ms-auto text-xs"
      href="https://orama.com"
      rel="noreferrer noopener"
    >
      Search powered by Orama
    </a>
  );
}
