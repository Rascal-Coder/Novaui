import type { AvatarFallbackProps as PrimitiveAvatarFallbackProps } from '@novaui/primitives';
import { AvatarFallback as PrimitiveAvatarFallback } from '@novaui/primitives';
import { avatarVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

type AvatarFallbackProps = PrimitiveAvatarFallbackProps & {
  // size?: ThemeSize;
};

export default function AvatarFallback({ className, delayMs, children, ...props }: AvatarFallbackProps) {
  const mergedCls = useMemo(() => {
    return cn(avatarVariants().fallback, className);
  }, [className]);
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
