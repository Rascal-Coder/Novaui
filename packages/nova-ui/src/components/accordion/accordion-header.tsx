import type { AccordionHeaderProps as PrimitiveAccordionHeaderProps } from '@novaui/primitives';
import { AccordionHeader as AccordionHeaderPrimitive } from '@novaui/primitives';
import { accordionVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

export interface AccordionHeaderProps extends PrimitiveAccordionHeaderProps {
  /** The size of the accordion header. */
  size?: import('@novaui/variants').ThemeSize;
}

export default function AccordionHeader(props: AccordionHeaderProps) {
  const { className, size, children, ...delegatedProps } = props;

  const mergedCls = useMemo(() => {
    const { header } = accordionVariants({ size });
    return cn(header(), className);
  }, [className, size]);

  return (
    <AccordionHeaderPrimitive
      data-slot="accordion-header"
      {...delegatedProps}
      className={mergedCls}
    >
      {children}
    </AccordionHeaderPrimitive>
  );
}
