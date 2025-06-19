import type { CardSlots, ThemeSize } from '@novaui/variants';
import type { PropsWithChildren } from 'react';

interface ClassValueChildren extends PropsWithChildren {
  className?: string;
  asChild?: boolean;
}

export interface CardRootProps extends ClassValueChildren {
  size?: ThemeSize;
  split?: boolean;
}

export interface CardHeaderProps extends ClassValueChildren {
  size?: ThemeSize;
}

export interface CardTitleRootProps extends ClassValueChildren {
  size?: ThemeSize;
}

export interface CardTitleProps extends ClassValueChildren {
  size?: ThemeSize;
}

export interface CardContentProps extends ClassValueChildren {
  size?: ThemeSize;
  /**
   * If true, the content will be flex-grow and overflow-hidden
   *
   * @default false
   */
  flexHeight?: boolean;
}

export interface CardFooterProps extends ClassValueChildren {
  size?: ThemeSize;
}

export type CardUi = Partial<Record<CardSlots, string>>;

export interface CardProps extends CardRootProps {
  ui?: CardUi;
  title?: string;
  /**
   * If true, the content will be flex-grow and overflow-hidden
   *
   * @default false
   */
  flexHeight?: boolean;
}
