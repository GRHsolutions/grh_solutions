import { Box } from "@mui/material";
import React from "react";

interface HomeProps {}
const Home: React.FC = ({}: HomeProps) => {
  return (
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
      Home
    </Box>
  );
};

export default Home;
