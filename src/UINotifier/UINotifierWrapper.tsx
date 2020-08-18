import React from 'react';
import {NotifierRoot} from './UINotifier';
import {ShowNotificationParams} from './types';

interface NotifierWrapperProps extends ShowNotificationParams {
  children: React.ReactNode;
}

export const UINotifierWrapper = ({
  children,
  ...defaultParams
}: NotifierWrapperProps) => (
  <>
    {children}
    <NotifierRoot {...defaultParams} />
  </>
);
