'use client';

import {
  SelectPrimitiveContent,
  SelectPrimitiveGroup,
  SelectPrimitiveIcon,
  SelectPrimitiveItem,
  SelectPrimitiveItemIndicator,
  SelectPrimitiveItemText,
  SelectPrimitiveLabel,
  SelectPrimitivePortal,
  SelectPrimitiveScrollDownButton,
  SelectPrimitiveScrollUpButton,
  SelectPrimitiveSeparator,
  SelectPrimitiveTrigger,
  SelectPrimitiveValue,
  SelectPrimitiveViewport,
  SelectRoot
} from '@novaui/primitives';
import { cn } from '@novaui/variants';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';

function Select({ ...props }: React.ComponentProps<typeof SelectRoot>) {
  return (
    <SelectRoot
      data-slot="select"
      {...props}
    />
  );
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitiveGroup>) {
  return (
    <SelectPrimitiveGroup
      data-slot="select-group"
      {...props}
    />
  );
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitiveValue>) {
  return (
    <SelectPrimitiveValue
      data-slot="select-value"
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitiveTrigger> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitiveTrigger
      data-size={size}
      data-slot="select-trigger"
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitiveIcon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitiveIcon>
    </SelectPrimitiveTrigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitiveContent>) {
  return (
    <SelectPrimitivePortal>
      <SelectPrimitiveContent
        data-slot="select-content"
        position={position}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--novaui-select-content-available-height) min-w-[8rem] origin-(--novaui-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitiveViewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--novaui-select-trigger-height)] w-full min-w-[var(--novaui-select-trigger-width)] scroll-my-1'
          )}
        >
          {children}
        </SelectPrimitiveViewport>
        <SelectScrollDownButton />
      </SelectPrimitiveContent>
    </SelectPrimitivePortal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitiveLabel>) {
  return (
    <SelectPrimitiveLabel
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      data-slot="select-label"
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitiveItem>) {
  return (
    <SelectPrimitiveItem
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 size-3.5 flex items-center justify-center">
        <SelectPrimitiveItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitiveItemIndicator>
      </span>
      <SelectPrimitiveItemText>{children}</SelectPrimitiveItemText>
    </SelectPrimitiveItem>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitiveSeparator>) {
  return (
    <SelectPrimitiveSeparator
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitiveScrollUpButton>) {
  return (
    <SelectPrimitiveScrollUpButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitiveScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitiveScrollDownButton>) {
  return (
    <SelectPrimitiveScrollDownButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitiveScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};
