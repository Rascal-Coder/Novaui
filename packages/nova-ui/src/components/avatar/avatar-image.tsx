import type { AvatarImageProps as PrimitiveAvatarImageProps } from '@novaui/primitives';
import { AvatarImage as PrimitiveAvatarImage } from '@novaui/primitives';
import { avatarVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

import { useAvatarShape } from './avatar-root';

type AvatarImageProps = PrimitiveAvatarImageProps & {
  // size?: ThemeSize;
};

export default function AvatarImage({ className, ...props }: AvatarImageProps) {
  const shape = useAvatarShape();

  const mergedCls = useMemo(() => {
    return cn(avatarVariants({ shape }).image(), className);
  }, [className, shape]);

  return (
    <PrimitiveAvatarImage
      {...props}
      className={mergedCls}
    />
  );
}
