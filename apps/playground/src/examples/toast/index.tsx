import { NButton, NCard, type ThemeSize, type ToastIconType, ToastProvider, useToast } from 'nova-ui';

const iconTypes: ToastIconType[] = ['destructive', 'success', 'warning', 'info'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

function ToastDemo() {
  const { toast, dismiss } = useToast();

  const showBasicToast = () => {
    toast({
      title: '基础 Toast',
      description: '这是一个简单的 toast 消息示例。'
    });
  };

  const showToastWithIcon = (iconType: ToastIconType) => {
    toast({
      title: `${iconType.charAt(0).toUpperCase() + iconType.slice(1)} 消息`,
      description: `这是一个 ${iconType} 类型的 toast 消息。`,
      iconType
    });
  };

  const showToastWithAction = () => {
    toast({
      title: '有操作的 Toast',
      description: '这个 toast 包含一个操作按钮。',
      iconType: 'info',
      action: (
        <NButton
          size="sm"
          variant="outline"
          onClick={() => console.log('操作被执行!')}
        >
          执行操作
        </NButton>
      )
    });
  };

  const showToastWithSize = (size: ThemeSize) => {
    toast({
      title: `Size: ${size}`,
      description: `这是一个 ${size} 尺寸的 toast 消息。`,
      iconType: 'success',
      size
    });
  };

  const showPersistentToast = () => {
    toast({
      title: '持久 Toast',
      description: '这个 toast 不会自动消失，需要手动关闭。',
      iconType: 'warning'
    });
  };

  const showRichContentToast = () => {
    toast({
      title: '富内容 Toast',
      description: (
        <div className="space-y-2">
          <p>这个 toast 包含富文本内容：</p>
          <ul className="list-disc list-inside space-y-1">
            <li>支持 HTML 内容</li>
            <li>可以包含列表</li>
            <li>支持多种格式</li>
          </ul>
        </div>
      ),
      iconType: 'info'
    });
  };

  const dismissAllToasts = () => {
    dismiss();
  };

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
          <div className="flex flex-wrap gap-3">
            <NButton onClick={showBasicToast}>显示基础 Toast</NButton>
            <NButton
              variant="outline"
              onClick={showPersistentToast}
            >
              持久 Toast
            </NButton>
            <NButton
              variant="ghost"
              onClick={showRichContentToast}
            >
              富内容 Toast
            </NButton>
            <NButton
              color="destructive"
              variant="outline"
              onClick={dismissAllToasts}
            >
              关闭所有
            </NButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* 图标类型 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>图标类型</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-3">
            {iconTypes.map(iconType => (
              <NButton
                color={iconType}
                key={iconType}
                variant="outline"
                onClick={() => showToastWithIcon(iconType)}
              >
                {iconType.charAt(0).toUpperCase() + iconType.slice(1)}
              </NButton>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* 尺寸 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>尺寸</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-3">
            {sizes.map(size => (
              <NButton
                key={size}
                size={size}
                variant="outline"
                onClick={() => showToastWithSize(size)}
              >
                {size}
              </NButton>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* 带操作的 Toast */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>带操作按钮</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-3">
            <NButton
              color="primary"
              onClick={showToastWithAction}
            >
              显示带操作的 Toast
            </NButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* 自定义样式示例 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>自定义样式</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-3">
            <NButton
              variant="outline"
              onClick={() => {
                toast({
                  title: '自定义样式 Toast',
                  description: '这个 toast 使用了自定义的样式配置。',
                  iconType: 'success'
                });
              }}
            >
              自定义样式
            </NButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* 复杂场景示例 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>复杂场景</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">模拟真实应用场景中的 toast 使用</p>
            <div className="flex flex-wrap gap-3">
              <NButton
                color="success"
                onClick={() => {
                  toast({
                    title: '保存成功',
                    description: '您的更改已成功保存到服务器。',
                    iconType: 'success'
                  });
                }}
              >
                保存成功
              </NButton>
              <NButton
                color="destructive"
                onClick={() => {
                  toast({
                    title: '操作失败',
                    description: '网络连接失败，请检查您的网络设置后重试。',
                    iconType: 'destructive',
                    action: (
                      <NButton
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // 模拟重试操作
                          toast({
                            title: '正在重试...',
                            description: '正在重新连接服务器。',
                            iconType: 'info'
                          });
                        }}
                      >
                        重试
                      </NButton>
                    )
                  });
                }}
              >
                模拟错误
              </NButton>
              <NButton
                color="warning"
                onClick={() => {
                  toast({
                    title: '权限警告',
                    description: '您没有足够的权限执行此操作，请联系管理员。',
                    iconType: 'warning',
                    action: (
                      <NButton
                        size="sm"
                        variant="outline"
                        onClick={() => console.log('联系管理员功能')}
                      >
                        联系管理员
                      </NButton>
                    )
                  });
                }}
              >
                权限警告
              </NButton>
            </div>
          </div>
        </NCard.Content>
      </NCard>
    </div>
  );
}

export default function Toast() {
  return (
    <ToastProvider
      toastLimit={5}
      toastRemoveDelay={5000}
    >
      <ToastDemo />
    </ToastProvider>
  );
}
