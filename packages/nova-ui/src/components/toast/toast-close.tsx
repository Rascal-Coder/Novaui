import { ToastClose as PrimitiveToastClose } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { X } from 'lucide-react';
import React, { useMemo } from 'react';

import { NButton } from '../button';

import type { ToastCloseProps } from './types';

export default function ToastClose({ className, size, children, ...props }: ToastCloseProps) {
  const mergedClassName = useMemo(() => {
    const { close } = toastVariants({ size });
    return cn(close(), className);
  }, [size, className]);

  return (
    <PrimitiveToastClose
      className={mergedClassName}
      {...props}
      asChild
    >
      {children || (
        <NButton fitContent>
          <X />
        </NButton>
      )}
    </PrimitiveToastClose>
  );
}

// Context is no longer needed as primitives handle this internally
// eslint-disable-next-line react-refresh/only-export-components
export const ToastCloseContext = React.createContext<(() => void) | null>(null);
