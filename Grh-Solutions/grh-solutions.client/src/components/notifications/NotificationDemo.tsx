import React from 'react';
import {
  Box,
  Button,
  Grid2,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
} from '@mui/material';
import { NotificationPosition } from '../../infrastructure/interfaces/notifications/notification';
import { useNotifications } from '../../contexts/NotificationContext';

const colors = ['success', 'error', 'warning', 'info', 'primary', 'secondary'] as const;
const positions: NotificationPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export const NotificationDemo: React.FC = () => {
  const { addNotification, clearAllNotifications } = useNotifications();
  const [title, setTitle] = React.useState('Notification Title');
  const [subtitle, setSubtitle] = React.useState('This is a subtitle message');
  const [color, setColor] = React.useState<typeof colors[number]>('info');
  const [position, setPosition] = React.useState<NotificationPosition>('top-right');
  const [duration, setDuration] = React.useState(5000);

  const handleAddNotification = () => {
    addNotification({
      title,
      subtitle: subtitle.trim() || undefined,
      color,
      position,
      duration,
    });
  };

  const handleQuickNotification = (type: typeof colors[number], pos: NotificationPosition) => {
    addNotification({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      subtitle: `This is a ${type} notification in ${pos} position`,
      color: type,
      position: pos,
      duration: 4000,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Material UI Notifications Demo
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Custom Notification
        </Typography>
        
        <Grid2 container spacing={2}>
          <Grid2 size={{xs:12, md: 6}}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
          </Grid2>
          
          <Grid2 size={{xs:12, md: 6}}>
            <TextField
              fullWidth
              label="Subtitle (optional)"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              margin="normal"
            />
          </Grid2>
          
          <Grid2 size={{xs:12, md: 3}}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                label="Color"
                onChange={(e) => setColor(e.target.value as typeof colors[number])}
              >
                {colors.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          
          <Grid2 size={{xs:12, md: 3}}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Position</InputLabel>
              <Select
                value={position}
                label="Position"
                onChange={(e) => setPosition(e.target.value as NotificationPosition)}
              >
                {positions.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          
          <Grid2 size={{xs:12, md: 6}}>
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>
                Duration: {duration}ms ({(duration / 1000).toFixed(1)}s)
              </Typography>
              <Slider
                value={duration}
                onChange={(_, value) => setDuration(value as number)}
                min={1000}
                max={10000}
                step={500}
                marks={[
                  { value: 1000, label: '1s' },
                  { value: 5000, label: '5s' },
                  { value: 10000, label: '10s' },
                ]}
              />
            </Box>
          </Grid2>
          
          <Grid2 size={{xs:12}}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleAddNotification}
                size="large"
              >
                Show Notification
              </Button>
              <Button
                variant="outlined"
                onClick={clearAllNotifications}
                color="error"
              >
                Clear All
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Examples
        </Typography>
        
        <Grid2 container spacing={2}>
          {positions.map((pos) => (
            <Grid2 size={{xs:12, md: 3}} key={pos}>
              <Typography variant="subtitle2" gutterBottom>
                {pos.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {colors.slice(0, 4).map((c) => (
                  <Button
                    key={c}
                    variant="outlined"
                    size="small"
                    color={c === 'primary' || c === 'secondary' ? c : 'inherit'}
                    onClick={() => handleQuickNotification(c, pos)}
                  >
                    {c}
                  </Button>
                ))}
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Paper>
    </Box>
  );
};