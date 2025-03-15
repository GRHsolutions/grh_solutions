import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Backdrop, Box, Button, IconButton, Typography, useTheme } from "@mui/material";
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
  const navigate = useNavigate();
  const theme = useTheme();
  
  React.useEffect(() => {
    const activeItem = items.find((item) => item.active);
    if (activeItem && activeItem.subItems) {
      setOpenSubmenus((prev) => ({ ...prev, [activeItem.to]: true }));
    }
  }, [items, location.pathname]);

  const toggleSubmenu = (to: string, navigates: boolean) => {
    setOpenSubmenus((prev) => ({ ...prev, [to]: !prev[to] }));
    if(navigates){
      handleItemClick();
    }
  };

  const handleItemClick = () => {
    setCollapse(false);
  };

  return (
    <>
      <Button sx={styles.menuIcon} variant="text" onClick={() => setCollapse(!collapse)}>
        <MenuIcon fontSize="large"  />
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
            <Box sx={styles.buttonCloseDiv}>
              <IconButton sx={styles.closeButton} onClick={() => setCollapse(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={styles.render}>
            {items.map((item) =>
              item.visible ? (
                <Box key={item.to}>
                  <Button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      item.subItems ?( toggleSubmenu(item.to, false)) : (navigate(item.to), handleItemClick())
                    }}
                    disabled={item.disabled}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: 'center',
                      width: "100%",
                      textTransform: "none",
                      padding: "10px",
                      backgroundColor: item.active ? theme.palette.primary.hover : "transparent",
                      color: item.disabled ? "gray" : "inherit",
                      "&:hover":{
                        backgroundColor:  theme.palette.primary.hover,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: 'start',
                          gap: '15px' 
                        }}
                      >
                      <Box 
                        position={'relative'} 
                        top={'4px'}
                      >{item.icon}</Box>
                      <Typography>{item.label}</Typography>
                    </Box>
                    {item.subItems && (
                      <KeyboardArrowRightIcon
                        sx={{
                          ...styles.arrow,
                          ...(openSubmenus[item.to] ? styles.activateArrow : {}),
                        }}
                      />
                    )}
                  </Button>
                  {item.subItems && openSubmenus[item.to] && (
                    <Box sx={{ 
                        paddingLeft: "20px", 
                        mt: '15px', 
                        gap: '15px',
                        display: 'flex',
                        flexDirection: 'column'  
                      }}
                    >
                      {item.subItems.map((subItem) => (
                        subItem.visible ? (
                          <Button
                            key={subItem.to}
                            onClick={()=>{
                              navigate(subItem.to);  
                              handleItemClick();                            
                            }}
                            disabled={subItem.disabled}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: 'center',
                              width: "100%",
                              textTransform: "none",
                              padding: "8px",
                              color: subItem.disabled ? "gray" : "inherit",
                              "&:hover":{
                                backgroundColor:  theme.palette.primary.hover,
                              }
                            }}
                          >
                            <Typography>{subItem.label}</Typography>
                          </Button>
                        ) : null
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