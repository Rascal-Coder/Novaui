import type { PageTree } from 'fumadocs-core/server';
import type { ReactNode } from 'react';

import type { LinkItemType } from '@/app/docs-layout/links';
import type { Option } from '@/components/layout/root-toggle';
import {
  type SidebarComponents,
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  type SidebarProps
} from '@/components/layout/sidebar';
import { type GetSidebarTabsOptions, getSidebarTabs } from '@/utils/get-sidebar-tabs';

export interface SidebarOptions extends SidebarProps {
  components?: Partial<SidebarComponents>;

  /** Root Toggle options */
  tabs?: Option[] | GetSidebarTabsOptions | false;

  banner?: ReactNode;
  footer?: ReactNode;
}

export function SidebarLinkItem({ item, ...props }: { item: LinkItemType; className?: string }) {
  if (item.type === 'menu')
    return (
      <SidebarFolder {...props}>
        {item.url ? (
          <SidebarFolderLink href={item.url}>
            {item.icon}
            {item.text}
          </SidebarFolderLink>
        ) : (
          <SidebarFolderTrigger>
            {item.icon}
            {item.text}
          </SidebarFolderTrigger>
        )}
        <SidebarFolderContent>
          {item.items.map((child, i) => (
            <SidebarLinkItem
              item={child}
              key={i}
            />
          ))}
        </SidebarFolderContent>
      </SidebarFolder>
    );

  if (item.type === 'custom') return <div {...props}>{item.children}</div>;

  return (
    <SidebarItem
      external={item.external}
      href={item.url}
      icon={item.icon}
      {...props}
    >
      {item.text}
    </SidebarItem>
  );
}

export function getSidebarTabsFromOptions(options: SidebarOptions['tabs'], tree: PageTree.Root) {
  if (Array.isArray(options)) {
    return options;
  } else if (typeof options === 'object') {
    return getSidebarTabs(tree, options);
  } else if (options !== false) {
    return getSidebarTabs(tree);
  }
}
