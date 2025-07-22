'use client';
import {
  PopoverClose,
  PopoverContent as PopoverContentPrimitive,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from '@novaui/primitives';
import { cn } from '@novaui/variants';
import * as React from 'react';

const Popover = PopoverRoot;

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof PopoverContentPrimitive>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPortal>
    <PopoverContentPrimitive
      align={align}
      ref={ref}
      side="bottom"
      sideOffset={sideOffset}
      className={cn(
        'z-50 origin-top min-w-[240px] max-w-[98vw] rounded-xl border bg-popover/60 backdrop-blur-lg p-2 text-sm text-popover-foreground shadow-lg focus-visible:outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPortal>
));
PopoverContent.displayName = PopoverContentPrimitive.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
