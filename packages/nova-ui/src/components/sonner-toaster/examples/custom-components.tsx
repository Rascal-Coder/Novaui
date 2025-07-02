import { Check, X } from 'lucide-react';
import React from 'react';

import type { ActionButtonProps, CloseButtonProps } from '../types';

// 自定义 ActionButton 组件示例
export const CustomActionButton = ({ action, deleteToast }: ActionButtonProps) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm text-white font-medium transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      onClick={event => {
        action.onClick(event);
        if (!event.defaultPrevented) {
          deleteToast();
        }
      }}
    >
      <Check className="mr-1 h-4 w-4" />
      {action.label}
    </button>
  );
};

// 自定义 CloseButton 组件示例
export const CustomCloseButton = ({ closeButtonAriaLabel, deleteToast, closeIcon }: CloseButtonProps) => {
  return (
    <button
      aria-label={closeButtonAriaLabel}
      className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={deleteToast}
    >
      {closeIcon || <X className="h-4 w-4" />}
    </button>
  );
};

// 使用示例
export const CustomToastExample = () => {
  const _toastDefaults = {
    customActionButton: CustomActionButton,
    customCloseButton: CustomCloseButton,
    closeIcon: <X className="h-4 w-4" />,
    duration: 5000,
    closeButton: true
  };

  // 这里你可以使用你的 toast 库来显示带有自定义组件的 toast
  // 例如：
  // toast('操作成功！', {
  //   action: {
  //     label: '确认',
  //     onClick: () => console.log('用户点击了确认按钮')
  //   },
  //   closeButton: true
  // }, toastDefaults);

  return null; // 这只是一个示例组件
};
