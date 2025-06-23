import { Rocket, X } from 'lucide-react';
import { NButtonIcon, NCard, type ThemeSize } from 'nova-ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
export default function Card() {
  return (
    <div className="flex-c gap-4">
      {/* Size Example */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Size</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex gap-4 lt-sm:flex-col">
            <div className="w-1/2 flex flex-col gap-3 pr-2.5 lt-sm:(w-full pr-0)">
              {sizes.map(size => (
                <NCard
                  key={size}
                  size={size}
                >
                  <NCard.Header>
                    <NCard.TitleRoot>
                      <NCard.Title>Size: {size}</NCard.Title>
                    </NCard.TitleRoot>
                    <span className="text-sm text-gray-500">extra</span>
                  </NCard.Header>
                  <NCard.Content>
                    <p className="text-gray-500 dark:text-neutral-400">Content</p>
                  </NCard.Content>
                  <NCard.Footer>Footer</NCard.Footer>
                </NCard>
              ))}
            </div>
            <div className="w-1/2 flex flex-col gap-3 pl-2.5 lt-sm:(w-full pl-0)">
              {sizes.map(size => (
                <NCard
                  split
                  key={size}
                  size={size}
                >
                  <NCard.Header>
                    <NCard.TitleRoot>
                      <NCard.Title>Size: {size}</NCard.Title>
                    </NCard.TitleRoot>
                    <NButtonIcon size={size}>
                      <X />
                    </NButtonIcon>
                  </NCard.Header>
                  <NCard.Content>
                    <p className="text-gray-500 dark:text-neutral-400">Content</p>
                  </NCard.Content>
                  <NCard.Footer>Footer</NCard.Footer>
                </NCard>
              ))}
            </div>
          </div>
        </NCard.Content>
      </NCard>

      {/* More Examples */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>More</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content className="flex flex-col gap-4">
          {/* Only Content */}
          <NCard>
            <NCard.Content>
              <p className="text-gray-500 dark:text-neutral-400">Only Content</p>
            </NCard.Content>
          </NCard>

          {/* Title + Content */}
          <NCard split>
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>Title</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <p className="text-gray-500 dark:text-neutral-400">Content</p>
            </NCard.Content>
          </NCard>

          {/* Content + Footer */}
          <NCard split>
            <NCard.Content>
              <p className="text-gray-500 dark:text-neutral-400">Content</p>
            </NCard.Content>
            <NCard.Footer>Footer</NCard.Footer>
          </NCard>

          {/* Title with Leading/Trailing */}
          <NCard split>
            <NCard.Header>
              <NCard.TitleRoot>
                <Rocket className="h-4 w-4" />
                <NCard.Title>Title Slot</NCard.Title>
                <div className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">Badge</div>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <p className="text-gray-500 dark:text-neutral-400">Content</p>
            </NCard.Content>
          </NCard>
        </NCard.Content>
      </NCard>

      {/* UI 自定义对象示例 */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>UI Customization</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content className="flex flex-col gap-4">
          {/* Basic Usage - Gradient Background */}
          <NCard ui={{ root: 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' }}>
            <NCard.Content>
              <p>Card with gradient background</p>
            </NCard.Content>
          </NCard>

          {/* Blue Theme */}
          <NCard
            ui={{
              root: 'border-2 border-dashed border-blue-300 bg-blue-50/30',
              header: 'bg-blue-100 border-b border-blue-200',
              title: 'text-blue-800 font-bold',
              content: 'text-blue-700',
              footer: 'bg-blue-50 border-t border-blue-200'
            }}
          >
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>Custom Blue Theme Card</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <p>This card uses a completely custom blue theme style</p>
            </NCard.Content>
            <NCard.Footer>
              <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">Confirm</button>
            </NCard.Footer>
          </NCard>

          {/* Dark Theme */}
          <NCard
            split
            ui={{
              root: 'bg-gray-900 border-gray-700 text-white',
              header: 'border-b border-gray-700',
              title: 'text-gray-100',
              content: 'text-gray-300',
              footer: 'border-t border-gray-700'
            }}
          >
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>Dark Theme Card</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <p>This is a dark theme card example</p>
            </NCard.Content>
            <NCard.Footer>
              <span className="text-gray-400">Footer Information</span>
            </NCard.Footer>
          </NCard>
        </NCard.Content>
      </NCard>
    </div>
  );
}
