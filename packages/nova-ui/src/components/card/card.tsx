import { Slot } from '@novaui/primitives';
import React from 'react';

import CardContent from './card-content';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardRoot from './card-root';
import CardTitle from './card-title';
import CardTitleRoot from './card-title-root';
import type { CardProps } from './types';

// Create slot-based card components
const CardHeaderSlot = Slot;
const CardTitleSlot = Slot;
const CardTitleRootSlot = Slot;
const CardContentSlot = Slot;
const CardFooterSlot = Slot;

export default function Card({ className, size, split, ui, children }: Omit<CardProps, 'title' | 'flexHeight'>) {
  return (
    <CardRoot
      className={className || ui?.root}
      size={size}
      split={split}
    >
      {children}
    </CardRoot>
  );
}

// Export enhanced components that work with slots
Card.Root = CardRoot;
Card.Header = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardHeader>>((props, ref) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <CardHeaderSlot
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardHeaderSlot ref={ref}>
      <CardHeader {...rest} />
    </CardHeaderSlot>
  );
});
Card.Header.displayName = 'Card.Header';

Card.Title = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardTitle>>((props, ref) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <CardTitleSlot
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardTitleSlot ref={ref}>
      <CardTitle {...rest} />
    </CardTitleSlot>
  );
});
Card.Title.displayName = 'Card.Title';

Card.TitleRoot = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardTitleRoot>>((props, ref) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <CardTitleRootSlot
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardTitleRootSlot ref={ref}>
      <CardTitleRoot {...rest} />
    </CardTitleRootSlot>
  );
});
Card.TitleRoot.displayName = 'Card.TitleRoot';

Card.Content = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardContent>>((props, ref) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <CardContentSlot
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardContentSlot ref={ref}>
      <CardContent {...rest} />
    </CardContentSlot>
  );
});
Card.Content.displayName = 'Card.Content';

Card.Footer = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardFooter>>((props, ref) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <CardFooterSlot
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardFooterSlot ref={ref}>
      <CardFooter {...rest} />
    </CardFooterSlot>
  );
});
Card.Footer.displayName = 'Card.Footer';
