import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '@novaui/primitives';
import { cn } from '@novaui/variants';
import * as React from 'react';

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaScrollbar
    orientation={orientation}
    ref={ref}
    className={cn(
      'flex select-none data-[state=hidden]:animate-fade-out',
      orientation === 'vertical' && 'h-full w-1.5',
      orientation === 'horizontal' && 'h-1.5 flex-col',
      className
    )}
    {...props}
  >
    <ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaRoot>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaRoot>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaRoot
    className={cn('overflow-hidden', className)}
    ref={ref}
    type="scroll"
    {...props}
  >
    {children}
    <ScrollAreaCorner />
    <ScrollBar orientation="vertical" />
  </ScrollAreaRoot>
));

ScrollArea.displayName = ScrollAreaRoot.displayName;

const ScrollViewport = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaViewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaViewport>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaViewport
    className={cn('size-full rounded-[inherit]', className)}
    ref={ref}
    {...props}
  >
    {children}
  </ScrollAreaViewport>
));

ScrollViewport.displayName = ScrollAreaViewport.displayName;

export { ScrollArea, ScrollBar, ScrollViewport };
