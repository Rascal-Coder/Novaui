import { AccordionHeader as AccordionHeaderPrimitive } from '@novaui/primitives';
import { accordionVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { AccordionHeaderProps } from './types';

export default function AccordionHeader(props: AccordionHeaderProps) {
  const { className, children, ...delegatedProps } = props;

  const mergedCls = useMemo(() => {
    return cn(accordionVariants(), className);
  }, [className]);

  return (
    <AccordionHeaderPrimitive
      {...delegatedProps}
      className={mergedCls}
    >
      {children}
    </AccordionHeaderPrimitive>
  );
}
