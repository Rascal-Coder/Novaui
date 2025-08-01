import { AlertDialogAction as AlertDialogActionPrimitive } from '@novaui/primitives';

import { NButton } from '../button';
import type { ButtonProps } from '../button/types';

interface Props extends ButtonProps {}
export default function AlertDialogAction({ asChild = true, children, ...props }: Props) {
  return (
    <AlertDialogActionPrimitive asChild={asChild}>
      {children ?? <NButton {...props}>Confirm</NButton>}
    </AlertDialogActionPrimitive>
  );
}
