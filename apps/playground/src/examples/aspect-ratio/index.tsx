import { Calendar, Eye, Heart, Play, Share2, ShoppingCart, Star, User } from 'lucide-react';
import { AspectRatio, NButton, NCard } from 'nova-ui';

export default function AspectRatioExample() {
  return (
    <div className="p-4 space-y-8">
      {/* 产品卡片展示 */}
      <section>
        <h3 className="mb-4 text-xl font-semibold">产品卡片展示</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          {[
            {
              id: 1,
              title: '无线蓝牙耳机',
              price: '¥299',
              originalPrice: '¥399',
              rating: 4.8,
              reviews: 1234,
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&dpr=2&q=80'
            },
            {
              id: 2,
              title: '智能手表',
              price: '¥1299',
              originalPrice: '¥1599',
              rating: 4.9,
              reviews: 856,
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&dpr=2&q=80'
            },
            {
              id: 3,
              title: '便携充电宝',
              price: '¥89',
              originalPrice: '¥129',
              rating: 4.6,
              reviews: 2341,
              image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=800&dpr=2&q=80'
            }
          ].map(product => (
            <NCard
              className="overflow-hidden transition-shadow hover:shadow-lg"
              key={product.id}
            >
              <div className="relative">
                <AspectRatio ratio={4 / 3}>
                  <img
                    alt={product.title}
                    className="h-full w-full object-cover"
                    src={product.image}
                  />
                </AspectRatio>
                <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-sm text-white font-semibold">
                  特惠
                </div>
                <button className="absolute left-2 top-2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <NCard.Content className="p-4">
                <h4 className="mb-2 text-lg font-semibold">{product.title}</h4>
                <div className="mb-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl text-red-600 font-bold">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <NButton
                    leading={<ShoppingCart className="h-4 w-4" />}
                    size="sm"
                  >
                    加入购物车
                  </NButton>
                </div>
              </NCard.Content>
            </NCard>
          ))}
        </div>
      </section>

      {/* 博客文章卡片 */}
      <section>
        <h3 className="mb-4 text-xl font-semibold">博客文章卡片</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            {
              id: 1,
              title: 'React 18 新特性深度解析',
              excerpt: '详细介绍React 18中的并发渲染、自动批处理、Suspense改进等重要特性...',
              author: '张三',
              date: '2024-01-15',
              readTime: '8分钟阅读',
              views: 1542,
              category: '前端开发',
              image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&dpr=2&q=80'
            },
            {
              id: 2,
              title: 'TypeScript 5.0 重要更新指南',
              excerpt: '探索TypeScript 5.0中的新语法特性、性能优化和开发体验改进...',
              author: '李四',
              date: '2024-01-12',
              readTime: '6分钟阅读',
              views: 2103,
              category: '编程语言',
              image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&dpr=2&q=80'
            }
          ].map(article => (
            <NCard
              className="overflow-hidden transition-shadow hover:shadow-lg"
              key={article.id}
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  alt={article.title}
                  className="h-full w-full object-cover"
                  src={article.image}
                />
                <div className="absolute inset-0 from-black/60 via-transparent to-transparent bg-gradient-to-t" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                    {article.category}
                  </span>
                </div>
              </AspectRatio>
              <NCard.Content className="p-6">
                <h4 className="line-clamp-2 mb-3 text-xl font-bold">{article.title}</h4>
                <p className="line-clamp-3 mb-4 text-gray-600">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {article.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Eye className="mr-1 h-4 w-4" />
                      {article.views}
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </NCard.Content>
              <NCard.Footer className="px-6 pb-6">
                <div className="flex items-center justify-between">
                  <NButton
                    size="sm"
                    variant="outline"
                  >
                    阅读更多
                  </NButton>
                  <div className="flex items-center space-x-2">
                    <NButton
                      className="p-2"
                      size="sm"
                      variant="ghost"
                    >
                      <Heart className="h-4 w-4" />
                    </NButton>
                    <NButton
                      className="p-2"
                      size="sm"
                      variant="ghost"
                    >
                      <Share2 className="h-4 w-4" />
                    </NButton>
                  </div>
                </div>
              </NCard.Footer>
            </NCard>
          ))}
        </div>
      </section>

      {/* 用户个人资料卡片 */}
      <section>
        <h3 className="mb-4 text-xl font-semibold">用户个人资料</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
          {[
            {
              id: 1,
              name: '王小明',
              role: '前端工程师',
              company: '某科技公司',
              followers: 1234,
              following: 567,
              posts: 89,
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&dpr=2&q=80'
            },
            {
              id: 2,
              name: '赵丽华',
              role: 'UI/UX 设计师',
              company: '某设计工作室',
              followers: 2345,
              following: 432,
              posts: 156,
              avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&dpr=2&q=80'
            },
            {
              id: 3,
              name: '刘志强',
              role: '产品经理',
              company: '某互联网公司',
              followers: 987,
              following: 321,
              posts: 67,
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&dpr=2&q=80'
            },
            {
              id: 4,
              name: '陈美玲',
              role: '数据分析师',
              company: '某金融公司',
              followers: 1567,
              following: 234,
              posts: 123,
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&dpr=2&q=80'
            }
          ].map(user => (
            <NCard
              className="text-center"
              key={user.id}
            >
              <NCard.Content className="p-6">
                <div className="mb-4">
                  <AspectRatio
                    className="mx-auto h-20 w-20 overflow-hidden rounded-full"
                    ratio={1}
                  >
                    <img
                      alt={user.name}
                      className="h-full w-full object-cover"
                      src={user.avatar}
                    />
                  </AspectRatio>
                </div>
                <h4 className="mb-1 text-lg font-semibold">{user.name}</h4>
                <p className="mb-1 text-sm text-gray-600">{user.role}</p>
                <p className="mb-4 text-xs text-gray-500">{user.company}</p>
                <div className="mb-4 flex justify-center text-sm space-x-4">
                  <div className="text-center">
                    <div className="font-semibold">{user.posts}</div>
                    <div className="text-gray-500">帖子</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{user.followers}</div>
                    <div className="text-gray-500">粉丝</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{user.following}</div>
                    <div className="text-gray-500">关注</div>
                  </div>
                </div>
                <NButton
                  className="w-full"
                  size="sm"
                >
                  关注
                </NButton>
              </NCard.Content>
            </NCard>
          ))}
        </div>
      </section>

      {/* 视频播放卡片 */}
      <section>
        <h3 className="mb-4 text-xl font-semibold">视频播放卡片</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              id: 1,
              title: 'React 高级技巧分享',
              duration: '15:32',
              views: '12.5K',
              uploadDate: '3天前',
              thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&dpr=2&q=80'
            },
            {
              id: 2,
              title: 'JavaScript 性能优化实战',
              duration: '22:15',
              views: '8.9K',
              uploadDate: '1周前',
              thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&dpr=2&q=80'
            }
          ].map(video => (
            <NCard
              className="overflow-hidden"
              key={video.id}
            >
              <div className="group relative cursor-pointer">
                <AspectRatio ratio={16 / 9}>
                  <img
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    src={video.thumbnail}
                  />
                </AspectRatio>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-black/70 transition-colors group-hover:bg-black/80">
                    <Play className="ml-1 h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-sm text-white">
                  {video.duration}
                </div>
              </div>
              <NCard.Content className="p-4">
                <h4 className="line-clamp-2 mb-2 font-semibold">{video.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{video.views} 观看</span>
                  <span>{video.uploadDate}</span>
                </div>
              </NCard.Content>
            </NCard>
          ))}
        </div>
      </section>

      {/* 媒体画廊 */}
      <section>
        <h3 className="mb-4 text-xl font-semibold">媒体画廊</h3>
        <NCard>
          <NCard.Header>
            <NCard.TitleRoot>
              <NCard.Title>摄影作品集</NCard.Title>
            </NCard.TitleRoot>
            <span className="text-sm text-gray-500">12 张图片</span>
          </NCard.Header>
          <NCard.Content className="p-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
              {[
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&dpr=2&q=80',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&dpr=2&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&dpr=2&q=80',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&dpr=2&q=80',
                'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&dpr=2&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&dpr=2&q=80',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&dpr=2&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&dpr=2&q=80'
              ].map((image, index) => (
                <div
                  className="group cursor-pointer"
                  key={index}
                >
                  <AspectRatio
                    className="overflow-hidden rounded-lg"
                    ratio={1}
                  >
                    <img
                      alt={`Gallery image ${index + 1}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      src={image}
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </NCard.Content>
        </NCard>
      </section>
    </div>
  );
}
