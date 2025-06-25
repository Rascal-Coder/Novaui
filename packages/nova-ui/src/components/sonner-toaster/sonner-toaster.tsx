import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { GAP, TOAST_WIDTH, VIEWPORT_OFFSET, VISIBLE_TOASTS_AMOUNT } from './constants';
import { ToastState } from './state';
import { Toast } from './toast';
import type { HeightT, SonnerToastT, ToastPosition, ToastToDismiss, ToasterProps } from './types';
import './style.css';

function getDocumentDirection(): ToasterProps['dir'] {
  if (typeof window === 'undefined') return 'ltr';
  if (typeof document === 'undefined') return 'ltr'; // For Fresh purpose

  const dirAttribute = document.documentElement.getAttribute('dir');

  if (dirAttribute === 'auto' || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction as ToasterProps['dir'];
  }

  return dirAttribute as ToasterProps['dir'];
}

export const SonnerToaster = ({
  position = 'bottom-right',
  hotkey = ['altKey', 'KeyT'],
  expand = false,
  offset,
  duration,
  visibleToasts = VISIBLE_TOASTS_AMOUNT,
  toastOptions,
  dir = getDocumentDirection(),
  gap,
  containerAriaLabel = 'Notifications'
}: ToasterProps) => {
  const [toasts, setToasts] = useState<SonnerToastT[]>([]);

  // Changed
  const possiblePositions = useMemo(() => {
    return Array.from(
      new Set(
        [position].concat(toasts.map(toast => toast.position).filter((pos): pos is ToastPosition => pos !== undefined))
      )
    );
  }, [toasts, position]);

  const [heights, setHeights] = useState<HeightT[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [interacting, setInteracting] = useState(false);

  const listRef = useRef<HTMLOListElement>(null);
  const hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');

  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const isFocusWithinRef = useRef(false);

  const removeToast = useCallback(
    (toast: SonnerToastT) => setToasts(prevToasts => prevToasts.filter(({ id }) => id !== toast.id)),
    []
  );

  useEffect(() => {
    return ToastState.subscribe(toast => {
      if ((toast as ToastToDismiss).dismiss) {
        setToasts(prevToasts => prevToasts.map(t => (t.id === toast.id ? { ...t, delete: true } : t)));
        return;
      }

      // Prevent batching, temp solution.
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setToasts(prevToasts => {
            const indexOfExistingToast = prevToasts.findIndex(t => t.id === toast.id);

            // Update the toast if it already exists
            if (indexOfExistingToast !== -1) {
              return [
                ...prevToasts.slice(0, indexOfExistingToast),
                { ...prevToasts[indexOfExistingToast], ...toast },
                ...prevToasts.slice(indexOfExistingToast + 1)
              ] as SonnerToastT[];
            }

            return [toast, ...prevToasts] as SonnerToastT[];
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    // Ensure expanded is always false when no toasts are present / only one left
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [toasts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkeyPressed = hotkey.every(key => (event as any)[key] || event.code === key);

      if (isHotkeyPressed) {
        setExpanded(true);
        listRef.current?.focus();
      }

      if (
        event.code === 'Escape' &&
        (document.activeElement === listRef.current || listRef.current?.contains(document.activeElement))
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hotkey]);

  useEffect(() => {
    if (listRef.current) {
      return () => {
        if (lastFocusedElementRef.current) {
          lastFocusedElementRef.current.focus({ preventScroll: true });
          lastFocusedElementRef.current = null;
          isFocusWithinRef.current = false;
        }
      };
    }
  }, [listRef.current]);

  if (!toasts.length) return null;

  return (
    // Remove item from normal navigation flow, only available via hotkey
    <section
      aria-label={`${containerAriaLabel} ${hotkeyLabel}`}
      tabIndex={-1}
    >
      {possiblePositions.map((toastPosition, positionIndex) => {
        const [y, x] = toastPosition.split('-');
        return (
          <ol
            data-sonner-toaster
            data-x-position={x}
            data-y-position={y}
            dir={dir === 'auto' ? getDocumentDirection() : dir}
            key={toastPosition}
            ref={listRef}
            tabIndex={-1}
            style={
              {
                '--nova-front-sonner-toast-height': `${heights[0]?.height}px`,
                '--nova-sonner-toast-offset': typeof offset === 'number' ? `${offset}px` : offset || VIEWPORT_OFFSET,
                '--nova-sonner-toast-width': `${TOAST_WIDTH}px`,
                '--nova-sonner-toast-gap': `${GAP}px`
              } as CSSProperties
            }
            onMouseEnter={() => setExpanded(true)}
            onMouseMove={() => setExpanded(true)}
            onPointerUp={() => setInteracting(false)}
            onBlur={event => {
              if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
                isFocusWithinRef.current = false;
                if (lastFocusedElementRef.current) {
                  lastFocusedElementRef.current.focus({ preventScroll: true });
                  lastFocusedElementRef.current = null;
                }
              }
            }}
            onFocus={event => {
              const isNotDismissible =
                event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';

              if (isNotDismissible) return;

              if (!isFocusWithinRef.current) {
                isFocusWithinRef.current = true;
                lastFocusedElementRef.current = event.relatedTarget as HTMLElement;
              }
            }}
            onMouseLeave={() => {
              // Avoid setting expanded to false when interacting with a toast, e.g. swiping
              if (!interacting) {
                setExpanded(false);
              }
            }}
            onPointerDown={event => {
              const isNotDismissible =
                event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';

              if (isNotDismissible) return;
              setInteracting(true);
            }}
          >
            {toasts
              .filter(toast => (!toast.position && positionIndex === 0) || toast.position === toastPosition)
              .map((toast, toastIndex) => (
                <Toast
                  duration={toastOptions?.duration ?? duration}
                  expandByDefault={expand}
                  expanded={expanded}
                  gap={gap}
                  index={toastIndex}
                  interacting={interacting}
                  key={toast.id}
                  position={toastPosition}
                  removeToast={removeToast}
                  setHeights={setHeights}
                  severity={toast.severity}
                  toast={toast}
                  toastDefaults={toastOptions}
                  variant={toast.variant}
                  visibleToasts={visibleToasts}
                  heights={heights.filter(
                    h => (!h.position && toastPosition === position) || h.position === toastPosition
                  )}
                  toasts={toasts.filter(
                    t => (!t.position && toastPosition === position) || t.position === toastPosition
                  )}
                />
              ))}
          </ol>
        );
      })}
    </section>
  );
};
