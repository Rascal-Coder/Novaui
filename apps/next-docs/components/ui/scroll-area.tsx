import { cn } from '@novaui/variants';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    orientation={orientation}
    ref={ref}
    className={cn(
      'flex select-none data-[state=hidden]:animate-fd-fade-out',
      orientation === 'vertical' && 'h-full w-1.5',
      orientation === 'horizontal' && 'h-1.5 flex-col',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="bg-fd-border relative flex-1 rounded-full" />
  </ScrollAreaPrimitive.Scrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;
const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn('overflow-hidden', className)}
    ref={ref}
    type="scroll"
    {...props}
  >
    {children}
    <ScrollAreaPrimitive.Corner />
    <ScrollBar orientation="vertical" />
  </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollViewport = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    className={cn('size-full rounded-[inherit]', className)}
    ref={ref}
    {...props}
  >
    {children}
  </ScrollAreaPrimitive.Viewport>
));

ScrollViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;

export { ScrollArea, ScrollBar, ScrollViewport };
