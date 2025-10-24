import React from "react";
import { NewsProvider } from "../../contexts/news.provider";
import { Box } from "@mui/material";
import Screen from "./components/list/screen";


const Comunicados: React.FC = () => {
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
      </Box>
    </NewsProvider>
  );
};

export default Comunicados;