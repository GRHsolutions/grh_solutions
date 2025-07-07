import { Grid2, Typography, useTheme } from "@mui/material";
import {
  DragDropInput,
  DragNDropVariables,
} from "../../../../../../generics/grh-generics/DragNDrop";
import { NewForm, News } from "../../../../../../domain/models/news/news.entities";

interface JustImagesProps {
  values: News | NewForm;
  changeImages: (name: string, image: DragNDropVariables[]) => void;
}

export const JustImages = ({ values, changeImages }: JustImagesProps) => {
  const theme = useTheme();
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          Imagenes del comunicado
        </Typography>
      </Grid2>
      <DragDropInput
        acceptedMimeTypes={["jpg", "png", "gif"]}
        maxSizeInKB={340}
        maxFiles={4}
        onFileSelect={(files: DragNDropVariables[]) => {
          changeImages("images", files);
        }}
        selectedFiles={values.images ?? []}
      />
    </Grid2>
  );
};
