import type { MaybeArray } from '@novaui/primitives';
import type { ReactNode } from 'react';

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
