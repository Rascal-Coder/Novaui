// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const buttonGroupVariants = tv({
  base: `[&>*]:relative focus-visible:[&>*]:z-2 not-first:not-last:[&>*]:rd-0`,
  variants: {
    orientation: {
      horizontal: `inline-flex not-last:[&>*]:border-r-0 first:[&>*]:rd-r-0 last:[&>*]:rd-l-0`,
      vertical: `flex flex-col not-last:[&>*]:border-b-0 first:[&>*]:rd-b-0 last:[&>*]:rd-t-0`
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
