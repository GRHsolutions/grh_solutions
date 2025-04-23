import React from "react";
import { SxProps, useTheme } from "@mui/material/styles"; 
import { Button } from "@mui/material";

interface GrhButtonProps {
  id?: string;
  name?: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
  value?: string | number;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  fullWidth?: boolean;
  type?:  "button" | "reset" | "submit" | undefined;
  autoComplete?: string;
  variant?: "principal" | "secondary" | "tertiary" | "use-default";
  sx?: SxProps;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  p?: string | number;
  disabled?: boolean;
}

const GrhButton: React.FC<GrhButtonProps> = ({
  id,
  name,
  type,
  ref,
  onClick,
  sx = {},
  label,
  startIcon,
  endIcon,
  variant = "use-default",
  p,
  disabled
}) => {
  const theme = useTheme(); // Accede al tema para usarlo en el componente

  const useVariant = (): SxProps => {
    const baseStyles: SxProps = {
      ...sx,
      padding: p,
      borderRadius: theme.shape.borderRadius,
      "&:hover": {
        backgroundColor: theme.palette.primary.divider,
      },
    };

    if (disabled) {
      return {
        ...baseStyles,
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
        "&:hover": {
          backgroundColor: theme.palette.action.disabledBackground,
        },
      };
    }

    switch (variant) {
      case "principal":
        return {
          ...baseStyles,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.secondary.hover,
          },
        };
      case "secondary":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: theme.palette.secondary.main,
          textDecoration: "outlined",
          "&:hover": {
            backgroundColor: theme.palette.primary.hover,
          },
        };
      case "tertiary":
        return {
          ...baseStyles,
          border: '2px solid' + theme.palette.secondary.main,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.primary.hover,
          },
        };
      case "use-default":
        return {
          ...baseStyles,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        };
      default:
        return baseStyles;
    }
  };

  return (
    <Button
      id={id}
      name={name}
      type={type}
      onClick={onClick}
      sx={{ 
        ...useVariant()
      }}
      ref={ref}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default GrhButton;