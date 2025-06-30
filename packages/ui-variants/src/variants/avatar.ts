// @unocss-include
import { tv } from 'tailwind-variants';

export const avatarVariants = tv({
  slots: {
    root: 'relative flex shrink-0 overflow-hidden',
    fallback: 'flex justify-center items-center size-full bg-muted font-medium',
    image: 'aspect-square size-full object-cover'
  },
  variants: {
    shape: {
      circle: {
        root: 'rounded-full',
        fallback: 'rounded-full',
        image: 'rounded-full'
      },
      square: {
        root: 'rounded-md',
        fallback: 'rounded-md',
        image: 'rounded-md'
      }
    },
    size: {
      xs: {
        root: 'size-6'
      },
      sm: {
        root: 'size-8'
      },
      md: {
        root: 'size-10'
      },
      lg: {
        root: 'size-12'
      },
      xl: {
        root: 'size-14'
      },
      '2xl': {
        root: 'size-16'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle'
  }
});

export type AvatarSlots = keyof typeof avatarVariants.slots;
