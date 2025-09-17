export type NotificationPosition = 
  | 'top-left' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-right';

export interface Noti {
  id: string;
  title: string;
  subtitle?: string;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
  position: NotificationPosition;
  duration: number; // in milliseconds
  createdAt: number;
}

export interface NotificationContextType {
  notifications: Noti[];
  addNotification: (notification: Omit<Noti, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}