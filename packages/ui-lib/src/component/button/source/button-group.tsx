import { Primitive } from '@novaui/primitives';
import { buttonGroupVariants, cn } from '@novaui/variants';

import type { ButtonGroupProps } from '../types';

export default function ButtonGroup({ orientation, children }: ButtonGroupProps) {
  const mergeClassNames = cn(buttonGroupVariants({ orientation }));
  return <Primitive.div className={mergeClassNames}>{children}</Primitive.div>;
}
