// @unocss-include
import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  slots: {
    root: '',
    item: 'border-b last:border-b-0',
    header: 'flex',
    content: [
      'overflow-hidden will-change-transform transform-gpu',
      'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up'
    ],
    trigger: [
      `flex-1 flex items-center justify-start font-medium transition-all duration-200 cubic-bezier(0.22, 1, 0.36, 1) bg-transparent`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `hover:underline [&[data-state=open]>.trigger-icon]:rotate-180`,
      `disabled:(opacity-50 cursor-not-allowed hover:no-underline)`
    ],
    triggerLeadingIcon: `shrink-0`,
    triggerIcon: `trigger-icon ml-auto shrink-0 text-muted-foreground transition-transform duration-200 cubic-bezier(0.22, 1, 0.36, 1)`
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        content: 'data-[state=open]:pb-3',
        trigger: 'py-3 gap-3'
      },
      sm: {
        root: 'text-xs',
        content: 'data-[state=open]:pb-3.5',
        trigger: 'py-3.5 gap-3.5'
      },
      md: {
        root: 'text-sm',
        content: 'data-[state=open]:pb-4',
        trigger: 'py-4 gap-4'
      },
      lg: {
        root: 'text-base',
        content: 'data-[state=open]:pb-4.5',
        trigger: 'py-4.5 gap-4.5'
      },
      xl: {
        root: 'text-lg',
        content: 'data-[state=open]:pb-5',
        trigger: 'py-5 gap-5'
      },
      '2xl': {
        root: 'text-2xl',
        content: 'data-[state=open]:pb-6',
        trigger: 'py-6 gap-6'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type AccordionSlots = keyof typeof accordionVariants.slots;
