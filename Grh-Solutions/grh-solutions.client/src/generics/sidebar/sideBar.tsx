import React from "react";
import { Link } from "react-router-dom";
import Styles from "./sideBar.module.scss";
import { Backdrop, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRenderedItems } from "./renderedItems";
import MenuIcon from '@mui/icons-material/Menu';

export const SideBar: React.FC = () => {
    const [collapse, setCollapse] = React.useState(false);
    const { items } = useRenderedItems(); // Obtenemos los ítems dinámicos

    return (
        <>
            <Button variant="text" onClick={() => setCollapse(true)} >
                <MenuIcon fontSize="large" sx={{color: "blue"}}/>
            </Button>

            <Backdrop
                open={collapse}
                onClick={() => setCollapse(false)}
                sx={{ zIndex: 150, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <aside
                    className={`${Styles.sidebar} ${collapse ? Styles.open : Styles.closed}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton className={Styles.closeButton} onClick={() => setCollapse(false)}>
                        <CloseIcon />
                    </IconButton>

                    <div className={Styles.logo}>
                        <h2>GRH Solutions</h2>
                    </div>

                    <nav className={Styles.nav}>
                        <ul>
                            {items.map((item) =>
                                item.visible ? (
                                    <li key={item.to}>
                                        <Link to={item.to} className={item.active ? Styles.active : ""}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ) : null
                            )}
                        </ul>
                    </nav>

                    <div className={Styles.footer}>
                        <p>© 2023 Mi App</p>
                    </div>
                </aside>
            </Backdrop>
        </>
    );
};
