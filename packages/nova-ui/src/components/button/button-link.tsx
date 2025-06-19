import { NLink } from '../link';

import NButton from './button';
import type { ButtonLinkProps } from './types';

export default function ButtonLink({ variant = 'link', children, ...delegatedProps }: ButtonLinkProps) {
  return (
    <NButton
      variant={variant}
      {...delegatedProps}
    >
      <NLink>{children}</NLink>
    </NButton>
  );
}
