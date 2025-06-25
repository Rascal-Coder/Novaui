import { Slot } from '@novaui/primitives';
import { alertVariants, cn } from '@novaui/variants';
import { X } from 'lucide-react';
import { createContext, useContext, useMemo, useState } from 'react';

import NButtonIcon from '../button/button-icon';

import AlertDescription from './alert-description';
import AlertRoot from './alert-root';
import AlertTitle from './alert-title';
import AlertWrapper from './alert-wrapper';
import type { AlertProps, AlertUi } from './types';

// Create context for UI customization
const AlertUiContext = createContext<AlertUi | undefined>(undefined);

// Hook to use UI context
export const useAlertUi = () => useContext(AlertUiContext);

export default function Alert({
  className,
  color,
  variant,
  size,
  ui,
  title,
  description,
  closable,
  close: controlledClose,
  children,
  onClose,
  ...props
}: AlertProps &
  React.HTMLAttributes<HTMLDivElement> & {
    onClose?: () => void;
  }) {
  const [isOpen, setIsOpen] = useState(true);

  const mergedCls = useMemo(() => {
    const { icon, close } = alertVariants({ color, variant, size });
    return {
      icon: cn(icon(), ui?.icon),
      close: cn(close(), ui?.close)
    };
  }, [color, variant, size, ui]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // If controlled close prop is provided, use it
  const shouldShow = controlledClose !== undefined ? !controlledClose : isOpen;

  if (!shouldShow) {
    return null;
  }

  return (
    <AlertUiContext.Provider value={ui}>
      <AlertRoot
        className={className || ui?.root}
        color={color}
        size={size}
        variant={variant}
        {...props}
      >
        <Slot className={mergedCls.icon}>{/* Leading/Icon slot */}</Slot>

        <AlertWrapper
          className={ui?.wrapper}
          size={size}
        >
          {title && (
            <AlertTitle
              className={ui?.title}
              size={size}
            >
              {title}
            </AlertTitle>
          )}

          {description && (
            <AlertDescription
              className={ui?.description}
              size={size}
            >
              {description}
            </AlertDescription>
          )}

          {children}
        </AlertWrapper>

        {/* Trailing slot */}

        {closable && (
          <Slot className={mergedCls.close}>
            <NButtonIcon
              fitContent
              onClick={handleClose}
            >
              <X />
            </NButtonIcon>
          </Slot>
        )}
      </AlertRoot>
    </AlertUiContext.Provider>
  );
}

// Export subcomponents for flexible usage
Alert.Root = AlertRoot;
Alert.Wrapper = AlertWrapper;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
