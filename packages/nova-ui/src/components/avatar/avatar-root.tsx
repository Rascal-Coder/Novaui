import type { AvatarProps as PrimitiveAvatarProps } from '@novaui/primitives';
import { AvatarRoot as PrimitiveAvatarRoot } from '@novaui/primitives';
import { type ThemeSize, avatarVariants, cn } from '@novaui/variants';
import { createContext, useContext, useMemo } from 'react';

type AvatarRootProps = PrimitiveAvatarProps & {
  size?: ThemeSize;
  shape?: 'circle' | 'square';
};

// 创建 Shape Context
const AvatarShapeContext = createContext<'circle' | 'square'>('circle');

export const useAvatarShape = () => useContext(AvatarShapeContext);

export default function AvatarRoot({ className, size, children, shape, ...props }: AvatarRootProps) {
  const mergedCls = useMemo(() => {
    return cn(avatarVariants({ size, shape }).root(), className);
  }, [className, size, shape]);

  return (
    <AvatarShapeContext.Provider value={shape || 'circle'}>
      <PrimitiveAvatarRoot
        {...props}
        className={mergedCls}
      >
        {children}
      </PrimitiveAvatarRoot>
    </AvatarShapeContext.Provider>
  );
}
