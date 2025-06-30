import type { AvatarProps as PrimitiveAvatarProps } from '@novaui/primitives';
import { AvatarRoot as PrimitiveAvatarRoot } from '@novaui/primitives';
import { type ThemeSize, avatarVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

type AvatarRootProps = PrimitiveAvatarProps & {
  size?: ThemeSize;
};

export default function AvatarRoot({ className, size, children, ...props }: AvatarRootProps) {
  const mergedCls = useMemo(() => {
    return cn(avatarVariants({ size }).root, className);
  }, [className, size]);
  return (
    <PrimitiveAvatarRoot
      {...props}
      className={mergedCls}
    >
      {children}
    </PrimitiveAvatarRoot>
  );
}
