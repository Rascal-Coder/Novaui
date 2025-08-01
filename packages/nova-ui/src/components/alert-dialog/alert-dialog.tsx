/* eslint-disable complexity */
import { AlertDialogPortal, AlertDialogRoot, AlertDialogTrigger } from '@novaui/primitives';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react';
import React, { useMemo } from 'react';

import AlertDialogContent from './alert-dialog-content';
import AlertDialogDescription from './alert-dialog-description';
import AlertDialogFooter from './alert-dialog-footer';
import AlertDialogHeader from './alert-dialog-header';
import AlertDialogOverlay from './alert-dialog-overlay';
import AlertDialogTitle from './alert-dialog-title';
import type { AlertDialogProps, AlertType } from './types';

// 图标映射
const iconRecord: Record<AlertType, { icon: React.ComponentType<any>; className: string }> = {
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

interface AlertDialogComponentProps extends AlertDialogProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AlertDialog({
  children,
  trigger,
  footer,
  className,
  ui,
  type,
  size = 'md',
  title,
  description,
  to = 'body',
  forceMountPortal = false,
  forceMountOverlay = false,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: AlertDialogComponentProps) {
  const iconProps = useMemo(() => {
    if (!type) {
      return null;
    }
    return iconRecord[type];
  }, [type]);

  return (
    <AlertDialogRoot
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogPortal
        container={typeof to === 'string' ? document.querySelector(to) : to}
        forceMount={forceMountPortal}
      >
        <AlertDialogOverlay
          className={ui?.overlay}
          forceMount={forceMountOverlay}
        />
        <AlertDialogContent
          className={className || ui?.content || undefined}
          size={size}
        >
          <AlertDialogHeader
            className={ui?.header || undefined}
            size={size}
          >
            <AlertDialogTitle
              className={ui?.title || undefined}
              size={size}
            >
              {iconProps && <iconProps.icon className={iconProps.className} />}
              {title}
            </AlertDialogTitle>
            {description && (
              <AlertDialogDescription
                className={ui?.description || undefined}
                size={size}
              >
                {description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          {children}
          {footer && (
            <AlertDialogFooter
              className={ui?.footer || undefined}
              size={size}
            >
              {footer}
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  );
}
