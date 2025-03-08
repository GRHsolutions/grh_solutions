import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    menuIcon: {
      color: theme.palette.text.primary,
    },
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
      boxShadow: theme.shadows[6], // Sombra más pronunciada
      "*": {
        color: theme.palette.text.primary,
        fontFamily: "sans-serif",
      },
    },
    closeButton: {
      color: theme.palette.text.primary,
    },
    nav: {
      flex: 1,
      padding: "20px 0",
      overflowY: "auto",
    },
    menuItem: {
      padding: "14px 25px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      borderRadius: "6px", // Bordes más suaves
      margin: "4px 12px", // Espaciado entre elementos
      "&:hover": {
        backgroundColor: theme.palette.action.active, // Cambio de color más sutil
        transform: "translateX(8px)", // Movimiento más fluido
        color: theme.palette.gray[1000]
      },
    },
    active: {
      color: theme.palette.primary.contrastText,
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: theme.palette.action.active,
        color: theme.palette.text.primary
      },
    },
    link: {
      display: "flex",
      gap: "16px",
      padding: "14px 25px",
      color: theme.palette.text.primary,
      textDecoration: "none",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      borderRadius: "6px", // Bordes más suaves
      margin: "4px 12px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        transform: "translateX(8px)",
        color: theme.palette.text.primary
      },
    },
    subMenu: {
      listStyleType: "none",
      padding: 0,
      margin: "4px 20px", // Más separación visual
      backgroundColor: theme.palette.gray[200], // Color gris más claro
      borderLeft: `4px solid ${theme.palette.action.active}`, // Borde más grueso
      borderRadius: "6px",
    },
    linkSubMenu: {
      display: "block",
      padding: "12px 40px",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: theme.palette.gray[300], // Cambio más sutil
        color: theme.palette.text.primary
      },
    },
    arrow: {
      marginLeft: "auto",
      transition: "transform 0.3s ease",
    },
    activateArrow: {
      transform: "rotate(90deg)",
    },
    header: {
      padding: "14px",
      display: 'flex',
      textAlign: "start",
      justifyContent: 'space-between',
      borderBottom: `2px solid ${theme.palette.divider}`, // Borde más marcado
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.contrastText,
      "*": {
        fontWeight: "bold",
        fontSize: "1.6rem",
      },
    },
  };
};
