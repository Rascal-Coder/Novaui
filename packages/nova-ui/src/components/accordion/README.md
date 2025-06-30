# Accordion 手风琴组件

一个灵活的手风琴组件，支持单选/多选模式、自定义渲染和各种尺寸。

## 组件概览

- `Accordion` - 主要的手风琴组件
- `AccordionRoot` - 手风琴根容器
- `AccordionItem` - 手风琴项目
- `AccordionHeader` - 手风琴头部
- `AccordionTrigger` - 手风琴触发器
- `AccordionContent` - 手风琴内容区域

## 基础用法

```tsx
import { Accordion } from 'nova-ui';

const items = [
  {
    value: 'item-1',
    title: '什么是 NovaUI？',
    content: 'NovaUI 是一个现代化的 React 组件库，提供了丰富的 UI 组件和主题定制功能。'
  },
  {
    value: 'item-2',
    title: '如何安装 NovaUI？',
    content: '你可以通过 npm 或 yarn 来安装 NovaUI：npm install nova-ui 或 yarn add nova-ui'
  },
  {
    value: 'item-3',
    title: '支持哪些主题？',
    content: 'NovaUI 支持亮色和暗色主题，并提供了完整的主题定制系统。'
  }
];

// 基础手风琴
<Accordion
  items={items}
  type="single"
/>
```

## 选择模式

### 单选模式 (Single)

一次只能展开一个项目：

```tsx
import { useState } from 'react';

const [value, setValue] = useState('');

<Accordion
  items={items}
  type="single"
  value={value}
  onValueChange={setValue}
/>
```

### 多选模式 (Multiple)

可以同时展开多个项目：

```tsx
import { useState } from 'react';

const [values, setValues] = useState<string[]>([]);

<Accordion
  items={items}
  type="multiple"
  value={values}
  onValueChange={setValues}
/>
```

## 受控与非受控模式

### 受控模式

使用 `value` 和 `onValueChange` 属性完全控制手风琴的状态：

```tsx
import { useState } from 'react';

const [value, setValue] = useState('item-1');

<Accordion
  items={items}
  type="single"
  value={value}
  onValueChange={setValue}
/>
```

### 非受控模式

使用 `defaultValue` 设置初始状态，组件内部管理状态：

```tsx
// 单选模式非受控
<Accordion
  items={items}
  type="single"
  defaultValue="item-1"
/>

// 多选模式非受控
<Accordion
  items={items}
  type="multiple"
  defaultValue={['item-1', 'item-2']}
/>
```

## 不同尺寸

手风琴支持多种尺寸：

```tsx
{/* 可用尺寸：xs, sm, md, lg, xl, 2xl */}
<Accordion
  items={items}
  type="single"
  size="xs"
/>

<Accordion
  items={items}
  type="single"
  size="lg"
/>

<Accordion
  items={items}
  type="single"
  size="2xl"
/>
```

## 带图标的项目

为手风琴项目添加图标：

```tsx
import { User, Settings, FileText } from 'lucide-react';

const itemsWithIcons = [
  {
    value: 'profile',
    title: '个人资料',
    content: '管理你的个人信息和账户设置。',
    icon: User
  },
  {
    value: 'settings',
    title: '系统设置',
    content: '配置应用程序的各种设置选项。',
    icon: Settings
  },
  {
    value: 'documents',
    title: '文档管理',
    content: '查看和管理你的文档文件。',
    icon: FileText
  }
];

<Accordion
  items={itemsWithIcons}
  type="single"
/>
```

## 禁用状态

### 禁用整个手风琴

```tsx
<Accordion
  items={items}
  type="single"
  disabled
/>
```

### 禁用特定项目

```tsx
const itemsWithDisabled = [
  {
    value: 'item-1',
    title: '正常项目',
    content: '这是一个正常的手风琴项目。'
  },
  {
    value: 'item-2',
    title: '禁用项目',
    content: '这个项目被禁用了。',
    disabled: true
  }
];

<Accordion
  items={itemsWithDisabled}
  type="single"
/>
```

## 自定义渲染

### 自定义标题渲染

```tsx
<Accordion
  items={items}
  type="single"
  renderTitle={({ item }) => (
    <span className="text-primary font-semibold">
      {item.title}
    </span>
  )}
/>
```

### 自定义内容渲染

```tsx
import { Info } from 'lucide-react';

<Accordion
  items={items}
  type="single"
  renderContent={({ item }) => (
    <div className="rounded-md bg-muted/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Info className="h-4 w-4 text-info" />
        <span className="font-medium">详细信息</span>
      </div>
      <p className="text-muted-foreground">{item.content}</p>
    </div>
  )}
/>
```

### 自定义触发器图标

```tsx
import { Plus } from 'lucide-react';

<Accordion
  items={items}
  type="single"
  renderTriggerIcon={({ item }) => (
    <Plus className="h-4 w-4 transform transition-transform duration-200 group-data-[state=open]:rotate-45" />
  )}
/>
```

### 自定义前置和后置内容

```tsx
<Accordion
  items={items}
  type="single"
  renderTriggerLeading={({ item }) => (
    <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
  )}
  renderTriggerTrailing={({ item }) => (
    <span className="text-xs text-muted-foreground">
      {item.badge}
    </span>
  )}
/>
```

### 完全自定义项目渲染

```tsx
<Accordion
  items={items}
  type="single"
  renderItem={({ item, modelValue }) => (
    <div className="custom-accordion-item">
      {/* 自定义渲染逻辑 */}
    </div>
  )}
/>
```

## UI 样式定制

使用 `ui` 属性可以为手风琴的各个部分应用自定义CSS类名：

```tsx
<Accordion
  items={items}
  type="single"
  ui={{
    root: 'border-2 border-dashed border-primary/20',
    item: 'rounded-lg overflow-hidden mb-2',
    header: 'bg-muted/50',
    trigger: 'hover:bg-muted/70 transition-colors',
    content: 'bg-background/95'
  }}
/>
```

## 可折叠性控制

使用 `collapsible` 属性控制是否可以折叠已展开的项目：

```tsx
{/* 单选模式下允许折叠 */}
<Accordion
  items={items}
  type="single"
  collapsible
/>

{/* 单选模式下不允许折叠（默认） */}
<Accordion
  items={items}
  type="single"
  collapsible={false}
/>
```

## 组合使用

将多个功能组合使用：

```tsx
import { useState } from 'react';
import { User, Settings, FileText, Plus, Info } from 'lucide-react';

const [value, setValue] = useState('profile');

const advancedItems = [
  {
    value: 'profile',
    title: '个人资料',
    content: '管理你的个人信息和账户设置。',
    icon: User,
    badge: '新'
  },
  {
    value: 'settings',
    title: '系统设置',
    content: '配置应用程序的各种设置选项。',
    icon: Settings
  },
  {
    value: 'documents',
    title: '文档管理',
    content: '查看和管理你的文档文件。',
    icon: FileText,
    disabled: true
  }
];

<Accordion
  items={advancedItems}
  type="single"
  value={value}
  onValueChange={setValue}
  size="lg"
  collapsible
  renderTitle={({ item }) => (
    <span className="text-primary font-semibold">
      {item.title}
    </span>
  )}
  renderTriggerLeading={({ item }) => (
    <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
  )}
  renderTriggerIcon={({ item }) => (
    <Plus className="h-4 w-4 transform transition-transform duration-200 group-data-[state=open]:rotate-45" />
  )}
  renderContent={({ item }) => (
    <div className="rounded-md bg-muted/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Info className="h-4 w-4 text-info" />
        <span className="font-medium">详细信息</span>
      </div>
      <p className="text-muted-foreground">{item.content}</p>
    </div>
  )}
  ui={{
    trigger: 'hover:bg-muted/50 transition-colors'
  }}
/>
```

## API 参考

### AccordionProps

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `items` | `AccordionItemData[]` | - | 手风琴项目数据数组 |
| `type` | `'single' \| 'multiple'` | - | 选择模式 |
| `value` | `string \| string[]` | - | 当前选中的值（受控） |
| `onValueChange` | `(value: string \| string[]) => void` | - | 值变化回调 |
| `defaultValue` | `string \| string[]` | - | 默认选中的值（非受控） |
| `size` | `ThemeSize` | `'md'` | 组件尺寸 |
| `collapsible` | `boolean` | `true` | 是否可折叠（仅单选模式） |
| `disabled` | `boolean` | `false` | 是否禁用整个手风琴 |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | 手风琴的布局方向 |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | 文本方向 |
| `className` | `string` | - | 自定义CSS类名 |
| `ui` | `AccordionUI` | - | UI样式定制对象 |
| `renderItem` | `(props: AccordionSlotProps) => React.ReactNode` | - | 自定义项目渲染 |
| `renderTitle` | `(props: AccordionSlotProps) => React.ReactNode` | - | 自定义标题渲染 |
| `renderContent` | `(props: AccordionSlotProps) => React.ReactNode` | - | 自定义内容渲染 |
| `renderTriggerIcon` | `(props: AccordionSlotProps) => React.ReactNode` | - | 自定义触发器图标 |
| `renderTriggerLeading` | `(props: AccordionSlotProps) => React.ReactNode` | - | 自定义触发器前置内容 |
| `renderTriggerTrailing` | `(props: AccordionSlotProps) => React.ReactNode` | - | 自定义触发器后置内容 |

### AccordionItemData

| 属性 | 类型 | 描述 |
|------|------|------|
| `value` | `string` | 项目的唯一标识符 |
| `title` | `string` | 标题文本 |
| `content` | `React.ReactNode` | 内容 |
| `icon` | `React.ComponentType` | 可选图标组件 |
| `disabled` | `boolean` | 是否禁用该项目 |

### AccordionUI

| 属性 | 类型 | 描述 |
|------|------|------|
| `root` | `string` | 根容器样式 |
| `item` | `string` | 项目容器样式 |
| `header` | `string` | 头部容器样式 |
| `trigger` | `string` | 触发器按钮样式 |
| `content` | `string` | 内容区域样式 |

### AccordionSlotProps

| 属性 | 类型 | 描述 |
|------|------|------|
| `item` | `AccordionItemData` | 当前项目数据 |
| `modelValue` | `string \| string[] \| undefined` | 当前选中的值 |

## 无障碍支持

手风琴组件内置了完整的无障碍支持：

- 键盘导航支持（方向键、Enter、Space）
- 屏幕阅读器支持
- 正确的 ARIA 属性
- 焦点管理

## 注意事项

1. 在单选模式下，如果设置了 `collapsible={false}`，至少会有一个项目保持展开状态
2. 项目的 `value` 必须是唯一的
3. 自定义渲染函数会覆盖默认的渲染逻辑
4. UI 样式定制会与默认样式合并，而不是替换
