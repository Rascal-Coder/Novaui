# Sonner Toaster 变更日志

## [最新版本] - 添加自定义组件支持

### 新增功能

- **自定义 ActionButton 组件**: 现在可以通过 `toastDefaults.customActionButton` 传入自定义的操作按钮组件
- **自定义 CloseButton 组件**: 现在可以通过 `toastDefaults.customCloseButton` 传入自定义的关闭按钮组件

### 类型变更

- 在 `ToastOptions` 类型中添加了 `customActionButton` 和 `customCloseButton` 选项
- 新增 `ActionButtonProps` 和 `CloseButtonProps` 接口定义

### 使用方式

```tsx
import { toast } from './state';
import { CustomActionButton, CustomCloseButton } from './examples/custom-components';

const toastDefaults = {
  customActionButton: CustomActionButton,
  customCloseButton: CustomCloseButton,
  closeIcon: <YourCustomIcon />,
  duration: 5000,
  closeButton: true
};

// 使用自定义组件显示 toast
toast('消息内容', {
  action: {
    label: '确认',
    onClick: () => console.log('点击了确认按钮')
  },
  closeButton: true
}, toastDefaults);
```

### 向后兼容性

- 如果不提供自定义组件，将使用默认的组件实现
- 现有的 API 保持不变，新功能是可选的
