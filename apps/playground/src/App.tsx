import { Loader, Minus, Pause, Plus, SkipBack, SkipForward } from 'lucide-react';
import { Card, NButton, NButtonGroup, NButtonIcon, NButtonLink, NLoadingButton } from 'nova-ui';
import type { ButtonShadow, ButtonVariant, ThemeColor, ThemeSize } from 'nova-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];

export default function App() {
  return (
    <div className="flex-c gap-4 p-6">
      {/* Color */}
      <div>
        <div className="mb-2 font-bold">Color</div>
        <div className="flex flex-wrap gap-12px">
          {colors.map(color => (
            <NButton
              color={color}
              key={color}
            >
              {color}
            </NButton>
          ))}
        </div>
      </div>
      {/* Variant */}
      <div>
        <div className="mb-2 font-bold">Variant</div>
        <div className="flex-c-stretch gap-12px">
          {colors.map(color => (
            <div
              className="flex flex-wrap gap-12px"
              key={color}
            >
              {variants.map(variant => (
                <NButton
                  color={color}
                  key={variant}
                  variant={variant}
                >
                  {variant}
                </NButton>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Size */}
      <div>
        <div className="mb-2 font-bold">Size</div>
        <div className="flex flex-wrap gap-12px">
          {sizes.map((size, index) => (
            <NButton
              color={colors[index]}
              key={size}
              size={size}
              variant="outline"
            >
              {size}
            </NButton>
          ))}
        </div>
      </div>
      {/* Shape */}
      <div>
        <div className="mb-2 font-bold">Shape</div>
        <div className="flex flex-wrap gap-12px">
          <NButton
            color="primary"
            shape="rounded"
            variant="solid"
          >
            rounded
          </NButton>
          <div className="flex-c-center">
            <NButtonIcon
              color="destructive"
              shape="square"
              variant="plain"
            >
              <Minus />
            </NButtonIcon>
            <div className="text-12px text-#666">square</div>
          </div>
          <div className="flex-c-center">
            <NButtonIcon
              color="success"
              shape="circle"
              variant="outline"
            >
              <Plus />
            </NButtonIcon>
            <div className="text-12px text-#666">circle</div>
          </div>
          <div className="flex-c-center">
            <NButtonIcon
              color="warning"
              shape="square"
              variant="dashed"
            >
              <Plus />
            </NButtonIcon>
            <div className="text-12px text-#666">square</div>
          </div>
          <div className="flex-c-center">
            <NButtonIcon shape="circle">
              <Minus />
            </NButtonIcon>
            <div className="text-12px text-#666">circle</div>
          </div>
        </div>
      </div>
      {/* Shadow */}
      <div>
        <div className="mb-2 font-bold">Shadow</div>
        <div className="flex flex-wrap gap-12px">
          {shadows.map((item, index) => (
            <NButton
              color={colors[index]}
              key={item}
              shadow={item}
              variant="plain"
            >
              {item}
            </NButton>
          ))}
        </div>
      </div>
      {/* Slot */}
      <div>
        <div className="mb-2 font-bold">Slot</div>
        <div className="flex flex-wrap gap-12px">
          <NButton
            color="primary"
            leading={<Plus />}
          >
            leading
          </NButton>
          <NButton
            color="destructive"
            trailing={<Minus />}
            variant="outline"
          >
            After
          </NButton>
          <NButton
            color="success"
            leading={<Plus />}
            trailing={<Minus />}
            variant="dashed"
          >
            Both
          </NButton>
        </div>
      </div>
      {/* Disabled */}
      <div>
        <div className="mb-2 font-bold">Disabled</div>
        <div className="flex flex-wrap gap-12px">
          <NButton
            disabled
            color="destructive"
            variant="solid"
          >
            disabled
          </NButton>
          <NButton
            disabled
            color="success"
            variant="outline"
          >
            disabled
          </NButton>
          <NButton
            disabled
            color="warning"
            variant="dashed"
          >
            disabled
          </NButton>
        </div>
      </div>
      {/* Loading */}
      <div>
        <div className="mb-2 font-bold">Loading</div>
        <div className="flex flex-wrap gap-12px">
          <NLoadingButton
            loading
            color="success"
            variant="solid"
          >
            Loading...
          </NLoadingButton>
          <NLoadingButton
            loading
            color="warning"
            leading={<Loader className="animate-spin" />}
            variant="outline"
          >
            Loading...
          </NLoadingButton>
        </div>
      </div>
      {/* Link */}
      <div>
        <div className="mb-2 font-bold">Link</div>
        <div className="flex flex-wrap gap-12px">
          <NButtonLink
            asChild
            href="https://github.com/Rascal-Coder/Novaui"
          >
            Novaui
          </NButtonLink>
        </div>
      </div>
      {/* Button Group */}
      <div>
        <div className="mb-2 font-bold">Button Group</div>
        <div className="flex flex-wrap gap-12px">
          <NButtonGroup>
            <NButton variant="outline">
              <SkipBack />
            </NButton>
            <NButton variant="outline">
              <Pause />
            </NButton>
            <NButton variant="outline">
              <SkipForward />
            </NButton>
          </NButtonGroup>
          <NButtonGroup>
            <NButton
              color="destructive"
              variant="outline"
            >
              <SkipBack />
            </NButton>
            <NButton
              color="destructive"
              variant="outline"
            >
              <SkipForward />
            </NButton>
          </NButtonGroup>
        </div>
      </div>
      {/* Button Group vertical */}
      <div>
        <div className="mb-2 font-bold">Button Group vertical</div>
        <div className="w-100px">
          <NButtonGroup orientation="vertical">
            <NButton variant="dashed">
              <SkipBack />
            </NButton>
            <NButton variant="dashed">
              <Pause />
            </NButton>
            <NButton variant="dashed">
              <SkipForward />
            </NButton>
          </NButtonGroup>
        </div>
      </div>
      {/* Button Icon */}
      <div>
        <div className="mb-2 font-bold">Button Icon</div>
        <div className="flex flex-wrap gap-12px">
          <NButtonIcon>
            <SkipBack />
          </NButtonIcon>
          <NButtonIcon>
            <SkipForward />
          </NButtonIcon>
          <NButtonIcon>
            <Pause />
          </NButtonIcon>
        </div>
      </div>
      {/* Button Icon: fitContent */}
      <div>
        <div className="mb-2 font-bold">Button Icon: fitContent</div>
        <div className="flex flex-wrap gap-12px">
          <NButtonIcon
            fitContent
            className="p-0.5 text-xl"
          >
            <SkipBack />
          </NButtonIcon>
          <NButtonIcon
            fitContent
            className="p-0.5 text-xl"
          >
            <SkipForward />
          </NButtonIcon>
          <NButtonIcon
            fitContent
            className="p-0.5 text-xl"
          >
            <Pause />
          </NButtonIcon>
        </div>
      </div>

      {/* Card Examples */}
      <div>
        <div className="mb-2 font-bold">Card Examples</div>
        <div className="flex flex-wrap gap-4">
          {/* Simple Card */}
          <Card className="w-80">
            <Card.Content>Simple card content</Card.Content>
          </Card>

          {/* Full Card */}
          <Card
            className="w-80"
            size="md"
          >
            <Card.Header>
              <Card.TitleRoot>
                <Card.Title>Card Title</Card.Title>
              </Card.TitleRoot>
            </Card.Header>
            <Card.Content>This is a full card with header, content, and footer sections.</Card.Content>
            <Card.Footer>
              <NButton
                size="sm"
                variant="outline"
              >
                Action
              </NButton>
            </Card.Footer>
          </Card>

          {/* Custom Card with Slot */}
          <Card className="w-80">
            <Card.Header asChild>
              <header className="flex items-center justify-between border-b p-4">
                <h3 className="font-semibold">Custom Header</h3>
                <NButtonIcon
                  size="sm"
                  variant="ghost"
                >
                  <Plus />
                </NButtonIcon>
              </header>
            </Card.Header>
            <Card.Content className="p-4">Custom content using slot functionality for complete control.</Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
