import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * 将一个给定的 ref 设置为指定的 value。 这个工具函数自动处理不同类型的 ref：函数形式的 ref 和 RefObject。
 *
 * @param ref - 需要设置的 ref，可能是函数，也可能是 RefObject
 * @param value - 要赋值给 ref 的值，一般是对应的 DOM 元素或组件实例
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    return ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}

/** 一个用于组合多个 ref 的工具函数 可以同时接受 callback ref 和 RefObject 类型的 ref */
function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return node => {
    let hasCleanup = false;
    const cleanups = refs.map(ref => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === 'function') {
        hasCleanup = true;
      }
      return cleanup;
    });

    // 在 React 19 之前，callback ref 返回值会触发警告
    // 这里为了兼容 React 19 的 ref 清理机制做了处理
    // 如果用户提供的 ref 返回了函数（作为清理），则会返回一个新的清理函数
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === 'function') {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}

/** 一个自定义 Hook，用于组合多个 ref 同时接受 callback ref 和 RefObject 类型的 ref 使用 useCallback 保证返回的 ref 函数引用稳定 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}

export { composeRefs, useComposedRefs };
