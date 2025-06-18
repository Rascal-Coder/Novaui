import { Primitive } from '@novaui/primitives';
import { type ReactNode, useMemo } from 'react';

export type AnchorTarget = '_blank' | '_parent' | '_self' | '_top' | (string & {}) | undefined;
export type AnchorRel = 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | undefined;
export type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

export type MaybeArray<T> = T | T[];
export interface AnchorLinkProps {
  href?: string;
  target?: AnchorTarget;
  rel?: AnchorRel;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  disabled?: boolean;
  onClick?: MaybeArray<(e: React.MouseEvent<HTMLAnchorElement>) => void | Promise<void>>;
  navigate?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isExternal?: boolean;
  children?: ReactNode;
}

export default function Link({
  target = '_blank',
  rel = 'noopener noreferrer',

  children,
  ...props
}: AnchorLinkProps) {
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

    if (props.href && props.navigate && !props.isExternal) {
      props.navigate(e);
    }
  };

  return (
    <Primitive.a
      {...computedProps}
      onClick={onClick}
    >
      {children}
    </Primitive.a>
  );
}
