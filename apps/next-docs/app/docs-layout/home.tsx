import { cn } from '@novaui/variants';
import Link from 'fumadocs-core/link';
import { ChevronDown, Languages } from 'lucide-react';
import { Fragment, type HTMLAttributes, useMemo } from 'react';

import { Menu, MenuContent, MenuLinkItem, MenuTrigger } from '@/app/docs-layout/home/menu';
import {
  Navbar,
  NavbarLink,
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger
} from '@/app/docs-layout/home/navbar';
import { type LinkItemType } from '@/app/docs-layout/links';
import { LanguageToggle, LanguageToggleText } from '@/components/layout/language-toggle';
import { LargeSearchToggle, SearchToggle } from '@/components/layout/search-toggle';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { NavProvider } from '@/contexts/layout';

import { type BaseLayoutProps, type NavOptions, getLinks } from './shared';

export interface HomeLayoutProps extends BaseLayoutProps {
  nav?: Partial<
    NavOptions & {
      /** Open mobile menu when hovering the trigger */
      enableHoverToOpen?: boolean;
    }
  >;
}

export function HomeLayout(props: HomeLayoutProps & HTMLAttributes<HTMLElement>) {
  const {
    nav = {},
    links,
    githubUrl,
    i18n,
    disableThemeSwitch = false,
    themeSwitch = { enabled: !disableThemeSwitch },
    searchToggle,
    ...rest
  } = props;

  return (
    <NavProvider transparentMode={nav?.transparentMode}>
      <main
        id="nd-home-layout"
        {...rest}
        className={cn('flex flex-1 flex-col pt-14', rest.className)}
      >
        {nav.enabled !== false &&
          (nav.component ?? (
            <Header
              githubUrl={githubUrl}
              i18n={i18n}
              links={links}
              nav={nav}
              searchToggle={searchToggle}
              themeSwitch={themeSwitch}
            />
          ))}
        {props.children}
      </main>
    </NavProvider>
  );
}

export function Header({
  nav = {},
  i18n = false,
  links,
  githubUrl,
  themeSwitch = {},
  searchToggle = {}
}: HomeLayoutProps) {
  const finalLinks = useMemo(() => getLinks(links, githubUrl), [links, githubUrl]);

  const navItems = finalLinks.filter(item => ['nav', 'all'].includes(item.on ?? 'all'));
  const menuItems = finalLinks.filter(item => ['menu', 'all'].includes(item.on ?? 'all'));

  return (
    <Navbar>
      <Link
        className="inline-flex items-center gap-2.5 font-semibold"
        href={nav.url ?? '/'}
      >
        {nav.title}
      </Link>
      {nav.children}
      <ul className="flex flex-row items-center gap-2 px-6 max-sm:hidden">
        {navItems
          .filter(item => !isSecondary(item))
          .map((item, i) => (
            <NavbarLinkItem
              className="text-sm"
              item={item}
              key={i}
            />
          ))}
      </ul>
      <div className="flex flex-1 flex-row items-center justify-end gap-1.5">
        {searchToggle.enabled !== false && (
          <>
            {searchToggle.components?.sm ?? (
              <SearchToggle
                hideIfDisabled
                className="p-2 lg:hidden"
              />
            )}
            {searchToggle.components?.lg ?? (
              <LargeSearchToggle
                hideIfDisabled
                className="max-w-[240px] w-full rounded-full ps-2.5 max-lg:hidden"
              />
            )}
          </>
        )}
        {themeSwitch.enabled !== false &&
          (themeSwitch.component ?? (
            <ThemeToggle
              className="max-lg:hidden"
              mode={themeSwitch?.mode}
            />
          ))}
        {i18n ? (
          <LanguageToggle className="max-lg:hidden">
            <Languages className="size-5" />
          </LanguageToggle>
        ) : null}
      </div>
      <ul className="flex flex-row items-center">
        {navItems.filter(isSecondary).map((item, i) => (
          <NavbarLinkItem
            className="max-lg:hidden"
            item={item}
            key={i}
          />
        ))}
        <Menu className="lg:hidden">
          <MenuTrigger
            aria-label="Toggle Menu"
            enableHover={nav.enableHoverToOpen}
            className={cn(
              buttonVariants({
                size: 'icon',
                color: 'ghost',
                className: 'group -me-1.5'
              })
            )}
          >
            <ChevronDown className="transition-transform duration-300 !size-5.5 group-data-[state=open]:rotate-180" />
          </MenuTrigger>
          <MenuContent className="sm:flex-row sm:items-center sm:justify-end">
            {menuItems
              .filter(item => !isSecondary(item))
              .map((item, i) => (
                <MenuLinkItem
                  className="sm:hidden"
                  item={item}
                  key={i}
                />
              ))}
            <div className="flex flex-row items-center gap-1.5 -ms-1.5 max-sm:mt-2">
              {menuItems.filter(isSecondary).map((item, i) => (
                <MenuLinkItem
                  className="-me-1.5"
                  item={item}
                  key={i}
                />
              ))}
              <div
                className="flex-1"
                role="separator"
              />
              {i18n ? (
                <LanguageToggle>
                  <Languages className="size-5" />
                  <LanguageToggleText />
                  <ChevronDown className="text-fd-muted-foreground size-3" />
                </LanguageToggle>
              ) : null}
              {themeSwitch.enabled !== false && (themeSwitch.component ?? <ThemeToggle mode={themeSwitch?.mode} />)}
            </div>
          </MenuContent>
        </Menu>
      </ul>
    </Navbar>
  );
}

function NavbarLinkItem({ item, ...props }: { item: LinkItemType; className?: string }) {
  if (item.type === 'custom') return <div {...props}>{item.children}</div>;

  if (item.type === 'menu') {
    const children = item.items.map((child, j) => {
      if (child.type === 'custom') return <Fragment key={j}>{child.children}</Fragment>;

      const {
        banner = child.icon ? (
          <div className="bg-fd-muted w-fit border rounded-md p-1 [&_svg]:size-4">{child.icon}</div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <NavbarMenuLink
          external={child.external}
          href={child.url}
          key={j}
          {...rest}
        >
          {rest.children ?? (
            <>
              {banner}
              <p className="text-[15px] font-medium">{child.text}</p>
              <p className="text-fd-muted-foreground text-sm empty:hidden">{child.description}</p>
            </>
          )}
        </NavbarMenuLink>
      );
    });

    return (
      <NavbarMenu>
        <NavbarMenuTrigger {...props}>
          {item.url ? <Link href={item.url}>{item.text}</Link> : item.text}
        </NavbarMenuTrigger>
        <NavbarMenuContent>{children}</NavbarMenuContent>
      </NavbarMenu>
    );
  }

  return (
    <NavbarLink
      {...props}
      aria-label={item.type === 'icon' ? item.label : undefined}
      item={item}
      variant={item.type}
    >
      {item.type === 'icon' ? item.icon : item.text}
    </NavbarLink>
  );
}

function isSecondary(item: LinkItemType): boolean {
  return ('secondary' in item && item.secondary === true) || item.type === 'icon';
}
