
import style from './main.module.scss';
import { NavBar } from "../generics/navBar/navBar";
import { Button } from '@mui/material';
import SimpleDialog from "../generics/dialogGeneric/dialogo"
import React from 'react';

interface MainProps {
    name: string
}


export const Main = ({
    name
}: MainProps) => {
      const [open, setOpen] = React.useState(false);

      const confirmar =() =>{
        console.log("se elimino correctamente") 
        setOpen(false)
    }
    
    return(
        <>
        <div className={style.main}>
        <NavBar/>
        </div>
        <div className={style.main}>          
            {name}
        </div>
        <Button onClick={()=>setOpen(true) }>dialog</Button>
        <SimpleDialog 
            open={open}
            onClose={()=> setOpen(false)}
            onConfirm={confirmar} 
        />
        </>
    )
}