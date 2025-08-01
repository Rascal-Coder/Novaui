import { AlertDialog, AlertDialogAction, AlertDialogCancel, NButton, NCard } from 'nova-ui';
import { useState } from 'react';

export default function AlertDialogExample() {
  const [controlledOpen, setControlledOpen] = useState(false);

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
          <div className="flex gap-3">
            <AlertDialog
              description="This action will delete all data"
              title="Are you sure delete?"
              type="destructive"
              footer={
                <>
                  <AlertDialogCancel />
                  <AlertDialogAction />
                </>
              }
              trigger={
                <NButton
                  color="destructive"
                  variant="outline"
                >
                  Destructive
                </NButton>
              }
            />

            <AlertDialog
              description="Your changes have been saved successfully."
              title="Success"
              type="success"
              footer={
                <>
                  <AlertDialogCancel />
                  <AlertDialogAction />
                </>
              }
              trigger={
                <NButton
                  color="success"
                  variant="outline"
                >
                  Success
                </NButton>
              }
            />

            <AlertDialog
              description="Please review this information carefully before proceeding."
              title="Warning"
              type="warning"
              footer={
                <>
                  <AlertDialogCancel />
                  <AlertDialogAction />
                </>
              }
              trigger={
                <NButton
                  color="warning"
                  variant="outline"
                >
                  Warning
                </NButton>
              }
            />

            <AlertDialog
              description="Here's some helpful information for you."
              title="Info"
              type="info"
              footer={
                <>
                  <AlertDialogCancel />
                  <AlertDialogAction />
                </>
              }
              trigger={
                <NButton
                  color="info"
                  variant="outline"
                >
                  Info
                </NButton>
              }
            />
          </div>
        </NCard.Content>
      </NCard>

      {/* Custom  Footer */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Custom Footer</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex gap-3">
            <AlertDialog
              description="You have unsaved changes. Would you like to save them?"
              title="Save Changes"
              type="info"
              footer={
                <>
                  <AlertDialogCancel>
                    <button className="border rounded px-4 py-2 hover:bg-gray-100">Cancel</button>
                  </AlertDialogCancel>
                  <AlertDialogAction>
                    <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Save</button>
                  </AlertDialogAction>
                </>
              }
              trigger={
                <NButton
                  color="info"
                  variant="solid"
                >
                  Save
                </NButton>
              }
            >
              Custom content area
            </AlertDialog>
          </div>
        </NCard.Content>
      </NCard>

      {/* Controlled State */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Controlled State</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex gap-3">
            <NButton
              color="success"
              variant="solid"
              onClick={() => setControlledOpen(true)}
            >
              Open Dialog
            </NButton>
            <AlertDialog
              description="Your operation has been completed successfully!"
              open={controlledOpen}
              title="Operation Successful"
              type="success"
              footer={
                <button
                  className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  onClick={() => setControlledOpen(false)}
                >
                  OK
                </button>
              }
              onOpenChange={setControlledOpen}
            />
          </div>
        </NCard.Content>
      </NCard>

      {/* Different Sizes */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Different Sizes</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex gap-4">
            <AlertDialog
              description="This is a small sized dialog."
              size="xs"
              title="Xs Size"
              type="info"
              trigger={
                <NButton
                  color="carbon"
                  size="xs"
                  variant="solid"
                >
                  Xs
                </NButton>
              }
            />
            <AlertDialog
              description="This is a small sized dialog."
              size="sm"
              title="Small Size"
              type="info"
              trigger={
                <NButton
                  color="carbon"
                  size="sm"
                  variant="solid"
                >
                  Small
                </NButton>
              }
            />

            <AlertDialog
              description="This is a default sized dialog."
              title="Default Size"
              type="info"
              trigger={
                <NButton
                  color="carbon"
                  variant="solid"
                >
                  Default
                </NButton>
              }
            />

            <AlertDialog
              description="This is a large sized dialog."
              size="lg"
              title="Large Size"
              type="info"
              trigger={
                <NButton
                  color="carbon"
                  size="lg"
                  variant="solid"
                >
                  Large
                </NButton>
              }
            />
            <AlertDialog
              description="This is a xl sized dialog."
              size="xl"
              title="Xl Size"
              type="info"
              trigger={
                <NButton
                  color="carbon"
                  size="xl"
                  variant="solid"
                >
                  Xl
                </NButton>
              }
            />
            <AlertDialog
              description="This is a 2xl sized dialog."
              size="2xl"
              title="2xl Size"
              type="info"
              trigger={
                <NButton
                  color="carbon"
                  size="2xl"
                  variant="solid"
                >
                  2xl
                </NButton>
              }
            />
          </div>
        </NCard.Content>
      </NCard>

      {/* Custom Styling */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Custom Styling</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex gap-3">
            <AlertDialog
              description="This dialog uses custom UI styling."
              title="Custom Styled Dialog"
              type="info"
              trigger={
                <NButton
                  color="accent"
                  variant="solid"
                >
                  Custom Style
                </NButton>
              }
              ui={{
                overlay: 'bg-black/60',
                content: 'bg-white border-2 border-blue-300',
                header: 'text-center',
                title: 'text-blue-600 font-bold',
                description: 'text-gray-600',
                footer: 'justify-center'
              }}
            />

            <AlertDialog
              description="Dark theme styled dialog example."
              title="Dark Theme Dialog"
              type="info"
              trigger={
                <NButton
                  color="carbon"
                  variant="solid"
                >
                  Dark Theme
                </NButton>
              }
              ui={{
                overlay: 'bg-black/80',
                content: 'bg-gray-900 border border-gray-700 text-gray-100',
                header: 'text-center',
                title: 'text-blue-400 font-bold',
                description: 'text-gray-300',
                footer: 'justify-center'
              }}
            />
          </div>
        </NCard.Content>
      </NCard>

      {/* Complex Content */}
      <NCard split>
        <NCard.Header>
          <NCard.TitleRoot>
            <NCard.Title>Complex Content</NCard.Title>
          </NCard.TitleRoot>
        </NCard.Header>
        <NCard.Content>
          <div className="flex gap-3">
            <AlertDialog
              description="This dialog contains complex content with multiple elements."
              title="Complex Dialog"
              type="info"
              footer={
                <>
                  <AlertDialogCancel>
                    <button className="border rounded px-4 py-2 hover:bg-gray-100">Cancel</button>
                  </AlertDialogCancel>
                  <AlertDialogAction>
                    <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Proceed</button>
                  </AlertDialogAction>
                </>
              }
              trigger={
                <NButton
                  color="info"
                  variant="solid"
                >
                  Complex Content
                </NButton>
              }
            >
              <div className="mt-4 space-y-3">
                <div className="rounded bg-blue-50 p-3">
                  <h4 className="text-blue-800 font-semibold">Additional Information</h4>
                  <p className="mt-1 text-sm text-blue-600">
                    This section contains additional details about the operation.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">
                    Learn More
                  </button>
                  <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">
                    Documentation
                  </button>
                </div>
              </div>
            </AlertDialog>
          </div>
        </NCard.Content>
      </NCard>
    </div>
  );
}
