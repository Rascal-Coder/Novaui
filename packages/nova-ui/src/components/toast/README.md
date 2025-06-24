# Toast 消息通知

Toast组件用于向用户显示临时性的消息通知，支持多种类型、自动消失、手动关闭等功能。

## 特性

- 🎨 **多种类型**：支持成功、警告、错误、信息四种消息类型
- 🔄 **自动管理**：自动显示和隐藏，支持堆叠显示
- 🎯 **操作支持**：支持自定义操作按钮
- 🌈 **图标显示**：内置图标系统，直观表达消息类型
- ⚡ **高性能**：使用Context和useReducer优化性能
- 📱 **响应式**：支持触摸手势关闭
- 🎛️ **高度可定制**：支持自定义样式和UI配置

## 基本用法

### 1. 设置Provider

首先在应用根部包装ToastProvider：

```tsx
import { Toast } from '@novaui/nova-ui';

function App() {
  return (
    <Toast.Provider>
      <YourApp />
    </Toast.Provider>
  );
}
```

### 2. 使用useToast Hook

```tsx
import { useToast } from '@novaui/nova-ui';

function MyComponent() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: '成功',
      description: '操作已完成！',
      iconType: 'success'
    });
  };

  return <button onClick={showToast}>显示Toast</button>;
}
```

### 3. 手动组合使用

```tsx
import { Toast } from '@novaui/nova-ui';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Root open={open} onOpenChange={setOpen}>
      <Toast.Title>提示</Toast.Title>
      <Toast.Description>这是一条消息</Toast.Description>
      <Toast.Action altText="查看详情">查看</Toast.Action>
      <Toast.Close />
    </Toast.Root>
  );
}
```

## API 文档

### Toast.Provider

Toast的根提供者组件，管理所有Toast的状态和生命周期。

```tsx
interface ToastProviderProps {
  children?: ReactNode;
  ui?: ToastUi;                    // UI自定义配置
  toastLimit?: number;             // 最大Toast数量，默认1
  toastRemoveDelay?: number;       // 移除延迟，默认1000000ms
  label?: string;                  // 无障碍标签，默认'通知'
  duration?: number;               // 显示时长，默认5000ms
  swipeDirection?: 'up' | 'down' | 'left' | 'right'; // 滑动方向，默认'right'
  swipeThreshold?: number;         // 滑动阈值，默认50px
}
```

### Toast.Viewport

Toast的视口容器，定义Toast的显示区域。

```tsx
interface ToastViewportProps {
  size?: ThemeSize;
  hotkey?: string[];              // 快捷键
  label?: string;                 // 无障碍标签
}
```

### Toast.Root

单个Toast的根容器。

```tsx
interface ToastRootProps {
  size?: ThemeSize;
  iconType?: 'destructive' | 'success' | 'warning' | 'info';
  richColor?: ThemeColor;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;              // 覆盖Provider的duration
  type?: 'foreground' | 'background';
}
```

### Toast.Title

Toast的标题组件。

```tsx
interface ToastTitleProps {
  size?: ThemeSize;
  titleLeading?: ReactNode;       // 标题前置内容
  titleTrailing?: ReactNode;      // 标题后置内容
}
```

### Toast.Description

Toast的描述内容组件。

```tsx
interface ToastDescriptionProps extends ComponentPropsWithoutRef<'div'> {}
```

### Toast.Action

Toast的操作按钮组件。

```tsx
interface ToastActionProps extends ButtonProps {
  altText: string;                // 必需的无障碍文本
}
```

### Toast.Close

Toast的关闭按钮组件。

```tsx
interface ToastCloseProps {
  size?: ThemeSize;
}
```

### useToast Hook

用于管理Toast状态的Hook。

```tsx
interface UseToastReturn {
  toasts: ToastState[];           // 当前活跃的Toast列表
  toast: (props: ToastOptions) => ToastReturn;  // 创建Toast
  dismiss: (toastId?: string) => void;          // 关闭Toast
}

interface ToastOptions {
  title?: string;
  description?: ReactNode;
  iconType?: 'destructive' | 'success' | 'warning' | 'info';
  action?: ReactNode;
  duration?: number;
  // ... 其他Toast.Root属性
}

interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: ToastState) => void;
}
```

## 使用示例

### 不同类型的Toast

```tsx
function Examples() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: '成功',
      description: '操作成功完成',
      iconType: 'success'
    });
  };

  const showWarning = () => {
    toast({
      title: '警告',
      description: '请注意检查输入',
      iconType: 'warning'
    });
  };

  const showError = () => {
    toast({
      title: '错误',
      description: '操作失败，请重试',
      iconType: 'destructive'
    });
  };

  const showInfo = () => {
    toast({
      title: '提示',
      description: '这是一条信息',
      iconType: 'info'
    });
  };

  return (
    <div>
      <button onClick={showSuccess}>成功</button>
      <button onClick={showWarning}>警告</button>
      <button onClick={showError}>错误</button>
      <button onClick={showInfo}>信息</button>
    </div>
  );
}
```

### 带操作按钮的Toast

```tsx
function ActionExample() {
  const { toast } = useToast();

  const showActionToast = () => {
    toast({
      title: '新消息',
      description: '您有一条新消息',
      iconType: 'info',
      action: (
        <Toast.Action altText="查看详情" onClick={() => console.log('查看')}>
          查看
        </Toast.Action>
      )
    });
  };

  return <button onClick={showActionToast}>显示带操作的Toast</button>;
}
```

### 批量显示Toast

```tsx
function BatchExample() {
  const { toast } = useToast();

  const showMultiple = () => {
    const messages = [
      { title: '步骤1', description: '开始处理', iconType: 'info' as const },
      { title: '步骤2', description: '处理中...', iconType: 'warning' as const },
      { title: '步骤3', description: '处理完成', iconType: 'success' as const }
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => toast(msg), index * 1000);
    });
  };

  return <button onClick={showMultiple}>批量显示</button>;
}
```

### 手动控制Toast

```tsx
function ManualControl() {
  const { toast, dismiss } = useToast();

  const showPersistent = () => {
    const { id } = toast({
      title: '持久化消息',
      description: '这条消息不会自动消失',
      duration: Infinity,
      iconType: 'info'
    });

    // 5秒后手动关闭
    setTimeout(() => dismiss(id), 5000);
  };

  return (
    <div>
      <button onClick={showPersistent}>显示持久化Toast</button>
      <button onClick={() => dismiss()}>关闭所有Toast</button>
    </div>
  );
}
```

### 自定义样式

```tsx
function CustomStyle() {
  const customUi = {
    root: 'custom-toast-root',
    title: 'custom-toast-title',
    description: 'custom-toast-description',
    action: 'custom-toast-action',
    close: 'custom-toast-close'
  };

  return (
    <Toast.Provider ui={customUi}>
      <YourApp />
      <Toast.Viewport />
    </Toast.Provider>
  );
}
```

## 组件结构

```
Toast.Provider
├── Toast.Viewport          // 显示容器
└── Toast (自动渲染)
    └── Toast.Root          // 单个Toast容器
        ├── Toast.Title     // 标题(可包含图标)
        ├── Toast.Description // 描述内容
        ├── Toast.Action    // 操作按钮(可选)
        └── Toast.Close     // 关闭按钮
```

## 最佳实践

### 1. 合理设置显示时长

```tsx
// 短消息用较短时长
toast({ title: '已复制', duration: 2000 });

// 重要消息用较长时长
toast({
  title: '错误',
  description: '详细错误信息...',
  duration: 8000
});
```

### 2. 控制Toast数量

```tsx
<Toast.Provider toastLimit={3}>
  {/* 最多同时显示3个Toast */}
</Toast.Provider>
```

### 3. 无障碍支持

```tsx
// 为操作按钮提供altText
<Toast.Action altText="查看订单详情">查看</Toast.Action>

// 为Provider设置合适的label
<Toast.Provider label="系统通知">
```

### 4. 错误处理

```tsx
async function handleSubmit() {
  try {
    await submitForm();
    toast({
      title: '提交成功',
      iconType: 'success'
    });
  } catch (error) {
    toast({
      title: '提交失败',
      description: error.message,
      iconType: 'destructive'
    });
  }
}
```

### 5. 避免Toast滥用

```tsx
// ✅ 好的做法 - 重要操作反馈
toast({ title: '文件已保存', iconType: 'success' });

// ❌ 避免 - 过于频繁的提示
// 不要为每个小操作都显示Toast
```

## 注意事项

1. **性能考虑**：避免短时间内创建大量Toast
2. **用户体验**：重要消息可设置较长duration或添加操作按钮
3. **无障碍**：确保为Toast.Action提供altText
4. **样式覆盖**：使用ui prop进行样式定制
5. **移动端适配**：合理设置swipeDirection和swipeThreshold

## 类型定义

完整的类型定义请参考 `types.ts` 文件。
