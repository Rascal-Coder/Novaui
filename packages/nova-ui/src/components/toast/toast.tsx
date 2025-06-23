import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react';
import React, { isValidElement } from 'react';

import { useToast } from './context';
import ToastClose from './toast-close';
import ToastDescription from './toast-description';
import ToastRoot from './toast-root';
import ToastTitle from './toast-title';
import ToastViewport from './toast-viewport';
import type { ToastIconType, ToastProps } from './types';

const iconRecord: Record<
  ToastIconType,
  {
    icon: React.ComponentType<any>;
    className: string;
  }
> = {
  destructive: {
    icon: CircleX,
    className: 'text-destructive'
  },
  success: {
    icon: CircleCheck,
    className: 'text-success'
  },
  warning: {
    icon: CircleAlert,
    className: 'text-warning'
  },
  info: {
    icon: Info,
    className: 'text-info'
  }
};

export default function Toast({ className, size, ui }: ToastProps) {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map(toast => (
        <ToastRoot
          className={className || (ui?.root as string)}
          key={toast.id}
          {...toast}
          onOpenChange={toast.onOpenChange}
        >
          <div className="grid gap-1">
            {toast.title && (
              <ToastTitle
                className={ui?.title as string}
                size={size}
              >
                {toast.iconType &&
                  React.createElement(iconRecord[toast.iconType].icon, {
                    className: iconRecord[toast.iconType].className
                  })}
                {toast.title}
              </ToastTitle>
            )}
            {toast.description && (
              <ToastDescription className={ui?.description as string}>
                {isValidElement(toast.description) ? toast.description : toast.description}
              </ToastDescription>
            )}
            <ToastClose
              className={ui?.close as string}
              size={size}
            />
          </div>
          {toast.action && <div className={ui?.action as string}>{toast.action}</div>}
        </ToastRoot>
      ))}
      <ToastViewport />
    </>
  );
}
