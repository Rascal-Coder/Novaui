import type { AccordionMultipleProps, AccordionSingleProps } from '@novaui/primitives';
import { Accordion } from '@novaui/primitives';
import { type ThemeSize, accordionVariants, cn } from '@novaui/variants';

export type AccordionRootProps = (AccordionSingleProps | AccordionMultipleProps) & {
  size?: ThemeSize;
};

export default function AccordionRoot({ className, size, ...props }: AccordionRootProps) {
  const { root } = accordionVariants({ size });
  const mergedClassName = cn(root(), className);

  return (
    <Accordion
      className={mergedClassName}
      data-slot="accordion-root"
      {...props}
    />
  );
}
