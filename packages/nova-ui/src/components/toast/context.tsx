import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import type { Action, ToastState, UseToastReturn } from './types';

interface ToastContextValue {
  toasts: ToastState[];
  toastTimeouts: Map<string, ReturnType<typeof setTimeout>>;
  addToRemoveQueue: (toastId: string) => void;
  dispatch: (action: Action) => void;
  toast: (props: Omit<ToastState, 'id'>) => {
    id: string;
    dismiss: () => void;
    update: (props: ToastState) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({
  children,
  toastLimit = 1,
  toastRemoveDelay = 1000 * 1000
}: {
  children: React.ReactNode;
  toastLimit?: number;
  toastRemoveDelay?: number;
}) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const toastTimeouts = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const count = useRef(0);

  const genId = useCallback(() => {
    count.current = (count.current + 1) % Number.MAX_VALUE;
    return count.current.toString();
  }, []);

  const addToast = useCallback(
    (toastState: ToastState) => {
      setToasts(prev => [toastState, ...prev].slice(0, toastLimit));
    },
    [toastLimit]
  );

  const updateToast = useCallback((updateProps: Partial<ToastState>) => {
    setToasts(prev => prev.map(t => (t.id === updateProps.id ? { ...t, ...updateProps } : t)));
  }, []);

  const removeToast = useCallback((toastId?: string) => {
    if (toastId) {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    } else {
      setToasts([]);
    }
  }, []);

  const dispatchRef = useRef<((action: Action) => void) | null>(null);

  const addToRemoveQueue = useCallback(
    (toastId: string) => {
      if (toastTimeouts.current.has(toastId)) return;

      const timeout = setTimeout(() => {
        toastTimeouts.current.delete(toastId);
        if (dispatchRef.current) {
          dispatchRef.current({
            type: 'remove',
            toastId
          });
        }
      }, toastRemoveDelay);

      toastTimeouts.current.set(toastId, timeout);
    },
    [toastRemoveDelay]
  );

  const dismissToast = useCallback(
    (toastId?: string) => {
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        toasts.forEach(item => addToRemoveQueue(item.id));
      }

      setToasts(prev =>
        prev.map(t =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false
              }
            : t
        )
      );
    },
    [addToRemoveQueue, toasts]
  );

  const dispatch = useCallback(
    (action: Action) => {
      switch (action.type) {
        case 'add':
          addToast(action.toast);
          break;
        case 'update':
          updateToast(action.toast);
          break;
        case 'dismiss':
          dismissToast(action.toastId);
          break;
        case 'remove':
          removeToast(action.toastId);
          break;
        default:
      }
    },
    [addToast, updateToast, dismissToast, removeToast]
  );

  dispatchRef.current = dispatch;

  const toast = useCallback(
    (props: Omit<ToastState, 'id'>) => {
      const id = genId();

      const update = (updateProps: ToastState) =>
        dispatch({
          type: 'update',
          toast: { ...updateProps, id }
        });

      const dismiss = () => dispatch({ type: 'dismiss', toastId: id });

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
    [genId, dispatch]
  );

  const contextValue = useMemo<ToastContextValue>(
    () => ({
      toasts,
      toastTimeouts: toastTimeouts.current,
      addToRemoveQueue,
      dispatch,
      toast
    }),
    [toasts, addToRemoveQueue, dispatch, toast]
  );

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
}

export function useToast(): UseToastReturn {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { toasts, toast, dispatch } = context;

  return {
    toasts,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'dismiss', toastId })
  };
}
