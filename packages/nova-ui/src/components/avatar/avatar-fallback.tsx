import type { AvatarFallbackProps as PrimitiveAvatarFallbackProps } from '@novaui/primitives';
import { AvatarFallback as PrimitiveAvatarFallback } from '@novaui/primitives';
import { avatarVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import { useAvatarShape } from './avatar-root';

type AvatarFallbackProps = PrimitiveAvatarFallbackProps & {
  // size?: ThemeSize;
};

export default function AvatarFallback({ className, delayMs, children, ...props }: AvatarFallbackProps) {
  const shape = useAvatarShape();

  const mergedCls = useMemo(() => {
    const { fallback } = avatarVariants({ shape });
    return cn(fallback(), className);
  }, [className, shape]);

  return (
    <PrimitiveAvatarFallback
      {...props}
      className={mergedCls}
      delayMs={delayMs}
    >
      {children}
    </PrimitiveAvatarFallback>
  );
}
