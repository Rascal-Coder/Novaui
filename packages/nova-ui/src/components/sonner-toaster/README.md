# SonnerToaster 组件

一个功能丰富的Toast通知组件，基于Sonner实现，支持多种位置、热键操作和自定义样式。


## 安装

```bash
npm install nova-ui
```

## 基本使用

```tsx
import { SonnerToaster } from 'nova-ui';

function App() {
  return (
    <div>
      {/* 你的应用内容 */}
      <SonnerToaster />
    </div>
  );
}
```

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `position` | `ToastPosition` | `'bottom-right'` | Toast显示位置 |
| `hotkey` | `string[]` | `['altKey', 'KeyT']` | 打开Toast的快捷键组合 |
| `expand` | `boolean` | `false` | 是否默认展开Toast |
| `offset` | `string \| number` | - | Toast与视口边缘的偏移量 |
| `duration` | `number` | - | Toast显示持续时间（毫秒） |
| `visibleToasts` | `number` | `3` | 可见的Toast最大数量 |
| `toastOptions` | `object` | - | Toast的默认选项 |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | 文本方向 |
| `gap` | `number` | - | Toast之间的间距 |
| `containerAriaLabel` | `string` | `'Notifications'` | 容器的无障碍标签 |

### 位置选项 (ToastPosition)

- `'top-left'`
- `'top-center'`
- `'top-right'`
- `'bottom-left'`
- `'bottom-center'`
- `'bottom-right'`

## 使用示例

### 基本配置

```tsx
<SonnerToaster
  position="top-right"
  duration={5000}
  visibleToasts={5}
/>
```

### 自定义快捷键

```tsx
<SonnerToaster
  hotkey={['ctrlKey', 'KeyN']}
  containerAriaLabel="系统通知"
/>
```

### 自定义样式

```tsx
<SonnerToaster
  position="bottom-center"
  offset="20px"
  gap={8}
  expand={true}
/>
```

### 配合Toast使用

```tsx
import { SonnerToaster } from 'novaui';
import { toast } from './state';

function MyComponent() {
  const showToast = () => {
    toast('这是一条通知消息', {
      severity: 'success',
      position: 'top-right'
    });
  };

  return (
    <div>
      <button onClick={showToast}>显示通知</button>
      <SonnerToaster />
    </div>
  );
}
```

## 快捷键操作

- 默认快捷键：`Alt + T` 展开Toast列表
- `Escape` 键：收起Toast列表
- 焦点导航：支持键盘导航

## 可访问性

- 支持ARIA标签
- 键盘导航友好
- 屏幕阅读器兼容
- 焦点管理

## 样式定制

组件使用CSS变量进行样式定制：

```css
:root {
  --nova-front-sonner-toast-height: 80px;
  --nova-sonner-toast-offset: 16px;
  --nova-sonner-toast-width: 356px;
  --nova-sonner-toast-gap: 8px;
}
```

## 自定义 ActionButton 和 CloseButton

你可以通过 `toastDefaults` 选项传入自定义的 `ActionButton` 和 `CloseButton` 组件。

### 使用示例

```tsx
import { toast } from 'your-toast-library';
import { CustomActionButton, CustomCloseButton } from './custom-components';

// 配置自定义组件
const toastDefaults = {
  customActionButton: CustomActionButton,
  customCloseButton: CustomCloseButton,
  closeIcon: <YourCustomIcon />,
  duration: 5000,
  closeButton: true
};

// 使用自定义配置
toast('消息内容', {
  action: {
    label: '确认',
    onClick: () => console.log('点击了确认按钮')
  },
  closeButton: true
}, toastDefaults);
```

### 自定义 ActionButton 组件

```tsx
import type { ActionButtonProps } from './types';

const CustomActionButton = ({ action, deleteToast }: ActionButtonProps) => {
  return (
    <button
      className="custom-action-button"
      onClick={(event) => {
        action.onClick(event);
        if (!event.defaultPrevented) {
          deleteToast();
        }
      }}
    >
      {action.label}
    </button>
  );
};
```

### 自定义 CloseButton 组件

```tsx
import type { CloseButtonProps } from './types';

const CustomCloseButton = ({ closeButtonAriaLabel, deleteToast, closeIcon }: CloseButtonProps) => {
  return (
    <button
      aria-label={closeButtonAriaLabel}
      className="custom-close-button"
      onClick={deleteToast}
    >
      {closeIcon || <span>×</span>}
    </button>
  );
};
```

### 类型定义

```tsx
interface ActionButtonProps {
  action: SonnerToastAction;
  deleteToast: () => void;
}

interface CloseButtonProps {
  closeButtonAriaLabel?: string;
  deleteToast: () => void;
  closeIcon: ReactNode;
}
```

### 注意事项

1. 自定义组件必须接受相应的 props 参数
2. 在 `ActionButton` 中，确保在调用 `action.onClick` 后检查 `event.defaultPrevented`
3. 在 `CloseButton` 中，确保调用 `deleteToast` 来关闭 toast
4. 如果不提供自定义组件，将使用默认的组件实现
