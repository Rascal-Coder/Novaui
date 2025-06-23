import { Primitive } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { ToastDescriptionProps } from './types';

export default function ToastDescription({ className, children, ...props }: ToastDescriptionProps) {
  const mergedClassName = useMemo(() => {
    const { description } = toastVariants();
    return cn(description(), className);
  }, [className]);

  return (
    <Primitive.div
      className={mergedClassName}
      {...props}
    >
      {children}
    </Primitive.div>
  );
}
