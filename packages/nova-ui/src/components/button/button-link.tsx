import { NLink } from '../link';

import NButton from './button';
import type { ButtonLinkProps } from './types';

export default function ButtonLink({
  variant = 'link',
  // asChild = false,
  children,
  ...delegatedProps
}: ButtonLinkProps) {
  // if (asChild) {
  //   console.log('xxxxxxxxxxxxx', children);

  //   return (
  //     <NButton
  //       asChild
  //       variant={variant}
  //       {...delegatedProps}
  //     >
  //       {/* {children} */}
  //     </NButton>
  //   );
  // }
  return (
    <NButton
      variant={variant}
      {...delegatedProps}
    >
      <NLink>{children}</NLink>
    </NButton>
  );
}
