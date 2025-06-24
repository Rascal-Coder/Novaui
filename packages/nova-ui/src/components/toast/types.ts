import type { ThemeColor, ThemeSize, ToastSlots } from '@novaui/variants';
import type { ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { ButtonProps } from '../button';

export type ToastUi = Partial<Record<ToastSlots, ClassValue>>;

export interface ToastProviderProps {
  children?: ReactNode;
  /** UI customization for toast components */
  ui?: ToastUi;
  /**
   * Maximum number of toasts to display at once
   *
   * @defaultValue 1
   */
  toastLimit?: number;
  /**
   * Time in milliseconds to wait before removing a toast from DOM after it's dismissed
   *
   * @defaultValue 1000000
   */
  toastRemoveDelay?: number;
  /**
   * An author-localized label for each toast. Used to help screen reader users associate the interruption with a toast.
   *
   * @defaultValue 'Notification'
   */
  label?: string;
  /**
   * Time in milliseconds that each toast should remain visible for.
   *
   * @defaultValue 5000
   */
  duration?: number;
  /**
   * Direction of pointer swipe that should close the toast.
   *
   * @defaultValue 'right'
   */
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   *
   * @defaultValue 50
   */
  swipeThreshold?: number;
}

export type ToastIconType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface ToastViewportProps extends ComponentPropsWithoutRef<'ol'> {
  size?: ThemeSize;
  hotkey?: string[];
  label?: string;
}

export interface ToastRootProps extends Omit<ComponentPropsWithoutRef<'li'>, 'onPause' | 'onResume'> {
  size?: ThemeSize;
  iconType?: ToastIconType;
  richColor?: ThemeColor;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Time in milliseconds that toast should remain visible for. Overrides value given to `ToastProvider`. */
  duration?: number;
  /** Control the sensitivity of the toast for accessibility purposes. */
  type?: 'foreground' | 'background';
  onPause?: () => void;
  onResume?: () => void;
}

export interface ToastTitleProps extends ComponentPropsWithoutRef<'div'> {
  size?: ThemeSize;
  titleLeading?: ReactNode;
  titleTrailing?: ReactNode;
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
