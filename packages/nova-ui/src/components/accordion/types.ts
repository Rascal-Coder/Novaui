import type {
  AccordionContentProps as AccordionContentPropsPrimitive,
  AccordionHeaderProps as AccordionHeaderPropsPrimitive
} from '@novaui/primitives';
import type { ThemeSize } from '@novaui/variants';

export interface AccordionContentProps extends AccordionContentPropsPrimitive {
  /** The size of the accordion content. */
  size?: ThemeSize;
  /** The description of the accordion content. */
  content?: string;
}

export interface AccordionHeaderProps extends AccordionHeaderPropsPrimitive {
  /** The size of the accordion header. */
  className?: string;
}
