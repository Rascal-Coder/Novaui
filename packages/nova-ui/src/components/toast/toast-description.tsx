import { ToastDescription as PrimitiveToastDescription } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { ToastDescriptionProps } from './types';

export default function ToastDescription({ className, children, ...props }: ToastDescriptionProps) {
  const mergedClassName = useMemo(() => {
    const { description } = toastVariants();
    return cn(description(), className);
  }, [className]);

  return (
    <PrimitiveToastDescription
      className={mergedClassName}
      {...props}
    >
      {children}
    </PrimitiveToastDescription>
  );
}
