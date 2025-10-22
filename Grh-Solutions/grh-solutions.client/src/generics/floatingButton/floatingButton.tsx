import { Box, Button, Typography, Tooltip } from "@mui/material";
import React, { useState } from "react";

interface FloatingButtonProps {
  onClick: () => void;
  label?: string;
  icon: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  size?: number | string;
  positions?: Positions;
  tooltip?: string;
  ariaLabel?: string;
  disabled?: boolean;
  hoverEffect?: "scale" | "elevate" | "rotate";
}

export interface Positions {
  top?: string | number;
  bottom?: string | number;
  right?: string | number;
  left?: string | number;
  vertical?: "top" | "center" | "bottom";
  horizontal?: "left" | "center" | "right";
}

export const FloatingButton = ({
  onClick,
  label,
  icon,
  size = "40px",
  bgColor = "primary.main",
  positions,
  borderColor,
  tooltip,
  ariaLabel,
  disabled = false,
  hoverEffect = "scale"
}: FloatingButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Estilos dinámicos basados en props
  const getHoverEffect = () => {
    switch (hoverEffect) {
      case "scale":
        return { transform: "scale(1.1)" };
      case "elevate":
        return { boxShadow: 6 };
      case "rotate":
        return { transform: "rotate(10deg)" };
      default:
        return { transform: "scale(1.1)" };
    }
  };

  const buttonContent = (
    <>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel || label || "Floating button"}
        sx={{
          position: "relative",
          borderRadius: "50%",
          minWidth: size,
          minHeight: size,
          width: size,
          height: size,
          padding: 0,
          backgroundColor: bgColor,
          border: borderColor ? `1px solid ${borderColor}` : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            ...getHoverEffect(),
            borderRadius: label ? "15px" : "50%",
            backgroundColor: bgColor,
          },
          "&:disabled": {
            opacity: 0.6,
            cursor: "not-allowed",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon}

        {isHovered && label && (
          <Typography
            sx={{
              position: "absolute",
              whiteSpace: "nowrap",
              left: "100%",
              ml: 1,
              opacity: isHovered ? 1 : 0,
              fontSize: "0.875rem",
              transition: "opacity 0.2s ease",
              color: "text.primary",
              backgroundColor: "background.paper",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              boxShadow: 2,
            }}
          >
            {label}
          </Typography>
        )}
      </Button>
    </>
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: positions?.top,
        left: positions?.left,
        bottom: positions?.bottom,
        right: positions?.right,
        display: "flex",
        flexDirection: "column",
        alignItems: positions?.horizontal === "center" 
          ? "center" 
          : positions?.horizontal === "right" 
            ? "flex-end" 
            : "flex-start",
        justifyContent: positions?.vertical === "center" 
          ? "center" 
          : positions?.vertical === "bottom" 
            ? "flex-end" 
            : "flex-start",
        zIndex: 150,
      }}
    >
      {tooltip ? (
        <Tooltip title={tooltip} arrow placement="right">
          {buttonContent}
        </Tooltip>
      ) : (
        buttonContent
      )}
    </Box>
  );
};