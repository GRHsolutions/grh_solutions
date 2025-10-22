import React, { useState } from "react";
import { Box, Button, Zoom, Fade, Paper, Tooltip } from "@mui/material";
import type { Positions } from "../floatingButton/floatingButton";

export interface FloatingOptionsProps {
  options: {
    icon: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    tooltip?: string | null;
    tooltipPlacement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  }[];
  position: Positions;
  icon: React.ReactNode;
}

export const FloatingOptions = ({
  options,
  position,
  icon,
}: FloatingOptionsProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <Box
      sx={{
        position: "absolute",
        top: position?.top,
        bottom: position?.bottom,
        left: position?.left,
        right: position?.right,
        display: "flex",
        flexDirection: "column",
        alignItems:
          position?.horizontal === "center"
            ? "center"
            : position?.horizontal === "right"
            ? "flex-end"
            : "flex-start",
        justifyContent:
          position?.vertical === "center"
            ? "center"
            : position?.vertical === "bottom"
            ? "flex-end"
            : "flex-start",
        zIndex: 150,
      }}
    >
      {/* Contenedor de opciones */}
      <Fade in={open}>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            mb: 2,
            borderRadius: 3,
            backgroundColor: "background.paper",
            boxShadow: 6,
          }}
        >
          {options.map((opt, index) => {
            const buttonProps = {
              onClick: () => {
                opt.onClick();
                handleToggle();
              },
              disabled: opt.disabled,
              sx: {
                borderRadius: "50%",
                minWidth: "45px",
                minHeight: "45px",
                backgroundColor: "primary.main",
                color: "white",
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: "primary.dark",
                },
              },
            };
            return (
              <Zoom
                key={index}
                in={open}
                style={{ transitionDelay: open ? `${index * 80}ms` : "0ms" }}
              >
                {opt.tooltip != null ? (
                  <Tooltip title={opt.tooltip} placement={opt.tooltipPlacement}>
                    <Button {...buttonProps}>{opt.icon}</Button>
                  </Tooltip>
                ) : (
                  <Button {...buttonProps}>{opt.icon}</Button>
                )}
              </Zoom>
            );
          })}
        </Paper>
      </Fade>

      {/* Botón principal */}
      <Button
        onClick={handleToggle}
        sx={{
          borderRadius: "50%",
          minWidth: "55px",
          minHeight: "55px",
          backgroundColor: "secondary.main",
          color: "black",
          boxShadow: 5,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(90deg)",
            backgroundColor: "secondary.dark",
          },
        }}
      >
        {icon}
      </Button>
    </Box>
  );
};
