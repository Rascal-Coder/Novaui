import { alertVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { AlertDescriptionProps } from './types';

export default function AlertDescription({
  className,
  size,
  children,
  ...props
}: AlertDescriptionProps & React.HTMLAttributes<HTMLDivElement>) {
  const descriptionClassName = useMemo(() => {
    const { description } = alertVariants({ size });
    return cn(description(), className);
  }, [size, className]);

  return (
    <div
      className={descriptionClassName}
      {...props}
    >
      {children}
    </div>
  );
}
