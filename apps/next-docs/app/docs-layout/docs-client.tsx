'use client';

import { cn } from '@novaui/variants';
import { Sidebar as SidebarIcon } from 'lucide-react';
import { type ComponentProps } from 'react';

import { SearchToggle } from '@/components/layout/search-toggle';
import { SidebarCollapseTrigger } from '@/components/layout/sidebar';
import { buttonVariants } from '@/components/ui/button';
import { useNav } from '@/contexts/layout';
import { useSidebar } from '@/contexts/sidebar';

export function Navbar(props: ComponentProps<'header'>) {
  const { isTransparent } = useNav();

  return (
    <header
      id="nd-subnav"
      {...props}
      className={cn(
        'fixed top-[--fd-banner-height] inset-x-0 z-30 flex items-center px-4 border-b transition-colors backdrop-blur-sm',
        !isTransparent && 'bg-background/80',
        props.className
      )}
    >
      {props.children}
    </header>
  );
}

export function LayoutBody(props: ComponentProps<'main'>) {
  const { collapsed } = useSidebar();

  return (
    <main
      id="nd-docs-layout"
      {...props}
      className={cn('flex flex-1 flex-col transition-[margin]', props.className)}
      style={{
        ...props.style,
        marginInlineStart: collapsed
          ? 'max(0px, min(calc(100vw - var(--fd-page-width)), var(--fd-sidebar-width)))'
          : 'var(--fd-sidebar-width)'
      }}
    >
      {props.children}
    </main>
  );
}

export function NavbarSidebarTrigger({ className, ...props }: ComponentProps<'button'>) {
  const { setOpen } = useSidebar();

  return (
    <button
      {...props}
      aria-label="Open Sidebar"
      className={cn(
        buttonVariants({
          color: 'ghost',
          size: 'icon-sm',
          className
        })
      )}
      onClick={() => setOpen(prev => !prev)}
    >
      <SidebarIcon />
    </button>
  );
}

export function CollapsibleControl() {
  const { collapsed } = useSidebar();
  if (!collapsed) return;

  return (
    <div
      className="fixed z-10 flex animate-fade-in border rounded-xl bg-muted p-0.5 text-muted-foreground shadow-lg max-xl:end-4 xl:start-4"
      style={{
        top: 'calc(var(--fd-banner-height) + var(--fd-tocnav-height) + var(--spacing) * 4)'
      }}
    >
      <SidebarCollapseTrigger
        className={cn(
          buttonVariants({
            color: 'ghost',
            size: 'icon-sm',
            className: 'rounded-lg'
          })
        )}
      >
        <SidebarIcon />
      </SidebarCollapseTrigger>
      <SearchToggle
        hideIfDisabled
        className="rounded-lg"
      />
    </div>
  );
}
