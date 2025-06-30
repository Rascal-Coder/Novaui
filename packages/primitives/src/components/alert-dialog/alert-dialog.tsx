import * as React from 'react';

import { createContextScope } from '../../context';
import type { Scope } from '../../context';
import { composeEventHandlers } from '../../shared';
import { useComposedRefs } from '../compose-refs';
import * as DialogPrimitive from '../dialog';
import { createDialogScope } from '../dialog';
import { createSlottable } from '../slot';

/* -------------------------------------------------------------------------------------------------
 * AlertDialog
 * ----------------------------------------------------------------------------------------------- */

const ROOT_NAME = 'AlertDialog';

type ScopedProps<P> = P & { __scopeAlertDialog?: Scope };
const [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [createDialogScope]);
const useDialogScope = createDialogScope();

type DialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogRoot>;
interface AlertDialogProps extends Omit<DialogProps, 'modal'> {}

const AlertDialog: React.FC<AlertDialogProps> = (props: ScopedProps<AlertDialogProps>) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return (
    <DialogPrimitive.DialogRoot
      {...dialogScope}
      {...alertDialogProps}
      modal={true}
    />
  );
};

AlertDialog.displayName = ROOT_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogTrigger
 * ----------------------------------------------------------------------------------------------- */
const TRIGGER_NAME = 'AlertDialogTrigger';

type AlertDialogTriggerElement = React.ComponentRef<typeof DialogPrimitive.DialogTriggerPrimitive>;
type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogTriggerPrimitive>;
interface AlertDialogTriggerProps extends DialogTriggerProps {}

const AlertDialogTrigger = React.forwardRef<AlertDialogTriggerElement, AlertDialogTriggerProps>(
  (props: ScopedProps<AlertDialogTriggerProps>, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return (
      <DialogPrimitive.DialogTriggerPrimitive
        {...dialogScope}
        {...triggerProps}
        ref={forwardedRef}
      />
    );
  }
);

AlertDialogTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogPortal
 * ----------------------------------------------------------------------------------------------- */

const PORTAL_NAME = 'AlertDialogPortal';

type DialogPortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogPortalPrimitive>;
interface AlertDialogPortalProps extends DialogPortalProps {}

const AlertDialogPortal: React.FC<AlertDialogPortalProps> = (props: ScopedProps<AlertDialogPortalProps>) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return (
    <DialogPrimitive.DialogPortalPrimitive
      {...dialogScope}
      {...portalProps}
    />
  );
};

AlertDialogPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogOverlay
 * ----------------------------------------------------------------------------------------------- */

const OVERLAY_NAME = 'AlertDialogOverlay';

type AlertDialogOverlayElement = React.ComponentRef<typeof DialogPrimitive.DialogOverlayPrimitive>;
type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogOverlayPrimitive>;
interface AlertDialogOverlayProps extends DialogOverlayProps {}

const AlertDialogOverlay = React.forwardRef<AlertDialogOverlayElement, AlertDialogOverlayProps>(
  (props: ScopedProps<AlertDialogOverlayProps>, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return (
      <DialogPrimitive.DialogOverlayPrimitive
        {...dialogScope}
        {...overlayProps}
        ref={forwardedRef}
      />
    );
  }
);

AlertDialogOverlay.displayName = OVERLAY_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogContent
 * ----------------------------------------------------------------------------------------------- */

const CONTENT_NAME = 'AlertDialogContent';

type AlertDialogContentContextValue = {
  cancelRef: React.MutableRefObject<AlertDialogCancelElement | null>;
};

const [AlertDialogContentProvider, useAlertDialogContentContext] =
  createAlertDialogContext<AlertDialogContentContextValue>(CONTENT_NAME);

type AlertDialogContentElement = React.ComponentRef<typeof DialogPrimitive.DialogContentPrimitive>;
type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogContentPrimitive>;
interface AlertDialogContentProps extends Omit<DialogContentProps, 'onPointerDownOutside' | 'onInteractOutside'> {}

const Slottable = createSlottable('AlertDialogContent');

const AlertDialogContent = React.forwardRef<AlertDialogContentElement, AlertDialogContentProps>(
  (props: ScopedProps<AlertDialogContentProps>, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = React.useRef<AlertDialogContentElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = React.useRef<AlertDialogCancelElement | null>(null);

    return (
      <AlertDialogContentProvider
        cancelRef={cancelRef}
        scope={__scopeAlertDialog}
      >
        <DialogPrimitive.DialogContentPrimitive
          role="alertdialog"
          {...dialogScope}
          {...contentProps}
          ref={composedRefs}
          onInteractOutside={event => event.preventDefault()}
          onPointerDownOutside={event => event.preventDefault()}
          onOpenAutoFocus={composeEventHandlers(contentProps.onOpenAutoFocus, event => {
            event.preventDefault();
            cancelRef.current?.focus({ preventScroll: true });
          })}
        >
          {/**
           * We have to use `Slottable` here as we cannot wrap the `AlertDialogContentProvider` around everything, otherwise the
           * `DescriptionWarning` would be rendered straight away. This is because we want the accessibility checks to run only
           * once the content is actually open and that behaviour is already encapsulated in `DialogContent`.
           */}
          <Slottable>{children}</Slottable>
          {/* {process.env.NODE_ENV === 'development' && <DescriptionWarning contentRef={contentRef} />} */}
        </DialogPrimitive.DialogContentPrimitive>
      </AlertDialogContentProvider>
      // <DialogPrimitive.WarningProvider
      //   contentName={CONTENT_NAME}
      //   docsSlug="alert-dialog"
      //   titleName={TITLE_NAME}
      // >

      // </DialogPrimitive.WarningProvider>
    );
  }
);

AlertDialogContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogTitle
 * ----------------------------------------------------------------------------------------------- */

const TITLE_NAME = 'AlertDialogTitle';

type AlertDialogTitleElement = React.ComponentRef<typeof DialogPrimitive.DialogTitlePrimitive>;
type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogTitlePrimitive>;
interface AlertDialogTitleProps extends DialogTitleProps {}

const AlertDialogTitle = React.forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(
  (props: ScopedProps<AlertDialogTitleProps>, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return (
      <DialogPrimitive.DialogTitlePrimitive
        {...dialogScope}
        {...titleProps}
        ref={forwardedRef}
      />
    );
  }
);

AlertDialogTitle.displayName = TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogDescription
 * ----------------------------------------------------------------------------------------------- */

const DESCRIPTION_NAME = 'AlertDialogDescription';

type AlertDialogDescriptionElement = React.ComponentRef<typeof DialogPrimitive.DialogDescriptionPrimitive>;
type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogDescriptionPrimitive>;
interface AlertDialogDescriptionProps extends DialogDescriptionProps {}

const AlertDialogDescription = React.forwardRef<AlertDialogDescriptionElement, AlertDialogDescriptionProps>(
  (props: ScopedProps<AlertDialogDescriptionProps>, forwardedRef) => {
    const { __scopeAlertDialog, ...descriptionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return (
      <DialogPrimitive.DialogDescriptionPrimitive
        {...dialogScope}
        {...descriptionProps}
        ref={forwardedRef}
      />
    );
  }
);

AlertDialogDescription.displayName = DESCRIPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogAction
 * ----------------------------------------------------------------------------------------------- */

const ACTION_NAME = 'AlertDialogAction';

type AlertDialogActionElement = React.ComponentRef<typeof DialogPrimitive.DialogClosePrimitive>;
type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogClosePrimitive>;
interface AlertDialogActionProps extends DialogCloseProps {}

const AlertDialogAction = React.forwardRef<AlertDialogActionElement, AlertDialogActionProps>(
  (props: ScopedProps<AlertDialogActionProps>, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return (
      <DialogPrimitive.DialogClosePrimitive
        {...dialogScope}
        {...actionProps}
        ref={forwardedRef}
      />
    );
  }
);

AlertDialogAction.displayName = ACTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogCancel
 * ----------------------------------------------------------------------------------------------- */

const CANCEL_NAME = 'AlertDialogCancel';

type AlertDialogCancelElement = React.ComponentRef<typeof DialogPrimitive.DialogClosePrimitive>;
interface AlertDialogCancelProps extends DialogCloseProps {}

const AlertDialogCancel = React.forwardRef<AlertDialogCancelElement, AlertDialogCancelProps>(
  (props: ScopedProps<AlertDialogCancelProps>, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return (
      <DialogPrimitive.DialogClosePrimitive
        {...dialogScope}
        {...cancelProps}
        ref={ref}
      />
    );
  }
);

AlertDialogCancel.displayName = CANCEL_NAME;

/* ---------------------------------------------------------------------------------------------- */

// type DescriptionWarningProps = {
//   contentRef: React.RefObject<AlertDialogContentElement | null>;
// };

// const DescriptionWarning: React.FC<DescriptionWarningProps> = ({ contentRef }) => {
//   const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

// You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

// Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

// For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;

//   React.useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
//     const hasDescription = document.getElementById(contentRef.current?.getAttribute('aria-describedby')!);
//     if (!hasDescription) console.warn(MESSAGE);
//   }, [MESSAGE, contentRef]);

//   return null;
// };

const Root = AlertDialog;
const Trigger = AlertDialogTrigger;
const Portal = AlertDialogPortal;
const Overlay = AlertDialogOverlay;
const Content = AlertDialogContent;
const Action = AlertDialogAction;
const Cancel = AlertDialogCancel;
const Title = AlertDialogTitle;
const Description = AlertDialogDescription;

export {
  createAlertDialogScope,
  //
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
  //
  Root as AlertDialogRoot,
  Trigger as AlertDialogTriggerPrimitive,
  Portal as AlertDialogPortalPrimitive,
  Overlay as AlertDialogOverlayPrimitive,
  Content as AlertDialogContentPrimitive,
  Action as AlertDialogActionPrimitive,
  Cancel as AlertDialogCancelPrimitive,
  Title as AlertDialogTitlePrimitive,
  Description as AlertDialogDescriptionPrimitive
};
export type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps
};
