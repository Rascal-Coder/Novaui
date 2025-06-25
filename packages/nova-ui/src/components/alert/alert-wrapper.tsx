import { alertVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertWrapperProps } from './types';

export default function AlertWrapper({
  className,
  size,
  children,
  ...props
}: AlertWrapperProps & React.HTMLAttributes<HTMLDivElement>) {
  const wrapperClassName = useMemo(() => {
    const { wrapper } = alertVariants({ size });
    return cn(wrapper(), className);
  }, [size, className]);

  return (
    <div
      className={wrapperClassName}
      {...props}
    >
      {children}
    </div>
  );
}
