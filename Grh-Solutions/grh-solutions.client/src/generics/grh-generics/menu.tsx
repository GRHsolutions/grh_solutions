import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";

interface ItemProps {
  label: string;
  onClick: () => void;
  visible?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface BasicMenuProps {
  items: ItemProps[];
  optionsPosition?: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
}

const BasicMenu = ({ items, optionsPosition }: BasicMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Usamos IconButton en lugar de Button */}
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <MenuIcon /> {/* Aquí se pasa el ícono directamente */}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // Aquí aplicamos las posiciones usando `optionsPosition`
        sx={{
          ...(optionsPosition?.top && { top: optionsPosition.top }),
          ...(optionsPosition?.bottom && { bottom: optionsPosition.bottom }),
          ...(optionsPosition?.left && { left: optionsPosition.left }),
          ...(optionsPosition?.right && { right: optionsPosition.right }),
        }}
      >
        {items
          .filter((item) => item.visible !== false) // Filtra los ítems que no son visibles
          .map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
              disabled={item.disabled} // Deshabilita el ítem si es necesario
            >
              <div
                style={{
                  marginTop: 5
                }}
              >{item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>} {/* Muestra el ícono si existe */}</div>
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default BasicMenu;
