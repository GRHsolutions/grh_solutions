import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Backdrop, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRenderedItems } from "./renderedItems";
import { useStyles } from "./sideBar.styles";

export const SideBar2: React.FC = () => {
  const styles = useStyles();
  const [collapse, setCollapse] = React.useState(false);
  const [openSubmenus, setOpenSubmenus] = React.useState<{ [key: string]: boolean }>({});
  const { items } = useRenderedItems();
  const location = useLocation();

  React.useEffect(() => {
    const activeItem = items.find((item) => item.active);
    if (activeItem && activeItem.subItems) {
      setOpenSubmenus((prev) => ({ ...prev, [activeItem.to]: true }));
    }
  }, [items, location.pathname]);

  const toggleSubmenu = (to: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [to]: !prev[to] }));
  };

  const handleItemClick = () => {
    setCollapse(false);
  };

  return (
    <>
      <Button variant="text" onClick={() => setCollapse(!collapse)}>
        <MenuIcon fontSize="large" sx={styles.menuIcon} />
      </Button>

      <Backdrop
        open={collapse}
        onClick={() => setCollapse(false)}
        sx={{ 
          zIndex: 150, 
          backgroundColor: "transparent", // Fondo más oscuro
        }}
      >
        <Box
          sx={{
            ...styles.sidebar,
            left: collapse ? "0" : "-280px",
          }}
          onClick={(e) => e.stopPropagation()}
        >


          <Box sx={styles.header}>
            <Typography variant="h6">Grh Solutions</Typography>
            <IconButton sx={styles.closeButton} onClick={() => setCollapse(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={styles.nav}>
            {items.map((item) =>
              item.visible ? (
                <Box key={item.to}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <Box
                      onClick={() => toggleSubmenu(item.to)}
                      sx={{
                        ...styles.menuItem,
                        ...(item.active && styles.active),
                      }}
                    >
                      <Box>{item.icon}</Box>
                      <Typography>{item.label}</Typography>
                      <Box
                        sx={{
                          ...styles.arrow,
                          ...(openSubmenus[item.to] && styles.activateArrow),
                        }}
                      >
                        <KeyboardArrowRightIcon />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      component={Link}
                      to={item.to}
                      sx={{
                        ...styles.link,
                        ...(item.active && styles.active),
                      }}
                      onClick={handleItemClick}
                    >
                      <Box>{item.icon}</Box>
                      <Typography>{item.label}</Typography>
                    </Box>
                  )}

                  {item.subItems && openSubmenus[item.to] && (
                    <Box sx={styles.subMenu}>
                      {item.subItems.map((subItem) => (
                        <Box
                          key={subItem.to}
                          component={Link}
                          to={subItem.to}
                          sx={{
                            ...styles.linkSubMenu,
                            ...(subItem.active && styles.active),
                          }}
                          onClick={handleItemClick}
                        >
                          <Typography>{subItem.label}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : null
            )}
          </Box>
        </Box>
      </Backdrop>
    </>
  );
};