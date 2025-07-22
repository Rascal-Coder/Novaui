/* eslint-disable @typescript-eslint/no-use-before-define */
import { hideOthers } from 'aria-hidden';
import * as React from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import type { Scope } from '../../context';
import { createContextScope } from '../../context';
import { FocusScope, Presence, composeEventHandlers, useControllableState, useFocusGuards, useId } from '../../shared';
import { useComposedRefs } from '../compose-refs';
import { DismissableLayer } from '../dismissable-layer';
import * as PopperPrimitive from '../popper';
import { createPopperScope } from '../popper';
import { Portal as PortalPrimitive } from '../portal';
import { Primitive } from '../primitive';
import { createSlot } from '../slot';

/* -------------------------------------------------------------------------------------------------
 * Popover
 * ----------------------------------------------------------------------------------------------- */

const POPOVER_NAME = 'Popover';

type ScopedProps<P> = P & { __scopePopover?: Scope };
const [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [createPopperScope]);
const usePopperScope = createPopperScope();

type PopoverContextValue = {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  hasCustomAnchor: boolean;
  onCustomAnchorAdd(): void;
  onCustomAnchorRemove(): void;
  modal: boolean;
};

const [PopoverProvider, usePopoverContext] = createPopoverContext<PopoverContextValue>(POPOVER_NAME);

interface PopoverProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

const Popover: React.FC<PopoverProps> = (props: ScopedProps<PopoverProps>) => {
  const { __scopePopover, children, open: openProp, defaultOpen, onOpenChange, modal = false } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React.useState(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange
  });

  return (
    <PopperPrimitive.PopperRoot {...popperScope}>
      <PopoverProvider
        contentId={useId()}
        hasCustomAnchor={hasCustomAnchor}
        modal={modal}
        open={open}
        scope={__scopePopover}
        triggerRef={triggerRef}
        onCustomAnchorAdd={React.useCallback(() => setHasCustomAnchor(true), [])}
        onCustomAnchorRemove={React.useCallback(() => setHasCustomAnchor(false), [])}
        onOpenChange={setOpen}
        onOpenToggle={React.useCallback(() => setOpen(prevOpen => !prevOpen), [setOpen])}
      >
        {children}
      </PopoverProvider>
    </PopperPrimitive.PopperRoot>
  );
};

Popover.displayName = POPOVER_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverAnchor
 * ----------------------------------------------------------------------------------------------- */

const ANCHOR_NAME = 'PopoverAnchor';

type PopoverAnchorElement = React.ComponentRef<typeof PopperPrimitive.PopperAnchor>;
type PopperAnchorProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.PopperAnchor>;
interface PopoverAnchorProps extends PopperAnchorProps {}

const PopoverAnchor = React.forwardRef<PopoverAnchorElement, PopoverAnchorProps>(
  (props: ScopedProps<PopoverAnchorProps>, forwardedRef) => {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;

    React.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);

    return (
      <PopperPrimitive.PopperAnchor
        {...popperScope}
        {...anchorProps}
        ref={forwardedRef}
      />
    );
  }
);

PopoverAnchor.displayName = ANCHOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverTrigger
 * ----------------------------------------------------------------------------------------------- */

const TRIGGER_NAME = 'PopoverTrigger';

type PopoverTriggerElement = React.ComponentRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface PopoverTriggerProps extends PrimitiveButtonProps {}

const PopoverTrigger = React.forwardRef<PopoverTriggerElement, PopoverTriggerProps>(
  (props: ScopedProps<PopoverTriggerProps>, forwardedRef) => {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);

    const trigger = (
      <Primitive.button
        aria-controls={context.contentId}
        aria-expanded={context.open}
        aria-haspopup="dialog"
        data-state={getState(context.open)}
        type="button"
        {...triggerProps}
        ref={composedTriggerRef}
        onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
      />
    );

    return context.hasCustomAnchor ? (
      trigger
    ) : (
      <PopperPrimitive.PopperAnchor
        asChild
        {...popperScope}
      >
        {trigger}
      </PopperPrimitive.PopperAnchor>
    );
  }
);

PopoverTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverPortal
 * ----------------------------------------------------------------------------------------------- */

const PORTAL_NAME = 'PopoverPortal';

type PortalContextValue = { forceMount?: true };
const [PortalProvider, usePortalContext] = createPopoverContext<PortalContextValue>(PORTAL_NAME, {
  forceMount: undefined
});

type PortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
interface PopoverPortalProps {
  children?: React.ReactNode;
  /** Specify a container element to portal the content into. */
  container?: PortalProps['container'];
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation
   * libraries.
   */
  forceMount?: true;
}

const PopoverPortal: React.FC<PopoverPortalProps> = (props: ScopedProps<PopoverPortalProps>) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return (
    <PortalProvider
      forceMount={forceMount}
      scope={__scopePopover}
    >
      <Presence present={forceMount || context.open}>
        <PortalPrimitive
          asChild
          container={container}
        >
          {children}
        </PortalPrimitive>
      </Presence>
    </PortalProvider>
  );
};

PopoverPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverContent
 * ----------------------------------------------------------------------------------------------- */

const CONTENT_NAME = 'PopoverContent';

interface PopoverContentProps extends PopoverContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation
   * libraries.
   */
  forceMount?: true;
}

const PopoverContent = React.forwardRef<PopoverContentTypeElement, PopoverContentProps>(
  (props: ScopedProps<PopoverContentProps>, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return (
      <Presence present={forceMount || context.open}>
        {context.modal ? (
          <PopoverContentModal
            {...contentProps}
            ref={forwardedRef}
          />
        ) : (
          <PopoverContentNonModal
            {...contentProps}
            ref={forwardedRef}
          />
        )}
      </Presence>
    );
  }
);

PopoverContent.displayName = CONTENT_NAME;

/* ----------------------------------------------------------------------------------------------- */

const Slot = createSlot('PopoverContent.RemoveScroll');

type PopoverContentTypeElement = PopoverContentImplElement;
interface PopoverContentTypeProps extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {}

const PopoverContentModal = React.forwardRef<PopoverContentTypeElement, PopoverContentTypeProps>(
  (props: ScopedProps<PopoverContentTypeProps>, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = React.useRef(false);

    // aria-hide everything except the content (better supported equivalent to setting aria-modal)
    React.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);

    return (
      <RemoveScroll
        allowPinchZoom
        as={Slot}
      >
        <PopoverContentImpl
          {...props}
          ref={composedRefs}
          // we make sure we're not trapping once it's been closed
          // (closed !== unmounted when animating out)
          disableOutsidePointerEvents
          trapFocus={context.open}
          onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, (event) => {
            event.preventDefault();
            if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
          })}
          onPointerDownOutside={composeEventHandlers(
            props.onPointerDownOutside,
            (event) => {
              const originalEvent = event.detail.originalEvent;
              const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

              isRightClickOutsideRef.current = isRightClick;
            },
            { checkForDefaultPrevented: false }
          )}
          // When focus is trapped, a `focusout` event may still happen.
          // We make sure we don't trigger our `onDismiss` in such case.
          onFocusOutside={composeEventHandlers(
            props.onFocusOutside,
            (event) => event.preventDefault(),
            { checkForDefaultPrevented: false }
          )}
        />
      </RemoveScroll>
    );
  }
);
PopoverContentModal.displayName = 'PopoverContentModal';

const PopoverContentNonModal = React.forwardRef<PopoverContentTypeElement, PopoverContentTypeProps>(
  (props: ScopedProps<PopoverContentTypeProps>, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = React.useRef(false);
    const hasPointerDownOutsideRef = React.useRef(false);

    return (
      <PopoverContentImpl
        {...props}
        disableOutsidePointerEvents={false}
        ref={forwardedRef}
        trapFocus={false}
        onCloseAutoFocus={event => {
          props.onCloseAutoFocus?.(event);

          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            // Always prevent auto focus because we either focus manually or want user agent focus
            event.preventDefault();
          }

          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        }}
        onInteractOutside={event => {
          props.onInteractOutside?.(event);

          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === 'pointerdown') {
              hasPointerDownOutsideRef.current = true;
            }
          }

          // Prevent dismissing when clicking the trigger.
          // As the trigger is already setup to close, without doing so would
          // cause it to close and immediately open.
          const target = event.target as HTMLElement;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();

          // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
          // we will get the pointer down outside event on the trigger, but then a subsequent
          // focus outside event on the container, we ignore any focus outside event when we've
          // already had a pointer down outside event.
          if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }}
      />
    );
  }
);
PopoverContentNonModal.displayName = 'PopoverContentNonModal';
/* ----------------------------------------------------------------------------------------------- */

type PopoverContentImplElement = React.ComponentRef<typeof PopperPrimitive.PopperContent>;
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.PopperContent>;
interface PopoverContentImplProps
  extends Omit<PopperContentProps, 'onPlaced'>,
    Omit<DismissableLayerProps, 'onDismiss'> {
  /** Whether focus should be trapped within the `Popover` (default: false) */
  trapFocus?: FocusScopeProps['trapped'];

  /** Event handler called when auto-focusing on open. Can be prevented. */
  onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'];

  /** Event handler called when auto-focusing on close. Can be prevented. */
  onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'];
}

const PopoverContentImpl = React.forwardRef<PopoverContentImplElement, PopoverContentImplProps>(
  (props: ScopedProps<PopoverContentImplProps>, forwardedRef) => {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);

    // Make sure the whole tree has focus guards as our `Popover` may be
    // the last element in the DOM (because of the `Portal`)
    useFocusGuards();

    return (
      <FocusScope
        asChild
        loop
        trapped={trapFocus}
        onMountAutoFocus={onOpenAutoFocus}
        onUnmountAutoFocus={onCloseAutoFocus}
      >
        <DismissableLayer
          asChild
          disableOutsidePointerEvents={disableOutsidePointerEvents}
          onDismiss={() => context.onOpenChange(false)}
          onEscapeKeyDown={onEscapeKeyDown}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onPointerDownOutside={onPointerDownOutside}
        >
          <PopperPrimitive.PopperContent
            data-state={getState(context.open)}
            id={context.contentId}
            role="dialog"
            {...popperScope}
            {...contentProps}
            ref={forwardedRef}
            style={{
              ...contentProps.style,
              // re-namespace exposed content custom properties
              ...{
                '--novaui-popover-content-transform-origin': 'var(--novaui-popper-transform-origin)',
                '--novaui-popover-content-available-width': 'var(--novaui-popper-available-width)',
                '--novaui-popover-content-available-height': 'var(--novaui-popper-available-height)',
                '--novaui-popover-trigger-width': 'var(--novaui-popper-anchor-width)',
                '--novaui-popover-trigger-height': 'var(--novaui-popper-anchor-height)'
              }
            }}
          />
        </DismissableLayer>
      </FocusScope>
    );
  }
);
PopoverContentImpl.displayName = 'PopoverContentImpl';
/* -------------------------------------------------------------------------------------------------
 * PopoverClose
 * ----------------------------------------------------------------------------------------------- */

const CLOSE_NAME = 'PopoverClose';

type PopoverCloseElement = React.ComponentRef<typeof Primitive.button>;
interface PopoverCloseProps extends PrimitiveButtonProps {}

const PopoverClose = React.forwardRef<PopoverCloseElement, PopoverCloseProps>(
  (props: ScopedProps<PopoverCloseProps>, forwardedRef) => {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return (
      <Primitive.button
        type="button"
        {...closeProps}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => context.onOpenChange(false))}
      />
    );
  }
);

PopoverClose.displayName = CLOSE_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverArrow
 * ----------------------------------------------------------------------------------------------- */

const ARROW_NAME = 'PopoverArrow';

type PopoverArrowElement = React.ComponentRef<typeof PopperPrimitive.PopperArrow>;
type PopperArrowProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.PopperArrow>;
interface PopoverArrowProps extends PopperArrowProps {}

const PopoverArrow = React.forwardRef<PopoverArrowElement, PopoverArrowProps>(
  (props: ScopedProps<PopoverArrowProps>, forwardedRef) => {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return (
      <PopperPrimitive.PopperArrow
        {...popperScope}
        {...arrowProps}
        ref={forwardedRef}
      />
    );
  }
);

PopoverArrow.displayName = ARROW_NAME;

/* ----------------------------------------------------------------------------------------------- */

function getState(open: boolean) {
  return open ? 'open' : 'closed';
}

const Root = Popover;

export {
  createPopoverScope,
  //
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
  //
  Root as PopoverRoot
};
export type {
  PopoverProps,
  PopoverAnchorProps,
  PopoverTriggerProps,
  PopoverPortalProps,
  PopoverContentProps,
  PopoverCloseProps,
  PopoverArrowProps
};
