import { useMemo } from 'react';

import AvatarFallback from './avatar-fallback';
import AvatarImage from './avatar-image';
import AvatarRoot from './avatar-root';
import type { AvatarProps } from './types';

export default function Avatar({
  className,
  size,
  ui,
  fallbackLabel,
  children,
  src,
  alt,
  onLoadingStatusChange,
  shape = 'circle',
  ...imageProps
}: AvatarProps) {
  const imageComponentProps = useMemo(
    () => ({
      src,
      alt,
      onLoadingStatusChange,
      ...imageProps
    }),
    [src, alt, onLoadingStatusChange, imageProps]
  );

  return (
    <AvatarRoot
      className={className || ui?.root}
      shape={shape}
      size={size}
    >
      {children || (
        <>
          <AvatarImage
            {...imageComponentProps}
            className={ui?.image}
          />
          <AvatarFallback className={ui?.fallback}>{fallbackLabel}</AvatarFallback>
        </>
      )}
    </AvatarRoot>
  );
}
