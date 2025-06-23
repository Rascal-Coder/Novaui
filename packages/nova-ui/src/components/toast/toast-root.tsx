import { Primitive } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import { ToastCloseContext } from './toast-close';
import type { ToastRootProps } from './types';

export default function ToastRoot({
  className,
  size,
  iconType: _iconType,
  richColor,
  children,
  open,
  onOpenChange,
  ...props
}: ToastRootProps) {
  const mergedClassName = useMemo(() => {
    const { root } = toastVariants({ size, richColor });
    return cn(root(), className);
  }, [size, richColor, className]);

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <ToastCloseContext.Provider value={handleClose}>
      <Primitive.div
        className={mergedClassName}
        data-state={open ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </Primitive.div>
    </ToastCloseContext.Provider>
  );
}
