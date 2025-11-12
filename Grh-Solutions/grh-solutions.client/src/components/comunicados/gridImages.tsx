import { Box } from "@mui/material";
import { DragNDropVariables } from "../../generics/grh-generics/DragNDrop";

interface ImageGridProps {
  images: DragNDropVariables[];
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

  const getGridLayout = () => {
    switch (imageCount) {
      case 1:
        return {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr"
        };
      case 2:
        return {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr"
        };
      case 3:
        return {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr"
        };
      case 4:
      default:
        return {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr"
        };
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        width,
        height,
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        ...getGridLayout(),
      }}
    >
      {imagesToShow.map((img, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5"
          }}
        >
          <Box
            component="img"
            src={img.base64}
            alt={`Image ${index + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
        </Box>
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
            zIndex: 1,
          }}
        >
          +{remainingImages}
        </Box>
      )}
    </Box>
  );
};

export default ImageGrid;
