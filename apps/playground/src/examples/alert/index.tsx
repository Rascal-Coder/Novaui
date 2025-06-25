import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Alert, type AlertVariant, NCard, type ThemeColor, type ThemeSize } from 'nova-ui';
import { useState } from 'react';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: AlertVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export default function AlertExample() {
  const [closableAlerts, setClosableAlerts] = useState<Record<string, boolean>>({});

  const handleAlertClose = (id: string) => {
    setClosableAlerts(prev => ({ ...prev, [id]: true }));
  };

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
          <div className="flex-c gap-3">
            <Alert
              description="This is a basic alert with title and description."
              title="Basic Alert"
            />

            <Alert
              color="success"
              description="This operation completed successfully."
              title="Success Alert"
            >
              <CheckCircle className="h-4 w-4" />
            </Alert>

            <Alert
              color="destructive"
              description="Something went wrong. Please try again."
              title="Error Alert"
            >
              <XCircle className="h-4 w-4" />
            </Alert>

            <Alert
              color="warning"
              description="Please review this information carefully."
              title="Warning Alert"
            >
              <AlertTriangle className="h-4 w-4" />
            </Alert>

            <Alert
              color="info"
              description="Here's some helpful information for you."
              title="Info Alert"
            >
              <Info className="h-4 w-4" />
            </Alert>
          </div>
        </NCard.Content>
      </NCard>

      {/* Colors */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Colors</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-3">
            {colors.map(color => (
              <Alert
                color={color}
                description={`This is a ${color} alert example.`}
                key={color}
                title={`${color} Alert`}
              />
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* Variants */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Variants</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-4">
            {variants.map(variant => (
              <div
                className="flex-c gap-3"
                key={variant}
              >
                <h4 className="text-sm font-medium capitalize">{variant}</h4>
                <div className="flex-c gap-2">
                  <Alert
                    color="primary"
                    description="Primary alert example"
                    title={`${variant} Primary`}
                    variant={variant}
                  />
                  <Alert
                    color="destructive"
                    description="Destructive alert example"
                    title={`${variant} Destructive`}
                    variant={variant}
                  />
                  <Alert
                    color="success"
                    description="Success alert example"
                    title={`${variant} Success`}
                    variant={variant}
                  />
                </div>
              </div>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* Sizes */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Sizes</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-3">
            {sizes.map(size => (
              <Alert
                color="info"
                description={`This is a ${size} sized alert.`}
                key={size}
                size={size}
                title={`Size ${size}`}
                variant="outline"
              >
                <Info className="h-4 w-4" />
              </Alert>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* Closable Alerts */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Closable Alerts</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-3">
            <Alert
              closable
              close={closableAlerts.success}
              color="success"
              description="You can close this alert by clicking the X button."
              title="Closable Success"
              variant="soft"
              onClose={() => handleAlertClose('success')}
            >
              <CheckCircle className="h-4 w-4" />
            </Alert>

            <Alert
              closable
              close={closableAlerts.warning}
              color="warning"
              description="This is a closable warning alert."
              title="Closable Warning"
              variant="outline"
              onClose={() => handleAlertClose('warning')}
            >
              <AlertTriangle className="h-4 w-4" />
            </Alert>

            <Alert
              closable
              close={closableAlerts.error}
              color="destructive"
              description="This error alert can be dismissed."
              title="Closable Error"
              variant="solid"
              onClose={() => handleAlertClose('error')}
            >
              <XCircle className="h-4 w-4" />
            </Alert>
          </div>
        </NCard.Content>
      </NCard>

      {/* Custom Content */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Custom Content</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-3">
            {/* Alert with only title */}
            <Alert
              color="primary"
              title="Alert with only title"
              variant="soft"
            />

            {/* Alert with only description */}
            <Alert
              color="info"
              description="This alert only has a description without a title."
              variant="outline"
            />

            {/* Alert with custom children */}
            <Alert
              color="warning"
              title="Custom Content Alert"
              variant="ghost"
            >
              <AlertTriangle className="h-4 w-4" />
              <div className="mt-2">
                <p className="text-sm">This alert contains custom React children content:</p>
                <ul className="mt-1 list-disc list-inside text-sm">
                  <li>Custom bullet points</li>
                  <li>Rich text formatting</li>
                  <li>Interactive elements</li>
                </ul>
                <button className="mt-2 rounded bg-warning px-3 py-1 text-xs text-warning-foreground">
                  Action Button
                </button>
              </div>
            </Alert>
          </div>
        </NCard.Content>
      </NCard>

      {/* UI Customization */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>UI Customization</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-3">
            {/* Custom styles with ui prop */}
            <Alert
              color="primary"
              description="This alert uses custom styling via the ui prop."
              title="Custom Styled Alert"
              variant="outline"
              ui={{
                root: 'border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50',
                title: 'text-blue-800 font-bold',
                description: 'text-blue-600',
                icon: 'text-blue-500'
              }}
            >
              <Info className="h-5 w-5" />
            </Alert>

            {/* Dark theme alert */}
            <Alert
              closable
              color="success"
              description="Custom dark theme styling example."
              title="Dark Theme Alert"
              variant="solid"
              ui={{
                root: 'bg-gray-900 border-gray-700 text-gray-100',
                title: 'text-green-400',
                description: 'text-gray-300',
                close: 'text-gray-400 hover:text-gray-200'
              }}
            >
              <CheckCircle className="h-4 w-4" />
            </Alert>
          </div>
        </NCard.Content>
      </NCard>

      {/* Composition Usage */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Composition Usage</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex-c gap-3">
            {/* Using subcomponents */}
            <Alert.Root
              color="info"
              variant="soft"
            >
              <Info className="h-4 w-4" />
              <Alert.Wrapper>
                <Alert.Title>Composed Alert</Alert.Title>
                <Alert.Description>
                  This alert is built using the composition pattern with subcomponents.
                </Alert.Description>
              </Alert.Wrapper>
            </Alert.Root>

            {/* Complex composition */}
            <Alert.Root
              className="relative"
              color="warning"
              variant="outline"
            >
              <AlertTriangle className="h-5 w-5" />
              <Alert.Wrapper>
                <Alert.Title>System Maintenance</Alert.Title>
                <Alert.Description>
                  Scheduled maintenance will occur on Sunday, 2:00 AM - 4:00 AM UTC.
                </Alert.Description>
                <div className="mt-3 flex gap-2">
                  <button className="rounded bg-warning px-3 py-1 text-xs text-warning-foreground">Learn More</button>
                  <button className="border border-warning rounded px-3 py-1 text-xs text-warning">Dismiss</button>
                </div>
              </Alert.Wrapper>
            </Alert.Root>
          </div>
        </NCard.Content>
      </NCard>
    </div>
  );
}
