import type { ThemeColor, ThemeSize, ToastSlots } from '@novaui/variants';
import type { ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { ButtonProps } from '../button';

export type ToastUi = Partial<Record<ToastSlots, ClassValue>>;

export interface ToastProviderProps {
  ui?: ToastUi;
  /**
   * The maximum number of toasts that can be displayed at the same time.
   *
   * @defaultValue 1
   */
  toastLimit?: number;
  /**
   * The delay time before removing the toast.
   *
   * @defaultValue 1000 * 1000 (ms)
   */
  toastRemoveDelay?: number;
  children?: ReactNode;
}

export type ToastIconType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface ToastViewportProps extends ComponentPropsWithoutRef<'div'> {
  size?: ThemeSize;
  hotkey?: string;
  label?: string;
}

export interface ToastRootProps extends ComponentPropsWithoutRef<'div'> {
  size?: ThemeSize;
  iconType?: ToastIconType;
  richColor?: ThemeColor;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastTitleProps extends ComponentPropsWithoutRef<'div'> {
  size?: ThemeSize;
}

export interface ToastDescriptionProps extends ComponentPropsWithoutRef<'div'> {}

export interface ToastCloseProps extends ComponentPropsWithoutRef<'button'> {
  size?: ThemeSize;
}

export interface ToastActionProps extends ButtonProps {
  altText: string;
}

export interface ToastProps {
  className?: string;
  size?: ThemeSize;
  ui?: ToastUi;
}

export interface ToastState extends Omit<ToastRootProps, 'className'> {
  id: string;
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export type ActionType = 'add' | 'update' | 'dismiss' | 'remove';

export type Action =
  | {
      type: 'add';
      toast: ToastState;
    }
  | {
      type: 'update';
      toast: Partial<ToastState>;
    }
  | {
      type: 'dismiss';
      toastId?: ToastState['id'];
    }
  | {
      type: 'remove';
      toastId?: ToastState['id'];
    };

export interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: ToastState) => void;
}

export interface UseToastReturn {
  toasts: ToastState[];
  toast: (props: Omit<ToastState, 'id'>) => ToastReturn;
  dismiss: (toastId?: string) => void;
}
