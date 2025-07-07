import React from "react";
import RegisterIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { 
  Box, 
  Typography, 
  useTheme, 
  ButtonBase,
  useMediaQuery,
  Stack
} from "@mui/material";

type Tabs = "register" | "login";

interface SideItemsProps {
  actual: Tabs;
  onSelect: (newTab: Tabs) => void;
}

interface Item {
  label: string;
  actual: Tabs;
  icon: React.JSX.Element;
}

const items: Item[] = [
  {
    label: "Iniciar Sesión",
    actual: "login",
    icon: <LoginIcon />,
  },
  {
    label: "Registrarse",
    actual: "register",
    icon: <RegisterIcon />,
  },
];

export const SideItems = ({ actual, onSelect }: SideItemsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Stack 
        direction="row" 
        spacing={1}
        sx={{
          width: "100%",
          justifyContent: "center",
          px: 2,
        }}
      >
        {items.map((item) => (
          <ButtonBase
            key={item.actual}
            onClick={() => onSelect(item.actual)}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              minWidth: "120px",
              backgroundColor: actual === item.actual 
                ? theme.palette.primary.main 
                : "transparent",
              color: actual === item.actual 
                ? theme.palette.primary.contrastText 
                : theme.palette.text.primary,
              border: `1px solid ${
                actual === item.actual 
                  ? theme.palette.primary.main 
                  : theme.palette.divider
              }`,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: actual === item.actual 
                  ? theme.palette.primary.dark 
                  : theme.palette.action.hover,
              },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ fontSize: "1.1rem" }}>
                {item.icon}
              </Box>
              <Typography variant="body2" fontWeight={500}>
                {item.label}
              </Typography>
            </Stack>
          </ButtonBase>
        ))}
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Header del Sidebar */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: "transparent",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: theme.palette.primary.contrastText,
            mb: 1,
          }}
        >
          Portal de Acceso
        </Typography>
      </Box>

      {/* Navigation Items */}
      <Box
        sx={{
          pt: 2,
          px: 2,
        }}
      >
        <Stack spacing={1}>
          {items.map((item) => (
            <ButtonBase
              key={item.actual}
              onClick={() => onSelect(item.actual)}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: actual === item.actual 
                  ? theme.palette.primary.main 
                  : "transparent",
                color: actual === item.actual 
                  ? theme.palette.primary.contrastText 
                  : theme.palette.text.primary,
                border: `1px solid ${
                  actual === item.actual 
                    ? theme.palette.primary.main 
                    : "transparent"
                }`,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: actual === item.actual 
                    ? theme.palette.primary.dark 
                    : theme.palette.action.hover,
                  transform: "translateX(4px)",
                  boxShadow: actual === item.actual 
                    ? theme.shadows[4] 
                    : theme.shadows[1],
                },
                "&:active": {
                  transform: "translateX(2px)",
                },
              }}
            >
              <Stack 
                direction="row" 
                spacing={2} 
                alignItems="center" 
                sx={{ 
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <Box
                  sx={{
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "24px",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography 
                  variant="body1" 
                  fontWeight={actual === item.actual ? 600 : 500}
                  sx={{
                    fontSize: "0.95rem",
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
            </ButtonBase>
          ))}
        </Stack>
      </Box>

      {/* Footer del Sidebar
      <Box
        sx={{
          mt: "auto",
          p: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{
            display: "block",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          ¿Necesitas ayuda?
        </Typography>
        <Typography 
          variant="caption" 
          color="primary.main"
          sx={{
            display: "block",
            textAlign: "center",
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Contactar soporte
        </Typography>
      </Box> */}
    </Box>
  );
};