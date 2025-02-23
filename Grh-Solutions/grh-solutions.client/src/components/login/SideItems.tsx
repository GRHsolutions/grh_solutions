import React from "react";
import RegisterIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { Box, SxProps, Typography, useTheme } from "@mui/material";

type Tabs = "register" | "login";

interface SideItemsProps {
  actual: Tabs;
  onSelect: (newTab: Tabs) => void;
}

interface Item {
  label: string;
  actual: Tabs;
  icon: React.JSX.Element;
}

const items: Item[] = [
  {
    label: "Register",
    actual: "register",
    icon: <RegisterIcon />,
  },
  {
    label: "Login",
    actual: "login",
    icon: <LoginIcon />,
  },
];


export const SideItems = ({ actual, onSelect }: SideItemsProps) => {
  const theme = useTheme();
  const styles = {
    aside: {
      position: "relative",
      padding: "16px",        
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary
    } as React.CSSProperties,
    title: {
      display: "flex",
      justifyContent: "center",
      fontSize: { xs: "1.2rem", sm: "1.5rem" },
      marginBottom: "16px", // Espaciado inferior
    } as SxProps,
    items: {
      marginTop: "15px",
    } as React.CSSProperties,
    item: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px", // Ajuste de padding
      marginBottom: "8px",
      cursor: "pointer",
      borderRadius: "8px", // Bordes redondeados
      transition: "background-color 0.3s ease",
      textAlign: "center",
      "&:hover": {
        backgroundColor: "red", // Efecto hover
      },
    } as React.CSSProperties,
    activeItem: {
      backgroundColor: theme.palette.action.hover,
      fontWeight: "bold",
    } as React.CSSProperties,
    icon: {
      marginRight: "8px",
      fontSize: { xs: "1rem", sm: "1.2rem" },
    } as SxProps,
  };

  return (
    <aside style={styles.aside}>
      <Typography sx={styles.title}>Opciones</Typography>
      <div style={styles.items}>
        {items.map((item) => (
          <Box
            key={item.actual}
            style={{
              ...styles.item,
              ...(actual === item.actual ? styles.activeItem : {}),
            }}
            onClick={() => onSelect(item.actual)}
          >
            <Box sx={styles.icon}>{item.icon}</Box>
            {item.label}
          </Box>
        ))}
      </div>
    </aside>
  );
};