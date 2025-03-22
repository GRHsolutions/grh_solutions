import { Avatar, Backdrop, Box, Divider, Grid2, Typography, useTheme, IconButton } from "@mui/material";
import { useNews } from "../../../../hooks/news";
import formatearFecha from "../../../../utils/formatearFecha";
import TextField from "../../../../generics/grh-generics/textField";
import React, { useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

interface ViewMailProps {}

export const ViewMail = ({}: ViewMailProps) => {
  const { current, setCurrent, newComment } = useNews();
  const theme = useTheme();
  const newCommentRef = React.useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    setCurrent({
      item: null,
      action: "none",
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const Description = ({ description }: { description: string | undefined }) => {
    const maxLength = 230;
    const truncatedDescription =
      description && description.length > maxLength
        ? description.substring(0, maxLength) + "…ver más"
        : description;
    return <>{truncatedDescription}</>;
  };

  return (
    <Backdrop
      open={current.item !== null}
      onClick={handleClose}
      sx={{
        backgroundColor: theme.palette.primary.light,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Grid2
        container
        width={"100%"}
        display={"flex"}
        spacing={5}
        sx={{ height: "100%" }}
      >
        {/* Grid de la izquierda para mostrar imágenes */}
        <Grid2
          size={9}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Asegura que ocupe todo el alto disponible
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.palette.primary.boxShadow,
            overflow: "hidden", // Oculta el contenido que se salga del grid
            padding: 2,
            borderRight: `1px solid ${theme.palette.divider}`, // Añadimos un borde para separar los dos grids
          }}
          onClick={(e) => e.stopPropagation()} // Stop click event propagation
        >
          {/* Aquí irán las imágenes */}
          <Box
            component="img"
            src="https://via.placeholder.com/300" // Imagen de ejemplo
            alt="Imagen del mail"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Grid2>

        {/* Grid de la derecha para mostrar la información del mail */}
        <Grid2
          size={3}
          sx={{
            height: "100vh",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.palette.primary.boxShadow,
            padding: 2,
            overflowY: "auto", // Permite el desplazamiento si el contenido es largo
          }}
          onClick={(e) => e.stopPropagation()} // Stop click event propagation
        >
          <Box position={"absolute"} right={0} top={0} p={1}>
            <IconButton onClick={handleClose} sx={{ color: theme.palette.primary.contrastText }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Aquí va la información del mail */}
          <Box display={"flex"} gap={1.3} mb={2}>
            <Avatar>PS</Avatar>
            <Box>
              <Typography>{current.item?.madeBy}</Typography>
              <Typography mt={"-5px"}>{formatearFecha(current.item?.date)}</Typography>
            </Box>
          </Box>
          <Box
            height={"100%"}
            maxHeight={"13rem"}
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px", // Ancho de la barra
              },
              "&::-webkit-scrollbar-track": {
                background: `${theme.palette.primary.light}`, // Color de fondo
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888", // Color del "thumb" (parte desplazable)
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555", // Color cuando se pasa el mouse
              },
            }}
          >
            <Typography 
              variant="body1"
            >
              {current.item && current.item.description}
            </Typography>
          </Box>
          <Divider 
            variant="middle"
            sx={{
              backgroundColor: theme.palette.primary.divider,
            }}
          />
          <Box
            height={"calc(100%  - 18rem)"}
            mt={2}
            sx={{
              overflowY: "hidden",
              "&::-webkit-scrollbar": {
                width: "8px", // Ancho de la barra
              },
              "&::-webkit-scrollbar-track": {
                background: `${theme.palette.primary.light}`, // Color de fondo
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888", // Color del "thumb" (parte desplazable)
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555", // Color cuando se pasa el mouse
              },
            }}
          >
            <Box
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                if(newCommentRef.current?.value != null && newCommentRef.current?.value != "") {
                  // Add your submit logic here
                }
                // Add your submit logic here
              }}
              p={1}
            >
              <TextField 
                label={"Asunto"}
                ref={newCommentRef}
                placeholder="Nuevo comentario"
                sx={{
                  width: "100%",
                }}
                clickableAdornment={{
                  end: () => {
                    if(newCommentRef.current?.value != null && newCommentRef.current?.value != "") {
                      console.log("enviando jajaj", newCommentRef.current?.value);
                    }
                  }
                }}
                endIcon={<SendIcon />}
              />
            </Box>            
          </Box>
        </Grid2>
      </Grid2>
    </Backdrop>
  );
};
