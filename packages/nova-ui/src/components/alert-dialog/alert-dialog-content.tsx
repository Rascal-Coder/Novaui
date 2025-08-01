import { AlertDialogContent as AlertDialogContentPrimitive } from '@novaui/primitives';
import { cn, dialogVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertDialogContentProps } from './types';

interface Props extends AlertDialogContentProps {}
export default function AlertDialogContent({ className, size, children, ...delegatedProps }: Props) {
  const mergedCls = useMemo(() => {
    const { content } = dialogVariants({ size });
    return cn(content(), className);
  }, [className, size]);
  return (
    <AlertDialogContentPrimitive
      {...delegatedProps}
      className={mergedCls}
    >
      {children}
    </AlertDialogContentPrimitive>
  );
}
