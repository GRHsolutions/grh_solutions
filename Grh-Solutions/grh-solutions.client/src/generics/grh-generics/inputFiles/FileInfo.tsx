import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  InsertDriveFile,
  Description,
  Storage,
  Category,
} from '@mui/icons-material';

interface FileInfoProps {
  file: File;
}

export function FileInfo({ file }: FileInfoProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileTypeColor = (type: string): string => {
    const types = {
      'image/jpeg': 'primary',
      'image/png': 'secondary',
      'image/gif': 'success',
      'default': 'default'
    } as const;
    return types[type as keyof typeof types] || types.default;
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        mt: 3, 
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        color: 'primary.main'
      }}>
        <InsertDriveFile />
        File Information
      </Typography>

      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText 
            primary="File Name"
            secondary={file.name}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          <ListItemText 
            primary="Size"
            secondary={formatFileSize(file.size)}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText 
            primary="Type"
            secondary={
              <Chip 
                label={file.type}
                size="small"
                color={getFileTypeColor(file.type)}
                sx={{ mt: 0.5 }}
              />
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}