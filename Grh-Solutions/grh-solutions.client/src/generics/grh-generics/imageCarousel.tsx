import React, { useState } from 'react';
import { Box, IconButton, Paper, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { DragNDropVariables } from './DragNDrop';

interface ImageCarouselProps {
  images: DragNDropVariables[];
  width?: string | number;
  height?: string | number;
  showArrows?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  width = '100%',
  height = 400,
  showArrows = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
  console.log("imagenes", images)
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const isPDF = (base64String: string): boolean => {
    return base64String.includes('data:application/pdf');
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Paper 
      elevation={3}
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        bgcolor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showArrows && images.length > 1 && (
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: 8,
            zIndex: 2,
            color: theme.palette.primary.contrastText,
            bgcolor: theme.palette.primary.light,
            '&:hover': {
              bgcolor: theme.palette.primary.hover,
            },
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.primary.main
        }}
      >
        {isPDF(images[currentIndex].base64) ? (
          <iframe
            src={images[currentIndex].base64}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title={`PDF ${currentIndex + 1}`}
          />
        ) : (
          <Box
            component="img"
            src={images[currentIndex].base64}
            alt={`Image ${currentIndex + 1}`}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        )}
      </Box>

      {showArrows && images.length > 1 && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 8,
            zIndex: 2,
            color: theme.palette.primary.contrastText,
            bgcolor: theme.palette.primary.light,
            '&:hover': {
              bgcolor: theme.palette.primary.hover,
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}

      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index === currentIndex ? 'secondary.main' : 'gray.400',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};