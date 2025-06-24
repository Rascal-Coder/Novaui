import { ToastAction as PrimitiveToastAction } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import { NButton } from '../button';

import type { ToastActionProps } from './types';

export default function ToastAction({ className, altText, size = 'sm', children, ...props }: ToastActionProps) {
  const mergedClassName = useMemo(() => {
    const { action } = toastVariants();
    return cn(action(), className);
  }, [className]);

  return (
    <PrimitiveToastAction
      asChild
      altText={altText}
      className={mergedClassName}
    >
      <NButton
        {...props}
        size={size}
      >
        {children}
      </NButton>
    </PrimitiveToastAction>
  );
}
