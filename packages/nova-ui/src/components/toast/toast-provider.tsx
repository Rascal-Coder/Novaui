import { ToastProvider as ToastContextProvider } from './context';
import Toast from './toast';
import type { ToastProviderProps } from './types';

export default function ToastProvider({
  ui,
  toastLimit = 1,
  toastRemoveDelay = 1000 * 1000,
  children
}: ToastProviderProps) {
  return (
    <ToastContextProvider
      toastLimit={toastLimit}
      toastRemoveDelay={toastRemoveDelay}
    >
      <Toast ui={ui} />
      {children}
    </ToastContextProvider>
  );
}
