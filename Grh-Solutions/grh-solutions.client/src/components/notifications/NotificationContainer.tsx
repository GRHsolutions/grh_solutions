import React from 'react';
import { Box, Slide, Alert, AlertTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Noti, NotificationPosition } from '../../infrastructure/interfaces/notifications/notification';
import { useNotifications } from '../../contexts/NotificationContext';

const getPositionStyles = (position: NotificationPosition) => {
  const baseStyles = {
    position: 'fixed' as const,
    zIndex: 9999,
    maxWidth: '700px',
    minWidth: '500px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  };

  switch (position) {
    case 'top-left':
      return { ...baseStyles, top: 20, left: 20, alignItems: 'flex-start' };
    case 'top-right':
      return { ...baseStyles, top: 20, right: 20, alignItems: 'flex-end' };
    case 'bottom-left':
      return { 
        ...baseStyles, 
        bottom: 20, 
        left: 20, 
        alignItems: 'flex-start',
        flexDirection: 'column-reverse' as const 
      };
    case 'bottom-right':
      return { 
        ...baseStyles, 
        bottom: 20, 
        right: 20, 
        alignItems: 'flex-end',
        flexDirection: 'column-reverse' as const 
      };
    default:
      return { ...baseStyles, top: 20, right: 20, alignItems: 'flex-end' };
  }
};

const getSlideDirection = (position: NotificationPosition) => {
  switch (position) {
    case 'top-left':
    case 'bottom-left':
      return 'right';
    case 'top-right':
    case 'bottom-right':
      return 'left';
    default:
      return 'left';
  }
};

interface NotificationItemProps {
  notification: Noti;
  position: NotificationPosition;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, position }) => {
  const { removeNotification } = useNotifications();
  const [show, setShow] = React.useState(true);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 300); // Wait for slide animation to complete
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        removeNotification(notification.id);
      }, 300);
    }, notification.duration);

    return () => clearTimeout(timer);
  }, [notification.duration, notification.id, removeNotification]);

  return (
    <Slide
      direction={getSlideDirection(position)}
      in={show}
      timeout={300}
    >
      <Alert
        severity={notification.color === 'primary' || notification.color === 'secondary' ? 'info' : notification.color}
        sx={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
          width: '100%',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle sx={{ fontWeight: 600, mb: notification.subtitle ? 0.5 : 0 }}>
          {notification.title}
        </AlertTitle>
        {notification.subtitle && (
          <Box sx={{ fontSize: '0.875rem', opacity: 0.8 }}>
            {notification.subtitle}
          </Box>
        )}
      </Alert>
    </Slide>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotifications();

  // Group notifications by position
  const notificationsByPosition = notifications.reduce((acc, notification) => {
    if (!acc[notification.position]) {
      acc[notification.position] = [];
    }
    acc[notification.position].push(notification);
    return acc;
  }, {} as Record<NotificationPosition, Noti[]>);

  return (
    <>
      {Object.entries(notificationsByPosition).map(([position, positionNotifications]) => (
        <Box key={position} sx={getPositionStyles(position as NotificationPosition)}>
          {positionNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              position={position as NotificationPosition}
            />
          ))}
        </Box>
      ))}
    </>
  );
};