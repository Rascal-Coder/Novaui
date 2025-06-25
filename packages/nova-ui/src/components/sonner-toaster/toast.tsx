/* eslint-disable complexity */
import { AlertCircle, CheckCircle, Info, Loader2, TriangleAlert, XCircle } from 'lucide-react';
import type { CSSProperties, Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Alert } from '../alert';

import { GAP, SWIPE_THRESHOLD, TIME_BEFORE_UNMOUNT, TOAST_LIFETIME } from './constants';
import AlertAction from './toast-action';
import type { HeightT, SonnerToastT, ToastOptions, ToastPosition, ToastSeverity, ToastVariant } from './types';

interface ToastProps {
  toast: SonnerToastT;
  toasts: SonnerToastT[];
  index: number;
  expanded: boolean;
  heights: HeightT[];
  setHeights: Dispatch<SetStateAction<HeightT[]>>;
  removeToast: (toast: SonnerToastT) => void;
  gap?: number;
  position: ToastPosition;
  visibleToasts: number;
  expandByDefault: boolean;
  interacting: boolean;
  duration?: number;
  closeButtonAriaLabel?: string;
  severity?: ToastSeverity;
  variant?: ToastVariant;
  toastDefaults?: ToastOptions;
}

export const Toast = ({
  toast,
  interacting,
  setHeights,
  visibleToasts,
  heights,
  index,
  toasts,
  expanded,
  removeToast,
  duration: durationFromToaster,
  position,
  gap = GAP,
  expandByDefault,
  closeButtonAriaLabel = 'Close toast',
  severity = 'primary',
  variant = 'filled',
  toastDefaults
}: ToastProps) => {
  const [mounted, setMounted] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [swipeOut, setSwipeOut] = useState(false);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const dragStartTime = useRef<Date | null>(null);
  const toastRef = useRef<HTMLLIElement>(null);
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const SonnerToastType = toast.type;
  const dismissible = toast.dismissible !== false;
  // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
  const heightIndex = useMemo(() => heights.findIndex(height => height.toastId === toast.id) || 0, [heights, toast.id]);

  const duration = useMemo(
    () => toast.duration || durationFromToaster || TOAST_LIFETIME,
    [toast.duration, durationFromToaster]
  );
  const closeTimerStartTimeRef = useRef(0);
  const offset = useRef(0);
  const lastCloseTimerStartTimeRef = useRef(0);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [y, x] = position.split('-');
  const toastsHeightBefore = useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev;
      }

      return prev + curr.height;
    }, 0);
  }, [heights, heightIndex]);
  const disabled = SonnerToastType === 'loading';

  offset.current = useMemo(() => heightIndex * gap + toastsHeightBefore, [heightIndex, toastsHeightBefore]);

  useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const toastNode = toastRef.current;
    if (toastNode) {
      // 直接获取当前高度，避免样式重置导致的抖动
      const newHeight = toastNode.getBoundingClientRect().height;

      setInitialHeight(newHeight);

      setHeights(prevheights => {
        const alreadyExists = prevheights.find(height => height.toastId === toast.id);
        if (!alreadyExists) {
          return [
            {
              toastId: toast.id,
              height: newHeight,
              position: toast.position
            } as HeightT,
            ...prevheights
          ];
        }
        return prevheights.map(height => (height.toastId === toast.id ? { ...height, height: newHeight } : height));
      });

      // 清理函数
      return () => setHeights(h => h.filter(item => item.toastId !== toast.id));
    }
  }, [mounted, toast.title, toast.description, setHeights, toast.id]);

  const deleteToast = useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    setHeights(h => h.filter(height => height.toastId !== toast.id));

    setTimeout(() => {
      removeToast(toast);
    }, TIME_BEFORE_UNMOUNT);
  }, [toast, removeToast, setHeights, offset]);

  useEffect(() => {
    if ((toast.promise && SonnerToastType === 'loading') || toast.duration === Infinity || toast.type === 'loading')
      return;
    let timeoutId: ReturnType<typeof setTimeout>;
    let remainingTime = duration;
    // Pause the timer on each hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        // Get the elapsed time since the timer started
        const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;

        remainingTime -= elapsedTime;
      }

      lastCloseTimerStartTimeRef.current = new Date().getTime();
    };

    const startTimer = () => {
      closeTimerStartTimeRef.current = new Date().getTime();

      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        toast.onAutoClose?.(toast);
        deleteToast();
      }, remainingTime);
    };

    if (expanded || interacting) {
      pauseTimer();
    } else {
      startTimer();
    }

    return () => clearTimeout(timeoutId);
  }, [expanded, interacting, expandByDefault, toast, duration, deleteToast, toast.promise, SonnerToastType]);

  useEffect(() => {
    if (toast.delete) {
      deleteToast();
    }
  }, [deleteToast, toast.delete]);

  // Default icons for each severity type
  const defaultIcons = {
    primary: <AlertCircle />,
    success: <CheckCircle />,
    warning: <TriangleAlert />,
    error: <XCircle />,
    info: <Info />,
    loading: <Loader2 className="animate-spin" />
  } as const;

  const getDefaultIcon = (severityType: ToastSeverity) => {
    return defaultIcons[severityType] || defaultIcons.primary;
  };

  const selectedIcon =
    toast.type === 'loading'
      ? toastDefaults?.loading?.icon || defaultIcons.loading
      : toast.icon || toastDefaults?.[severity]?.icon || getDefaultIcon(severity);

  // Map severity to color that matches your Alert component
  const severityToColorMap = {
    primary: 'primary',
    success: 'success',
    warning: 'warning',
    error: 'destructive',
    info: 'info'
  } as const;

  const alertColor = severityToColorMap[severity] || 'info';

  // Map variant to match your Alert component - use solid/outline based on expanded state
  const alertVariant = (isFront || expanded) && variant === 'filled' ? 'solid' : 'outline';

  return (
    <li
      aria-atomic="true"
      aria-live={toast.important ? 'assertive' : 'polite'}
      data-dismissible={dismissible}
      data-expanded={Boolean(expanded || (expandByDefault && mounted))}
      data-front={isFront}
      data-index={index}
      data-mounted={mounted}
      data-promise={Boolean(toast.promise)}
      data-removed={removed}
      data-sonner-toast=""
      data-styled={true}
      data-swipe-out={swipeOut}
      data-swiping={swiping}
      data-visible={isVisible}
      data-x-position={x}
      data-y-position={y}
      ref={toastRef}
      role="status"
      tabIndex={0}
      style={
        {
          '--index': index,
          '--toasts-before': index,
          '--z-index': toasts.length - index,
          '--offset': `${removed ? offsetBeforeRemove : offset.current}px`,
          '--initial-height': expandByDefault ? 'auto' : `${initialHeight}px`
        } as CSSProperties
      }
      onPointerDown={event => {
        if (disabled || !dismissible) return;
        dragStartTime.current = new Date();
        setOffsetBeforeRemove(offset.current);
        // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        if ((event.target as HTMLElement).tagName === 'BUTTON') return;
        setSwiping(true);
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerMove={event => {
        if (!pointerStartRef.current || !dismissible) return;

        const yPosition = event.clientY - pointerStartRef.current.y;
        const xPosition = event.clientX - pointerStartRef.current.x;

        const clamp = y === 'top' ? Math.min : Math.max;
        const clampedY = clamp(0, yPosition);
        const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2;
        const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;

        if (isAllowedToSwipe) {
          toastRef.current?.style.setProperty('--swipe-amount', `${yPosition}px`);
        } else if (Math.abs(xPosition) > swipeStartThreshold) {
          // User is swiping in wrong direction so we disable swipe gesture
          // for the current pointer down interaction
          pointerStartRef.current = null;
        }
      }}
      onPointerUp={() => {
        if (swipeOut || !dismissible) return;

        pointerStartRef.current = null;
        const swipeAmount = Number(toastRef.current?.style.getPropertyValue('--swipe-amount').replace('px', '') || 0);
        const timeTaken = dragStartTime.current ? new Date().getTime() - dragStartTime.current.getTime() : 0;
        const velocity = Math.abs(swipeAmount) / timeTaken;

        // Remove only if threshold is met
        if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
          setOffsetBeforeRemove(offset.current);
          toast.onDismiss?.(toast);
          deleteToast();
          setSwipeOut(true);
          return;
        }

        toastRef.current?.style.setProperty('--swipe-amount', '0px');
        setSwiping(false);
      }}
    >
      <Alert.Root
        className="w-full items-center"
        color={alertColor}
        variant={alertVariant}
      >
        {/* Leading slot - Icon */}
        {!toast.hideIcon && <div className="flex shrink-0 items-center">{selectedIcon}</div>}

        {/* Content wrapper */}
        <Alert.Wrapper className="min-w-0 flex-1">
          {toast.title && <Alert.Title>{toast.title}</Alert.Title>}

          {toast.description && (
            <Alert.Description>
              {typeof toast.description === 'string' ? toast.description : toast.description}
            </Alert.Description>
          )}
        </Alert.Wrapper>

        {/* Trailing slot - Actions */}
        <AlertAction
          closeButtonAriaLabel={closeButtonAriaLabel}
          closeIcon={toastDefaults?.closeIcon}
          deleteToast={deleteToast}
          toast={toast}
        />
      </Alert.Root>
    </li>
  );
};
