import { Slot } from '@novaui/primitives';
import { cn, toastVariants } from '@novaui/variants';
import { X } from 'lucide-react';
import React, { createContext, useContext, useMemo } from 'react';

import { NButtonIcon } from '../button';

import type { ToastCloseProps } from './types';

// 创建一个context来传递close函数
export const ToastCloseContext = createContext<(() => void) | null>(null);

export default function ToastClose({ className, size, children, onClick }: ToastCloseProps) {
  const mergedClassName = useMemo(() => {
    const { close } = toastVariants({ size });
    return cn(close(), className);
  }, [size, className]);

  const contextClose = useContext(ToastCloseContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else if (contextClose) {
      contextClose();
    }
  };

  return (
    <Slot className={mergedClassName}>
      <NButtonIcon
        fitContent
        onClick={handleClick}
      >
        {children || <X />}
      </NButtonIcon>
    </Slot>
  );
}
