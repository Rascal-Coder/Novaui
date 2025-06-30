import type { AccordionItemProps as PrimitiveAccordionItemProps } from '@novaui/primitives';
import { AccordionItem as AccordionItemPrimitive } from '@novaui/primitives';
import { accordionVariants, cn } from '@novaui/variants';

export interface AccordionItemProps extends PrimitiveAccordionItemProps {
  size?: import('@novaui/variants').ThemeSize;
}

export default function AccordionItem({ className, size, ...props }: AccordionItemProps) {
  const { item } = accordionVariants({ size });
  const mergedClassName = cn(item(), className);

  return (
    <AccordionItemPrimitive
      className={mergedClassName}
      data-slot="accordion-item"
      {...props}
    />
  );
}
