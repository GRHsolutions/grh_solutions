import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

interface FloatingButtonProps {
  onClick: () => void;
  label?: string;
  icon: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  size?: number | string;
  positions?: Positions;
}

interface Positions {
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
  size = "13px",
  bgColor,
  positions,
  borderColor
}: FloatingButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        position: "absolute",
        top: positions?.top,
        left: positions?.left,
        bottom: positions?.bottom,
        right: positions?.right,
        display: "flex",
        flexDirection: "column",
        alignItems: positions?.horizontal || "center", // Ajustar posición horizontal
        justifyContent: positions?.vertical || "center", // Ajustar posición vertical
      }}
    >
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          position: "relative",
          borderRadius: "50%",
          padding: size,
          backgroundColor: bgColor,
          border: borderColor,
          transition: "transform 0.3s, box-shadow 0.3s, border-radius 0.5s", // Efectos de hover
          "&:hover": {
            transform: "scale(1.1)",
            borderRadius:  "15px",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon}

        {/* Aquí está la animación de la etiqueta */}
        {isHovered && label && (
          <Typography
            sx={{
              opacity: isHovered ? 1 : 0, // Control de opacidad
              fontSize: "0.875rem", // Tamaño de fuente ajustado
              transformOrigin: "center", // Centro de escala
            }}
          >
            {label}
          </Typography>
        )}
      </Button>
    </Box>
  );
};
