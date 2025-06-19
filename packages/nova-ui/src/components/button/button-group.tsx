import { Slot, Slottable } from '@novaui/primitives';
import { buttonGroupVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { ButtonGroupProps } from './types';

export default function ButtonGroup({ asChild = false, orientation, children, className, ...props }: ButtonGroupProps) {
  const Comp = asChild ? Slot : 'div';
  const mergeClassNames = useMemo(() => cn(buttonGroupVariants({ orientation }), className), [className, orientation]);
  return (
    <Comp
      className={mergeClassNames}
      {...props}
    >
      <Slottable>{children}</Slottable>
    </Comp>
  );
}
