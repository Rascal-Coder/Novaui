import { cardVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { CardFooterProps } from './types';

export default function CardFooter({ className, size, children }: CardFooterProps) {
  const computedCls = useMemo(() => {
    const { footer } = cardVariants({ size });
    return cn(footer(), className);
  }, [className, size]);

  return <div className={computedCls}>{children}</div>;
}
