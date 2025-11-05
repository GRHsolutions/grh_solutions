import { SxProps, useTheme } from "@mui/material";
import { hexToRGBA } from "../../theme/hex.overwrite";

export const useStyles = () => {
  const theme = useTheme();

  return {
    menuIcon: {
      padding:0.2,
      color: theme.palette.primary.contrastText,
      transition: "background-color 0.3s ease",
      "&:hover":{
        backgroundColor:  theme.palette.primary.boxShadow,
      }
    } as SxProps,
    sidebar: {
      backgroundColor: hexToRGBA(theme.palette.blue[700], 1),
      color: theme.palette.primary.contrastText,
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      height: "100vh",
      width: "300px",
      top: 0,
      left: "-280px",
      transition: "left 0.3s ease-in-out",
      zIndex: 250,
      padding: 0.5,
      boxShadow: theme.shadows[6], // Sombra más pronunciada
    },
    // pertenecientes al header junto al boton de cerrar
    header: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: "center",
      color: theme.palette.primary.contrastText,
      "*": {
        fontWeight: "bold",
        fontSize: "1.8rem",
      },
    },
    buttonCloseDiv: {
      backgroundColor:  theme.palette.blue[700],
      position: 'absolute',
      right: -100,
      borderRadius: '50%',
      zIndex: 999,
      "&:hover": {
        //backgroundColor: theme.palette.primary.hover, // Cambio de color más sutil
        //transform: "translateX(8px)", // Movimiento más fluido
        color: theme.palette.gray[1000]
      },
    } as SxProps,
    closeButton: {
      color: theme.palette.primary.contrastText,
      border: `1px solid ${theme.palette.primary.divider}`,
      zIndex: 999,
    } as SxProps,
    // ------------------------------------------------
    // listados
    render: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9px',
      padding: 1,
      borderTop: `2px solid ${theme.palette.primary.divider}`, // Borde más marcado
      overflowY: 'auto',
      // Para navegadores Webkit (Chrome, Safari, Edge)
      '&::-webkit-scrollbar': {
        display: 'none',
      },

      // Para Firefox
      scrollbarWidth: 'none',
      
      // Para IE y Edge Legacy
      '-ms-overflow-style': 'none',
    } as SxProps,
    // flecha para indicar que el submenu esta abierto
    arrow: {
      transition: "transform 0.3s ease",
    },
    activateArrow: {
      transform: "rotate(90deg)",
    },
    
  };
};
