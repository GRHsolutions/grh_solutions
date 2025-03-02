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
            padding: "10px",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            borderBottom: "#ffffff",
            border: "10px",
            zIndex: 500
        },
        right: {
            display: "flex",
            marginRight: "30px"
        },
        left: {
            color: "white",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "2px",
        },
        brand: {
            marginLeft: "1rem"
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