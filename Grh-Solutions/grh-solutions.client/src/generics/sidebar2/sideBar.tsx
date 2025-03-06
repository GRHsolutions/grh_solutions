import React from "react";
import { Link } from "react-router-dom";
import { Backdrop, Button, Container, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRenderedItems } from "./renderedItems";
import MenuIcon from "@mui/icons-material/Menu";
import { SideBarStyles } from "./sideBar.styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const SideBar2: React.FC = () => {
  const Styles = SideBarStyles(); // Usamos los estilos desde NavBarStyles
  const [collapse, setCollapse] = React.useState(false);
  const [openSubmenus, setOpenSubmenus] = React.useState<{ [key: string]: boolean }>({});
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = React.useState<string | null>(null);
  const { items } = useRenderedItems();

  const toggleSubmenu = (to: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [to]: !prev[to] }));
  };

  return (
    <>
      <Button variant="text" onClick={() => setCollapse(!collapse)}>
        <MenuIcon fontSize="large" sx={{ color: "white" }} />
      </Button>

      <Backdrop
        open={collapse}
        onClick={() => setCollapse(false)}
        sx={{ zIndex: 150, backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      >
        <aside
          style={{ ...Styles.sidebar, left: collapse ? '0' : '-250px' }} // Usamos el estado para aplicar la transición
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton style={Styles.closeButton} onClick={() => setCollapse(false)}>
            <CloseIcon />
          </IconButton>

          <div style={Styles.logo}>
            <h2>GRH Solutions</h2>
          </div>

          <nav style={Styles.nav}>
            <ul>
              {items.map((item) =>
                item.visible ? (
                  <li key={item.to}>
                    {item.subItems && item.subItems.length > 0 ? (
                      <Container
                        onClick={() => {
                          toggleSubmenu(item.to);
                          setSelectedItem(item.to);
                        }}
                        sx={{
                          ...Styles.menuItem,
                          ...(selectedItem === item.to ? Styles.active : undefined),
                        }}
                      >
                        <div style={Styles.icons}>
                          {item.icon}
                          {item.label}
                          <div
                            style={{
                              ...Styles.arrow,
                              ...(selectedItem === item.to ? Styles.activateArrow : {}),
                            }}
                          >
                            <KeyboardArrowRightIcon />
                          </div>
                        </div>
                      </Container>
                    ) : (
                      <Link
                        to={item.to}
                        style={{
                          ...Styles.link,
                          ...(selectedItem === item.to ? Styles.active : {}),
                        }}
                        onClick={() => setSelectedItem(item.to)}
                      >
                        <div style={Styles.icons}>
                          {item.icon}
                          {item.label}
                        </div>
                      </Link>
                    )}
                    {item.subItems && openSubmenus[item.to] && (
                      <ul style={Styles.subMenu}>
                        {item.subItems.map((subItem) => (
                          <li key={subItem.to}>
                            <Link
                              to={subItem.to}
                              onClick={() => setSelectedSubItem(subItem.to)}
                              style={{
                                ...Styles.linkSubMenu,
                                ...(selectedSubItem === subItem.to ? Styles.active : {}),
                              }}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : null
              )}
            </ul>
          </nav>

          <div style={Styles.footer}>
            <p>© 2023 Mi App</p>
          </div>
        </aside>
      </Backdrop>
    </>
  );
};
