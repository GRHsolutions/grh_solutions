import { Box } from "@mui/material";

interface ImageGridProps {
  images: string[];
  maxVisibleImages?: number;
  height?: number | string;
  width?: number | string;
}

const ImageGrid = ({ 
  images,
  maxVisibleImages = 4,
  height = "50rem",
  width = "50rem"
}: ImageGridProps) => {
  const imagesToShow = images.slice(0, maxVisibleImages);
  const remainingImages = Math.max(0, images.length - maxVisibleImages);
  const imageCount = imagesToShow.length;

  // Layout configurations for different image counts
  const getGridLayout = () => {
    switch (imageCount) {
      case 1:
        return {
          container: { 
            gridTemplateColumns: "1fr", 
            gridTemplateRows: "1fr",
            aspectRatio: "1/1" 
          },
          items: [{ gridColumn: "1", gridRow: "1" }]
        };
      case 2:
        return {
          container: { 
            gridTemplateColumns: "1fr 1fr", 
            gridTemplateRows: "1fr",
            aspectRatio: "2/1" 
          },
          items: [
            { gridColumn: "1", gridRow: "1" },
            { gridColumn: "2", gridRow: "1" }
          ]
        };
      case 3:
        return {
          container: { 
            gridTemplateColumns: "1fr 1fr", 
            gridTemplateRows: "1fr 1fr",
            aspectRatio: "1/1" 
          },
          items: [
            { gridColumn: "1", gridRow: "1 / span 2" },
            { gridColumn: "2", gridRow: "1" },
            { gridColumn: "2", gridRow: "2" }
          ]
        };
      case 4:
        return {
          container: { 
            gridTemplateColumns: "1fr 1fr", 
            gridTemplateRows: "1fr 1fr",
            aspectRatio: "1/1" 
          },
          items: [
            { gridColumn: "1", gridRow: "1" },
            { gridColumn: "2", gridRow: "1" },
            { gridColumn: "1", gridRow: "2" },
            { gridColumn: "2", gridRow: "2" }
          ]
        };
      default:
        return {
          container: { 
            gridTemplateColumns: "1fr", 
            gridTemplateRows: "1fr",
            aspectRatio: "1/1" 
          },
          items: []
        };
    }
  };

  const { container, items } = getGridLayout();

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        width: width,
        height: height,
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        ...container,
        // Responsive fallback
        "@media (max-width: 600px)": {
          aspectRatio: "1/1"
        }
      }}
    >
      {imagesToShow.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img}
          alt={`Image ${index + 1}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 1,
            ...items[index],
          }}
        />
      ))}
      {remainingImages > 0 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: "bold",
            backdropFilter: "blur(2px)",
            zIndex: 1
          }}
        >
          +{remainingImages}
        </Box>
      )}
    </Box>
  );
};

export default ImageGrid;