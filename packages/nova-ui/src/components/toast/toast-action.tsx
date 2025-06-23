import { Slot } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import { NButton } from '../button';

import type { ToastActionProps } from './types';

export default function ToastAction({
  className,
  altText: _altText,
  size = 'sm',
  children,
  ...props
}: ToastActionProps) {
  const mergedClassName = useMemo(() => {
    const { action } = toastVariants();
    return cn(action(), className);
  }, [className]);

  return (
    <Slot className={mergedClassName}>
      <NButton
        size={size}
        {...props}
      >
        {children}
      </NButton>
    </Slot>
  );
}
