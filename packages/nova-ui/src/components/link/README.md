# Link 组件

> 封装自 `<a>` 标签，支持禁用、外部跳转、内部导航等功能，适用于各种链接场景。

## 属性说明

| 属性名           | 类型                                                                 | 默认值                | 说明                         |
|------------------|----------------------------------------------------------------------|-----------------------|------------------------------|
| href             | `string`                                                             | —                     | 链接地址                     |
| target           | `'_blank'\|'_parent'\|'_self'\|'_top'\|string`                   | `_blank`              | 链接打开方式                 |
| rel              | `'noopener'\|'noreferrer'\|'nofollow'\|'sponsored'\|'ugc'\|string` | `noopener noreferrer` | 安全性相关属性               |
| referrerPolicy   | `string`                                                             | —                     | referrer 策略                |
| disabled         | `boolean`                                                            | `false`               | 是否禁用                     |
| onClick          | `((e) => void) \| Array<...>`                                       | —                     | 点击事件回调                 |
| navigate         | `(e) => void`                                                        | —                     | 内部导航函数（如路由跳转）    |
| isExternal       | `boolean`                                                            | `false`               | 是否为外部链接               |
| children         | `ReactNode`                                                          | —                     | 子节点内容                   |

## 用法示例

### 基础用法

```tsx
import Link from './link';

<Link href="https://example.com">外部链接</Link>
```

### 禁用状态

```tsx
<Link href="https://example.com" disabled>禁用链接</Link>
```

### 内部导航

```tsx
<Link href="/about" navigate={handleNavigate}>关于我们</Link>

function handleNavigate(e) {
  // 这里可以做 SPA 路由跳转
}
```

### 自定义 target 和 rel

```tsx
<Link href="https://example.com" target="_self" rel="nofollow">自定义属性</Link>
```
