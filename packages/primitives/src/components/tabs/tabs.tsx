import * as React from 'react';

import type { Scope } from '../../context';
import { createContextScope } from '../../context';
import { Presence, composeEventHandlers, useControllableState, useId } from '../../shared';
import { useDirection } from '../direction';
import { Primitive } from '../primitive';
import { RovingFocusGroupItem, RovingFocusGroupRoot, createRovingFocusGroupScope } from '../roving-focus';

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * ----------------------------------------------------------------------------------------------- */

const TABS_NAME = 'Tabs';

type ScopedProps<P> = P & { __scopeTabs?: Scope };
const [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
const useRovingFocusGroupScope = createRovingFocusGroupScope();

type TabsContextValue = {
  baseId: string;
  value: string;
  onValueChange: (value: string) => void;
  orientation?: TabsProps['orientation'];
  dir?: TabsProps['dir'];
  activationMode?: TabsProps['activationMode'];
};

const [TabsProvider, useTabsContext] = createTabsContext<TabsContextValue>(TABS_NAME);

type TabsElement = React.ComponentRef<typeof Primitive.div>;
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocusGroupRoot>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface TabsProps extends PrimitiveDivProps {
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** A function called when a new tab is selected */
  onValueChange?: (value: string) => void;
  /**
   * The orientation the tabs are layed out. Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   *
   * @defaultValue horizontal
   */
  orientation?: RovingFocusGroupProps['orientation'];
  /** The direction of navigation between toolbar items. */
  dir?: RovingFocusGroupProps['dir'];
  /**
   * Whether a tab is activated automatically or manually.
   *
   * @defaultValue automatic
   */
  activationMode?: 'automatic' | 'manual';
}

const Tabs = React.forwardRef<TabsElement, TabsProps>((props: ScopedProps<TabsProps>, forwardedRef) => {
  const {
    __scopeTabs,
    value: valueProp,
    onValueChange,
    defaultValue,
    orientation = 'horizontal',
    dir,
    activationMode = 'automatic',
    ...tabsProps
  } = props;
  const direction = useDirection(dir);
  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
    defaultProp: defaultValue ?? ''
  });

  return (
    <TabsProvider
      activationMode={activationMode}
      baseId={useId()}
      dir={direction}
      orientation={orientation}
      scope={__scopeTabs}
      value={value}
      onValueChange={setValue}
    >
      <Primitive.div
        data-orientation={orientation}
        dir={direction}
        {...tabsProps}
        ref={forwardedRef}
      />
    </TabsProvider>
  );
});

Tabs.displayName = TABS_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsList
 * ----------------------------------------------------------------------------------------------- */

const TAB_LIST_NAME = 'TabsList';

type TabsListElement = React.ComponentRef<typeof Primitive.div>;
interface TabsListProps extends PrimitiveDivProps {
  loop?: RovingFocusGroupProps['loop'];
}

const TabsList = React.forwardRef<TabsListElement, TabsListProps>((props: ScopedProps<TabsListProps>, forwardedRef) => {
  const { __scopeTabs, loop = true, ...listProps } = props;
  const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
  return (
    <RovingFocusGroupRoot
      asChild
      {...rovingFocusGroupScope}
      dir={context.dir}
      loop={loop}
      orientation={context.orientation}
    >
      <Primitive.div
        aria-orientation={context.orientation}
        role="tablist"
        {...listProps}
        ref={forwardedRef}
      />
    </RovingFocusGroupRoot>
  );
});

TabsList.displayName = TAB_LIST_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * ----------------------------------------------------------------------------------------------- */

const TRIGGER_NAME = 'TabsTrigger';

type TabsTriggerElement = React.ComponentRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface TabsTriggerProps extends PrimitiveButtonProps {
  value: string;
}

const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  (props: ScopedProps<TabsTriggerProps>, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return (
      <RovingFocusGroupItem
        asChild
        {...rovingFocusGroupScope}
        active={isSelected}
        focusable={!disabled}
      >
        <Primitive.button
          aria-controls={contentId}
          aria-selected={isSelected}
          data-disabled={disabled ? '' : undefined}
          data-state={isSelected ? 'active' : 'inactive'}
          disabled={disabled}
          id={triggerId}
          role="tab"
          type="button"
          {...triggerProps}
          ref={forwardedRef}
          onFocus={composeEventHandlers(props.onFocus, () => {
            // handle "automatic" activation if necessary
            // ie. activate tab following focus
            const isAutomaticActivation = context.activationMode !== 'manual';
            if (!isSelected && !disabled && isAutomaticActivation) {
              context.onValueChange(value);
            }
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, event => {
            if ([' ', 'Enter'].includes(event.key)) context.onValueChange(value);
          })}
          onMouseDown={composeEventHandlers(props.onMouseDown, event => {
            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onValueChange(value);
            } else {
              // prevent focus to avoid accidental activation
              event.preventDefault();
            }
          })}
        />
      </RovingFocusGroupItem>
    );
  }
);

TabsTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * ----------------------------------------------------------------------------------------------- */

const CONTENT_NAME = 'TabsContent';

type TabsContentElement = React.ComponentRef<typeof Primitive.div>;
interface TabsContentProps extends PrimitiveDivProps {
  value: string;

  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation
   * libraries.
   */
  forceMount?: true;
}

const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  (props: ScopedProps<TabsContentProps>, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = React.useRef(isSelected);

    React.useEffect(() => {
      const rAF = requestAnimationFrame(() => (isMountAnimationPreventedRef.current = false));
      return () => cancelAnimationFrame(rAF);
    }, []);

    return (
      <Presence present={forceMount || isSelected}>
        {({ present }) => (
          <Primitive.div
            aria-labelledby={triggerId}
            data-orientation={context.orientation}
            data-state={isSelected ? 'active' : 'inactive'}
            hidden={!present}
            id={contentId}
            role="tabpanel"
            tabIndex={0}
            {...contentProps}
            ref={forwardedRef}
            style={{
              ...props.style,
              animationDuration: isMountAnimationPreventedRef.current ? '0s' : undefined
            }}
          >
            {present && children}
          </Primitive.div>
        )}
      </Presence>
    );
  }
);

TabsContent.displayName = CONTENT_NAME;

/* ---------------------------------------------------------------------------------------------- */

function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`;
}

function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`;
}

const Root = Tabs;

export {
  createTabsScope,
  //
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  //
  Root as TabsRoot
};
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };
