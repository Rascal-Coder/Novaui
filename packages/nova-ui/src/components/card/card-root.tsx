import { cardVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { CardRootProps } from './types';

export default function CardRoot({ className, size, split, children }: CardRootProps) {
  const computedCls = useMemo(() => {
    const { root } = cardVariants({ size, split });
    return cn(root(), className);
  }, [className, size, split]);
  return <div className={computedCls}>{children}</div>;
}
