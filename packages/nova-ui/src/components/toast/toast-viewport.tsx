import { ToastViewport as PrimitiveToastViewport } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { useMemo } from 'react';

import type { ToastViewportProps } from './types';

export default function ToastViewport({ className, size, hotkey, label, ...props }: ToastViewportProps) {
  const mergedClassName = useMemo(() => {
    const { viewport } = toastVariants({ size });
    return cn(viewport(), className);
  }, [size, className]);

  return (
    <PrimitiveToastViewport
      className={mergedClassName}
      hotkey={hotkey}
      label={label}
      {...props}
    />
  );
}
