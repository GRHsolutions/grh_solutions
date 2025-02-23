import React from "react";
import Styles from "./navBar.module.scss";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SideBar } from "../sidebar/sideBar";
import PersonIcon from '@mui/icons-material/Person';
import MUIswitch from "../switch/MUIswitch";
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import SearchBar from "../SearchBar/search";
import { useParametros } from "../../contexts/useParamether.provider";

export const NavBar: React.FC = () => {
  const { parametros, toggleTheme } = useParametros();
  const [switchValue, setSwitchValue] = React.useState(parametros.dark);
  const [search, setSearch] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSearchSubmit=() => {
    console.log(search)
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
  }

  return (   
    <>
      <nav className={Styles.navbar}>
        <div className={Styles.left} >
          <SideBar />
          <h2>GRH Solutions</h2>
        </div>
        <div className={Styles.right}>
          <div className={Styles.search}>
            <SearchBar value={search} onChange={handleSearchChange} onSubmit={handleSearchSubmit}/>
            <div>
              <Box
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="false"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar sx={{ marginTop:"5px",marginLeft:"10px", bgcolor: deepPurple[500] }}>OP</Avatar>
              </Box>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  top: 52
                }}
              >
                <div className={Styles.menu}>
                  <label>Opciones</label>
                  <MenuItem sx={{ marginTop: "10px", }}>
                    <PersonIcon sx={{ marginRight: "20px" }} />
                    <label>Informacion de perfil</label>
                  </MenuItem>
                  <MenuItem sx={{ display: "flex", alignItems: "center" }} onClick={toggleTheme}>
                    <MUIswitch value={switchValue} onChange={() => setSwitchValue(!switchValue)} />
                    <label>modo oscuro</label>
                  </MenuItem>
                  <MenuItem sx={{ display: "flex", alignItems: "center" }}>
                    <LogoutIcon sx={{ marginRight: "20px" }}></LogoutIcon>
                    <label>cerrar sesion</label>
                  </MenuItem>
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
