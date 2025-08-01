import { AlertDialogDescription as AlertDialogDescriptionPrimitive } from '@novaui/primitives';
import { cn, dialogVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertDialogDescriptionProps } from './types';

interface Props extends AlertDialogDescriptionProps {}
export default function AlertDialogDescription({ className, size, children, ...delegatedProps }: Props) {
  const mergedCls = useMemo(() => {
    const { description } = dialogVariants({ size });
    return cn(description(), className);
  }, [className, size]);
  return (
    <AlertDialogDescriptionPrimitive
      {...delegatedProps}
      className={mergedCls}
    >
      {children}
    </AlertDialogDescriptionPrimitive>
  );
}
