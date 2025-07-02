import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { NButton, NButtonIcon } from '../button';

import type { ActionButtonProps, CloseButtonProps, SonnerToastT, ToastOptions } from './types';

// 默认的 ActionButton 组件
const DefaultActionButton = ({ action, deleteToast }: ActionButtonProps) => {
  return (
    <NButton
      color="accent"
      size="sm"
      variant="solid"
      onClick={event => {
        action?.onClick(event);
        if (event.defaultPrevented) return;
        deleteToast();
      }}
    >
      {action.label}
    </NButton>
  );
};

// 默认的 CloseButton 组件
const DefaultCloseButton = ({ closeButtonAriaLabel, deleteToast, closeIcon }: CloseButtonProps) => {
  return (
    <NButtonIcon
      aria-label={closeButtonAriaLabel}
      className="h-8 w-8 shrink-0"
      size="sm"
      variant="ghost"
      onClick={() => {
        deleteToast();
      }}
    >
      {closeIcon || <X size={16} />}
    </NButtonIcon>
  );
};

interface AlertActionProps {
  toast: SonnerToastT;
  deleteToast: () => void;
  closeIcon: ReactNode;
  closeButtonAriaLabel?: string;
  toastDefaults?: ToastOptions;
}

const AlertAction = ({ toast, deleteToast, closeIcon, closeButtonAriaLabel, toastDefaults }: AlertActionProps) => {
  // 获取自定义组件或使用默认组件 (优先使用 toast 上的，然后是 toastDefaults)
  const ActionButtonComponent =
    (toast as any).customActionButton || toastDefaults?.customActionButton || DefaultActionButton;
  const CloseButtonComponent =
    (toast as any).customCloseButton || toastDefaults?.customCloseButton || DefaultCloseButton;

  if (toast.action && toast.closeButton) {
    return (
      <div className="flex items-center gap-2">
        <ActionButtonComponent
          action={toast.action}
          deleteToast={deleteToast}
        />
        <CloseButtonComponent
          closeButtonAriaLabel={closeButtonAriaLabel}
          closeIcon={closeIcon}
          deleteToast={deleteToast}
        />
      </div>
    );
  } else if (toast.action) {
    return (
      <ActionButtonComponent
        action={toast.action}
        deleteToast={deleteToast}
      />
    );
  } else if (toast.closeButton) {
    return (
      <CloseButtonComponent
        closeButtonAriaLabel={closeButtonAriaLabel}
        closeIcon={closeIcon}
        deleteToast={deleteToast}
      />
    );
  }
  return undefined;
};

export default AlertAction;
