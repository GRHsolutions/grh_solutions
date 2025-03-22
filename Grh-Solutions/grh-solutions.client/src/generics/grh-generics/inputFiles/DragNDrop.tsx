import React, { useCallback, useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Alert
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface DragDropInputProps {
  acceptedMimeTypes: string[];
  maxSizeInMB: number;
  onFileSelect: (file: File) => void;
}

export function GrhDragDropInput({ 
  acceptedMimeTypes, 
  maxSizeInMB, 
  onFileSelect 
}: DragDropInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    setError('');

    if (!acceptedMimeTypes.includes(file.type)) {
      setError(`Invalid file type. Accepted types: ${acceptedMimeTypes.join(', ')}`);
      return false;
    }

    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeInMB) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }

    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={isDragging ? 3 : 1}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          p: 4,
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.300',
          bgcolor: isDragging ? 'primary.50' : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'primary.50'
          }
        }}
      >
        <input
          type="file"
          onChange={handleFileInput}
          accept={acceptedMimeTypes.join(',')}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CloudUpload 
              sx={{ 
                fontSize: 64, 
                mb: 2,
                color: isDragging ? 'primary.main' : 'grey.500'
              }} 
            />
            <Typography variant="h6" component="div" gutterBottom color="textPrimary">
              Drop your file here or click to select
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Maximum file size: {maxSizeInMB}MB
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Accepted types: {acceptedMimeTypes.join(', ')}
            </Typography>
          </Box>
        </label>
      </Paper>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}