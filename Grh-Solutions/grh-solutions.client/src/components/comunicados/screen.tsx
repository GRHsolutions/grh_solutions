import { Grid2, Typography } from "@mui/material";
import RenderBirths from "./renderBirths";

interface ScreenProps {}

const Screen: React.FC = ({

}: ScreenProps) => {
  return (
    <Grid2 
      container 
      spacing={1.5} 
      width={"100rem"}
      height={'100%'}
    >
      <Grid2 
        size={10} 
        sx={{  
          border: "1px solid black",
        }}
        >
        <>gola</>
      </Grid2>
      <Grid2 
        size={2}
        sx={{  
          border: "1px solid black",
          height: '60vh',
          marginTop: '25px'
        }}
      >
        <Typography variant="h5" display={"flex"} justifyContent={"center"}>Cumpleaños</Typography>
        <RenderBirths />
      </Grid2>
    </Grid2>
  );
};

export default Screen;
