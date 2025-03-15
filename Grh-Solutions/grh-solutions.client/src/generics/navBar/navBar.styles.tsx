import { useTheme } from "@mui/material";

interface ReturnableCss {
    navBar: React.CSSProperties,
    right: React.CSSProperties,
    left: React.CSSProperties,
    brand: React.CSSProperties,
    icon: React.CSSProperties,
    search: React.CSSProperties,
    menu: React.CSSProperties,
}

export const NavBarStyles = () => {
    const theme = useTheme();
    return ({
        navBar: {
            height: "48px",
            display: "flex",
            alignItems: "center", 
            justifyContent: "space-between", 
            backgroundColor: theme.palette.primary.main, // Using the primary color from the theme
            borderBottom: `1px solid ${theme.palette.primary.divider}`,
            padding: "10px",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 500,
            color: theme.palette.primary.contrastText
        },
        right: {
            display: "flex",
            marginRight: "30px" ,
            color: theme.palette.primary.contrastText
        },
        left: {
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "2px",
            color: theme.palette.primary.contrastText
        },
        brand: {
            marginLeft: "1rem",
            color: theme.palette.primary.contrastText
        },
        icon: {
            display: "flex",
            alignItems: "center",
            paddingRight: "5px"
        },
        search: {
            display: "flex",
            color: "white",
            borderRadius: "5px",
            justifyContent: "space-between"
        },
        menu: {
            alignItems: "center",
            textAlign: "center"
        }
    } as ReturnableCss)
}