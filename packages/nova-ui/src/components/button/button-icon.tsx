import NButton from './button';
import type { ButtonIconPorps } from './types';

export default function ButtonIcon({
  children,
  color = 'accent',
  variant = 'ghost',
  shape = 'square',
  ...props
}: ButtonIconPorps) {
  return (
    <NButton
      color={color}
      shape={shape}
      variant={variant}
      {...props}
    >
      {children}
    </NButton>
  );
}
