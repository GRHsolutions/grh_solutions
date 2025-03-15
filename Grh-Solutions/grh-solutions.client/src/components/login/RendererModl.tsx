import React from "react";
import { ModalComp } from "./ModalComp";
import GrhButton from "../../generics/grh-generics/button";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useTheme } from "@mui/material";

export const RendererModl = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <>
      <GrhButton
        variant="secondary"
        onClick={() => {
          setOpen(true);
        }}
        startIcon={<AccountCircleOutlinedIcon sx={{color: theme.palette.secondary.main }}/>}
        p={1.3}
        label={"Acceder"}
      />
      <ModalComp 
        open={open}
        onClose={()=>{
          setOpen(false);
        }}
      />
    </>
  );
};
