import { alertVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertRootProps } from './types';

export default function AlertRoot({
  className,
  color,
  variant,
  size,
  children,
  ...props
}: AlertRootProps & React.HTMLAttributes<HTMLDivElement>) {
  const rootClassName = useMemo(() => {
    const { root } = alertVariants({ color, variant, size });
    return cn(root(), className);
  }, [color, variant, size, className]);

  return (
    <div
      className={rootClassName}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
}
