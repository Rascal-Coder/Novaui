import { Toast as PrimitiveToast } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { ToastRootProps } from './types';

export default function ToastRoot({
  className,
  size,
  iconType: _iconType,
  richColor,
  children,
  open,
  onOpenChange,
  duration,
  type = 'foreground',
  ...props
}: ToastRootProps) {
  const mergedClassName = useMemo(() => {
    const { root } = toastVariants({ size, richColor });
    return cn(root(), className);
  }, [size, richColor, className]);

  return (
    <PrimitiveToast
      className={mergedClassName}
      duration={duration}
      open={open}
      type={type}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </PrimitiveToast>
  );
}
