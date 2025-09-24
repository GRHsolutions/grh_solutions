import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useAuth } from "../../hooks/auth";

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
  const { isLoggedIn } = useAuth();

  const items = useMemo(() => {
    const allItems: Item[] = [
      {
        visible: true,
        to: "/",
        disabled: false,
        active: location.pathname === "/",
        label: "Home",
        icon: <HomeIcon />,
      },
      {
        visible: isLoggedIn,
        to: "/comunicados",
        disabled: false,
        active: location.pathname === "/comunicados",
        label: "Comunicados",
        icon: <MailIcon />,
      },
      {
        visible: isLoggedIn,
        to: "/horarios?type=horarios",
        disabled: false,
        active: location.pathname === "/horarios",
        label: "Horarios",
        icon: <CalendarMonthIcon />
      },
      {
        visible: isLoggedIn,
        to: '/solicitudes',
        disabled: false,
        active: location.pathname === "/solicitudes",
        label: 'Solictudes',
        icon: <AssignmentLateIcon />,
      },
      // {
      //   visible: true,
      //   to: "/peticiones",
      //   disabled: false,
      //   active: location.pathname === "/peticiones",
      //   label: "Peticiones",
      //   icon: <MailIcon />,
      // },

      {
        visible: isLoggedIn,
        to: "/postulate",
        disabled: false,
        active: location.pathname === "/postulate",
        label: "Vacantes",
        icon: <PersonAddIcon />
      },
      {
        visible: isLoggedIn,
        to: "/contratos",
        disabled: false,
        active: location.pathname === "/contratos",
        label: "Contratos",
        icon: <DescriptionIcon />
      },
      {
        visible: isLoggedIn,
        to: "/empleados",
        disabled: false,
        active: location.pathname === "/empleados",
        label: "Empleados",
        icon: <EngineeringIcon />,
      },
    ];

    return allItems;
  }, [location.pathname, isLoggedIn]);

  return { items };
};