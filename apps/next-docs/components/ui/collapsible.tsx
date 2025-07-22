'use client';
import {
  CollapsibleContent as CollapsibleContentPrimitive,
  CollapsibleRoot,
  CollapsibleTrigger
} from '@novaui/primitives';
import { cn } from '@novaui/variants';
import { forwardRef, useEffect, useState } from 'react';

const Collapsible = CollapsibleRoot;

const CollapsibleContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CollapsibleContentPrimitive>
>(({ children, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CollapsibleContentPrimitive
      ref={ref}
      {...props}
      className={cn(
        'overflow-hidden',
        mounted && 'data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down',
        props.className
      )}
    >
      {children}
    </CollapsibleContentPrimitive>
  );
});

CollapsibleContent.displayName = CollapsibleContentPrimitive.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
