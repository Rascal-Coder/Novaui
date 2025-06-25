import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { NButton, NButtonIcon } from '../button';

import type { SonnerToastAction, SonnerToastT } from './types';

interface ActionButtonProps {
  action: SonnerToastAction;
  deleteToast: () => void;
}
const ActionButton = ({ action, deleteToast }: ActionButtonProps) => {
  return (
    <NButton
      color="primary"
      size="sm"
      variant="outline"
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

const CloseButton = ({
  closeButtonAriaLabel,
  deleteToast,
  closeIcon
}: {
  deleteToast: () => void;
  closeIcon: ReactNode;
  closeButtonAriaLabel?: string;
}) => {
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
}

const AlertAction = ({ toast, deleteToast, closeIcon, closeButtonAriaLabel }: AlertActionProps) => {
  if (toast.action && toast.closeButton) {
    return (
      <div className="flex items-center gap-2">
        <ActionButton
          action={toast.action}
          deleteToast={deleteToast}
        />
        <CloseButton
          closeButtonAriaLabel={closeButtonAriaLabel}
          closeIcon={closeIcon}
          deleteToast={deleteToast}
        />
      </div>
    );
  } else if (toast.action) {
    return (
      <ActionButton
        action={toast.action}
        deleteToast={deleteToast}
      />
    );
  } else if (toast.closeButton) {
    return (
      <CloseButton
        closeButtonAriaLabel={closeButtonAriaLabel}
        closeIcon={closeIcon}
        deleteToast={deleteToast}
      />
    );
  }
  return undefined;
};

export default AlertAction;
