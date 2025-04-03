import { Grid2, Typography, useTheme } from "@mui/material";
import { News } from "../../../../../../domain/models/news/news.entities";
import GrhTextField from "../../../../../../generics/grh-generics/textField";
import GrhCustomSelect from "../../../../../../generics/grh-generics/inputSelect";

interface MainInfoProps {
  value: News;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

export const MainInfo = ({
  handleChange,
  value
}: MainInfoProps) => {
  const select = [{
    value:  "simple-publication",
    name: "Publicacion simple"
  },{
    value:  "publication-with-images",
    name: "Publicacion con imagenes"
  },{
    value:  "publication-with-survey",
    name: "Publicacion de una encuesta"
  }];
  const theme = useTheme();

  return(
    <Grid2
      container
      spacing={2}
    >
      <Grid2
        size={12}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          Informacion basica
        </Typography>
      </Grid2>
      <Grid2
        size={12}
      >
        <GrhCustomSelect 
          label={"Que tipo de publicacion es?"} 
          options={select} 
          value={value.type}
          name="type" 
          onChange={handleChange}        
        />
      </Grid2>
      <Grid2
        size={12}
      >
        <GrhTextField
          label="Titulo"
          name="title"
          value={value.title}
          onChange={handleChange}
          fullWidth
        />
      </Grid2>
      <Grid2
        size={12}
      >
        <GrhTextField 
          label="Descripcion"
          name="description"
          value={value.description}
          onChange={handleChange}
          multirows
          fullWidth
          rows={6}
        />
      </Grid2>
    </Grid2>
  );
};
