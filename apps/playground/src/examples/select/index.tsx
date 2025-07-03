import { Flame, Globe, Sparkles, User } from 'lucide-react';
import {
  NCard,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from 'nova-ui';
import { useState } from 'react';

export default function SelectExample() {
  const [basicValue, setBasicValue] = useState('');
  const [sizeValue, setSizeValue] = useState('');
  const [groupedValue, setGroupedValue] = useState('');
  const [iconValue, setIconValue] = useState('');

  return (
    <div className="flex-c gap-4">
      {/* Basic Usage */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Basic Usage</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-4">
            <Select
              value={basicValue}
              onValueChange={setBasicValue}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
                <SelectItem value="strawberry">Strawberry</SelectItem>
              </SelectContent>
            </Select>

            <Select disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Disabled select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="item1">Item 1</SelectItem>
                <SelectItem value="item2">Item 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </NCard.Content>
      </NCard>

      {/* Size Variants */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Size Variants</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap items-center gap-4">
            <Select
              value={sizeValue}
              onValueChange={setSizeValue}
            >
              <SelectTrigger
                className="w-[160px]"
                size="sm"
              >
                <SelectValue placeholder="Small" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm1">Small Option 1</SelectItem>
                <SelectItem value="sm2">Small Option 2</SelectItem>
                <SelectItem value="sm3">Small Option 3</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger
                className="w-[180px]"
                size="default"
              >
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default1">Default Option 1</SelectItem>
                <SelectItem value="default2">Default Option 2</SelectItem>
                <SelectItem value="default3">Default Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </NCard.Content>
      </NCard>

      {/* Grouped Options */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Grouped Options</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Select
            value={groupedValue}
            onValueChange={setGroupedValue}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frontend</SelectLabel>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Backend</SelectLabel>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Database</SelectLabel>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
                <SelectItem value="redis">Redis</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </NCard.Content>
      </NCard>

      {/* With Icons */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>With Icons</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Select
            value={iconValue}
            onValueChange={setIconValue}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Light Theme</span>
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Dark Theme</span>
                </div>
              </SelectItem>
              <SelectItem value="system">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>System Theme</span>
                </div>
              </SelectItem>
              <SelectItem value="custom">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  <span>Custom Theme</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </NCard.Content>
      </NCard>

      {/* Disabled Options */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>With Disabled Options</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free Plan</SelectItem>
              <SelectItem value="basic">Basic Plan</SelectItem>
              <SelectItem
                disabled
                value="pro"
              >
                Pro Plan (Coming Soon)
              </SelectItem>
              <SelectItem value="enterprise">Enterprise Plan</SelectItem>
              <SelectItem
                disabled
                value="custom"
              >
                Custom Plan (Contact Sales)
              </SelectItem>
            </SelectContent>
          </Select>
        </NCard.Content>
      </NCard>

      {/* Current Selected Values */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Current Selected Values</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Basic:</span>{' '}
              <span className="text-muted-foreground">{basicValue || 'None selected'}</span>
            </div>
            <div>
              <span className="font-medium">Size:</span>{' '}
              <span className="text-muted-foreground">{sizeValue || 'None selected'}</span>
            </div>
            <div>
              <span className="font-medium">Grouped:</span>{' '}
              <span className="text-muted-foreground">{groupedValue || 'None selected'}</span>
            </div>
            <div>
              <span className="font-medium">Icon:</span>{' '}
              <span className="text-muted-foreground">{iconValue || 'None selected'}</span>
            </div>
          </div>
        </NCard.Content>
      </NCard>
    </div>
  );
}
