import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

export interface Item {
  visible: boolean;
  to: string;
  disabled: boolean;
  active: boolean;
  label: string;
  icon?: React.JSX.Element;
  subItems?: Item[];
}

export interface Returnable {
  items: Item[];
}

export const useRenderedItems = (): Returnable => {
  const location = useLocation();

  const items = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return [
          {
            visible: true,
            to: "/",
            disabled: false,
            active: true,
            label: "Inicio",
            icon: <HomeIcon />,
            subItems: [
              {
                visible: true,
                to: "/",
                disabled: false,
                active: false,
                label: "hola",}
            ],
          },
          {
            visible: true,
            to: "/perfil",
            disabled: false,
            active: false,
            label: "Perfil",
            icon: <AccountCircleIcon />,
            subItems: [
              {
                visible: true,
                to: "/mensajes",
                disabled: false,
                active: false,
                label: "Mensajes",
              },
              {
                visible: true,
                to: "/configuracion",
                disabled: false,
                active: false,
                label: "Configuración",
              },
            ],
          },
          {
            visible: true,
            to: "/dsa",
            disabled: false,
            active: false,
            label: "Configuración",
            icon: <SettingsSuggestIcon />,
          },
        ];
      case "/perfil":
        return [
          {
            visible: true,
            to: "/",
            disabled: false,
            active: false,
            label: "Inicio",
          },
          {
            visible: true,
            to: "/perfil",
            disabled: false,
            active: true,
            label: "Perfil",
          },
          {
            visible: true,
            to: "/configuracion",
            disabled: false,
            active: false,
            label: "Configuración",
          },
          {
            visible: true,
            to: "/",
            disabled: false,
            active: false,
            label: "Configuración",
          },
        ];
        
      default:
        return [
          {
            visible: true,
            to: "/",
            disabled: false,
            active: false,
            label: "Inicio",
          },
          {
            visible: true,
            to: "/perfil",
            disabled: false,
            active: false,
            label: "Perfil",
          },
          {
            visible: true,
            to: "/mensajes",
            disabled: false,
            active: false,
            label: "Mensajes",
          },
          {
            visible: true,
            to: "/configuracion",
            disabled: false,
            active: false,
            label: "Configuración",
          },
        ];
    }
  }, [location.pathname]);

  return { items };
};
