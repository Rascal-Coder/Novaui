import { CircleAlert, CircleCheck, CircleX, Info, type LucideProps } from 'lucide-react';
import { type ReactNode, isValidElement } from 'react';

import { useToast } from './context';
import ToastAction from './toast-action';
import ToastClose from './toast-close';
import ToastDescription from './toast-description';
import ToastProvider from './toast-provider';
import ToastRoot from './toast-root';
import ToastTitle from './toast-title';
import ToastViewport from './toast-viewport';
import type { ToastIconType, ToastProps, ToastState } from './types';

// 导出组件
export { ToastProvider, ToastViewport, ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose };

const iconRecord: Record<ToastIconType, { icon: React.ComponentType<LucideProps>; class: string }> = {
  destructive: {
    icon: CircleX,
    class: 'text-destructive'
  },
  success: {
    icon: CircleCheck,
    class: 'text-success'
  },
  warning: {
    icon: CircleAlert,
    class: 'text-warning'
  },
  info: {
    icon: Info,
    class: 'text-info'
  }
};

export default function Toast({ className, size, ui }: ToastProps) {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map((toast: ToastState) => {
        const IconComponent = toast.iconType && toast.iconType in iconRecord ? iconRecord[toast.iconType].icon : null;
        const iconClass = toast.iconType && toast.iconType in iconRecord ? iconRecord[toast.iconType].class : '';

        // 提取不会与DOM属性冲突的props
        const { action, title, description, ...toastRootProps } = toast;

        return (
          <ToastRoot
            className={(className as string) || (ui?.root as string)}
            key={toast.id}
            {...toastRootProps}
            onOpenChange={toast.onOpenChange}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle
                  className={ui?.title as string}
                  size={size}
                  titleLeading={IconComponent && <IconComponent className={iconClass} />}
                >
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className={ui?.description as string}>
                  {isValidElement(description) ? description : (description as ReactNode)}
                </ToastDescription>
              )}
              <ToastClose
                className={ui?.close as string}
                size={size}
              />
            </div>
            {action && <div className={ui?.action as string}>{action}</div>}
          </ToastRoot>
        );
      })}
      <ToastViewport />
    </>
  );
}

// 组合组件，方便使用
Toast.Provider = ToastProvider;
Toast.Viewport = ToastViewport;
Toast.Root = ToastRoot;
Toast.Title = ToastTitle;
Toast.Description = ToastDescription;
Toast.Action = ToastAction;
Toast.Close = ToastClose;
