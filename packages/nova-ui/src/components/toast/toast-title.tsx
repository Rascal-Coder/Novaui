import { Primitive } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { ToastTitleProps } from './types';

export default function ToastTitle({ className, size, children, ...props }: ToastTitleProps) {
  const mergedClassName = useMemo(() => {
    const { title } = toastVariants({ size });
    return cn(title(), className);
  }, [size, className]);

  return (
    <Primitive.div
      className={mergedClassName}
      {...props}
    >
      {children}
    </Primitive.div>
  );
}
