// import { User } from 'lucide-react';
import { NAvatar, NCard } from 'nova-ui';
import { useState } from 'react';

export default function AvatarExample() {
  const [loadingStatus, setLoadingStatus] = useState<string>('idle');

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
          <div className="flex items-center gap-6">
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="JD"
                shape="circle"
              />
              <div className="text-12px text-gray-500">圆形文字</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="JD"
                shape="square"
              />
              <div className="text-12px text-gray-500">方形文字</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                alt="John Doe"
                fallbackLabel="JD"
                shape="circle"
                src="https://github.com/shadcn.png"
              />
              <div className="text-12px text-gray-500">圆形头像</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                alt="John Doe"
                fallbackLabel="JD"
                shape="square"
                src="https://github.com/shadcn.png"
              />
              <div className="text-12px text-gray-500">方形头像</div>
            </div>
          </div>
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
          <div className="flex items-end gap-6">
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="XS"
                shape="circle"
                size="xs"
              />
              <div className="text-12px text-gray-500">xs</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="SM"
                shape="circle"
                size="sm"
              />
              <div className="text-12px text-gray-500">sm</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="MD"
                shape="circle"
                size="md"
              />
              <div className="text-12px text-gray-500">md</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="LG"
                shape="circle"
                size="lg"
              />
              <div className="text-12px text-gray-500">lg</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="XL"
                shape="circle"
                size="xl"
              />
              <div className="text-12px text-gray-500">xl</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="2XL"
                shape="circle"
                size="2xl"
              />
              <div className="text-12px text-gray-500">2xl</div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 头像组合 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>头像组合</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex items-center gap-8">
            {/* 堆叠头像组 */}
            <div className="flex-c-center gap-4">
              <div className="flex items-center">
                <NAvatar
                  alt="User 1"
                  className="border-2 border-white shadow-md"
                  fallbackLabel="U1"
                  size="md"
                  src="https://github.com/shadcn.png"
                />
                <NAvatar
                  alt="User 2"
                  className="border-2 border-white shadow-md -ml-2"
                  fallbackLabel="U2"
                  size="md"
                  src="https://i.pravatar.cc/150?img=1"
                />
                <NAvatar
                  alt="User 3"
                  className="border-2 border-white shadow-md -ml-2"
                  fallbackLabel="U3"
                  size="md"
                  src="https://i.pravatar.cc/150?img=2"
                />
                <div className="ml-2 text-sm text-gray-600">+2</div>
              </div>
              <div className="text-12px text-gray-500">堆叠头像组</div>
            </div>

            {/* 垂直头像组 */}
            <div className="flex-c-center gap-4">
              <div className="flex-c gap-2">
                <NAvatar
                  alt="User 1"
                  fallbackLabel="U1"
                  size="sm"
                  src="https://github.com/shadcn.png"
                />
                <NAvatar
                  alt="User 2"
                  fallbackLabel="U2"
                  size="sm"
                  src="https://i.pravatar.cc/150?img=3"
                />
                <NAvatar
                  alt="User 3"
                  fallbackLabel="U3"
                  size="sm"
                  src="https://i.pravatar.cc/150?img=4"
                />
              </div>
              <div className="text-12px text-gray-500">垂直组合</div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 加载状态 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>加载状态</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex items-center gap-6">
            <div className="flex-c-center gap-2">
              <NAvatar
                alt="Failed to load"
                fallbackLabel="Error"
                src="https://invalid-url.jpg"
                onLoadingStatusChange={status => setLoadingStatus(status)}
              />
              <div className="text-12px text-gray-500">加载失败</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                alt="Loading success"
                fallbackLabel="Load"
                src="https://github.com/shadcn.png"
                onLoadingStatusChange={status => console.log('Loading status:', status)}
              />
              <div className="text-12px text-gray-500">加载成功</div>
            </div>
            <div className="text-sm text-gray-600">当前状态: {loadingStatus}</div>
          </div>
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
          <div className="flex items-center gap-6">
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="VIP"
                shape="circle"
                size="lg"
                ui={{
                  root: 'ring-2 ring-yellow-400 ring-offset-2',
                  fallback: 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold'
                }}
              />
              <div className="text-12px text-gray-500">VIP用户</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="AI"
                shape="square"
                size="lg"
                ui={{
                  root: 'ring-2 ring-blue-400 ring-offset-2',
                  fallback: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold'
                }}
              />
              <div className="text-12px text-gray-500">AI助手</div>
            </div>
            <div className="flex-c-center gap-2">
              <div className="relative">
                <NAvatar
                  alt="Online user"
                  fallbackLabel="ON"
                  size="lg"
                  src="https://github.com/shadcn.png"
                />
                <div className="absolute h-4 w-4 border-2 border-white rounded-full bg-green-500 -bottom-1 -right-1" />
              </div>
              <div className="text-12px text-gray-500">在线状态</div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 带文字信息 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>带文字信息</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-4">
            <div className="flex items-center gap-3 border rounded-lg p-3">
              <NAvatar
                alt="John Doe"
                fallbackLabel="JD"
                size="md"
                src="https://github.com/shadcn.png"
              />
              <div className="flex-c gap-1">
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-500">john@example.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3 border rounded-lg p-3">
              <NAvatar
                fallbackLabel="AI"
                shape="square"
                size="md"
                ui={{
                  fallback: 'bg-blue-500 text-white'
                }}
              />
              <div className="flex-c gap-1">
                <div className="font-medium">AI 助手</div>
                <div className="text-sm text-gray-500">智能对话机器人</div>
              </div>
              <div className="ml-auto">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>

            <div className="flex items-center gap-3 border rounded-lg p-3">
              <NAvatar
                alt="Sarah Wilson"
                fallbackLabel="SW"
                size="md"
                src="https://i.pravatar.cc/150?img=5"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Sarah Wilson</div>
                  <div className="text-xs text-gray-400">2分钟前</div>
                </div>
                <div className="text-sm text-gray-500">最新消息预览...</div>
              </div>
            </div>
          </div>
        </NCard.Content>
      </NCard>
    </div>
  );
}
