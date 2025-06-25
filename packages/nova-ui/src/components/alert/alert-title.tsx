import { alertVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertTitleProps } from './types';

export default function AlertTitle({
  className,
  size,
  children,
  ...props
}: AlertTitleProps & React.HTMLAttributes<HTMLDivElement>) {
  const titleClassName = useMemo(() => {
    const { title } = alertVariants({ size });
    return cn(title(), className);
  }, [size, className]);

  return (
    <div
      className={titleClassName}
      {...props}
    >
      {children}
    </div>
  );
}
