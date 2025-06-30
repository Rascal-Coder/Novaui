import * as React from 'react';

import type { Scope } from '../../context';
import { createContextScope } from '../../context';
import { Presence, composeEventHandlers, useControllableState, useId, useLayoutEffect } from '../../shared';
import { useComposedRefs } from '../compose-refs';
import { Primitive } from '../primitive';

// 组件名称常量
const COLLAPSIBLE_NAME = 'Collapsible';
const CONTENT_IMPL_NAME = 'CollapsibleContentImpl';
const CONTENT_NAME = 'CollapsibleContent';

/* -------------------------------------------------------------------------------------------------
 * Collapsible - 可折叠组件根组件
 * ----------------------------------------------------------------------------------------------- */

// 带作用域的 Props 类型
type ScopedProps<P> = P & { __scopeCollapsible?: Scope };

// 创建 Collapsible 上下文和作用域
const [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);

// Collapsible 上下文值类型定义
type CollapsibleContextValue = {
  contentId: string; // 内容区域的唯一ID
  disabled?: boolean; // 是否禁用
  open: boolean; // 是否展开
  onOpenToggle(): void; // 展开/折叠切换回调
};

// 创建 Collapsible Provider 和 Hook
const [CollapsibleProvider, useCollapsibleContext] =
  createCollapsibleContext<CollapsibleContextValue>(COLLAPSIBLE_NAME);

// Collapsible 组件类型定义
type CollapsibleElement = React.ComponentRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface CollapsibleProps extends PrimitiveDivProps {
  defaultOpen?: boolean; // 默认是否展开
  open?: boolean; // 受控的展开状态
  disabled?: boolean; // 是否禁用
  onOpenChange?(open: boolean): void; // 展开状态变化回调
}

// Collapsible 根组件实现
const Collapsible = React.forwardRef<CollapsibleElement, CollapsibleProps>(
  (props: ScopedProps<CollapsibleProps>, forwardedRef) => {
    const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;

    // 使用可控状态管理展开/折叠状态
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange
    });

    return (
      <CollapsibleProvider
        contentId={useId()} // 生成唯一的内容ID，用于无障碍访问
        disabled={disabled}
        open={open}
        scope={__scopeCollapsible}
        onOpenToggle={React.useCallback(() => setOpen(prevOpen => !prevOpen), [setOpen])}
      >
        <Primitive.div
          data-disabled={disabled ? '' : undefined}
          data-state={getState(open)}
          {...collapsibleProps}
          ref={forwardedRef}
        />
      </CollapsibleProvider>
    );
  }
);

Collapsible.displayName = COLLAPSIBLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * CollapsibleTrigger - 可折叠组件触发器
 * ----------------------------------------------------------------------------------------------- */

const TRIGGER_NAME = 'CollapsibleTrigger';

// CollapsibleTrigger 组件类型定义
type CollapsibleTriggerElement = React.ComponentRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface CollapsibleTriggerProps extends PrimitiveButtonProps {}

// CollapsibleTrigger 触发器组件实现
const CollapsibleTrigger = React.forwardRef<CollapsibleTriggerElement, CollapsibleTriggerProps>(
  (props: ScopedProps<CollapsibleTriggerProps>, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME, __scopeCollapsible);
    return (
      <Primitive.button
        aria-controls={context.contentId} // 无障碍访问：指定控制的内容区域
        aria-expanded={context.open || false} // 无障碍访问：指示展开状态
        data-disabled={context.disabled ? '' : undefined}
        data-state={getState(context.open)}
        disabled={context.disabled}
        type="button"
        {...triggerProps}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
      />
    );
  }
);

CollapsibleTrigger.displayName = TRIGGER_NAME;

/* ----------------------------------------------------------------------------------------------- */

// CollapsibleContentImpl 内部实现组件类型定义
type CollapsibleContentImplElement = React.ComponentRef<typeof Primitive.div>;
interface CollapsibleContentImplProps extends PrimitiveDivProps {
  present: boolean; // 是否存在于DOM中
}

// CollapsibleContentImpl 内容区域内部实现
const CollapsibleContentImpl = React.forwardRef<CollapsibleContentImplElement, CollapsibleContentImplProps>(
  (props: ScopedProps<CollapsibleContentImplProps>, forwardedRef) => {
    const { __scopeCollapsible, present, children, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME, __scopeCollapsible);

    // 管理内容是否在DOM中存在的状态
    const [isPresent, setIsPresent] = React.useState(present);
    const ref = React.useRef<CollapsibleContentImplElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

    // 存储高度和宽度的引用，用于动画计算
    const heightRef = React.useRef<number | undefined>(0);
    const height = heightRef.current;
    const widthRef = React.useRef<number | undefined>(0);
    const width = widthRef.current;

    // 展开时立即显示以获取尺寸，折叠时延迟隐藏以获取尺寸后再关闭
    const isOpen = context.open || isPresent;

    // 防止初始挂载时的动画
    const isMountAnimationPreventedRef = React.useRef(isOpen);

    // 存储原始样式，用于动画恢复
    const originalStylesRef = React.useRef<Record<string, string>>(undefined);

    // 防止初始挂载动画的副作用
    React.useEffect(() => {
      const rAF = requestAnimationFrame(() => (isMountAnimationPreventedRef.current = false));
      return () => cancelAnimationFrame(rAF);
    }, []);

    // 布局副作用：计算元素尺寸并管理动画
    useLayoutEffect(() => {
      const node = ref.current;
      if (node) {
        // 保存原始样式（如果尚未保存）
        originalStylesRef.current ||= {
          transitionDuration: node.style.transitionDuration,
          animationName: node.style.animationName
        };

        // 阻止任何动画/过渡，使元素以完整尺寸渲染
        node.style.transitionDuration = '0s';
        node.style.animationName = 'none';

        // 从完整尺寸获取宽度和高度
        const rect = node.getBoundingClientRect();
        heightRef.current = rect.height;
        widthRef.current = rect.width;

        // 如果不是初始挂载，则恢复原来设置的动画/过渡
        if (!isMountAnimationPreventedRef.current) {
          node.style.transitionDuration = originalStylesRef.current.transitionDuration!;
          node.style.animationName = originalStylesRef.current.animationName!;
        }

        setIsPresent(present);
      }
      /** 依赖 `context.open` 是因为当触发关闭时它会变为 `false`，但 `present` 会在动画结束时变为 `false` （即关闭完成时）。这允许我们在关闭_之前_获取尺寸。 */
    }, [context.open, present]);

    return (
      <Primitive.div
        data-disabled={context.disabled ? '' : undefined}
        data-state={getState(context.open)}
        hidden={!isOpen}
        id={context.contentId}
        {...contentProps}
        ref={composedRefs}
        style={{
          // 设置CSS自定义属性，供外部CSS动画使用
          [`--nova-collapsible-content-height` as any]: height ? `${height}px` : undefined,
          [`--nova-collapsible-content-width` as any]: width ? `${width}px` : undefined,
          ...props.style
        }}
      >
        {isOpen && children}
      </Primitive.div>
    );
  }
);

CollapsibleContentImpl.displayName = CONTENT_IMPL_NAME;

/* ----------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------
 * CollapsibleContent - 可折叠组件内容区域
 * ----------------------------------------------------------------------------------------------- */

// CollapsibleContent 组件类型定义
type CollapsibleContentElement = CollapsibleContentImplElement;
interface CollapsibleContentProps extends Omit<CollapsibleContentImplProps, 'present'> {
  /** 用于在需要更多控制时强制挂载。在使用 React 动画库控制动画时很有用。 */
  forceMount?: true;
}

// CollapsibleContent 内容组件实现
const CollapsibleContent = React.forwardRef<CollapsibleContentElement, CollapsibleContentProps>(
  (props: ScopedProps<CollapsibleContentProps>, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME, props.__scopeCollapsible);
    return (
      <Presence present={forceMount || context.open}>
        {({ present }) => (
          <CollapsibleContentImpl
            {...contentProps}
            present={present}
            ref={forwardedRef}
          />
        )}
      </Presence>
    );
  }
);

CollapsibleContent.displayName = CONTENT_NAME;

// 根据展开状态获取状态字符串
function getState(open?: boolean) {
  return open ? 'open' : 'closed';
}

// 导出别名
const Root = Collapsible;
// const Trigger = CollapsibleTrigger;
// const Content = CollapsibleContent;

export {
  createCollapsibleScope,
  //
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  //
  Root as CollapsibleRoot
  // Trigger
  // Content
};
export type { CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps };
