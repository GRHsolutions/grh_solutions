import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./sideBar.module.scss";
import { Button } from "@mui/material";
import { useRenderedItems } from "./renderedItems";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const SideBar: React.FC = () => {
  const [collapse, setCollapse] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const { items } = useRenderedItems();
  const toggleSubmenu = (to: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [to]: !prev[to] }));
  };

  return (
    <>
      <Button variant="text" onClick={() => setCollapse(!collapse)}>
        <MenuIcon fontSize="large" sx={{ color: "white" }} />
      </Button>
      <div
        className={`${Styles.backdrop} ${
          collapse ? Styles.open : Styles.closed
        }`}
      >
        <aside
          className={`${Styles.sidebar} ${
            collapse ? Styles.open : Styles.closed
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className={Styles.nav}>
            <ul>
              {items.map((item) =>
                item.visible ? (
                  <li key={item.to}>
                    {item.subItems && item.subItems.length > 0 ? (
                      <div
                        onClick={() => {
                          toggleSubmenu(item.to);
                          setSelectedItem(item.to);
                        }}
                        className={`${Styles.menuItem} ${
                          selectedItem === item.to ? Styles.active : ""
                        }`}
                      >
                        <div className={Styles.icons}>
                          {item.icon}
                          {item.label}
                          <div className={`${Styles.arrow} ${selectedItem === item.to ? Styles.activateArrow : ""}`}>
                            <KeyboardArrowRightIcon />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.to}
                        className={`${Styles.link} ${
                          selectedItem === item.to ? Styles.active : ""
                        }`}
                        onClick={() => setSelectedItem(item.to)}
                      >
                        <div className={Styles.icons}>
                          {item.icon}
                          {item.label}
                        </div>
                      </Link>
                    )}
                    {item.subItems && openSubmenus[item.to] && (
                      <ul className={Styles.subMenu}>
                        {item.subItems.map((subItem) => (
                          <li key={subItem.to}>
                            <Link
                              to={subItem.to}
                              onClick={() => setSelectedSubItem(subItem.to)}
                              className={`${Styles.linkSubMenu} ${
                                selectedSubItem === subItem.to
                                  ? Styles.active
                                  : Styles.linkSubMenu
                              }`}
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
        </aside>
      </div>
    </>
  );
};
