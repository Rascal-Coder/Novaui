import { NButton } from 'nova-ui';

const App = () => (
  <div className="p-8 space-y-4">
    <h1 className="mb-4 text-2xl font-bold">NovaUI 按钮测试</h1>

    <div className="space-y-2">
      <h2 className="text-lg font-semibold">基础按钮</h2>
      <div className="flex flex-wrap gap-2">
        <NButton>默认按钮</NButton>
        <NButton color="primary">Primary</NButton>
        <NButton color="destructive">Destructive</NButton>
        <NButton color="success">Success</NButton>
        <NButton color="warning">Warning</NButton>
        <NButton color="info">Info</NButton>
      </div>
    </div>

    <div className="space-y-2">
      <h2 className="text-lg font-semibold">不同变体</h2>
      <div className="flex flex-wrap gap-2">
        <NButton variant="solid">Solid</NButton>
        <NButton variant="outline">Outline</NButton>
        <NButton variant="ghost">Ghost</NButton>
        <NButton variant="soft">Soft</NButton>
        <NButton variant="link">Link</NButton>
      </div>
    </div>

    <div className="space-y-2">
      <h2 className="text-lg font-semibold">不同尺寸</h2>
      <div className="flex flex-wrap items-center gap-2">
        <NButton size="xs">XS</NButton>
        <NButton size="sm">SM</NButton>
        <NButton size="md">MD</NButton>
        <NButton size="lg">LG</NButton>
        <NButton size="xl">XL</NButton>
      </div>
    </div>

    <div className="space-y-2">
      <h2 className="text-lg font-semibold">测试背景色</h2>
      <div className="flex flex-wrap gap-2">
        <div className="rounded bg-primary p-2 text-primary-foreground">Primary Background</div>
        <div className="rounded bg-destructive p-2 text-destructive-foreground">Destructive Background</div>
        <div className="rounded bg-success p-2 text-success-foreground">Success Background</div>
        <div className="rounded bg-rose-500 p-2 text-white">Rose Background</div>
      </div>
    </div>
  </div>
);

export default App;
