import { AccordionContent as AccordionContentPrimitive } from '@novaui/primitives';
import { accordionVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { AccordionContentProps } from './types';

export default function AccordionContent({ size, className, content, children, ...props }: AccordionContentProps) {
  const mergedCls = useMemo(() => {
    const { content: contentVariant } = accordionVariants({ size });

    return cn(contentVariant(), className);
  }, [className, size]);

  return (
    <AccordionContentPrimitive
      {...props}
      className={mergedCls}
    >
      {children || content}
    </AccordionContentPrimitive>
  );
}
