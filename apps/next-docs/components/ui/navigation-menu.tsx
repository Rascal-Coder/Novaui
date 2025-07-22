'use client';
import {
  NavigationMenu,
  NavigationMenuContent as NavigationMenuContentPrimitive,
  NavigationMenuItem as NavigationMenuItemPrimitive,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger as NavigationMenuTriggerPrimitive,
  NavigationMenuViewport as NavigationMenuViewportPrimitive
} from '@novaui/primitives';
import { cn } from '@novaui/variants';
import * as React from 'react';

// const NavigationMenu = NavigationMenu.Root;

// const NavigationMenuList = Primitive.List;

const NavigationMenuItem = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuItemPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuItemPrimitive>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuItemPrimitive
    className={cn('list-none', className)}
    ref={ref}
    {...props}
  >
    {children}
  </NavigationMenuItemPrimitive>
));

NavigationMenuItem.displayName = NavigationMenuItemPrimitive.displayName;

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuTriggerPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuTriggerPrimitive>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuTriggerPrimitive
    className={cn('data-[state=open]:bg-fd-accent/50', className)}
    ref={ref}
    {...props}
  >
    {children}
  </NavigationMenuTriggerPrimitive>
));
NavigationMenuTrigger.displayName = NavigationMenuTriggerPrimitive.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuContentPrimitive>
>(({ className, ...props }, ref) => (
  <NavigationMenuContentPrimitive
    ref={ref}
    className={cn(
      'absolute inset-x-0 top-0 overflow-auto fd-scroll-container max-h-[80svh] data-[motion=from-end]:animate--enterFromRight data-[motion=from-start]:animate-fd-enterFromLeft data-[motion=to-end]:animate-fd-exitToRight data-[motion=to-start]:animate-fd-exitToLeft',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuContentPrimitive.displayName;

const NavigationMenuLink = NavigationMenuLinkPrimitive;

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuViewportPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuViewportPrimitive>
>(({ className, ...props }, ref) => (
  <div
    className="w-full flex justify-center"
    ref={ref}
  >
    <NavigationMenuViewportPrimitive
      {...props}
      className={cn(
        'relative h-[--radix-navigation-menu-viewport-height] w-full origin-[top_center] overflow-hidden transition-[width,height] duration-300 data-[state=closed]:animate-fd-nav-menu-out data-[state=open]:animate-fd-nav-menu-in',
        className
      )}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuViewportPrimitive.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport
};
