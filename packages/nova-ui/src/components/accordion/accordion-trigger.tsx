import type { AccordionTriggerProps as PrimitiveAccordionTriggerProps } from '@novaui/primitives';
import { AccordionTrigger as AccordionTriggerPrimitive } from '@novaui/primitives';
import { type ThemeSize, accordionVariants, cn } from '@novaui/variants';
import { ChevronDown } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

export interface AccordionTriggerProps extends PrimitiveAccordionTriggerProps {
  size?: ThemeSize;
  ui?: {
    triggerLeadingIcon?: string;
    triggerIcon?: string;
  };
  title?: string;
  icon?: ComponentType<{ className?: string }>;
  leading?: ReactNode;
  trailing?: ReactNode;
  iconSlot?: ReactNode;
}

export default function AccordionTrigger({
  className,
  size,
  ui,
  title,
  icon: Icon,
  leading,
  trailing,
  iconSlot,
  children,
  ...props
}: AccordionTriggerProps) {
  const { trigger, triggerLeadingIcon, triggerIcon } = accordionVariants({ size });

  const mergedCls = {
    cls: cn(trigger(), className),
    leadingIcon: cn(triggerLeadingIcon(), ui?.triggerLeadingIcon),
    icon: cn(triggerIcon(), ui?.triggerIcon)
  };

  return (
    <AccordionTriggerPrimitive
      className={mergedCls.cls}
      data-slot="accordion-trigger"
      {...props}
    >
      {leading || (Icon && <Icon className={mergedCls.leadingIcon} />)}
      {children || (title && <span>{title}</span>)}
      {trailing}
      <div className={mergedCls.icon}>{iconSlot || <ChevronDown />}</div>
    </AccordionTriggerPrimitive>
  );
}
