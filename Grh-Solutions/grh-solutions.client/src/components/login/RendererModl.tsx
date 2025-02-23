import { Button } from "@mui/material";
import React from "react";
import { ModalComp } from "./ModalComp";

export const RendererModl = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        login
      </Button>
      <ModalComp 
        open={open}
        onClose={()=>{
          setOpen(false);
        }}
      />
    </>
  );
};
