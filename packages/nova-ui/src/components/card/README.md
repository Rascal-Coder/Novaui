# Card 组件

一个灵活的卡片组件，支持头部、标题、内容和底部。

## 基础用法

```tsx
import { NCard } from 'nova-ui';

// 只有内容的简单卡片
<NCard>
  <NCard.Content>
    <p>这是一个只有内容的简单卡片。</p>
  </NCard.Content>
</NCard>

// 有标题和内容的卡片
<NCard>
  <NCard.Header>
    <NCard.TitleRoot>
      <NCard.Title>卡片标题</NCard.Title>
    </NCard.TitleRoot>
  </NCard.Header>
  <NCard.Content>
    <p>卡片内容放在这里。</p>
  </NCard.Content>
</NCard>

// 有标题、内容和底部的完整卡片
<NCard>
  <NCard.Header>
    <NCard.TitleRoot>
      <NCard.Title>卡片标题</NCard.Title>
    </NCard.TitleRoot>
  </NCard.Header>
  <NCard.Content>
    <p>卡片内容放在这里。</p>
  </NCard.Content>
  <NCard.Footer>
    <button>操作按钮</button>
  </NCard.Footer>
</NCard>
```

## 分割布局的卡片

使用 `split` 属性在各部分之间添加视觉分隔：

```tsx
<NCard split>
  <NCard.Header>
    <NCard.TitleRoot>
      <NCard.Title>分割卡片</NCard.Title>
    </NCard.TitleRoot>
  </NCard.Header>
  <NCard.Content>
    <p>这个卡片在各部分之间有视觉分隔。</p>
  </NCard.Content>
  <NCard.Footer>
    底部内容
  </NCard.Footer>
</NCard>
```

## 不同尺寸

卡片支持不同的尺寸：

```tsx
{['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map(size => (
  <NCard key={size} size={size}>
    <NCard.Header>
      <NCard.TitleRoot>
        <NCard.Title>尺寸: {size}</NCard.Title>
      </NCard.TitleRoot>
    </NCard.Header>
    <NCard.Content>
      <p>{size} 卡片的内容</p>
    </NCard.Content>
  </NCard>
))}
```

## 在头部添加额外内容

在标题旁边添加额外内容：

```tsx
<NCard>
  <NCard.Header>
    <NCard.TitleRoot>
      <NCard.Title>带额外内容的卡片</NCard.Title>
    </NCard.TitleRoot>
    <span className="text-sm text-gray-500">额外内容</span>
  </NCard.Header>
  <NCard.Content>
    <p>主要内容</p>
  </NCard.Content>
</NCard>

// 带操作按钮
<NCard split>
  <NCard.Header>
    <NCard.TitleRoot>
      <NCard.Title>带操作的卡片</NCard.Title>
    </NCard.TitleRoot>
    <NButtonIcon size="sm">
      <X />
    </NButtonIcon>
  </NCard.Header>
  <NCard.Content>
    <p>主要内容</p>
  </NCard.Content>
</NCard>
```

## 标题前后添加内容

在标题前后添加图标或徽章：

```tsx
<NCard split>
  <NCard.Header>
    <NCard.TitleRoot>
      <Rocket className="w-4 h-4" />
      <NCard.Title>带图标的标题</NCard.Title>
      <div className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
        徽章
      </div>
    </NCard.TitleRoot>
  </NCard.Header>
  <NCard.Content>
    <p>装饰标题的内容</p>
  </NCard.Content>
</NCard>
```

## 使用 asChild 模式

对于高级自定义，使用 `asChild` 属性渲染自定义元素：

```tsx
<NCard.Header asChild>
  <header className="custom-header">
    <NCard.TitleRoot asChild>
      <div className="custom-title-wrapper">
        <NCard.Title asChild>
          <h2>自定义标题元素</h2>
        </NCard.Title>
      </div>
    </NCard.TitleRoot>
  </header>
</NCard.Header>
```

## UI 自定义对象

使用 `ui` 属性可以为卡片的各个部分应用自定义CSS类名，实现深度样式定制：

```tsx
// 基础用法 - 自定义单个部分
<NCard ui={{ root: 'bg-gradient-to-r from-blue-50 to-purple-50' }}>
  <NCard.Content>
    <p>带渐变背景的卡片</p>
  </NCard.Content>
</NCard>

// 高级用法 - 自定义多个部分
<NCard ui={{
  root: 'border-2 border-dashed border-blue-300 bg-blue-50/30',
  header: 'bg-blue-100 border-b border-blue-200',
  title: 'text-blue-800 font-bold',
  content: 'text-blue-700',
  footer: 'bg-blue-50 border-t border-blue-200'
}}>
  <NCard.Header>
    <NCard.TitleRoot>
      <NCard.Title>自定义主题卡片</NCard.Title>
    </NCard.TitleRoot>
  </NCard.Header>
  <NCard.Content>
    <p>这个卡片使用了完全自定义的蓝色主题</p>
  </NCard.Content>
  <NCard.Footer>
    <button className="px-3 py-1 bg-blue-500 text-white rounded">
      确认
    </button>
  </NCard.Footer>
</NCard>

// 暗黑主题示例
<NCard ui={{
  root: 'bg-gray-900 border-gray-700 text-white',
  header: 'border-b border-gray-700',
  title: 'text-gray-100',
  content: 'text-gray-300',
  footer: 'border-t border-gray-700'
}} split>
  <NCard.Header>
    <NCard.TitleRoot>
      <NCard.Title>暗黑主题卡片</NCard.Title>
    </NCard.TitleRoot>
  </NCard.Header>
  <NCard.Content>
    <p>这是一个暗黑主题的卡片示例</p>
  </NCard.Content>
  <NCard.Footer>
    <span className="text-gray-400">底部信息</span>
  </NCard.Footer>
</NCard>
```

### UI 对象可用的插槽

`ui` 对象支持以下插槽，每个插槽对应卡片的一个部分：

- `root` - 卡片根容器的样式
- `header` - 头部区域的样式
- `titleRoot` - 标题容器的样式
- `title` - 标题文本的样式
- `content` - 内容区域的样式
- `footer` - 底部区域的样式

```tsx
type CardUi = {
  root?: string;
  header?: string;
  titleRoot?: string;
  title?: string;
  content?: string;
  footer?: string;
}
```

## API 参考

### Card 属性

- `size?: ThemeSize` - 卡片尺寸 (xs, sm, md, lg, xl, 2xl)
- `split?: boolean` - 是否在各部分之间添加视觉分隔
- `className?: string` - 额外的 CSS 类名
- `ui?: CardUi` - UI 自定义对象

### 子组件

- `NCard.Root` - 根容器
- `NCard.Header` - 头部区域
- `NCard.TitleRoot` - 标题容器（用于复杂的标题布局）
- `NCard.Title` - 标题文本
- `NCard.Content` - 主要内容区域
- `NCard.Footer` - 底部区域

所有子组件都支持：

- `asChild?: boolean` - 渲染为不同的元素
- `className?: string` - 额外的 CSS 类名
- `size?: ThemeSize` - 尺寸（如果未指定则从父组件继承）

## 完整示例

这是一个展示各种卡片配置的综合示例：

```tsx
import { Rocket, X } from 'lucide-react';
import { NCard, NButtonIcon } from 'nova-ui';

function CardExamples() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  return (
    <div className="flex flex-col gap-4">
      {/* 尺寸变化 */}
      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col gap-3">
          {sizes.map(size => (
            <NCard key={size} size={size}>
              <NCard.Header>
                <NCard.TitleRoot>
                  <NCard.Title>尺寸: {size}</NCard.Title>
                </NCard.TitleRoot>
                <span className="text-sm text-gray-500">额外</span>
              </NCard.Header>
              <NCard.Content>
                <p className="text-gray-500">内容</p>
              </NCard.Content>
              <NCard.Footer>底部</NCard.Footer>
            </NCard>
          ))}
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          {sizes.map(size => (
            <NCard key={size} size={size} split>
              <NCard.Header>
                <NCard.TitleRoot>
                  <NCard.Title>尺寸: {size}</NCard.Title>
                </NCard.TitleRoot>
                <NButtonIcon size={size}>
                  <X />
                </NButtonIcon>
              </NCard.Header>
              <NCard.Content>
                <p className="text-gray-500">内容</p>
              </NCard.Content>
              <NCard.Footer>底部</NCard.Footer>
            </NCard>
          ))}
        </div>
      </div>

      {/* 各种布局 */}
      <div className="flex flex-col gap-4">
        {/* 仅内容 */}
        <NCard>
          <NCard.Content>
            <p className="text-gray-500">仅内容</p>
          </NCard.Content>
        </NCard>

        {/* 标题 + 内容 */}
        <NCard split>
          <NCard.Header>
            <NCard.TitleRoot>
              <NCard.Title>标题</NCard.Title>
            </NCard.TitleRoot>
          </NCard.Header>
          <NCard.Content>
            <p className="text-gray-500">内容</p>
          </NCard.Content>
        </NCard>

        {/* 内容 + 底部 */}
        <NCard split>
          <NCard.Content>
            <p className="text-gray-500">内容</p>
          </NCard.Content>
          <NCard.Footer>底部</NCard.Footer>
        </NCard>

        {/* 装饰标题 */}
        <NCard split>
          <NCard.Header>
            <NCard.TitleRoot>
              <Rocket className="w-4 h-4" />
              <NCard.Title>标题插槽</NCard.Title>
              <div className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                徽章
              </div>
            </NCard.TitleRoot>
          </NCard.Header>
          <NCard.Content>
            <p className="text-gray-500">内容</p>
          </NCard.Content>
        </NCard>
      </div>
    </div>
  );
}
```
