import { hideOthers } from 'aria-hidden';
import * as React from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import type { Scope } from '../../context';
import { createContextScope } from '../../context';
import { FocusScope, Presence, composeEventHandlers, useControllableState, useFocusGuards, useId } from '../../shared';
import { useComposedRefs } from '../compose-refs';
import { DismissableLayer } from '../dismissable-layer';
import { Portal as PortalPrimitive } from '../portal';
import { Primitive } from '../primitive';
import { createSlot } from '../slot';

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * ----------------------------------------------------------------------------------------------- */

const DIALOG_NAME = 'Dialog';
const CONTENT_NAME = 'DialogContent';
const OVERLAY_NAME = 'DialogOverlay';

type ScopedProps<P> = P & { __scopeDialog?: Scope };
const [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);

type DialogContextValue = {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<DialogContentElement | null>;
  contentId: string;
  titleId: string;
  descriptionId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  modal: boolean;
};

const [DialogProvider, useDialogContext] = createDialogContext<DialogContextValue>(DIALOG_NAME);

interface DialogProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  modal?: boolean;
}

/* ----------------------------------------------------------------------------------------------- */

type DialogContentImplElement = React.ComponentRef<typeof DismissableLayer>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
interface DialogContentImplProps extends Omit<DismissableLayerProps, 'onDismiss'> {
  /**
   * When `true`, focus cannot escape the `Content` via keyboard, pointer, or a programmatic focus.
   *
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped'];

  /** Event handler called when auto-focusing on open. Can be prevented. */
  onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'];

  /** Event handler called when auto-focusing on close. Can be prevented. */
  onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'];
}

const DIALOG_CONTENT_IMPL_NAME = 'DialogContentImpl';
const DialogContentImpl = React.forwardRef<DialogContentImplElement, DialogContentImplProps>(
  (props: ScopedProps<DialogContentImplProps>, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);

    // Make sure the whole tree has focus guards as our `Dialog` will be
    // the last element in the DOM (because of the `Portal`)
    useFocusGuards();

    return (
      <>
        <FocusScope
          asChild
          loop
          trapped={trapFocus}
          onMountAutoFocus={onOpenAutoFocus}
          onUnmountAutoFocus={onCloseAutoFocus}
        >
          <DismissableLayer
            aria-describedby={context.descriptionId}
            aria-labelledby={context.titleId}
            data-state={getState(context.open)}
            id={context.contentId}
            role="dialog"
            {...contentProps}
            ref={composedRefs}
            onDismiss={() => context.onOpenChange(false)}
          />
        </FocusScope>
        {/* {process.env.NODE_ENV !== 'production' && (
          <>
            <TitleWarning titleId={context.titleId} />
            <DescriptionWarning
              contentRef={contentRef}
              descriptionId={context.descriptionId}
            />
          </>
        )} */}
      </>
    );
  }
);

DialogContentImpl.displayName = DIALOG_CONTENT_IMPL_NAME;

type DialogOverlayImplElement = React.ComponentRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface DialogOverlayImplProps extends PrimitiveDivProps {}

const Slot = createSlot('DialogOverlay.RemoveScroll');

const DialogOverlayImpl = React.forwardRef<DialogOverlayImplElement, DialogOverlayImplProps>(
  (props: ScopedProps<DialogOverlayImplProps>, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      <RemoveScroll
        allowPinchZoom
        as={Slot}
        shards={[context.contentRef]}
      >
        <Primitive.div
          data-state={getState(context.open)}
          {...overlayProps}
          ref={forwardedRef}
          // We re-enable pointer-events prevented by `Dialog.Content` to allow scrolling the overlay.
          style={{ pointerEvents: 'auto', ...overlayProps.style }}
        />
      </RemoveScroll>
    );
  }
);

DialogOverlayImpl.displayName = OVERLAY_NAME;
const Dialog: React.FC<DialogProps> = (props: ScopedProps<DialogProps>) => {
  const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<DialogContentElement>(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange
  });

  return (
    <DialogProvider
      contentId={useId()}
      contentRef={contentRef}
      descriptionId={useId()}
      modal={modal}
      open={open}
      scope={__scopeDialog}
      titleId={useId()}
      triggerRef={triggerRef}
      onOpenChange={setOpen}
      onOpenToggle={React.useCallback(() => setOpen(prevOpen => !prevOpen), [setOpen])}
    >
      {children}
    </DialogProvider>
  );
};

Dialog.displayName = DIALOG_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogTrigger
 * ----------------------------------------------------------------------------------------------- */

const TRIGGER_NAME = 'DialogTrigger';

type DialogTriggerElement = React.ComponentRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface DialogTriggerProps extends PrimitiveButtonProps {}

const DialogTrigger = React.forwardRef<DialogTriggerElement, DialogTriggerProps>(
  (props: ScopedProps<DialogTriggerProps>, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return (
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
  }
);

DialogTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogPortal
 * ----------------------------------------------------------------------------------------------- */

const PORTAL_NAME = 'DialogPortal';

type PortalContextValue = { forceMount?: true };
const [PortalProvider, usePortalContext] = createDialogContext<PortalContextValue>(PORTAL_NAME, {
  forceMount: undefined
});

type PortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
interface DialogPortalProps {
  children?: React.ReactNode;
  /** Specify a container element to portal the content into. */
  container?: PortalProps['container'];
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation
   * libraries.
   */
  forceMount?: true;
}

const DialogPortal: React.FC<DialogPortalProps> = (props: ScopedProps<DialogPortalProps>) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return (
    <PortalProvider
      forceMount={forceMount}
      scope={__scopeDialog}
    >
      {React.Children.map(children, child => (
        <Presence present={forceMount || context.open}>
          <PortalPrimitive
            asChild
            container={container}
          >
            {child}
          </PortalPrimitive>
        </Presence>
      ))}
    </PortalProvider>
  );
};

DialogPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogOverlay
 * ----------------------------------------------------------------------------------------------- */

type DialogOverlayElement = DialogOverlayImplElement;
interface DialogOverlayProps extends DialogOverlayImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation
   * libraries.
   */
  forceMount?: true;
}

const DialogOverlay = React.forwardRef<DialogOverlayElement, DialogOverlayProps>(
  (props: ScopedProps<DialogOverlayProps>, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? (
      <Presence present={forceMount || context.open}>
        <DialogOverlayImpl
          {...overlayProps}
          ref={forwardedRef}
        />
      </Presence>
    ) : null;
  }
);

DialogOverlay.displayName = OVERLAY_NAME;

/* ----------------------------------------------------------------------------------------------- */

type DialogContentTypeElement = DialogContentImplElement;
interface DialogContentTypeProps extends Omit<DialogContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {}

const DialogContentModal = React.forwardRef<DialogContentTypeElement, DialogContentTypeProps>(
  (props: ScopedProps<DialogContentTypeProps>, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);

    // aria-hide everything except the content (better supported equivalent to setting aria-modal)
    React.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);

    return (
      <DialogContentImpl
        disableOutsidePointerEvents
        {...props}
        ref={composedRefs}
        // we make sure focus isn't trapped once `DialogContent` has been closed
        // (closed !== unmounted when animating out)

        trapFocus={context.open}
        onFocusOutside={composeEventHandlers(props.onFocusOutside, event => event.preventDefault())}
        onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, event => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        })}
        onPointerDownOutside={composeEventHandlers(props.onPointerDownOutside, event => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

          // If the event is a right-click, we shouldn't close because
          // it is effectively as if we right-clicked the `Overlay`.
          if (isRightClick) event.preventDefault();
        })}
        // When focus is trapped, a `focusout` event may still happen.
        // We make sure we don't trigger our `onDismiss` in such case.
      />
    );
  }
);

DialogContentModal.displayName = CONTENT_NAME;

/* ----------------------------------------------------------------------------------------------- */

const CONTENT_NON_MODAL_NAME = 'DialogContentNonModal';
const DialogContentNonModal = React.forwardRef<DialogContentTypeElement, DialogContentTypeProps>(
  (props: ScopedProps<DialogContentTypeProps>, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = React.useRef(false);
    const hasPointerDownOutsideRef = React.useRef(false);

    return (
      <DialogContentImpl
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

DialogContentNonModal.displayName = CONTENT_NON_MODAL_NAME;
/* -------------------------------------------------------------------------------------------------
 * DialogContent
 * ----------------------------------------------------------------------------------------------- */

type DialogContentElement = DialogContentTypeElement;
interface DialogContentProps extends DialogContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation
   * libraries.
   */
  forceMount?: true;
}

const DialogContent = React.forwardRef<DialogContentElement, DialogContentProps>(
  (props: ScopedProps<DialogContentProps>, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return (
      <Presence present={forceMount || context.open}>
        {context.modal ? (
          <DialogContentModal
            {...contentProps}
            ref={forwardedRef}
          />
        ) : (
          <DialogContentNonModal
            {...contentProps}
            ref={forwardedRef}
          />
        )}
      </Presence>
    );
  }
);

DialogContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogTitle
 * ----------------------------------------------------------------------------------------------- */

const TITLE_NAME = 'DialogTitle';

type DialogTitleElement = React.ComponentRef<typeof Primitive.h2>;
type PrimitiveHeading2Props = React.ComponentPropsWithoutRef<typeof Primitive.h2>;
interface DialogTitleProps extends PrimitiveHeading2Props {}

const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>(
  (props: ScopedProps<DialogTitleProps>, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return (
      <Primitive.h2
        id={context.titleId}
        {...titleProps}
        ref={forwardedRef}
      />
    );
  }
);

DialogTitle.displayName = TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogDescription
 * ----------------------------------------------------------------------------------------------- */

const DESCRIPTION_NAME = 'DialogDescription';

type DialogDescriptionElement = React.ComponentRef<typeof Primitive.p>;
type PrimitiveParagraphProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;
interface DialogDescriptionProps extends PrimitiveParagraphProps {}

const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  (props: ScopedProps<DialogDescriptionProps>, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return (
      <Primitive.p
        id={context.descriptionId}
        {...descriptionProps}
        ref={forwardedRef}
      />
    );
  }
);

DialogDescription.displayName = DESCRIPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogClose
 * ----------------------------------------------------------------------------------------------- */

const CLOSE_NAME = 'DialogClose';

type DialogCloseElement = React.ComponentRef<typeof Primitive.button>;
interface DialogCloseProps extends PrimitiveButtonProps {}

const DialogClose = React.forwardRef<DialogCloseElement, DialogCloseProps>(
  (props: ScopedProps<DialogCloseProps>, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
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

DialogClose.displayName = CLOSE_NAME;

/* ----------------------------------------------------------------------------------------------- */

function getState(open: boolean) {
  return open ? 'open' : 'closed';
}

const Root = Dialog;
const Trigger = DialogTrigger;
const Portal = DialogPortal;
const Overlay = DialogOverlay;
const Content = DialogContent;
const Title = DialogTitle;
const Description = DialogDescription;
const Close = DialogClose;

export {
  // eslint-disable-next-line react-refresh/only-export-components
  createDialogScope,
  //
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  //
  Root as DialogRoot,
  Trigger as DialogTriggerPrimitive,
  Portal as DialogPortalPrimitive,
  Overlay as DialogOverlayPrimitive,
  Content as DialogContentPrimitive,
  Title as DialogTitlePrimitive,
  Description as DialogDescriptionPrimitive,
  Close as DialogClosePrimitive
  //
  // WarningProvider
};
export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps
};
