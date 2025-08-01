import { AlertDialogCancel as AlertDialogCancelPrimitive } from '@novaui/primitives';

import { NButton } from '../button';
import type { ButtonProps } from '../button/types';

interface Props extends ButtonProps {}
export default function AlertDialogCancel({ asChild = true, variant = 'plain', children, ...delegatedProps }: Props) {
  return (
    <AlertDialogCancelPrimitive asChild={asChild}>
      {children ?? (
        <NButton
          variant={variant}
          {...delegatedProps}
        >
          Cancel
        </NButton>
      )}
    </AlertDialogCancelPrimitive>
  );
}
