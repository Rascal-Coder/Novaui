import { cardVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { CardTitleProps } from './types';

export default function CardTitle({ className, size, children }: CardTitleProps) {
  const computedCls = useMemo(() => {
    const { title } = cardVariants({ size });
    return cn(title(), className);
  }, [className, size]);

  return <div className={computedCls}>{children}</div>;
}
