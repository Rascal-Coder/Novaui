import { ToastProvider as PrimitiveToastProvider } from '@novaui/primitives';

import { ToastContextProvider } from './context';
import Toast from './toast';
import type { ToastProviderProps } from './types';

export default function ToastProvider({
  children,
  ui,
  toastLimit = 1,
  toastRemoveDelay = 1000 * 1000,
  label = '通知',
  duration = 5000,
  swipeDirection = 'right',
  swipeThreshold = 50
}: ToastProviderProps) {
  return (
    <ToastContextProvider
      toastLimit={toastLimit}
      toastRemoveDelay={toastRemoveDelay}
    >
      <PrimitiveToastProvider
        duration={duration}
        label={label}
        swipeDirection={swipeDirection}
        swipeThreshold={swipeThreshold}
      >
        <Toast ui={ui} />
        {children}
      </PrimitiveToastProvider>
    </ToastContextProvider>
  );
}
