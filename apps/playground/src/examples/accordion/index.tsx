import { FileText, Info, Plus, Settings, User } from 'lucide-react';
import { Accordion, type AccordionItemData, NCard, type ThemeSize } from 'nova-ui';
import { memo, useCallback, useState } from 'react';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const basicItems: AccordionItemData[] = [
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

const customItems: AccordionItemData[] = [
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
    icon: FileText,
    disabled: true
  }
];

const ControlledSingleDemo = memo(function ControlledSingleDemo() {
  const [singleValue, setSingleValue] = useState<string>('');

  const handleValueChange = useCallback((value: string) => {
    setSingleValue(value);
  }, []);

  const handleToggleItem1 = useCallback(() => {
    setSingleValue(current => (current === 'item-1' ? '' : 'item-1'));
  }, []);

  const handleToggleItem2 = useCallback(() => {
    setSingleValue(current => (current === 'item-2' ? '' : 'item-2'));
  }, []);

  const handleCloseAll = useCallback(() => {
    setSingleValue('');
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">外部控制:</span>
        <button
          className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
          onClick={handleToggleItem1}
        >
          切换项目1
        </button>
        <button
          className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
          onClick={handleToggleItem2}
        >
          切换项目2
        </button>
        <button
          className="rounded bg-secondary px-3 py-1 text-xs hover:bg-secondary/80"
          onClick={handleCloseAll}
        >
          全部关闭
        </button>
      </div>
      <div className="text-xs text-muted-foreground">当前值: {singleValue || '无'}</div>
      <Accordion
        className="w-full"
        items={basicItems}
        type="single"
        value={singleValue}
        onValueChange={handleValueChange}
      />
    </div>
  );
});

const ControlledMultipleDemo = memo(function ControlledMultipleDemo() {
  const [multipleValue, setMultipleValue] = useState<string[]>([]);

  const handleValueChange = useCallback((value: string[]) => {
    setMultipleValue(value);
  }, []);

  const handleExpandAll = useCallback(() => {
    setMultipleValue(['item-1', 'item-2', 'item-3']);
  }, []);

  const handleCloseAll = useCallback(() => {
    setMultipleValue([]);
  }, []);

  const handleToggleSpecific = useCallback(() => {
    setMultipleValue(['item-1', 'item-3']);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">外部控制:</span>
        <button
          className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
          onClick={handleExpandAll}
        >
          全部展开
        </button>
        <button
          className="rounded bg-secondary px-3 py-1 text-xs hover:bg-secondary/80"
          onClick={handleCloseAll}
        >
          全部关闭
        </button>
        <button
          className="rounded bg-accent px-3 py-1 text-xs text-accent-foreground hover:bg-accent/90"
          onClick={handleToggleSpecific}
        >
          展开1和3
        </button>
      </div>
      <div className="text-xs text-muted-foreground">当前值: [{multipleValue.join(', ') || '无'}]</div>
      <Accordion
        className="w-full"
        items={basicItems}
        type="multiple"
        value={multipleValue}
        onValueChange={handleValueChange}
      />
    </div>
  );
});

// 优化的受控模式组件
const ControlledSingleAccordion = memo(function ControlledSingleAccordion({
  value,
  onValueChange
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Accordion
      className="w-full"
      items={basicItems}
      type="single"
      value={value}
      onValueChange={onValueChange}
    />
  );
});

// 优化的受控多选模式组件
const ControlledMultipleAccordion = memo(function ControlledMultipleAccordion({
  value,
  onValueChange
}: {
  value: string[];
  onValueChange: (value: string[]) => void;
}) {
  return (
    <Accordion
      className="w-full"
      items={basicItems}
      type="multiple"
      value={value}
      onValueChange={onValueChange}
    />
  );
});

export default function AccordionExample() {
  // 移除全局状态，避免全局重渲染
  // const [singleValue, setSingleValue] = useState<string>('');
  // const [multipleValue, setMultipleValue] = useState<string[]>([]);

  // 保留一些状态用于演示（比如单选和多选模式的简单演示）
  const [simpleSingleValue, setSimpleSingleValue] = useState<string>('');
  const [simpleMultipleValue, setSimpleMultipleValue] = useState<string[]>([]);

  const handleSimpleSingleChange = useCallback((value: string) => {
    setSimpleSingleValue(value);
  }, []);

  const handleSimpleMultipleChange = useCallback((value: string[]) => {
    setSimpleMultipleValue(value);
  }, []);

  return (
    <div className="flex-c gap-4">
      {/* 基础用法 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>基础用法</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Accordion
            className="w-full"
            items={basicItems}
            type="single"
          />
        </NCard.Content>
      </NCard>

      {/* 单选模式 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>单选模式</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <ControlledSingleAccordion
            value={simpleSingleValue}
            onValueChange={handleSimpleSingleChange}
          />
        </NCard.Content>
      </NCard>

      {/* 多选模式 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>多选模式</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <ControlledMultipleAccordion
            value={simpleMultipleValue}
            onValueChange={handleSimpleMultipleChange}
          />
        </NCard.Content>
      </NCard>

      {/* 不同尺寸 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>不同尺寸</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-4">
            {sizes.map(size => (
              <div
                className="w-full"
                key={size}
              >
                <div className="mb-2 text-sm text-muted-foreground font-medium">Size: {size}</div>
                <Accordion
                  className="w-full"
                  size={size}
                  type="single"
                  items={[
                    {
                      value: `${size}-item`,
                      title: `${size.toUpperCase()} 尺寸演示`,
                      content: `这是 ${size} 尺寸的手风琴组件演示。`
                    }
                  ]}
                />
              </div>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* 自定义图标 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>自定义图标</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Accordion
            className="w-full"
            items={customItems}
            type="single"
          />
        </NCard.Content>
      </NCard>

      {/* 自定义渲染 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>自定义渲染</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Accordion
            className="w-full"
            items={basicItems}
            renderTitle={({ item }) => <span className="text-primary font-semibold">{item.title}</span>}
            renderTriggerLeading={() => <div className="mr-2 h-2 w-2 rounded-full bg-primary" />}
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
            renderTriggerIcon={() => (
              <Plus className="h-4 w-4 transform transition-transform duration-200 group-data-[state=open]:rotate-45" />
            )}
          />
        </NCard.Content>
      </NCard>

      {/* 自定义样式 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>自定义样式</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Accordion
            className="w-full"
            items={basicItems}
            type="single"
            ui={{
              trigger: ' hover:bg-muted/50'
            }}
          />
        </NCard.Content>
      </NCard>

      {/* 禁用状态 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>禁用状态</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Accordion
            disabled
            className="w-full"
            items={basicItems}
            type="single"
          />
        </NCard.Content>
      </NCard>

      {/* 受控模式 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>受控模式</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <ControlledSingleDemo />
        </NCard.Content>
      </NCard>

      {/* 非受控模式 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>非受控模式</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="space-y-6">
            <div>
              <div className="mb-2 text-sm font-medium">单选非受控 (默认展开第一项)</div>
              <Accordion
                className="w-full"
                defaultValue="item-1"
                items={basicItems}
                type="single"
              />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">多选非受控 (默认展开前两项)</div>
              <Accordion
                className="w-full"
                defaultValue={['item-1', 'item-2']}
                items={basicItems}
                type="multiple"
              />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">可折叠单选非受控 (默认无展开项)</div>
              <Accordion
                collapsible
                className="w-full"
                items={basicItems}
                type="single"
              />
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 受控多选模式演示 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>受控多选模式</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <ControlledMultipleDemo />
        </NCard.Content>
      </NCard>
    </div>
  );
}
