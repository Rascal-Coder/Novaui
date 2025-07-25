'use client';
import type { NavigationMenuContentProps, NavigationMenuTriggerProps } from '@novaui/primitives';
import { cn } from '@novaui/variants';
import { type VariantProps, cva } from 'class-variance-authority';
import Link, { type LinkProps } from 'fumadocs-core/link';
import { type ComponentProps, useState } from 'react';

import { BaseLinkItem } from '@/app/docs-layout/links';
import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';
import { useNav } from '@/contexts/layout';

const navItemVariants = cva(
  'inline-flex items-center gap-1 p-2 text-muted-foreground transition-colors hover:text-accent-foreground data-[active=true]:text-primary [&_svg]:size-4'
);

export function Navbar(props: ComponentProps<'div'>) {
  const [value, setValue] = useState('');
  const { isTransparent } = useNav();

  return (
    <NavigationMenu
      asChild
      value={value}
      onValueChange={setValue}
    >
      <header
        id="nd-nav"
        {...props}
        className={cn(
          'fixed top-[--fd-banner-height] z-40 left-0 backdrop-blur-lg border-b transition-colors *:mx-auto *:max-w[--fd-container]',
          value.length > 0 && 'max-lg:shadow-lg max-lg:rounded-b-2xl',
          (!isTransparent || value.length > 0) && 'bg-background/80',
          props.className
        )}
        style={{
          right: 'var(--removed-body-scroll-bar-size, 0px)'
        }}
      >
        <NavigationMenuList
          asChild
          className="h-14 w-full flex items-center px-4"
        >
          <nav>{props.children}</nav>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </header>
    </NavigationMenu>
  );
}

export const NavbarMenu = NavigationMenuItem;

export function NavbarMenuContent(props: NavigationMenuContentProps) {
  return (
    <NavigationMenuContent
      {...props}
      className={cn('grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3', props.className)}
    >
      {props.children}
    </NavigationMenuContent>
  );
}

export function NavbarMenuTrigger(props: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuTrigger
      {...props}
      className={cn(navItemVariants(), 'rounded-md', props.className)}
    >
      {props.children}
    </NavigationMenuTrigger>
  );
}

export function NavbarMenuLink(props: LinkProps) {
  return (
    <NavigationMenuLink asChild>
      <Link
        {...props}
        className={cn(
          'flex flex-col gap-2 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/80 hover:text-accent-foreground',
          props.className
        )}
      >
        {props.children}
      </Link>
    </NavigationMenuLink>
  );
}

const linkVariants = cva('', {
  variants: {
    variant: {
      main: navItemVariants(),
      button: buttonVariants({
        color: 'secondary',
        className: 'gap-1.5 [&_svg]:size-4'
      }),
      icon: buttonVariants({
        color: 'ghost',
        size: 'icon'
      })
    }
  },
  defaultVariants: {
    variant: 'main'
  }
});

export function NavbarLink({
  item,
  variant,
  ...props
}: ComponentProps<typeof BaseLinkItem> & VariantProps<typeof linkVariants>) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <BaseLinkItem
          {...props}
          className={cn(linkVariants({ variant }), props.className)}
          item={item}
        >
          {props.children}
        </BaseLinkItem>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
