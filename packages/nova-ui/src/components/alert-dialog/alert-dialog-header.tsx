import { cn, dialogVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertDialogHeaderProps } from './types';

interface Props extends AlertDialogHeaderProps {
  children?: React.ReactNode;
}
export default function AlertDialogHeader({ className, size, children }: Props) {
  const mergedCls = useMemo(() => {
    const { header } = dialogVariants({ size });
    return cn(header(), className);
  }, [className, size]);
  return <div className={mergedCls}>{children}</div>;
}
