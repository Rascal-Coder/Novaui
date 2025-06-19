# Card 组件
## 基础用法

```tsx
import { Card } from '@novaui/nova-ui';

// 简单的卡片
<Card>
  <Card.Content>
    卡片内容
  </Card.Content>
</Card>

// 完整的卡片结构
<Card size="md">
  <Card.Header>
    <Card.TitleRoot>
      <Card.Title>卡片标题</Card.Title>
    </Card.TitleRoot>
  </Card.Header>
  <Card.Content flexHeight>
    卡片内容
  </Card.Content>
  <Card.Footer>
    卡片底部
  </Card.Footer>
</Card>
```

## 使用 Slot 进行自定义

```tsx
// 使用 Slot 完全自定义卡片结构
<Card>
  <Card.Header asChild>
    <header className="custom-header">
      <h2>自定义标题</h2>
      <button>操作按钮</button>
    </header>
  </Card.Header>

  <Card.Content asChild>
    <main className="custom-content">
      <p>自定义内容区域</p>
    </main>
  </Card.Content>
</Card>
```

## API 对比


###
```tsx
<Card>
  <Card.Header>
    <CustomHeader />
    <Card.TitleRoot>
      <Icon />
      <Card.Title>标题</Card.Title>
      <Button />
    </Card.TitleRoot>
    <Menu />
  </Card.Header>
  <Card.Content>内容</Card.Content>
  <Card.Footer>
    <Actions />
  </Card.Footer>
</Card>
```
