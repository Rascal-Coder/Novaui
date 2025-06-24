import { ToastTitle as PrimitiveToastTitle } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { ToastTitleProps } from './types';

export default function ToastTitle({
  className,
  size,
  children,
  titleLeading,
  titleTrailing,
  ...props
}: ToastTitleProps) {
  const mergedClassName = useMemo(() => {
    const { title } = toastVariants({ size });
    return cn(title(), className);
  }, [size, className]);

  return (
    <PrimitiveToastTitle
      className={mergedClassName}
      {...props}
    >
      {titleLeading}
      {children}
      {titleTrailing}
    </PrimitiveToastTitle>
  );
}
