import { cardVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { CardContentProps } from './types';

export default function CardContent({ className, size, flexHeight, children }: CardContentProps) {
  const computedCls = useMemo(() => {
    const { content } = cardVariants({ size, flexHeight });
    return cn(content(), className);
  }, [className, size, flexHeight]);

  return <div className={computedCls}>{children}</div>;
}
