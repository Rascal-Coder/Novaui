import { AlertDialogTitle as AlertDialogTitlePrimitive } from '@novaui/primitives';
import { cn, dialogVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertDialogTitleProps } from './types';

interface Props extends AlertDialogTitleProps {}
export default function AlertDialogTitle({ className, size, children }: Props) {
  const mergedCls = useMemo(() => {
    const { title } = dialogVariants({ size });
    return cn(title(), className);
  }, [className, size]);
  return <AlertDialogTitlePrimitive className={mergedCls}>{children}</AlertDialogTitlePrimitive>;
}
