import { cn, dialogVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertDialogFooterProps } from './types';

interface Props extends AlertDialogFooterProps {
  children?: React.ReactNode;
}
export default function AlertDialogFooter({ className, size, children, ...delegatedProps }: Props) {
  const mergedCls = useMemo(() => {
    const { footer } = dialogVariants({ size });
    return cn(footer(), className);
  }, [className, size]);
  return (
    <div
      className={mergedCls}
      {...delegatedProps}
    >
      {children}
    </div>
  );
}
