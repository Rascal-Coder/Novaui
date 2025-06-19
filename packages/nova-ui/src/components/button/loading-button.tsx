import { LoaderCircle } from 'lucide-react';
// import * as React from 'react';

import Button from './button';
import type { LoadingButtonProps } from './types';

export default function LoadingButton({
  disabled,
  loading,
  leading,
  trailing,
  children,
  ...props
}: LoadingButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <Button
      disabled={isDisabled}
      leading={loading ? <LoaderCircle className="animate-spin" /> : leading}
      trailing={trailing}
      {...props}
    >
      {children}
    </Button>
  );
}
