import type { ButtonGroupVariants, ButtonVariants, ThemeOrientation } from '@novaui/variants';

type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariants & {
    asChild?: boolean;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
  };

type ButtonIconPorps = Omit<ButtonProps, 'leading' | 'trailing'>;

type ButtonGroupProps = React.ComponentProps<'div'> &
  ButtonGroupVariants & {
    orientation?: ThemeOrientation;
    asChild?: boolean;
  };
export type { ButtonProps, ButtonIconPorps, ButtonGroupProps };
