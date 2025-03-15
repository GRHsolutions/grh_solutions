import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import EngineeringIcon from '@mui/icons-material/Engineering';

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
        visible: true,
        to: "/comunicados",
        disabled: false,
        active: location.pathname === "/comunicados",
        label: "Comunicados",
        icon: <MailIcon />,
      },
      {
        visible: true,
        to: '/solicitudes',
        disabled: false,
        active: location.pathname === "/solicitudes",
        label: 'Solictudes',
        icon: <AssignmentLateIcon />,
        subItems: [{
            visible: true,
            to: '/solicitudes?type=pendientes',
            disabled: false,
            active: location.pathname === "/solicitudes?type=pendientes",
            label: 'Pendientes',
          },{
            visible: true,
            to: '/solicitudes?type=respondidas',
            disabled: false,
            active: location.pathname === "/solicitudes?type=respondidas",
            label: 'Respondidas',
          },{
            visible: true,
            to: '/solicitudes?type=asignadas',
            disabled: false,
            active: location.pathname === "/solicitudes?type=asignadas",
            label: 'Asignadas',
          }
        ]
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
        visible: true,
        to: "/horarios",
        disabled: false,
        active: location.pathname === "/horarios",
        label: "Horarios",
        icon: <CalendarMonthIcon />,
        subItems: [
          {
            visible: true,
            to: "/horarios?type=mis-horarios",
            disabled: false,
            active: location.pathname === "/horarios?type=mis-horarios",
            label: "Mis Horarios",
          },
          {
            visible: true,
            to: "/horarios?type=grupos",
            disabled: false,
            active: location.pathname === "/horarios?type=grupos",
            label: "Grupos",
          },
          {
            visible: true,
            to: "/horarios?type=mi-horario",
            disabled: false,
            active: location.pathname === "/horarios?type=mi-horario",
            label: "Mi Horario",
          },
        ],
      },
      {
        visible: true,
        to: "/vacantes",
        disabled: false,
        active: location.pathname === "/vacantes",
        label: "Vacantes",
        icon: <PersonAddIcon />,
        subItems: [
          {
            visible: true,
            to: "/vacantes?type=vacante",
            disabled: false,
            active: location.pathname === "/vacantes?type=vacante",
            label: "Vacante",
          },
          {
            visible: true,
            to: "/vacantes?type=finalizados",
            disabled: false,
            active: location.pathname === "/vacantes?type=finalizados",
            label: "Finalizados",
          },
          {
            visible: true,
            to: "/vacantes?type=por-firmar",
            disabled: false,
            active: location.pathname === "/vacantes?type=por-firmar",
            label: "Por Firmar",
          },
          {
            visible: true,
            to: "/vacantes?type=en-proceso",
            disabled: false,
            active: location.pathname === "/vacantes?type=en-proceso",
            label: "En Proceso",
          },
        ],
        },
      {
        visible: true,
        to: "/contratos",
        disabled: false,
        active: location.pathname === "/contratos",
        label: "Contratos",
        icon: <DescriptionIcon />,
        subItems: [
          {
            visible: true,
            to: "/contratos?type=creados",
            disabled: false,
            active: location.pathname === "/contratos?type=creados",
            label: "Creados",
          },
          {
            visible: true,
            to: "/contratos?type=por-validar",
            disabled: false,
            active: location.pathname === "/contratos?type=por-validar",
            label: "Por Validar",
          },
          {
            visible: true,
            to: "/contratos?type=rechazados",
            disabled: false,
            active: location.pathname === "/contratos?type=rechazados",
            label: "Rechazados",
          },
          {
            visible: true,
            to: "/contratos?type=aprobados",
            disabled: false,
            active: location.pathname === "/contratos?type=aprobados",
            label: "Aprobados",
          },
          {
            visible: true,
            to: "/contratos?type=firmados",
            disabled: false,
            active: location.pathname === "/contratos?type=firmados",
            label: "Firmados",
          },
          {
            visible: true,
            to: "/contratos?type=por-firmar",
            disabled: false,
            active: location.pathname === "/contratos?type=por-firmar",
            label: "En Espera de Firma",
          },
        ],
      },
      {
        visible: true,
        to: "/empleados",
        disabled: false,
        active: location.pathname === "/empleados",
        label: "Empleados",
        icon: <EngineeringIcon />,
        subItems: [
          {
            visible: true,
            to: "/empleados?type=todos",
            disabled: false,
            active: location.pathname === "/contratos?type=todos",
            label: "Todos",
          },
          {
            visible: true,
            to: "/empleados?type=finalizado",
            disabled: false,
            active: location.pathname === "/contratos?type=finalizado",
            label: "Contratos finalizados",
          },
        ]
      },
    ];
    
    return allItems;
  }, [location.pathname]);

  return { items };
};