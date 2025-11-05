import React from "react";
import { Backdrop, CircularProgress, Fade, Typography } from "@mui/material";

interface FadeLoadingProps {
  open: boolean;
  text?: string;
}

export const FadeLoading: React.FC<FadeLoadingProps> = ({ 
  open,
  text 
}) => {
  return (
    <Fade
      in={open} 
      timeout={300} 
      unmountOnExit
    >
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
        }}
        open={open}
      >
        <CircularProgress 
          color="inherit" 
        />
        {text && (
          <Typography
            variant="h6"
            sx={{ 
              mt: 2, 
              fontWeight: 500, 
              textAlign: "center" 
            }}
          >
            {text}
          </Typography>
        )}
      </Backdrop>
    </Fade>
  );
};
