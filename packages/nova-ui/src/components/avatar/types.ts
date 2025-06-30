import type { AvatarImageProps as PrimitiveAvatarImageProps } from '@novaui/primitives';
import type { AvatarSlots, ThemeSize } from '@novaui/variants';

type AvatarUISlots = {
  [K in AvatarSlots]?: string;
};

type AvatarProps = {
  // className?: string;
  size?: ThemeSize;
  ui?: AvatarUISlots;
  fallbackLabel?: string;
  // children?: React.ReactNode;
} & PrimitiveAvatarImageProps;

export type { AvatarProps, AvatarUISlots };
