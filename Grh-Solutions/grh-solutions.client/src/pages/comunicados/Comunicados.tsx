import React from "react";
import { NewsProvider } from "../../contexts/news.provider";
import { Box, useTheme } from "@mui/material";
import Screen from "./components/list/screen";
import { FloatingButton } from "../../generics/floatingButton/floatingButton";
import AddIcon from '@mui/icons-material/Add';

interface ComunicadosProps {}
const Comunicados: React.FC = ({}: ComunicadosProps) => {
  const theme = useTheme();
  return (
    <NewsProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          height: "100%",
          width: "100%",
          fontSize: "2rem",
        }}  
      >
        <Screen/>
        <FloatingButton 
          icon={<AddIcon />} 
          onClick={()=> {
            console.log("CLikced")
          }}
          label="Crear correo"
          bgColor={theme.palette.secondary.main}
          positions={{
            horizontal: "left"
          }}
          borderColor={theme.palette.secondary.hover}
        />
      </Box>
    </NewsProvider>
  );
};

export default Comunicados;