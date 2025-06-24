import { NButton, NCard, type ThemeColor, type ThemeSize, Toast, type ToastIconType, useToast } from 'nova-ui';

const iconTypes: ToastIconType[] = ['success', 'warning', 'destructive', 'info'];
const richColors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const durations = [2000, 3000, 5000, 10000];

function ToastExamples() {
  const { toast, dismiss, toasts } = useToast();

  return (
    <div className="flex-c gap-4">
      {/* Icon Type */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Icon Type</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            {iconTypes.map(iconType => (
              <NButton
                color={iconType === 'destructive' ? 'destructive' : iconType}
                key={iconType}
                onClick={() =>
                  toast({
                    title: iconType.charAt(0).toUpperCase() + iconType.slice(1),
                    description: `This is a ${iconType} toast notification`,
                    iconType
                  })
                }
              >
                {iconType}
              </NButton>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* Rich Color */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Rich Color</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            {richColors.map(color => (
              <NButton
                color={color}
                key={color}
                variant="outline"
                onClick={() =>
                  toast({
                    title: `${color} Toast`,
                    description: `Rich color: ${color}`,
                    iconType: 'info',
                    richColor: color
                  })
                }
              >
                {color}
              </NButton>
            ))}
            {/* Default color as separate button */}
            <NButton
              color="primary"
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Default Toast',
                  description: 'Rich color: default',
                  iconType: 'info'
                })
              }
            >
              default
            </NButton>
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
                color={richColors[index % richColors.length]}
                key={size}
                size={size}
                variant="soft"
                onClick={() =>
                  toast({
                    title: `Size ${size}`,
                    description: `This toast uses size: ${size}`,
                    iconType: 'success',
                    size
                  })
                }
              >
                {size}
              </NButton>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* Duration */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Duration</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            {durations.map((duration, index) => (
              <NButton
                color={richColors[index]}
                key={duration}
                variant="dashed"
                onClick={() =>
                  toast({
                    title: `Duration ${duration}ms`,
                    description: `This toast will last ${duration / 1000} seconds`,
                    iconType: 'info',
                    duration
                  })
                }
              >
                {duration}ms
              </NButton>
            ))}
          </div>
        </NCard.Content>
      </NCard>

      {/* With Action */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>With Action</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            <NButton
              color="primary"
              onClick={() =>
                toast({
                  title: 'Action Toast',
                  description: 'This toast has an action button',
                  iconType: 'info',
                  action: <Toast.Action altText="View details">View</Toast.Action>
                })
              }
            >
              Simple Action
            </NButton>
            <NButton
              color="success"
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Success Action',
                  description: 'Operation completed successfully',
                  iconType: 'success',
                  richColor: 'success',
                  action: <Toast.Action altText="Continue">Continue</Toast.Action>
                })
              }
            >
              Success Action
            </NButton>
            <NButton
              color="destructive"
              variant="soft"
              onClick={() =>
                toast({
                  title: 'Error Action',
                  description: 'Something went wrong',
                  iconType: 'destructive',
                  richColor: 'destructive',
                  action: <Toast.Action altText="Retry">Retry</Toast.Action>
                })
              }
            >
              Error Action
            </NButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* Type (Accessibility) */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Type (Accessibility)</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            <NButton
              color="primary"
              onClick={() =>
                toast({
                  title: 'Foreground Toast',
                  description: 'High priority notification',
                  iconType: 'info',
                  type: 'foreground'
                })
              }
            >
              Foreground
            </NButton>
            <NButton
              color="secondary"
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Background Toast',
                  description: 'Low priority notification',
                  iconType: 'info',
                  type: 'background'
                })
              }
            >
              Background
            </NButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* Combined Examples */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Combined Examples</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            <NButton
              color="success"
              onClick={() =>
                toast({
                  title: 'Upload Complete',
                  description: 'Your file has been uploaded successfully',
                  iconType: 'success',
                  richColor: 'success',
                  size: 'lg',
                  duration: 8000,
                  action: (
                    <Toast.Action
                      altText="Open file"
                      onClick={() => {
                        console.warn('Open file');
                      }}
                    >
                      Open
                    </Toast.Action>
                  )
                })
              }
            >
              Upload Success
            </NButton>
            <NButton
              color="warning"
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Connection Lost',
                  description: 'Please check your internet connection',
                  iconType: 'warning',
                  richColor: 'warning',
                  size: 'md',
                  duration: 10000,
                  action: (
                    <Toast.Action
                      altText="Retry connection"
                      onClick={() => {
                        console.warn('Retry connection');
                      }}
                    >
                      Retry
                    </Toast.Action>
                  )
                })
              }
            >
              Warning Toast
            </NButton>
            <NButton
              color="destructive"
              variant="dashed"
              onClick={() =>
                toast({
                  title: 'Delete Failed',
                  description: 'Unable to delete the selected items',
                  iconType: 'destructive',
                  richColor: 'destructive',
                  size: 'sm',
                  duration: 15000,
                  action: (
                    <Toast.Action
                      altText="Try again"
                      onClick={() => {
                        console.warn('Try again');
                      }}
                    >
                      Try Again
                    </Toast.Action>
                  )
                })
              }
            >
              Error Toast
            </NButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* Control */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Control</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-12px">
            <NButton
              color="info"
              variant="ghost"
              onClick={() => {
                // Show multiple toasts with different delays
                [1, 2, 3].forEach((num, index) => {
                  setTimeout(() => {
                    toast({
                      title: `Toast ${num}`,
                      description: `This is toast number ${num}`,
                      iconType: iconTypes[index % iconTypes.length],
                      richColor: richColors[index % richColors.length]
                    });
                  }, index * 500);
                });
              }}
            >
              Multiple Toasts
            </NButton>
            <NButton
              color="carbon"
              variant="soft"
              onClick={() => dismiss()}
            >
              Dismiss All
            </NButton>
            <div className="flex-c-center rounded bg-gray-50 px-3 py-2">
              <span className="text-12px text-gray-600 font-medium">Active: {toasts.length}</span>
            </div>
          </div>
        </NCard.Content>
      </NCard>
    </div>
  );
}

export default function ToastExample() {
  return (
    <Toast.Provider
      duration={5000}
      label="Notification"
      swipeDirection="right"
      toastLimit={10}
    >
      <ToastExamples />
    </Toast.Provider>
  );
}
