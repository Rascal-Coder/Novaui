import { Slot } from '@novaui/primitives';
import { buttonVariants, cn } from '@novaui/variants';
import * as React from 'react';

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

  const buttonClassName = React.useMemo(
    () => cn(buttonVariants({ color, variant, size, shape, shadow, fitContent }), className),
    [color, variant, size, shape, shadow, fitContent, className]
  );

  return (
    <Comp
      className={buttonClassName}
      {...props}
    >
      {!asChild && leading}
      {children}
      {!asChild && trailing}
    </Comp>
  );
}
