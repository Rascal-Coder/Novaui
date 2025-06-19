import { cardVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { CardHeaderProps } from './types';

export default function CardHeader({ className, size, children }: CardHeaderProps) {
  const computedCls = useMemo(() => {
    const { header } = cardVariants({ size });
    return cn(header(), className);
  }, [className, size]);

  return <div className={computedCls}>{children}</div>;
}
