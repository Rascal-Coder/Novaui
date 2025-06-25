import type { ReactNode } from 'react';

export type AlertColor = 'primary' | 'success' | 'info' | 'warning' | 'error';
export type ToastSeverity = AlertColor;
export type ToastColor = AlertColor;
export type ToastVariant = 'filled' | 'standard';
export type ToastTypes = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'loading';

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type PromiseExternalToast = Omit<ExternalToast, 'description'>;

export type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string;
  success?: string | ((data: ToastData) => string);
  error?: string | ((error: any) => string);
  description?: string | ReactNode | ((data: any) => ReactNode | string);
  finally?: () => void | Promise<void>;
};

export type SonnerToastAction = {
  label: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type SonnerToastT = {
  id: number | string;
  title?: string;
  severity?: ToastSeverity;
  color?: ToastColor;
  variant?: ToastVariant;
  type?: ToastTypes;
  icon?: ReactNode;
  hideIcon?: boolean;
  closeButton?: boolean;
  dismissible?: boolean;
  description?: ReactNode;
  duration?: number;
  delete?: boolean;
  important?: boolean;
  action?: SonnerToastAction;
  onDismiss?: (toast: SonnerToastT) => void;
  onAutoClose?: (toast: SonnerToastT) => void;
  promise?: PromiseT;
  position?: ToastPosition;
};

export type ToasterProps = {
  position?: ToastPosition;
  hotkey?: string[];
  expand?: boolean;
  duration?: number;
  gap?: number;
  visibleToasts?: number;
  toastOptions?: ToastOptions;
  offset?: string | number;
  dir?: 'rtl' | 'ltr' | 'auto';
  containerAriaLabel?: string;
};

export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export interface HeightT {
  height: number;
  toastId: number | string;
  position: ToastPosition;
}

type VariantOptions = {
  icon: ReactNode;
};

export type ToastOptions = {
  [key in ToastTypes]?: VariantOptions;
} & {
  duration?: number;
  closeButton?: boolean;
  closeIcon?: ReactNode;
};

export enum SwipeStateTypes {
  SwipedOut = 'SwipedOut',
  SwipedBack = 'SwipedBack',
  NotSwiped = 'NotSwiped'
}

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<SonnerToastT, 'id' | 'type' | 'title' | 'delete' | 'promise'> & {
  id?: number | string;
};
