import React from 'react';
import Styles from './sideBar.module.scss';
import { Backdrop, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Icono de cierre

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
    const [collapse, setCollapse] = React.useState(false);
    const listItems = renderedItems();

    return (
        <>
            {/* Botón para abrir el sidebar */}
            <Button
                variant="contained"
                onClick={() => setCollapse(true)}
                sx={{
                }}
            >
                Abrir sidebar
            </Button>

            {/* Overlay y sidebar */}
            <Backdrop
                open={collapse}
                onClick={() => setCollapse(false)}
                sx={{
                    zIndex: 150,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <aside
                    className={`${Styles.sidebar} ${collapse ? Styles.open : Styles.closed}`}
                    onClick={(e) => e.stopPropagation()} // Evita que el sidebar se cierre al hacer clic dentro
                >
                    {/* Botón de cierre */}
                    <IconButton
                        className={Styles.closeButton}
                        onClick={() => setCollapse(false)}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Logo */}
                    <div className={Styles.logo}>
                        <h2>GRH solutions</h2>
                    </div>

                    {/* Navegación */}
                    <nav className={Styles.nav}>
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Perfil</a></li>
                            <li><a href="#">Mensajes</a></li>
                            <li><a href="#">Configuración</a></li>
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className={Styles.footer}>
                        <p>© 2023 Mi App</p>
                    </div>
                </aside>
            </Backdrop>
        </>
    );
};