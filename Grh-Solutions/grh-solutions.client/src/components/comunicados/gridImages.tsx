import { Box, Typography } from "@mui/material";

interface ImageGridProps {
  images: string[];
}

const ImageGrid = ({ 
  images 
}: ImageGridProps) => {
  const maxVisibleImages = 4;
  const imagesToShow = images.slice(0, maxVisibleImages);
  const remainingImages = images.length - maxVisibleImages;

  const gridStyles = [
    [{ gridColumn: "span 2" }, { gridColumn: "span 2" }], // 2 images
    [{}, {}, { gridColumn: "span 2" }], // 3 images
    [{}, {}, {}, {}], // 4 images
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 1,
        width: '80%',
        height: '80%',
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {imagesToShow.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img}
          alt={`Imagen ${index + 1}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 1,
            ...gridStyles[imagesToShow.length - 2][index],
          }}
        />
      ))}
      {remainingImages > 0 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "#757575",
            color: "white",
            px: 2,
            py: 0.5,
            borderRadius: "16px",
            fontSize: "0.875rem",
            fontWeight: "bold",
          }}
        >
          +{remainingImages} imágenes
        </Box>
      )}
    </Box>
  );
};

export default ImageGrid;