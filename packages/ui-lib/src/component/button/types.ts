import type { ButtonGroupVariants, ButtonVariants, ThemeOrientation } from '@novaui/variants';

type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariants & {
    asChild?: boolean;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
  };

type ButtonIconPorps = Omit<ButtonProps, 'leading' | 'trailing'>;

type ButtonGroupProps = ButtonGroupVariants & {
  orientation?: ThemeOrientation;
  children?: React.ReactNode;
};
export type { ButtonProps, ButtonIconPorps, ButtonGroupProps };
