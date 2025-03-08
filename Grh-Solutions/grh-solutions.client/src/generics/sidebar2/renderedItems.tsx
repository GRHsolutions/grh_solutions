import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import HomeIcon from '@mui/icons-material/Home';

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
        to: '/',
        disabled: false,
        active: location.pathname === "/anyother",
        label: 'any',
        icon: <HomeIcon />,
        subItems: [{
          visible: true,
          to: '/',
          disabled: false,
          active: location.pathname === "/anyother",
          label: 'any',
          icon: <HomeIcon />,
        }]
      }
    ];

    return allItems;
  }, [location.pathname]);

  return { items };
};