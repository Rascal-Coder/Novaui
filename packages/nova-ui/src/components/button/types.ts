import type {
  ButtonGroupVariants,
  ButtonShadow,
  ButtonShape,
  ButtonVariant,
  ButtonVariants,
  ThemeOrientation
} from '@novaui/variants';

import type { AnchorLinkProps } from '../link';

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

type ButtonLinkProps = ButtonProps &
  AnchorLinkProps & {
    variant?: string;
  };

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}
export type {
  ButtonProps,
  ButtonIconPorps,
  ButtonGroupProps,
  ButtonLinkProps,
  LoadingButtonProps,
  ButtonShape,
  ButtonShadow,
  ButtonVariant
};
