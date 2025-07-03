import { Minus, Pause, Plus, SkipBack, SkipForward } from 'lucide-react';
import {
  type ButtonShadow,
  type ButtonVariant,
  NButton,
  NButtonGroup,
  NButtonIcon,
  NButtonLink,
  NCard,
  NLoadingButton,
  type ThemeColor,
  type ThemeSize
} from 'nova-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];

export default function ButtonExample() {
  return (
    <div className="flex-c gap-4">
      {/* Color */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Color</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Variant */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Variant</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Size */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Size</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Shape */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Shape</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Shadow */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Shadow</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Slot */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Slot</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Disabled */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Disabled</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Loading */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Loading</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
              variant="outline"
            >
              Loading...
            </NLoadingButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* Link */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Link</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            <NButtonLink
              asChild
              href="https://github.com/Rascal-Coder/Novaui"
            >
              Novaui
            </NButtonLink>
          </div>
        </NCard.Content>
      </NCard>

      {/* Button Group */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Button Group</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Button Group vertical */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Button Group Vertical</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Button Icon */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Button Icon</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>

      {/* Button Icon: fitContent */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Button Icon: Fit Content</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
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
        </NCard.Content>
      </NCard>
    </div>
  );
}
