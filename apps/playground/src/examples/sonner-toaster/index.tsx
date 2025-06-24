import { NButton, NCard, NCardContent, NCardHeader, NCardTitle, SonnerToaster } from 'nova-ui';
import type { SonnerProps } from 'nova-ui';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SonnerToasterExample() {
  const [position, setPosition] = useState<SonnerProps['position']>('top-right');

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
    const id = toast.loading('Event has been created');

    setTimeout(() => {
      toast.dismiss(id);
    }, 2000);
  }

  function openToastWithAction() {
    toast('Event has been created', {
      action: {
        label: 'Confirm',
        onClick: () => {
          console.log('View event');
        }
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          console.log('Cancel');
        }
      }
    });
  }

  const positionOptions = [
    { label: 'Top Left', value: 'top-left' as const },
    { label: 'Top Center', value: 'top-center' as const },
    { label: 'Top Right', value: 'top-right' as const },
    { label: 'Bottom Left', value: 'bottom-left' as const },
    { label: 'Bottom Center', value: 'bottom-center' as const },
    { label: 'Bottom Right', value: 'bottom-right' as const }
  ];

  return (
    <div className="flex-c gap-4">
      <SonnerToaster
        closeButton
        position={position}
      />

      {/* Type Card */}
      <NCard>
        <NCardHeader>
          <NCardTitle>Type</NCardTitle>
        </NCardHeader>
        <NCardContent>
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
          </div>
        </NCardContent>
      </NCard>

      {/* With Description Card */}
      <NCard>
        <NCardHeader>
          <NCardTitle>With Description</NCardTitle>
        </NCardHeader>
        <NCardContent>
          <NButton
            variant="outline"
            onClick={openToastWithDescription}
          >
            Open
          </NButton>
        </NCardContent>
      </NCard>

      {/* With Action Card */}
      <NCard>
        <NCardHeader>
          <NCardTitle>With Action</NCardTitle>
        </NCardHeader>
        <NCardContent>
          <NButton
            variant="outline"
            onClick={openToastWithAction}
          >
            Open
          </NButton>
        </NCardContent>
      </NCard>

      {/* Position Card */}
      <NCard>
        <NCardHeader>
          <NCardTitle>Position</NCardTitle>
        </NCardHeader>
        <NCardContent>
          <div className="w-40">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={position}
              onChange={e => setPosition(e.target.value as SonnerProps['position'])}
            >
              {positionOptions.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </NCardContent>
      </NCard>
    </div>
  );
}
