import React, { useCallback, useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Alert,
  IconButton,
  Stack
} from '@mui/material';
import { 
  CloudUpload,
  DeleteOutline,
  InsertDriveFile,
  PictureAsPdf,
  Image,
  Description,
} from '@mui/icons-material';

export type DragNDropVariables = {
  name: string,
  type: string, 
  size: number,
  base64: string
}

export interface DragDropInputProps {
  acceptedMimeTypes: string[];
  maxSizeInKB: number;
  maxFiles: number;
  onFileSelect: (files: DragNDropVariables[]) => void;
  selectedFiles: DragNDropVariables[];
  inputProps?: InputProps;
}

interface InputProps {
    label?: string;
}

export function DragDropInput({ 
  acceptedMimeTypes, 
  maxSizeInKB, 
  maxFiles,
  onFileSelect,
  selectedFiles,
  inputProps  
}: DragDropInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image sx={{ color: 'secondary.main' }} />;
    if (fileType === 'application/pdf') return <PictureAsPdf sx={{ color: 'red' }} />;
    if (fileType.includes('msword') || fileType.includes('word')) return <Description sx={{ color: 'blue' }} />;
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return <Description sx={{ color: 'green' }} />;
    return <InsertDriveFile sx={{ color: 'grey.500' }} />;
  };

  const validateFiles = (newFiles: File[]): boolean => {
    setError('');
    
    if (selectedFiles.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`);
      return false;
    }

    for (const file of newFiles) {
      if (file.size / 1024 > maxSizeInKB) {
        setError(`File ${file.name} exceeds ${maxSizeInKB}KB limit`);
        return false;
      }
    }

    return true;
  };

  const convertToBase64 = (file: File): Promise<DragNDropVariables> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: reader.result as string,
        });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFiles = async (newFiles: File[]) => {
    if (!validateFiles(newFiles)) return;
    const base64Files = await Promise.all(newFiles.map(convertToBase64));
    onFileSelect([...selectedFiles, ...base64Files]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    handleFiles(newFiles);
  }, [selectedFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(newFiles);
    e.target.value = '';
  }, [selectedFiles]);

  const handleRemoveFile = (indexToRemove: number) => {
    onFileSelect(selectedFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Stack spacing={2} width="100%">
      <Paper
        elevation={isDragging ? 3 : 1}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        sx={{
          p: 4,
          border: '2px dashed',
          borderColor: isDragging ? 'secondary.main' : 'grey.300',
          bgcolor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'secondary.main',
            bgcolor: 'action.hover'
          }
        }}
      >
        <input
          type="file"
          onChange={handleFileInput}
          accept={acceptedMimeTypes.join(',')}
          style={{ display: 'none' }}
          id="fileInput"
          multiple
        />
        <label htmlFor="fileInput" style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CloudUpload sx={{ fontSize: 64, mb: 2, color: isDragging ? 'secondary.main' : 'grey.500' }} />
            <Typography variant="h6" component="div" gutterBottom>
              {inputProps?.label || "Drop your files here or click to select"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Max file size: {maxSizeInKB}KB per file, Max files: {maxFiles}
            </Typography>
          </Box>
        </label>
      </Paper>
      
      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}

      {selectedFiles.length > 0 && (
        <Stack spacing={1} width="100%">
          {selectedFiles.map((file, index) => (
            <Paper key={index} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              {getFileIcon(file.type)}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" noWrap>{file.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {(file.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
              <IconButton onClick={() => handleRemoveFile(index)} color="error" size="small">
                <DeleteOutline />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
