import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import MUIswitch from "../switch/MUIswitch";
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import SearchBar from "../SearchBar/search";
import { useParametros } from "../../contexts/useParamether.provider";
import { NavBarStyles } from "./navBar.styles";
import { SideBar2 } from "../sidebar2/sideBar";
//import { SideBar } from "../sidebar/sideBar";

export const NavBar: React.FC = () => {
  const { parametros, toggleTheme } = useParametros();
  const [switchValue, setSwitchValue] = React.useState(parametros.dark);
  const [search, setSearch] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const Styles = NavBarStyles();
  
  const handleSearchSubmit = () => {
    if (search == "") return;
    setSearch("");
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
      <nav style={Styles.navBar}>
        <div style={Styles.left} >
          {/* <SideBar /> */}
          <SideBar2 />
          <h2>GRH Solutions</h2>
        </div>
        <div style={Styles.right}>
          <div style={Styles.search}>
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />
            <div>
              <Box
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="false"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar
                  sx={{
                    marginTop: "5px",
                    marginLeft: "10px",
                    bgcolor: deepPurple[500]
                  }}
                >
                  OP
                </Avatar>
              </Box>
              <Menu
                id="demo-positioned-menu"
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
                <div style={Styles.menu}>
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
