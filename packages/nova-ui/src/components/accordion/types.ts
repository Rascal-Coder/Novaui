import type { AccordionMultipleProps, AccordionSingleProps } from '@novaui/primitives';
import type { ThemeSize } from '@novaui/variants';
import type { ComponentType, ReactNode } from 'react';

export interface AccordionItemData {
  value: string;
  title?: string;
  content?: string;
  icon?: ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface AccordionUI {
  root?: string;
  item?: string;
  header?: string;
  trigger?: string;
  content?: string;
  triggerLeadingIcon?: string;
  triggerIcon?: string;
}

export interface AccordionSlotProps<T extends AccordionItemData = AccordionItemData> {
  modelValue?: string | string[];
  open?: boolean;
  item: T;
}

// export interface AccordionProps<T extends AccordionItemData = AccordionItemData>
//   extends Omit<AccordionSingleProps | AccordionMultipleProps, 'className' | 'children'> {
//   className?: string;
//   size?: ThemeSize;
//   ui?: AccordionUI;
//   items: T[];

//   // Render prop slots
//   renderItem?: (props: AccordionSlotProps<T>) => ReactNode;
//   renderTriggerLeading?: (props: AccordionSlotProps<T>) => ReactNode;
//   renderTitle?: (props: AccordionSlotProps<T>) => ReactNode;
//   renderTriggerTrailing?: (props: AccordionSlotProps<T>) => ReactNode;
//   renderTriggerIcon?: (props: AccordionSlotProps<T>) => ReactNode;
//   renderContent?: (props: AccordionSlotProps<T>) => ReactNode;
// }

export interface AccordionBaseProps<T extends AccordionItemData = AccordionItemData> {
  className?: string;
  size?: ThemeSize;
  ui?: AccordionUI;
  items: T[];
  disabled?: boolean;

  // Render prop slots
  renderItem?: (props: AccordionSlotProps<T>) => ReactNode;
  renderTriggerLeading?: (props: AccordionSlotProps<T>) => ReactNode;
  renderTitle?: (props: AccordionSlotProps<T>) => ReactNode;
  renderTriggerTrailing?: (props: AccordionSlotProps<T>) => ReactNode;
  renderTriggerIcon?: (props: AccordionSlotProps<T>) => ReactNode;
  renderContent?: (props: AccordionSlotProps<T>) => ReactNode;
}

export type AccordionProps<T extends AccordionItemData = AccordionItemData> = AccordionBaseProps<T> &
  (
    | (Omit<AccordionSingleProps, 'className' | 'children'> & { type: 'single' })
    | (Omit<AccordionMultipleProps, 'className' | 'children'> & { type: 'multiple' })
  );
