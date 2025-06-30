import type { AccordionContentProps as PrimitiveAccordionContentProps } from '@novaui/primitives';
import { AccordionContent as AccordionContentPrimitive } from '@novaui/primitives';
import { accordionVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

export interface AccordionContentProps extends PrimitiveAccordionContentProps {
  /** The size of the accordion content. */
  size?: import('@novaui/variants').ThemeSize;
}

export default function AccordionContent({ size, className, children, ...props }: AccordionContentProps) {
  const mergedCls = useMemo(() => {
    const { content: contentVariant } = accordionVariants({ size });
    return cn(contentVariant(), className);
  }, [className, size]);

  return (
    <AccordionContentPrimitive
      data-slot="accordion-content"
      {...props}
      className={mergedCls}
    >
      {children}
    </AccordionContentPrimitive>
  );
}
