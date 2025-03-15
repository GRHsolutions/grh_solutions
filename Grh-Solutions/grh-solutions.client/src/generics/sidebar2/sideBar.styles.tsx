import { SxProps, useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    menuIcon: {
      color: theme.palette.primary.contrastText,
      transition: "background-color 0.3s ease",
      "&:hover":{
        backgroundColor:  theme.palette.secondary.main,
      }
    } as SxProps,
    sidebar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.contrastText,
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      height: "100vh",
      width: "300px",
      top: 0,
      left: "-280px",
      transition: "left 0.3s ease-in-out",
      zIndex: 200,
      padding: 0.5,
      boxShadow: theme.shadows[6], // Sombra más pronunciada
    },
    // pertenecientes al header junto al boton de cerrar
    header: {
      padding: "14px",
      display: 'flex',
      justifyContent: 'center',
      textAlign: "center",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.contrastText,
      "*": {
        fontWeight: "bold",
        fontSize: "1.6rem",
      },
    },
    buttonCloseDiv: {
      backgroundColor:  theme.palette.background.default,
      position: 'absolute',
      right: -100,
      borderRadius: '15px',
      "&:hover": {
        //backgroundColor: theme.palette.primary.hover, // Cambio de color más sutil
        //transform: "translateX(8px)", // Movimiento más fluido
        color: theme.palette.gray[1000]
      },
    } as SxProps,
    closeButton: {
      color: theme.palette.primary.contrastText,
    } as SxProps,
    // ------------------------------------------------
    // listados
    render: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
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
