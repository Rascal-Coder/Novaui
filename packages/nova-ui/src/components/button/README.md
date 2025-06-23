# Button 按钮组件

一套功能全面的按钮组件，支持各种样式、尺寸和功能。

## 组件概览

- `NButton` - 主要的按钮组件
- `NButtonIcon` - 纯图标按钮变体
- `NButtonLink` - 渲染为链接的按钮
- `NButtonGroup` - 按钮组合容器
- `NLoadingButton` - 带加载状态的按钮

## 基础用法

```tsx
import { NButton } from 'nova-ui';

// 简单按钮
<NButton>点击我</NButton>

// 带变体和颜色的按钮
<NButton color="primary" variant="solid">
  主要按钮
</NButton>
```

## 颜色主题

按钮支持多种主题颜色：

```tsx
{/* 可用颜色：primary, destructive, success, warning, info, carbon, secondary, accent */}
<NButton color="primary">主要</NButton>
<NButton color="destructive">危险</NButton>
<NButton color="success">成功</NButton>
<NButton color="warning">警告</NButton>
<NButton color="info">信息</NButton>
<NButton color="carbon">炭黑</NButton>
<NButton color="secondary">次要</NButton>
<NButton color="accent">强调</NButton>
```

## 变体样式

不同的视觉样式：

```tsx
{/* 可用变体：solid, pure, plain, outline, dashed, soft, ghost, link */}
<NButton variant="solid">实心</NButton>
<NButton variant="outline">轮廓</NButton>
<NButton variant="dashed">虚线</NButton>
<NButton variant="soft">柔和</NButton>
<NButton variant="ghost">幽灵</NButton>
<NButton variant="link">链接</NButton>
```

## 尺寸大小

按钮提供不同的尺寸：

```tsx
{/* 可用尺寸：xs, sm, md, lg, xl, 2xl */}
<NButton size="xs">超小</NButton>
<NButton size="sm">小</NButton>
<NButton size="md">中等</NButton>
<NButton size="lg">大</NButton>
<NButton size="xl">超大</NButton>
<NButton size="2xl">特大</NButton>
```

## 形状样式

控制按钮的边框圆角：

```tsx
<NButton shape="rounded">圆角</NButton>
<NButton shape="square">方形</NButton>
<NButton shape="circle">圆形</NButton>
```

## 阴影效果

为按钮添加阴影效果：

```tsx
{/* 可用阴影：none, sm, md, lg */}
<NButton shadow="none">无阴影</NButton>
<NButton shadow="sm">小阴影</NButton>
<NButton shadow="md">中阴影</NButton>
<NButton shadow="lg">大阴影</NButton>
```

## 前置和后置内容

在按钮文字前后添加图标或其他内容：

```tsx
import { Plus, Minus } from 'lucide-react';

<NButton leading={<Plus />}>
  添加项目
</NButton>

<NButton trailing={<Minus />}>
  删除项目
</NButton>

<NButton leading={<Plus />} trailing={<Minus />}>
  两侧都有
</NButton>
```

## 按钮状态

### 禁用状态

```tsx
<NButton disabled>禁用按钮</NButton>
<NButton disabled color="primary" variant="outline">
  禁用轮廓
</NButton>
```

### 加载状态

使用 `NLoadingButton` 来创建带加载状态的按钮：

```tsx
import { NLoadingButton } from 'nova-ui';

<NLoadingButton loading>
  加载中...
</NLoadingButton>

<NLoadingButton loading={isSubmitting} color="primary">
  {isSubmitting ? '正在提交...' : '提交'}
</NLoadingButton>
```

## 图标按钮

对于纯图标按钮，使用 `NButtonIcon`：

```tsx
import { NButtonIcon } from 'nova-ui';
import { Search, Settings, Close } from 'lucide-react';

<NButtonIcon>
  <Search />
</NButtonIcon>

<NButtonIcon color="destructive" variant="outline">
  <Close />
</NButtonIcon>

{/* 自适应内容尺寸 */}
<NButtonIcon fitContent className="p-2 text-xl">
  <Settings />
</NButtonIcon>
```

## 链接按钮

用于跳转到不同页面的按钮：

```tsx
import { NButtonLink } from 'nova-ui';

<NButtonLink href="/dashboard">
  前往仪表板
</NButtonLink>

<NButtonLink href="https://example.com" external>
  外部链接
</NButtonLink>

{/* 使用 asChild 进行自定义路由 */}
<NButtonLink asChild>
  <Link to="/profile">个人资料</Link>
</NButtonLink>
```

## 按钮组

将相关按钮组合在一起：

```tsx
import { NButtonGroup } from 'nova-ui';
import { SkipBack, Pause, SkipForward } from 'lucide-react';

{/* 水平按钮组 */}
<NButtonGroup>
  <NButton variant="outline">
    <SkipBack />
  </NButton>
  <NButton variant="outline">
    <Pause />
  </NButton>
  <NButton variant="outline">
    <SkipForward />
  </NButton>
</NButtonGroup>

{/* 垂直按钮组 */}
<NButtonGroup orientation="vertical">
  <NButton variant="dashed">第一个</NButton>
  <NButton variant="dashed">第二个</NButton>
  <NButton variant="dashed">第三个</NButton>
</NButtonGroup>
```

## 使用 asChild

对于高级自定义，使用 `asChild` 属性渲染为不同的元素：

```tsx
<NButton asChild>
  <a href="/download" download>
    下载文件
  </a>
</NButton>

<NButton asChild>
  <Link to="/settings">
    设置
  </Link>
</NButton>
```

## API 参考

### NButton 属性

- `color?: ThemeColor` - 按钮颜色主题
- `variant?: ButtonVariant` - 视觉样式变体
- `size?: ThemeSize` - 按钮尺寸
- `shape?: ButtonShape` - 边框圆角样式
- `shadow?: ButtonShadow` - 阴影效果
- `leading?: ReactNode` - 按钮文字前的内容
- `trailing?: ReactNode` - 按钮文字后的内容
- `disabled?: boolean` - 禁用按钮
- `asChild?: boolean` - 渲染为子元素
- `className?: string` - 额外的 CSS 类名
- 所有标准 HTML button 元素属性

### NButtonIcon 属性

与 `NButton` 相同，但排除 `leading` 和 `trailing` 属性：

- `fitContent?: boolean` - 允许使用内边距类自定义尺寸

### NLoadingButton 属性

扩展 `NButton` 并添加：

- `loading?: boolean` - 显示加载状态

### NButtonLink 属性

扩展 `NButton` 并添加链接特定属性：

- `href?: string` - 链接 URL
- `external?: boolean` - 在新标签页打开
- `download?: boolean | string` - 下载属性
- 所有标准锚点元素属性

### NButtonGroup 属性

- `orientation?: 'horizontal' | 'vertical'` - 组布局方向
- `asChild?: boolean` - 渲染为子元素
- `className?: string` - 额外的 CSS 类名
- 所有标准 div 元素属性

## 主题集成

所有按钮组件都与 NovaUI 主题系统集成：

```tsx
// 颜色自动适应您的主题
<NButton color="primary">主题主色</NButton>

// 尺寸遵循您的主题比例
<NButton size="lg">大按钮</NButton>

// 变体尊重您的设计令牌
<NButton variant="outline">主题轮廓</NButton>
```

## 最佳实践

### 无障碍性

```tsx
{/* 使用描述性文字 */}
<NButton>保存更改</NButton>

{/* 对于图标按钮，提供 aria-label */}
<NButtonIcon aria-label="关闭对话框">
  <X />
</NButtonIcon>

{/* 使用 disabled 属性，而不仅仅是视觉样式 */}
<NButton disabled={!isFormValid}>
  提交表单
</NButton>
```

### 性能优化

```tsx
{/* 对异步操作使用加载状态 */}
<NLoadingButton loading={isSubmitting} onClick={handleSubmit}>
  {isSubmitting ? '保存中...' : '保存'}
</NLoadingButton>

{/* 组合相关操作 */}
<NButtonGroup>
  <NButton variant="outline" onClick={handleCancel}>取消</NButton>
  <NButton onClick={handleConfirm}>确认</NButton>
</NButtonGroup>
```

### 设计一致性

```tsx
{/* 对相似操作使用一致的变体 */}
<NButton variant="solid" color="primary">主要操作</NButton>
<NButton variant="outline" color="primary">次要操作</NButton>

{/* 按钮尺寸与表单元素匹配 */}
<div className="flex gap-2 items-center">
  <input className="h-10" />
  <NButton size="md">提交</NButton>
</div>
```

## 完整示例

```tsx
import React, { useState } from 'react';
import {
  NButton,
  NButtonGroup,
  NButtonIcon,
  NButtonLink,
  NLoadingButton
} from 'nova-ui';
import { Plus, Edit, Trash, ExternalLink } from 'lucide-react';

function ButtonShowcase() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* 主要操作 */}
      <div className="flex gap-3">
        <NButton color="primary" leading={<Plus />}>
          添加新项
        </NButton>
        <NLoadingButton
          loading={isLoading}
          onClick={handleSave}
          color="success"
        >
          保存更改
        </NLoadingButton>
      </div>

      {/* 操作组 */}
      <NButtonGroup>
        <NButtonIcon aria-label="编辑">
          <Edit />
        </NButtonIcon>
        <NButtonIcon aria-label="删除" color="destructive">
          <Trash />
        </NButtonIcon>
      </NButtonGroup>

      {/* 导航 */}
      <NButtonLink
        href="/documentation"
        trailing={<ExternalLink />}
        variant="outline"
      >
        查看文档
      </NButtonLink>

      {/* 尺寸变化 */}
      <div className="flex gap-2 items-center">
        <NButton size="sm" variant="ghost">小</NButton>
        <NButton size="md">中</NButton>
        <NButton size="lg" color="primary">大</NButton>
      </div>
    </div>
  );
}
```

这个全面的按钮系统为您提供了构建一致、无障碍和美观用户界面所需的一切。
