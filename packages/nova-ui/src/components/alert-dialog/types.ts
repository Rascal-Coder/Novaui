import type {
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps as AlertDialogRootProps,
  AlertDialogContentProps as _AlertDialogContentProps,
  AlertDialogDescriptionProps as _AlertDialogDescriptionProps,
  AlertDialogTitleProps as _AlertDialogTitleProps
} from '@novaui/primitives';
import type { DialogSlots, ThemeColor, ThemeSize } from '@novaui/variants';

// 定义本地类型
export type ClassValue = string;

export interface ClassValueProp {
  className?: string;
}

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface AlertDialogHeaderProps extends ClassValueProp {
  size?: ThemeSize;
}

export type AlertDialogContentProps = _AlertDialogContentProps & {
  size?: ThemeSize;
};

export type AlertDialogTitleProps = _AlertDialogTitleProps & {
  size?: ThemeSize;
};

export type AlertDialogDescriptionProps = _AlertDialogDescriptionProps & {
  size?: ThemeSize;
};

export interface AlertDialogFooterProps extends ClassValueProp {
  size?: ThemeSize;
}

export type AlertDialogUi = Partial<Record<DialogSlots, ClassValue>>;

export type AlertDialogProps = AlertDialogRootProps &
  AlertDialogContentProps &
  Pick<AlertDialogPortalProps, never> & {
    ui?: AlertDialogUi;
    type?: AlertType;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountOverlay?: boolean;
    title?: string;
    description?: string;
    to?: string | HTMLElement;
    defer?: boolean;
  };

export type { AlertDialogRootProps, AlertDialogPortalProps, AlertDialogOverlayProps };
