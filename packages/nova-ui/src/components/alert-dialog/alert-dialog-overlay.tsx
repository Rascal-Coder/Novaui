import { AlertDialogOverlay as AlertDialogOverlayPrimitive, type AlertDialogOverlayProps } from '@novaui/primitives';
import { cn, dialogVariants } from '@novaui/variants';
import { useMemo } from 'react';

interface Props extends AlertDialogOverlayProps {}
export default function AlertDialogOverlay({ className, forceMount }: Props) {
  const { overlay } = dialogVariants();
  const mergedCls = useMemo(() => {
    return cn(overlay(), className);
  }, [className, overlay]);
  return (
    <AlertDialogOverlayPrimitive
      className={mergedCls}
      forceMount={forceMount}
    />
  );
}
