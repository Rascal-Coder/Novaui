import { cardVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import type { CardTitleRootProps } from './types';

export default function CardTitleRoot({ className, size, children }: CardTitleRootProps) {
  const computedCls = useMemo(() => {
    const { titleRoot } = cardVariants({ size });
    return cn(titleRoot(), className);
  }, [className, size]);

  return <div className={computedCls}>{children}</div>;
}
