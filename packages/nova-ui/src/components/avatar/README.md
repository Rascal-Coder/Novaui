# Avatar 头像组件

一个功能完整的头像组件，支持图片显示、后备文本、自定义样式和多种尺寸。

## 组件概览

- `NAvatar` - 主要的头像组件
- `NAvatarRoot` - 头像根容器
- `NAvatarImage` - 头像图片组件
- `NAvatarFallback` - 头像后备内容组件

## 基础用法

```tsx
import { NAvatar } from 'nova-ui';

// 简单头像（仅后备文本）
<NAvatar fallbackLabel="JD" />

// 带图片的头像
<NAvatar
  src="https://github.com/shadcn.png"
  alt="John Doe"
  fallbackLabel="JD"
/>
```

## 尺寸大小

头像提供多种预设尺寸：

```tsx
{/* 可用尺寸：xs, sm, md, lg, xl, 2xl */}
<NAvatar size="xs" fallbackLabel="XS" />
<NAvatar size="sm" fallbackLabel="SM" />
<NAvatar size="md" fallbackLabel="MD" /> {/* 默认 */}
<NAvatar size="lg" fallbackLabel="LG" />
<NAvatar size="xl" fallbackLabel="XL" />
<NAvatar size="2xl" fallbackLabel="2XL" />
```

## 图片处理

### 图片加载状态

```tsx
<NAvatar
  src="https://example.com/avatar.jpg"
  alt="用户头像"
  fallbackLabel="用户"
  onLoadingStatusChange={(status) => {
    console.log('图片加载状态:', status); // 'idle' | 'loading' | 'loaded' | 'error'
  }}
/>
```

### 图片加载失败时显示后备内容

```tsx
{/* 当图片URL无效时，会自动显示后备文本 */}
<NAvatar
  src="https://invalid-url.jpg"
  alt="头像"
  fallbackLabel="FB"
/>
```

### 图片属性

```tsx
<NAvatar
  src="https://example.com/avatar.jpg"
  alt="用户头像"
  fallbackLabel="用户"
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>
```

## 自定义样式

### 使用 ui prop 自定义样式

```tsx
<NAvatar
  fallbackLabel="UI"
  ui={{
    root: 'border-2 border-blue-500',
    fallback: 'bg-blue-100 text-blue-700 font-bold',
    image: 'grayscale hover:grayscale-0 transition-all'
  }}
/>
```

### 使用 className 自定义根容器样式

```tsx
<NAvatar
  className="ring-2 ring-purple-500 ring-offset-2"
  fallbackLabel="CLS"
/>
```

## 自定义内容

### 完全自定义内容

```tsx
<NAvatar size="lg">
  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-pink-400 to-purple-600 text-white font-bold">
    💎
  </div>
</NAvatar>
```

### 自定义后备内容

```tsx
<NAvatar src="https://example.com/avatar.jpg">
  <NAvatarImage />
  <NAvatarFallback>
    <UserIcon className="w-6 h-6" />
  </NAvatarFallback>
</NAvatar>
```

## 组合使用

### 用户信息展示

```tsx
<div className="flex items-center gap-3">
  <NAvatar
    src={user.avatar}
    alt={user.name}
    fallbackLabel={user.name.charAt(0)}
    size="md"
  />
  <div>
    <p className="font-medium">{user.name}</p>
    <p className="text-sm text-gray-500">{user.email}</p>
  </div>
</div>
```

### 团队成员列表

```tsx
<div className="flex -space-x-2">
  {teamMembers.map((member, index) => (
    <NAvatar
      key={member.id}
      src={member.avatar}
      alt={member.name}
      fallbackLabel={member.name.charAt(0)}
      size="md"
      className={`border-2 border-white z-${teamMembers.length - index}`}
    />
  ))}
</div>
```

## API 参考

### NAvatar Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 根容器的自定义类名 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | 头像尺寸 |
| `ui` | `AvatarUISlots` | - | 各部分的自定义样式类名 |
| `fallbackLabel` | `string` | - | 后备显示的文本 |
| `src` | `string` | - | 图片源地址 |
| `alt` | `string` | - | 图片的替代文本 |
| `onLoadingStatusChange` | `(status: ImageLoadingStatus) => void` | - | 图片加载状态变化回调 |
| `children` | `ReactNode` | - | 自定义子内容 |

### AvatarUISlots

```tsx
type AvatarUISlots = {
  root?: string;      // 根容器样式
  image?: string;     // 图片样式
  fallback?: string;  // 后备内容样式
}
```

### ImageLoadingStatus

```tsx
type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';
```

