import { Slot } from '@novaui/primitives';
import React, { createContext, useContext } from 'react';

import CardContent from './card-content';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardRoot from './card-root';
import CardTitle from './card-title';
import CardTitleRoot from './card-title-root';
import type { CardProps, CardUi } from './types';

// Create context for UI customization
const CardUiContext = createContext<CardUi | undefined>(undefined);

// Hook to use UI context
export const useCardUi = () => useContext(CardUiContext);

// Create slot-based card components
const CardHeaderSlot = Slot;
const CardTitleSlot = Slot;
const CardTitleRootSlot = Slot;
const CardContentSlot = Slot;
const CardFooterSlot = Slot;

export default function Card({ className, size, split, ui, children }: Omit<CardProps, 'title' | 'flexHeight'>) {
  return (
    <CardUiContext.Provider value={ui}>
      <CardRoot
        className={className || ui?.root}
        size={size}
        split={split}
      >
        {children}
      </CardRoot>
    </CardUiContext.Provider>
  );
}

// Export enhanced components that work with slots
Card.Root = CardRoot;
Card.Header = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardHeader>>((props, ref) => {
  const { asChild, className, ...rest } = props;
  const ui = useCardUi();

  if (asChild) {
    return (
      <CardHeaderSlot
        className={className || ui?.header}
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardHeaderSlot ref={ref}>
      <CardHeader
        className={className || ui?.header}
        {...rest}
      />
    </CardHeaderSlot>
  );
});
Card.Header.displayName = 'Card.Header';

Card.Title = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardTitle>>((props, ref) => {
  const { asChild, className, ...rest } = props;
  const ui = useCardUi();

  if (asChild) {
    return (
      <CardTitleSlot
        className={className || ui?.title}
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardTitleSlot ref={ref}>
      <CardTitle
        className={className || ui?.title}
        {...rest}
      />
    </CardTitleSlot>
  );
});
Card.Title.displayName = 'Card.Title';

Card.TitleRoot = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardTitleRoot>>((props, ref) => {
  const { asChild, className, ...rest } = props;
  const ui = useCardUi();

  if (asChild) {
    return (
      <CardTitleRootSlot
        className={className || ui?.titleRoot}
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardTitleRootSlot ref={ref}>
      <CardTitleRoot
        className={className || ui?.titleRoot}
        {...rest}
      />
    </CardTitleRootSlot>
  );
});
Card.TitleRoot.displayName = 'Card.TitleRoot';

Card.Content = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardContent>>((props, ref) => {
  const { asChild, className, ...rest } = props;
  const ui = useCardUi();

  if (asChild) {
    return (
      <CardContentSlot
        className={className || ui?.content}
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardContentSlot ref={ref}>
      <CardContent
        className={className || ui?.content}
        {...rest}
      />
    </CardContentSlot>
  );
});
Card.Content.displayName = 'Card.Content';

Card.Footer = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardFooter>>((props, ref) => {
  const { asChild, className, ...rest } = props;
  const ui = useCardUi();

  if (asChild) {
    return (
      <CardFooterSlot
        className={className || ui?.footer}
        ref={ref}
        {...rest}
      />
    );
  }
  return (
    <CardFooterSlot ref={ref}>
      <CardFooter
        className={className || ui?.footer}
        {...rest}
      />
    </CardFooterSlot>
  );
});
Card.Footer.displayName = 'Card.Footer';
