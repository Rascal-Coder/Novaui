import { type ReactNode, createContext, useCallback, useContext, useReducer, useRef } from 'react';

import type { Action, ToastState, UseToastReturn } from './types';

interface ToastContextValue {
  toasts: ToastState[];
  toast: (props: Omit<ToastState, 'id'>) => { id: string; dismiss: () => void; update: (props: ToastState) => void };
  dismiss: (toastId?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
  toastLimit?: number;
  toastRemoveDelay?: number;
}

function toastReducer(state: ToastState[], action: Action): ToastState[] {
  switch (action.type) {
    case 'add':
      return [action.toast, ...state];
    case 'update':
      return state.map(t => (t.id === action.toast.id ? { ...t, ...action.toast } : t));
    case 'dismiss':
      return state.map(t =>
        t.id === action.toastId || action.toastId === undefined
          ? {
              ...t,
              open: false
            }
          : t
      );
    case 'remove':
      return action.toastId ? state.filter(t => t.id !== action.toastId) : [];
    default:
      return state;
  }
}

export function ToastContextProvider({ children, toastLimit = 5, toastRemoveDelay = 1000 }: ToastProviderProps) {
  const [toasts, dispatch] = useReducer(toastReducer, []);
  const toastTimeoutsRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const countRef = useRef(0);

  const genId = useCallback(() => {
    countRef.current = (countRef.current + 1) % Number.MAX_VALUE;
    return countRef.current.toString();
  }, []);

  const addToRemoveQueue = useCallback(
    (toastId: string) => {
      if (toastTimeoutsRef.current.has(toastId)) return;

      const timeout = setTimeout(() => {
        toastTimeoutsRef.current.delete(toastId);
        dispatch({
          type: 'remove',
          toastId
        });
      }, toastRemoveDelay);

      toastTimeoutsRef.current.set(toastId, timeout);
    },
    [toastRemoveDelay]
  );

  const toast = useCallback(
    (props: Omit<ToastState, 'id'>) => {
      const id = genId();

      const update = (updateProps: ToastState) =>
        dispatch({
          type: 'update',
          toast: { ...updateProps, id }
        });

      const dismiss = () => {
        dispatch({ type: 'dismiss', toastId: id });
        addToRemoveQueue(id);
      };

      dispatch({
        type: 'add',
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange(open: boolean) {
            if (!open) {
              dismiss();
            }
          }
        }
      });

      return {
        id,
        dismiss,
        update
      };
    },
    [genId, addToRemoveQueue]
  );

  const dismiss = useCallback(
    (toastId?: string) => {
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        toasts.forEach(item => addToRemoveQueue(item.id));
      }

      dispatch({ type: 'dismiss', toastId });
    },
    [toasts, addToRemoveQueue]
  );

  const value: ToastContextValue = {
    toasts: toasts.slice(0, toastLimit),
    toast,
    dismiss
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): UseToastReturn {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastContextProvider');
  }

  return {
    ...context,
    toasts: context.toasts.filter(toast => toast.open !== false)
  };
}
