// Loader.tsx
import React, { useEffect, useState } from 'react';
import { INotificationProps } from './notification.types';

const Notification = (props: INotificationProps) => {
  const { text, notificationCount } = props;
  const [isNotificationVisible, setIsNotificationVisible] =
    useState<Boolean>(false);

  useEffect(() => {
    if (notificationCount) {
      setIsNotificationVisible(true);

      setTimeout(function () {
        setIsNotificationVisible(false);
      }, 3000);
    }
  }, [notificationCount]);

  return (
    <div className={`notification ${isNotificationVisible ? '--visible' : ''}`}>
      {text}
    </div>
  );
};

export default Notification;
