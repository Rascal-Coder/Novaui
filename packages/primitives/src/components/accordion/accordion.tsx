/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';

import { createContextScope } from '../../context';
import type { Scope } from '../../context';
import { composeEventHandlers, createCollection, useControllableState, useId } from '../../shared';
import { createCollapsibleScope } from '../collapsible';
import * as CollapsiblePrimitive from '../collapsible';
import { useComposedRefs } from '../compose-refs';
import { useDirection } from '../direction';
import { Primitive } from '../primitive';

type Direction = 'ltr' | 'rtl';

/* -------------------------------------------------------------------------------------------------
 * Accordion
 * ----------------------------------------------------------------------------------------------- */

const ACCORDION_NAME = 'Accordion';
const ACCORDION_KEYS = ['Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

const [Collection, useCollection, createCollectionScope] = createCollection<AccordionTriggerElement>(ACCORDION_NAME);

type ScopedProps<P> = P & { __scopeAccordion?: Scope };
const [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
const useCollapsibleScope = createCollapsibleScope();

type AccordionElement = AccordionImplMultipleElement | AccordionImplSingleElement;
interface AccordionSingleProps extends AccordionImplSingleProps {
  type: 'single';
}
interface AccordionMultipleProps extends AccordionImplMultipleProps {
  type: 'multiple';
}

const Accordion = React.forwardRef<AccordionElement, AccordionSingleProps | AccordionMultipleProps>(
  (props: ScopedProps<AccordionSingleProps | AccordionMultipleProps>, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps as AccordionImplSingleProps;
    const multipleProps = accordionProps as AccordionImplMultipleProps;
    return (
      <Collection.Provider scope={props.__scopeAccordion}>
        {type === 'multiple' ? (
          <AccordionImplMultiple
            {...multipleProps}
            ref={forwardedRef}
          />
        ) : (
          <AccordionImplSingle
            {...singleProps}
            ref={forwardedRef}
          />
        )}
      </Collection.Provider>
    );
  }
);

Accordion.displayName = ACCORDION_NAME;

/* ----------------------------------------------------------------------------------------------- */

type AccordionValueContextValue = {
  value: string[];
  onItemOpen(value: string): void;
  onItemClose(value: string): void;
};

const [AccordionValueProvider, useAccordionValueContext] =
  createAccordionContext<AccordionValueContextValue>(ACCORDION_NAME);

const [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(ACCORDION_NAME, {
  collapsible: false
});

type AccordionImplSingleElement = AccordionImplElement;
interface AccordionImplSingleProps extends AccordionImplProps {
  /** The controlled stateful value of the accordion item whose content is expanded. */
  value?: string;
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use `defaultValue` if you
   * do not need to control the state of an accordion.
   */
  defaultValue?: string;
  /** The callback that fires when the state of the accordion changes. */
  onValueChange?(value: string): void;
  /**
   * Whether an accordion item can be collapsed after it has been opened.
   *
   * @default false
   */
  collapsible?: boolean;
}

const AccordionImplSingle = React.forwardRef<AccordionImplSingleElement, AccordionImplSingleProps>(
  (props: ScopedProps<AccordionImplSingleProps>, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {},
      collapsible = true,
      ...accordionSingleProps
    } = props;

    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? '',
      onChange: onValueChange
      // caller: ACCORDION_NAME
    });

    return (
      <AccordionValueProvider
        scope={props.__scopeAccordion}
        value={React.useMemo(() => (value ? [value] : []), [value])}
        onItemClose={React.useCallback(() => collapsible && setValue(''), [collapsible, setValue])}
        onItemOpen={setValue}
      >
        <AccordionCollapsibleProvider
          collapsible={collapsible}
          scope={props.__scopeAccordion}
        >
          <AccordionImpl
            {...accordionSingleProps}
            ref={forwardedRef}
          />
        </AccordionCollapsibleProvider>
      </AccordionValueProvider>
    );
  }
);

AccordionImplSingle.displayName = 'AccordionImplSingle';

/* ----------------------------------------------------------------------------------------------- */

type AccordionImplMultipleElement = AccordionImplElement;
interface AccordionImplMultipleProps extends AccordionImplProps {
  /** The controlled stateful value of the accordion items whose contents are expanded. */
  value?: string[];
  /**
   * The value of the items whose contents are expanded when the accordion is initially rendered. Use `defaultValue` if
   * you do not need to control the state of an accordion.
   */
  defaultValue?: string[];
  /** The callback that fires when the state of the accordion changes. */
  onValueChange?(value: string[]): void;
}

const AccordionImplMultiple = React.forwardRef<AccordionImplMultipleElement, AccordionImplMultipleProps>(
  (props: ScopedProps<AccordionImplMultipleProps>, forwardedRef) => {
    const { value: valueProp, defaultValue, onValueChange = () => {}, ...accordionMultipleProps } = props;

    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? [],
      onChange: onValueChange
    });

    const handleItemOpen = React.useCallback(
      (itemValue: string) => setValue((prevValue = []) => [...prevValue, itemValue]),
      [setValue]
    );

    const handleItemClose = React.useCallback(
      (itemValue: string) => setValue((prevValue = []) => prevValue.filter(item => item !== itemValue)),
      [setValue]
    );

    return (
      <AccordionValueProvider
        scope={props.__scopeAccordion}
        value={value}
        onItemClose={handleItemClose}
        onItemOpen={handleItemOpen}
      >
        <AccordionCollapsibleProvider
          collapsible={true}
          scope={props.__scopeAccordion}
        >
          <AccordionImpl
            {...accordionMultipleProps}
            ref={forwardedRef}
          />
        </AccordionCollapsibleProvider>
      </AccordionValueProvider>
    );
  }
);

AccordionImplMultiple.displayName = 'AccordionImplMultiple';

/* ----------------------------------------------------------------------------------------------- */

type AccordionImplContextValue = {
  disabled?: boolean;
  direction: AccordionImplProps['dir'];
  orientation: AccordionImplProps['orientation'];
};

const [AccordionImplProvider, useAccordionContext] = createAccordionContext<AccordionImplContextValue>(ACCORDION_NAME);

type AccordionImplElement = React.ComponentRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface AccordionImplProps extends PrimitiveDivProps {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The layout in which the Accordion operates.
   *
   * @default vertical
   */
  orientation?: React.AriaAttributes['aria-orientation'];
  /** The language read direction. */
  dir?: Direction;
}

const AccordionImpl = React.forwardRef<AccordionImplElement, AccordionImplProps>(
  (props: ScopedProps<AccordionImplProps>, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = 'vertical', ...accordionProps } = props;
    const accordionRef = React.useRef<AccordionImplElement>(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === 'ltr';

    const handleKeyDown = composeEventHandlers(props.onKeyDown, event => {
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target as HTMLElement;
      const triggerCollection = getItems().filter(item => !item.ref.current?.disabled);
      const triggerIndex = triggerCollection.findIndex(item => item.ref.current === target);
      const triggerCount = triggerCollection.length;

      if (triggerIndex === -1) return;

      // Prevents page scroll while user is navigating
      event.preventDefault();

      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;

      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };

      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };

      switch (event.key) {
        case 'Home':
          nextIndex = homeIndex;
          break;
        case 'End':
          nextIndex = endIndex;
          break;
        case 'ArrowRight':
          if (orientation === 'horizontal') {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case 'ArrowDown':
          if (orientation === 'vertical') {
            moveNext();
          }
          break;
        case 'ArrowLeft':
          if (orientation === 'horizontal') {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case 'ArrowUp':
          if (orientation === 'vertical') {
            movePrev();
          }
          break;
        default:
          break;
      }

      const clampedIndex = nextIndex % triggerCount;
      triggerCollection[clampedIndex]!.ref.current?.focus();
    });

    return (
      <AccordionImplProvider
        direction={dir}
        disabled={disabled}
        orientation={orientation}
        scope={__scopeAccordion}
      >
        <Collection.Slot scope={__scopeAccordion}>
          <Primitive.div
            {...accordionProps}
            data-orientation={orientation}
            ref={composedRefs}
            onKeyDown={disabled ? undefined : handleKeyDown}
          />
        </Collection.Slot>
      </AccordionImplProvider>
    );
  }
);

AccordionImpl.displayName = 'AccordionImpl';

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * ----------------------------------------------------------------------------------------------- */

const ITEM_NAME = 'AccordionItem';

type AccordionItemContextValue = { open?: boolean; disabled?: boolean; triggerId: string };
const [AccordionItemProvider, useAccordionItemContext] = createAccordionContext<AccordionItemContextValue>(ITEM_NAME);

type AccordionItemElement = React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleRoot>;
type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleRoot>;
interface AccordionItemProps extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /** A string value for the accordion item. All items within an accordion should use a unique value. */
  value: string;
}

/** `AccordionItem` contains all of the parts of a collapsible section inside of an `Accordion`. */
const AccordionItem = React.forwardRef<AccordionItemElement, AccordionItemProps>(
  (props: ScopedProps<AccordionItemProps>, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = (value && valueContext.value.includes(value)) || false;
    const disabled = accordionContext.disabled || props.disabled;

    return (
      <AccordionItemProvider
        disabled={disabled}
        open={open}
        scope={__scopeAccordion}
        triggerId={triggerId}
      >
        <CollapsiblePrimitive.CollapsibleRoot
          data-orientation={accordionContext.orientation}
          data-state={getState(open)}
          {...collapsibleScope}
          {...accordionItemProps}
          disabled={disabled}
          open={open}
          ref={forwardedRef}
          onOpenChange={isOpen => {
            if (isOpen) {
              valueContext.onItemOpen(value);
            } else {
              valueContext.onItemClose(value);
            }
          }}
        />
      </AccordionItemProvider>
    );
  }
);

AccordionItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * AccordionHeader
 * ----------------------------------------------------------------------------------------------- */

const HEADER_NAME = 'AccordionHeader';

type AccordionHeaderElement = React.ComponentRef<typeof Primitive.h3>;
type PrimitiveHeading3Props = React.ComponentPropsWithoutRef<typeof Primitive.h3>;
interface AccordionHeaderProps extends PrimitiveHeading3Props {}

/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible whether or not its
 * content is collapsed.
 */
const AccordionHeader = React.forwardRef<AccordionHeaderElement, AccordionHeaderProps>(
  (props: ScopedProps<AccordionHeaderProps>, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return (
      <Primitive.h3
        data-disabled={itemContext.disabled ? '' : undefined}
        data-orientation={accordionContext.orientation}
        data-state={getState(itemContext.open)}
        {...headerProps}
        ref={forwardedRef}
      />
    );
  }
);

AccordionHeader.displayName = HEADER_NAME;

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * ----------------------------------------------------------------------------------------------- */

const TRIGGER_NAME = 'AccordionTrigger';

type AccordionTriggerElement = React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleTrigger>;
type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>;
interface AccordionTriggerProps extends CollapsibleTriggerProps {}

/**
 * `AccordionTrigger` is the trigger that toggles the collapsed state of an `AccordionItem`. It should always be nested
 * inside of an `AccordionHeader`.
 */
const AccordionTrigger = React.forwardRef<AccordionTriggerElement, AccordionTriggerProps>(
  (props: ScopedProps<AccordionTriggerProps>, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return (
      <Collection.ItemSlot scope={__scopeAccordion}>
        <CollapsiblePrimitive.CollapsibleTrigger
          aria-disabled={(itemContext.open && !collapsibleContext.collapsible) || undefined}
          data-orientation={accordionContext.orientation}
          id={itemContext.triggerId}
          {...collapsibleScope}
          {...triggerProps}
          ref={forwardedRef}
        />
      </Collection.ItemSlot>
    );
  }
);

AccordionTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * AccordionContent
 * ----------------------------------------------------------------------------------------------- */

const CONTENT_NAME = 'AccordionContent';

type AccordionContentElement = React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>;
type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>;
interface AccordionContentProps extends CollapsibleContentProps {}

/** `AccordionContent` contains the collapsible content for an `AccordionItem`. */
const AccordionContent = React.forwardRef<AccordionContentElement, AccordionContentProps>(
  (props: ScopedProps<AccordionContentProps>, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return (
      <CollapsiblePrimitive.CollapsibleContent
        aria-labelledby={itemContext.triggerId}
        data-orientation={accordionContext.orientation}
        role="region"
        {...collapsibleScope}
        {...contentProps}
        ref={forwardedRef}
        style={{
          ['--nova-accordion-content-height' as any]: 'var(--nova-collapsible-content-height)',
          ['--nova-accordion-content-width' as any]: 'var(--nova-collapsible-content-width)',
          ...props.style
        }}
      />
    );
  }
);

AccordionContent.displayName = CONTENT_NAME;

/* ----------------------------------------------------------------------------------------------- */

function getState(open?: boolean) {
  return open ? 'open' : 'closed';
}

const Root = Accordion;
const Item = AccordionItem;
const Header = AccordionHeader;
const Trigger = AccordionTrigger;
const Content = AccordionContent;

export {
  // eslint-disable-next-line react-refresh/only-export-components
  createAccordionScope,
  //
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  //
  Root as AccordionRoot,
  Item,
  Header,
  Trigger,
  Content
};
export type {
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps
};
