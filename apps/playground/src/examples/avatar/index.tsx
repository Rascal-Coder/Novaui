import { User } from 'lucide-react';
import { NAvatar, NAvatarFallback, NAvatarImage, NCard } from 'nova-ui';
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
              <NAvatar fallbackLabel="JD" />
              <div className="text-12px text-gray-500">仅后备文本</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                alt="John Doe"
                fallbackLabel="JD"
                src="https://github.com/shadcn.png"
              />
              <div className="text-12px text-gray-500">带图片头像</div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 尺寸大小 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>尺寸大小</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex items-center gap-4">
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="XS"
                size="xs"
              />
              <div className="text-12px text-gray-500">xs</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="SM"
                size="sm"
              />
              <div className="text-12px text-gray-500">sm</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="MD"
                size="md"
              />
              <div className="text-12px text-gray-500">md (默认)</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="LG"
                size="lg"
              />
              <div className="text-12px text-gray-500">lg</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="XL"
                size="xl"
              />
              <div className="text-12px text-gray-500">xl</div>
            </div>
            <div className="flex-c-center gap-2">
              <NAvatar
                fallbackLabel="2XL"
                size="2xl"
              />
              <div className="text-12px text-gray-500">2xl</div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 图片处理 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>图片处理</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-col gap-6">
            {/* 图片加载状态 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">图片加载状态监听</div>
              <div className="flex items-center gap-4">
                <NAvatar
                  alt="用户头像"
                  fallbackLabel="用户"
                  src="https://github.com/vercel.png"
                  onLoadingStatusChange={status => setLoadingStatus(status)}
                />
                <div className="text-sm">
                  <span className="text-gray-600">当前状态: </span>
                  <span
                    className={`font-medium ${(() => {
                      if (loadingStatus === 'loaded') return 'text-green-600';
                      if (loadingStatus === 'error') return 'text-red-600';
                      if (loadingStatus === 'loading') return 'text-blue-600';
                      return 'text-gray-600';
                    })()}`}
                  >
                    {loadingStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* 图片加载失败 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">图片加载失败时显示后备内容</div>
              <div className="flex items-center gap-4">
                <NAvatar
                  alt="头像"
                  fallbackLabel="FB"
                  src="https://invalid-url.jpg"
                />
                <div className="text-12px text-gray-500">无效URL，显示后备文本</div>
              </div>
            </div>

            {/* 图片属性 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">图片属性设置</div>
              <div className="flex items-center gap-4">
                <NAvatar
                  alt="用户头像"
                  crossOrigin="anonymous"
                  fallbackLabel="用户"
                  referrerPolicy="no-referrer"
                  src="https://github.com/shadcn.png"
                />
                <div className="text-12px text-gray-500">设置crossOrigin和referrerPolicy</div>
              </div>
            </div>
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
          <div className="flex flex-col gap-6">
            {/* 使用 ui prop */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">使用 ui prop 自定义样式</div>
              <div className="flex items-center gap-4">
                <NAvatar
                  fallbackLabel="UI"
                  ui={{
                    root: 'border-2 border-blue-500',
                    fallback: 'bg-blue-100 text-blue-700 font-bold'
                  }}
                />
                <NAvatar
                  fallbackLabel="IMG"
                  src="https://github.com/shadcn.png"
                  ui={{
                    root: 'border-2 border-purple-500',
                    image: 'grayscale hover:grayscale-0 transition-all duration-300'
                  }}
                />
                <div className="text-12px text-gray-500">自定义根容器、后备内容、图片样式</div>
              </div>
            </div>

            {/* 使用 className */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">使用 className 自定义根容器样式</div>
              <div className="flex items-center gap-4">
                <NAvatar
                  className="ring-2 ring-offset-2 ring-purple-500"
                  fallbackLabel="CLS"
                />
                <NAvatar
                  className="ring-2 ring-offset-2 ring-green-500 ring-offset-green-100"
                  fallbackLabel="GRN"
                  ui={{
                    fallback: 'bg-green-100 text-green-700'
                  }}
                />
                <div className="text-12px text-gray-500">使用ring效果和颜色主题</div>
              </div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 自定义内容 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>自定义内容</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-col gap-6">
            {/* 完全自定义内容 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">完全自定义内容</div>
              <div className="flex items-center gap-4">
                <NAvatar size="lg">
                  <div className="h-full w-full flex items-center justify-center from-pink-400 to-purple-600 bg-gradient-to-br text-white font-bold">
                    💎
                  </div>
                </NAvatar>
                <NAvatar size="lg">
                  <div className="h-full w-full flex items-center justify-center from-blue-400 to-cyan-600 bg-gradient-to-br text-xl text-white">
                    🚀
                  </div>
                </NAvatar>
                <div className="text-12px text-gray-500">渐变背景 + 图标</div>
              </div>
            </div>

            {/* 自定义后备内容 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">自定义后备内容</div>
              <div className="flex items-center gap-4">
                <NAvatar
                  size="lg"
                  src="https://github.com/shadcn.png"
                >
                  <NAvatarImage />
                  <NAvatarFallback>
                    <User className="h-6 w-6" />
                  </NAvatarFallback>
                </NAvatar>
                <NAvatar
                  size="lg"
                  src="https://invalid-url.jpg"
                >
                  <NAvatarImage />
                  <NAvatarFallback>
                    <User className="h-6 w-6 text-gray-500" />
                  </NAvatarFallback>
                </NAvatar>
                <div className="text-12px text-gray-500">使用图标作为后备内容</div>
              </div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 组合使用 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>组合使用</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-col gap-6">
            {/* 用户信息展示 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">用户信息展示</div>
              <div className="flex items-center gap-3 border rounded-lg bg-gray-50 p-4">
                <NAvatar
                  alt="John Doe"
                  fallbackLabel="JD"
                  size="md"
                  src="https://github.com/shadcn.png"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
            </div>

            {/* 团队成员列表 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">团队成员列表</div>
              <div className="flex -space-x-2">
                <NAvatar
                  alt="Alice"
                  className="z-10 border-2 border-white"
                  fallbackLabel="A"
                  size="md"
                  src="https://github.com/shadcn.png"
                />
                <NAvatar
                  alt="Bob"
                  className="z-9 border-2 border-white"
                  fallbackLabel="B"
                  size="md"
                  ui={{
                    fallback: 'bg-blue-100 text-blue-700'
                  }}
                />
                <NAvatar
                  alt="Charlie"
                  className="z-8 border-2 border-white"
                  fallbackLabel="C"
                  size="md"
                  ui={{
                    fallback: 'bg-green-100 text-green-700'
                  }}
                />
                <NAvatar
                  alt="Diana"
                  className="z-7 border-2 border-white"
                  fallbackLabel="D"
                  size="md"
                  ui={{
                    fallback: 'bg-purple-100 text-purple-700'
                  }}
                />
                <NAvatar
                  className="z-6 border-2 border-white"
                  fallbackLabel="+5"
                  size="md"
                  ui={{
                    fallback: 'bg-gray-100 text-gray-600 text-xs'
                  }}
                />
              </div>
            </div>

            {/* 状态指示器 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">在线状态指示器</div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <NAvatar
                    alt="Online User"
                    fallbackLabel="ON"
                    size="lg"
                    src="https://github.com/shadcn.png"
                  />
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-2 border-white rounded-full bg-green-500" />
                </div>
                <div className="relative">
                  <NAvatar
                    fallbackLabel="AW"
                    size="lg"
                    ui={{
                      fallback: 'bg-yellow-100 text-yellow-700'
                    }}
                  />
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-2 border-white rounded-full bg-yellow-500" />
                </div>
                <div className="relative">
                  <NAvatar
                    fallbackLabel="OFF"
                    size="lg"
                    ui={{
                      fallback: 'bg-gray-100 text-gray-500'
                    }}
                  />
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-2 border-white rounded-full bg-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* 高级用法 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>高级用法</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-col gap-6">
            {/* 不同形状效果 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">不同形状效果</div>
              <div className="flex items-center gap-4">
                <NAvatar
                  fallbackLabel="□"
                  size="lg"
                  ui={{
                    root: 'rounded-lg',
                    fallback: 'bg-blue-100 text-blue-700'
                  }}
                />
                <NAvatar
                  fallbackLabel="◇"
                  size="lg"
                  ui={{
                    root: 'rounded-none rotate-45',
                    fallback: 'bg-purple-100 text-purple-700 -rotate-45'
                  }}
                />
                <NAvatar
                  fallbackLabel="●"
                  size="lg"
                  ui={{
                    fallback: 'bg-green-100 text-green-700'
                  }}
                />
                <div className="text-12px text-gray-500">方形、菱形、圆形</div>
              </div>
            </div>

            {/* 多层嵌套效果 */}
            <div>
              <div className="mb-3 text-sm text-gray-700 font-medium">多层嵌套效果</div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <NAvatar
                    alt="User"
                    className="ring-4 ring-blue-100"
                    fallbackLabel="U"
                    size="xl"
                    src="https://github.com/shadcn.png"
                  />
                  <NAvatar
                    className="absolute border-2 border-white -bottom-1 -right-1"
                    fallbackLabel="+"
                    size="sm"
                    ui={{
                      fallback: 'bg-blue-500 text-white text-xs'
                    }}
                  />
                </div>
                <div className="relative">
                  <NAvatar
                    className="ring-4 ring-yellow-100"
                    fallbackLabel="CEO"
                    size="xl"
                    ui={{
                      fallback: 'bg-yellow-500 text-white font-bold text-xs'
                    }}
                  />
                  <div className="absolute h-6 w-6 flex items-center justify-center border-2 border-white rounded-full bg-red-500 text-xs text-white -right-1 -top-1">
                    9
                  </div>
                </div>
                <div className="text-12px text-gray-500">添加徽章和通知</div>
              </div>
            </div>
          </div>
        </NCard.Content>
      </NCard>
    </div>
  );
}
