import { Check } from 'lucide-react';
import { type ActionButtonProps, NButton, NCard, toast } from 'nova-ui';

// 自定义 ActionButton 组件，带有图标
const CustomActionButton = ({ action, deleteToast }: ActionButtonProps) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={event => {
        action.onClick(event);
        if (!event.defaultPrevented) deleteToast();
      }}
    >
      <Check className="mr-1 h-4 w-4" />
      {action.label}
    </button>
  );
};

export default function SonnerToasterExample() {
  function openDefaultToast() {
    toast('Event has been created');
  }

  function openInfoToast() {
    toast.info('Event has been created');
  }

  function openSuccessToast() {
    toast.success('Event has been created');
  }

  function openWarningToast() {
    toast.warning('Event has been created');
  }

  function openErrorToast() {
    toast.error('Event has been created');
  }

  function openToastWithDescription() {
    toast('Event has been created', {
      description: 'You can now view the event details'
    });
  }

  function openLoadingToast() {
    // 1. 显示loading状态
    const id = toast.loading('Uploading file...');

    // 2. 模拟异步操作
    setTimeout(() => {
      // 3. 更新为成功状态
      toast.success('File uploaded successfully!', { id });
    }, 3000);
  }

  function openPromiseToast() {
    const myPromise = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve({ name: 'Event data' });
          } else {
            reject(new Error('Failed to create event'));
          }
        }, 2000);
      });

    toast.promise(myPromise, {
      loading: 'Creating event...',
      success: (data: any) => `Event "${data.name}" has been created successfully!`,
      error: (error: Error) => `Error: ${error.message}`
    });
  }

  function openToastWithAction() {
    toast('Event has been created', {
      action: {
        label: 'Confirm',
        onClick: () => {
          // eslint-disable-next-line no-alert
          window.alert('View event');
        }
      },
      closeButton: true
    });
  }

  function openCustomActionToast() {
    toast('Event has been created', {
      action: {
        label: 'Custom Confirm',
        onClick: () => {
          // eslint-disable-next-line no-alert
          window.alert('Custom action clicked!');
        }
      },
      closeButton: true,
      customActionButton: CustomActionButton
    });
  }

  function openManualCloseToast() {
    const id = toast('This toast will close in 3 seconds', {
      duration: Infinity, // 不自动关闭
      closeButton: false, // 不显示关闭按钮
      description: 'Manually controlled toast'
    });

    // 3秒后手动关闭
    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);
  }

  function openPersistentToast() {
    toast.info('This toast stays until manually closed', {
      duration: Infinity,
      closeButton: true,
      description: 'Click the X button to close'
    });
  }

  function openNonDismissibleToast() {
    toast.warning('Important: Cannot be closed!', {
      duration: 5000, // 5秒后自动关闭
      dismissible: false, // 不能手动关闭
      description: 'This toast cannot be dismissed manually'
    });
  }

  function dismissAllToasts() {
    toast.dismiss(); // 关闭所有toast
  }

  function createMultipleToasts() {
    // 快速创建多个toast来展示重叠效果
    toast.info('First toast - This is the front toast');
    setTimeout(() => toast.success('Second toast - Behind the first'), 1000);
    setTimeout(() => toast.warning('Third toast - Further behind'), 2000);
    setTimeout(() => toast.error('Fourth toast - At the back'), 3000);
    setTimeout(() => toast('Fifth toast - Last one'), 4000);
  }

  // 位置演示函数
  function openTopLeftToast() {
    toast.info('Top Left Toast', { position: 'top-left' });
  }

  function openTopCenterToast() {
    toast.success('Top Center Toast', { position: 'top-center' });
  }

  function openTopRightToast() {
    toast.warning('Top Right Toast', { position: 'top-right' });
  }

  function openBottomLeftToast() {
    toast.error('Bottom Left Toast', { position: 'bottom-left' });
  }

  function openBottomCenterToast() {
    toast('Bottom Center Toast', { position: 'bottom-center' });
  }

  function openBottomRightToast() {
    toast.info('Bottom Right Toast', { position: 'bottom-right' });
  }

  function showAllPositions() {
    // 同时显示所有位置的toast
    toast.info('Top Left', { position: 'top-left', duration: 5000 });
    toast.success('Top Center', { position: 'top-center', duration: 5000 });
    toast.warning('Top Right', { position: 'top-right', duration: 5000 });
    toast.error('Bottom Left', { position: 'bottom-left', duration: 5000 });
    toast('Bottom Center', { position: 'bottom-center', duration: 5000 });
    toast.info('Bottom Right', { position: 'bottom-right', duration: 5000 });
  }

  return (
    <div className="flex-c gap-4">
      {/* Toast Types */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Toast Types</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex flex-wrap gap-3">
            <NButton
              variant="outline"
              onClick={openDefaultToast}
            >
              Default
            </NButton>
            <NButton
              variant="outline"
              onClick={openInfoToast}
            >
              Info
            </NButton>
            <NButton
              variant="outline"
              onClick={openSuccessToast}
            >
              Success
            </NButton>
            <NButton
              variant="outline"
              onClick={openWarningToast}
            >
              Warning
            </NButton>
            <NButton
              variant="outline"
              onClick={openErrorToast}
            >
              Error
            </NButton>
            <NButton
              variant="outline"
              onClick={openLoadingToast}
            >
              Loading
            </NButton>
            <NButton
              variant="outline"
              onClick={openPromiseToast}
            >
              Promise
            </NButton>
            <NButton
              variant="solid"
              onClick={createMultipleToasts}
            >
              Multiple Toasts
            </NButton>
          </div>
        </NCard.Content>
      </NCard>

      {/* Advanced Features */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Advanced Features</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content className="flex flex-col gap-4">
          {/* With Description */}
          <NCard>
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>With Description</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <NButton
                variant="outline"
                onClick={openToastWithDescription}
              >
                Show Toast with Description
              </NButton>
            </NCard.Content>
          </NCard>

          {/* With Action */}
          <NCard>
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>With Action Buttons</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <div className="flex gap-3">
                <NButton
                  variant="outline"
                  onClick={openToastWithAction}
                >
                  Show Toast with Actions
                </NButton>
                <NButton
                  variant="outline"
                  onClick={openCustomActionToast}
                >
                  Show Custom Action (with Icon)
                </NButton>
              </div>
            </NCard.Content>
          </NCard>
        </NCard.Content>
      </NCard>

      {/* Close Functions */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Close Functions</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content className="flex flex-col gap-4">
          {/* Manual Close */}
          <NCard>
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>Manual Close</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <div className="flex gap-3">
                <NButton
                  variant="outline"
                  onClick={openManualCloseToast}
                >
                  Auto Close (3s)
                </NButton>
                <NButton
                  variant="outline"
                  onClick={openPersistentToast}
                >
                  Persistent Toast
                </NButton>
              </div>
            </NCard.Content>
          </NCard>

          {/* Dismissible Control */}
          <NCard>
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>Dismissible Control</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <div className="flex gap-3">
                <NButton
                  variant="outline"
                  onClick={openNonDismissibleToast}
                >
                  Non-Dismissible
                </NButton>
                <NButton
                  variant="solid"
                  onClick={dismissAllToasts}
                >
                  Close All Toasts
                </NButton>
              </div>
            </NCard.Content>
          </NCard>
        </NCard.Content>
      </NCard>

      {/* Position Examples */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Position Examples</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content className="flex flex-col gap-4">
          {/* Individual Positions */}
          <NCard>
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>Individual Positions</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <div className="flex gap-3">
                <NButton
                  variant="outline"
                  onClick={openTopLeftToast}
                >
                  Top Left
                </NButton>
                <NButton
                  variant="outline"
                  onClick={openTopCenterToast}
                >
                  Top Center
                </NButton>
                <NButton
                  variant="outline"
                  onClick={openTopRightToast}
                >
                  Top Right
                </NButton>
                <NButton
                  variant="outline"
                  onClick={openBottomLeftToast}
                >
                  Bottom Left
                </NButton>
                <NButton
                  variant="outline"
                  onClick={openBottomCenterToast}
                >
                  Bottom Center
                </NButton>
                <NButton
                  variant="outline"
                  onClick={openBottomRightToast}
                >
                  Bottom Right
                </NButton>
              </div>
            </NCard.Content>
          </NCard>

          {/* Show All Positions */}
          <NCard>
            <NCard.Header>
              <NCard.TitleRoot>
                <NCard.Title>All Positions Demo</NCard.Title>
              </NCard.TitleRoot>
            </NCard.Header>
            <NCard.Content>
              <NButton
                variant="solid"
                onClick={showAllPositions}
              >
                Show All Positions (5s duration)
              </NButton>
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
                This will show toasts in all 6 positions simultaneously
              </p>
            </NCard.Content>
          </NCard>
        </NCard.Content>
      </NCard>
    </div>
  );
}
