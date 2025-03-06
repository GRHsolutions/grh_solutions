import { SxProps, useTheme } from "@mui/material";
import React from "react";

interface ReturnableCss {
    sidebar: React.CSSProperties;
    closeButton: React.CSSProperties;
    logo: React.CSSProperties;
    nav: React.CSSProperties;
    footer: React.CSSProperties;
    menuItem: SxProps;
    active: SxProps;
    link: SxProps;
    subMenu: React.CSSProperties;
    linkSubMenu: SxProps;
    icons: React.CSSProperties;
    arrow: React.CSSProperties;
    activateArrow: React.CSSProperties;
}

export const SideBarStyles = (): ReturnableCss => {
    const theme = useTheme();

    return {
        sidebar: {
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            height: "100vh",
            width: "34vh",
            top: 0,
            left: "-250px", // Empieza fuera de la pantalla
            boxShadow: `3px 0 10px ${theme.palette.grey[500]}`,
            transition: "left 0.3s ease-in-out",
            zIndex: 200,
        },
        closeButton: {
            position: "absolute",
            top: "10px",
            right: "10px",
            color: theme.palette.text.primary,
            zIndex: 300,
        },
        logo: {
            padding: "20px",
            textAlign: "center",
            backgroundColor: theme.palette.grey[800],
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
        nav: {
            flex: 1,
            padding: "20px 0",
        },
        footer: {
            padding: "10px",
            textAlign: "center",
            backgroundColor: theme.palette.grey[800],
            borderTop: `1px solid ${theme.palette.primary.main}`,
        },
        menuItem: {
            padding: "10px 20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.primary,
            transition: "background-color 0.3s ease",
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
        },
        active: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        link: {
            display: "block",
            padding: "10px 20px",
            color: theme.palette.text.primary,
            textDecoration: "none",
            transition: "background-color 0.3s ease",
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
        },
        subMenu: {
            paddingLeft: "20px",
            listStyleType: "none",
            padding: 0,
            margin: 0,
        },
        linkSubMenu: {
            display: "block",
            padding: "8px 20px",
            color: theme.palette.text.secondary,
            textDecoration: "none",
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        icons: {
            marginRight: "10px",
        },
        arrow: {
            marginLeft: "auto",
            transition: "transform 0.3s ease",
        },
        activateArrow: {
            transform: "rotate(90deg)", // Rotar la flecha al abrir el submenu
        },
    };
};
