import { Slot, Slottable } from '@novaui/primitives';
import { buttonVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { ButtonProps } from './types';

export default function NButton({
  className,
  color,
  variant,
  size,
  shape,
  shadow,
  fitContent,
  asChild = false,
  children,
  leading,
  trailing,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const buttonClassName = useMemo(
    () => cn(buttonVariants({ color, variant, size, shape, shadow, fitContent }), className),
    [color, variant, size, shape, shadow, fitContent, className]
  );

  return (
    <Comp
      className={buttonClassName}
      {...props}
    >
      {leading}
      <Slottable>{children}</Slottable>
      {trailing}
    </Comp>
  );
}
