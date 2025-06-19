import { Slot, Slottable } from '@novaui/primitives';
import { useMemo } from 'react';

import type { AnchorLinkProps } from './types';

export default function Link({
  asChild = false,
  target = '_blank',
  rel = 'noopener noreferrer',
  isExternal = false,
  children,
  ...props
}: AnchorLinkProps & { asChild?: boolean }) {
  const { href, referrerPolicy, disabled } = props;
  const computedProps = useMemo(() => {
    return {
      href: disabled ? undefined : href,
      rel,
      target,
      referrerPolicy,
      'aria-disabled': disabled || undefined,
      role: disabled ? 'link' : undefined,
      tabIndex: disabled ? -1 : undefined
    };
  }, [disabled, href, referrerPolicy, rel, target]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    if (props.onClick) {
      for (const clickHandler of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
        clickHandler(e);
      }
    }

    if (props.href && props.navigate && !isExternal) {
      props.navigate(e);
    }
  };

  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      {...computedProps}
      {...props}
      onClick={onClick}
    >
      <Slottable> {children}</Slottable>
    </Comp>
  );
}
