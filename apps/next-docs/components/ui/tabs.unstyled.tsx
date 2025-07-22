'use client';

import {
  TabsContent as TabsContentPrimitive,
  TabsList as TabsListPrimitive,
  Tabs as TabsPrimitive,
  TabsTrigger as TabsTriggerPrimitive
} from '@novaui/primitives';
import { useEffectEvent } from 'fumadocs-core/utils/use-effect-event';
import { type ComponentProps, createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { mergeRefs } from '@/utils/merge-refs';

type ChangeListener = (v: string) => void;
const listeners = new Map<string, ChangeListener[]>();

function addChangeListener(id: string, listener: ChangeListener): void {
  const list = listeners.get(id) ?? [];
  list.push(listener);
  listeners.set(id, list);
}

function removeChangeListener(id: string, listener: ChangeListener): void {
  const list = listeners.get(id) ?? [];
  listeners.set(
    id,
    list.filter(item => item !== listener)
  );
}

export interface TabsProps extends ComponentProps<typeof TabsPrimitive> {
  /** Identifier for Sharing value of tabs */
  groupId?: string;

  /** Enable persistent */
  persist?: boolean;

  /** If true, updates the URL hash based on the tab's id */
  updateAnchor?: boolean;
}

const TabsContext = createContext<{
  valueToIdMap: Map<string, string>;
} | null>(null);

function useTabContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('You must wrap your component in <Tabs>');
  return ctx;
}

export const TabsList = TabsListPrimitive;

export const TabsTrigger = TabsTriggerPrimitive;

/** @internal You better not use it */
export function Tabs({
  ref,
  groupId,
  persist = false,
  updateAnchor = false,
  defaultValue,
  value: _value,
  onValueChange: _onValueChange,
  ...props
}: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = _value !== undefined ? _value : internalValue;

  const setValue = _value !== undefined ? (_onValueChange ?? (() => undefined)) : setInternalValue;

  const onChange = useEffectEvent((v: string) => setValue(v));

  const valueToIdMap = useMemo(() => new Map<string, string>(), []);

  useLayoutEffect(() => {
    if (!groupId) return;
    const previous = persist ? localStorage.getItem(groupId) : sessionStorage.getItem(groupId);

    if (previous) onChange(previous);
    addChangeListener(groupId, onChange);
    return () => {
      removeChangeListener(groupId, onChange);
    };
  }, [groupId, onChange, persist]);

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    for (const [val, id] of valueToIdMap.entries()) {
      if (id === hash) {
        onChange(val);
        tabsRef.current?.scrollIntoView();
        break;
      }
    }
  }, [onChange, valueToIdMap]);

  return (
    <TabsPrimitive
      ref={mergeRefs(ref, tabsRef)}
      value={value}
      onValueChange={(v: string) => {
        if (updateAnchor) {
          const id = valueToIdMap.get(v);

          if (id) {
            window.history.replaceState(null, '', `#${id}`);
          }
        }

        if (groupId) {
          listeners.get(groupId)?.forEach(item => {
            item(v);
          });

          if (persist) localStorage.setItem(groupId, v);
          else sessionStorage.setItem(groupId, v);
        } else {
          setValue(v);
        }
      }}
      {...props}
    >
      <TabsContext.Provider value={useMemo(() => ({ valueToIdMap }), [valueToIdMap])}>
        {props.children}
      </TabsContext.Provider>
    </TabsPrimitive>
  );
}

export function TabsContent({ value, ...props }: ComponentProps<typeof TabsContentPrimitive>) {
  const { valueToIdMap } = useTabContext();

  if (props.id) {
    valueToIdMap.set(value, props.id);
  }

  return (
    <TabsContentPrimitive
      value={value}
      {...props}
    >
      {props.children}
    </TabsContentPrimitive>
  );
}
