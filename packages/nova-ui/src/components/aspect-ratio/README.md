# AspectRatio 宽高比组件

一个用于显示具有固定宽高比内容的容器组件，特别适用于响应式图像、视频和其他媒体内容。

## 基础用法

```tsx
import { AspectRatio } from 'nova-ui';

// 基本的正方形容器（默认1:1比例）
<AspectRatio>
  <div className="bg-gray-200 flex items-center justify-center">
    1:1 比例内容
  </div>
</AspectRatio>

// 自定义比例
<AspectRatio ratio={16 / 9}>
  <div className="bg-blue-100 flex items-center justify-center">
    16:9 宽屏比例
  </div>
</AspectRatio>
```

## 图片和媒体内容

AspectRatio 最常用于包装图像和视频，确保它们在不同屏幕尺寸下保持一致的比例：

```tsx
// 图片容器
<AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-lg">
  <img
    src="https://example.com/image.jpg"
    alt="描述图片"
    className="h-full w-full object-cover"
  />
</AspectRatio>

// 视频容器
<AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden">
  <video
    className="h-full w-full"
    controls
    poster="https://example.com/poster.jpg"
  >
    <source src="https://example.com/video.mp4" type="video/mp4" />
  </video>
</AspectRatio>

// iframe 嵌入（如 YouTube 视频）
<AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    className="h-full w-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</AspectRatio>
```

## 常见宽高比

以下是一些常用的宽高比配置：

```tsx
// 1:1 正方形（默认）
<AspectRatio>
  <div className="bg-gray-100 flex items-center justify-center">1:1</div>
</AspectRatio>

// 4:3 传统显示器/相机比例
<AspectRatio ratio={4 / 3}>
  <div className="bg-blue-100 flex items-center justify-center">4:3</div>
</AspectRatio>

// 16:9 宽屏比例
<AspectRatio ratio={16 / 9}>
  <div className="bg-green-100 flex items-center justify-center">16:9</div>
</AspectRatio>

// 21:9 超宽屏比例
<AspectRatio ratio={21 / 9}>
  <div className="bg-purple-100 flex items-center justify-center">21:9</div>
</AspectRatio>

// 3:2 35mm胶片比例
<AspectRatio ratio={3 / 2}>
  <div className="bg-yellow-100 flex items-center justify-center">3:2</div>
</AspectRatio>

// 2:3 竖屏比例
<AspectRatio ratio={2 / 3}>
  <div className="bg-pink-100 flex items-center justify-center">2:3</div>
</AspectRatio>
```

## 响应式使用

结合 Tailwind CSS 的响应式类名，可以在不同屏幕尺寸下使用不同的比例：

```tsx
// 手机上使用 1:1，桌面上使用 16:9
<div className="w-full max-w-md md:max-w-2xl">
  <AspectRatio
    ratio={16 / 9} // 在所有尺寸下都是 16:9
    className="bg-muted rounded-lg overflow-hidden"
  >
    <img
      src="https://example.com/image.jpg"
      alt="响应式图片"
      className="h-full w-full object-cover"
    />
  </AspectRatio>
</div>

// 或者通过容器控制
<div className="w-full aspect-square md:aspect-video">
  <AspectRatio className="bg-muted rounded-lg">
    <div className="flex items-center justify-center">
      响应式内容
    </div>
  </AspectRatio>
</div>
```

## 高级用例

### 卡片中的媒体内容

```tsx
<div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
  <AspectRatio ratio={16 / 9}>
    <img
      src="https://example.com/image.jpg"
      alt="卡片图片"
      className="h-full w-full object-cover"
    />
  </AspectRatio>
  <div className="p-4">
    <h3 className="text-lg font-semibold">卡片标题</h3>
    <p className="text-gray-600">卡片描述内容</p>
  </div>
</div>
```

### 产品图片展示

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {products.map((product) => (
    <div key={product.id} className="space-y-2">
      <AspectRatio ratio={1} className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-105 transition-transform"
        />
      </AspectRatio>
      <div>
        <h4 className="font-medium">{product.name}</h4>
        <p className="text-sm text-gray-500">{product.price}</p>
      </div>
    </div>
  ))}
</div>
```

### 头像和个人资料图片

```tsx
<div className="flex items-center space-x-4">
  <AspectRatio ratio={1} className="w-16 h-16 rounded-full overflow-hidden">
    <img
      src="https://example.com/avatar.jpg"
      alt="用户头像"
      className="h-full w-full object-cover"
    />
  </AspectRatio>
  <div>
    <h4 className="font-medium">用户名</h4>
    <p className="text-sm text-gray-500">用户描述</p>
  </div>
</div>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `ratio` | `number` | `1` | 宽高比，计算方式为 width / height |
| `className` | `string` | - | 附加的 CSS 类名 |
| `children` | `ReactNode` | - | 子元素内容 |

## 注意事项

1. **内容定位**：子元素会被绝对定位，确保填满整个比例容器
2. **溢出处理**：如果需要隐藏溢出的内容，记得添加 `overflow-hidden` 类名
3. **对象适配**：对于图片，通常需要设置 `object-cover` 或 `object-contain` 来控制显示方式
4. **响应式**：组件本身只控制高度，宽度会跟随父容器，适合响应式布局
