import React from 'react';
import { useToasts } from '@geist-ui/react';
import { useStore } from 'effector-react';

import { $currentNotification } from '../../core/notifications';

export const NotificationsProvider = () => {
  const notification = useStore($currentNotification);
  const [, setToast] = useToasts();

  React.useEffect(() => {
    if (notification) {
      setToast(notification);
    }
  }, [notification?.text, notification?.type, notification?.actions]);

  return <></>;
};
