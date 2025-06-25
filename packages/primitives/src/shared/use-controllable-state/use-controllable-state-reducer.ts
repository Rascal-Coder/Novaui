import * as React from 'react';

import { useEffectEvent } from '../use-effect-event';

type ChangeHandler<T> = (state: T) => void;

interface UseControllableStateParams<T> {
  prop: T | undefined;
  defaultProp: T;
  onChange: ChangeHandler<T> | undefined;
}

interface AnyAction {
  type: string;
}

const SYNC_STATE = Symbol('RADIX:SYNC_STATE');

interface SyncStateAction<T> {
  type: typeof SYNC_STATE;
  state: T;
}

export function useControllableStateReducer<T, S extends {}, A extends AnyAction>(
  reducer: (prevState: S & { state: T }, action: A) => S & { state: T },
  userArgs: UseControllableStateParams<T>,
  initialState: S
): [S & { state: T }, React.Dispatch<A>];

export function useControllableStateReducer<T, S extends {}, I, A extends AnyAction>(
  reducer: (prevState: S & { state: T }, action: A) => S & { state: T },
  userArgs: UseControllableStateParams<T>,
  initialArg: I,
  init: (i: I & { state: T }) => S
): [S & { state: T }, React.Dispatch<A>];

// eslint-disable-next-line max-params
export function useControllableStateReducer<T, S extends {}, A extends AnyAction>(
  reducer: (prevState: S & { state: T }, action: A) => S & { state: T },
  userArgs: UseControllableStateParams<T>,
  initialArg: any,
  init?: (i: any) => Omit<S, 'state'>
): [S & { state: T }, React.Dispatch<A>] {
  const { prop: controlledState, defaultProp, onChange: onChangeProp } = userArgs;
  const isControlled = controlledState !== undefined;

  const onChange = useEffectEvent(onChangeProp);

  /* eslint-enable react-hooks/rules-of-hooks */

  type InternalState = S & { state: T };
  const args: [InternalState] = [{ ...initialArg, state: defaultProp }];
  if (init) {
    // @ts-expect-error - Pushing to tuple type to dynamically construct useReducer arguments
    args.push(init);
  }

  const [internalState, dispatch] = React.useReducer(
    (state: InternalState, action: A | SyncStateAction<T>): InternalState => {
      if (action.type === SYNC_STATE) {
        return { ...state, state: action.state };
      }

      const next = reducer(state, action);
      if (isControlled && !Object.is(next.state, state.state)) {
        onChange(next.state);
      }
      return next;
    },
    ...args
  );

  const uncontrolledState = internalState.state;
  const prevValueRef = React.useRef(uncontrolledState);
  React.useEffect(() => {
    if (prevValueRef.current !== uncontrolledState) {
      prevValueRef.current = uncontrolledState;
      if (!isControlled) {
        onChange(uncontrolledState);
      }
    }
  }, [onChange, uncontrolledState, prevValueRef, isControlled]);

  const state = React.useMemo(() => {
    if (controlledState !== undefined) {
      return { ...internalState, state: controlledState };
    }

    return internalState;
  }, [internalState, controlledState]);

  React.useEffect(() => {
    // Sync internal state for controlled components so that reducer is called
    // with the correct state values
    if (isControlled && !Object.is(controlledState, internalState.state)) {
      dispatch({ type: SYNC_STATE, state: controlledState });
    }
  }, [controlledState, internalState.state, isControlled]);

  return [state, dispatch as React.Dispatch<A>];
}
