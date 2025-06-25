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