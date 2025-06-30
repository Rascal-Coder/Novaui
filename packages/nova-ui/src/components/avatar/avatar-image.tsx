import type { AvatarImageProps as PrimitiveAvatarImageProps } from '@novaui/primitives';
import { AvatarImage as PrimitiveAvatarImage } from '@novaui/primitives';
import { avatarVariants, cn } from '@novaui/variants';
import { useMemo } from 'react';

type AvatarImageProps = PrimitiveAvatarImageProps & {
  // size?: ThemeSize;
};

export default function AvatarImage({ className, ...props }: AvatarImageProps) {
  const mergedCls = useMemo(() => {
    return cn(avatarVariants().image, className);
  }, [className]);
  return (
    <PrimitiveAvatarImage
      {...props}
      className={mergedCls}
    />
  );
}
