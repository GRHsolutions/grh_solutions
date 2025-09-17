import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Noti, NotificationContextType } from '../infrastructure/interfaces/notifications/notification';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Noti[]>([]);

  const addNotification = useCallback((notification: Omit<Noti, 'id' | 'createdAt'>) => {
    const newNotification: Noti = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36)}`,
      createdAt: Date.now(),
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, notification.duration);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};