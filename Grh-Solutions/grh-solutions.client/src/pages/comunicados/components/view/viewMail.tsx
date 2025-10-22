import {
  Avatar,
  Backdrop,
  Box,
  Divider,
  Grid2,
  Typography,
  useTheme,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNews } from "../../../../hooks/news";
import formatearFecha from "../../../../utils/formatearFecha";
import TextField from "../../../../generics/grh-generics/textField";
import React, { useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { ImageCarousel } from "../../../../generics/grh-generics/imageCarousel";

interface ViewMailProps {}

export const ViewMail = ({}: ViewMailProps) => {
  const {
    current,
    noCurrnt,
    newComment,
    loading,
    hasMoreC,
    fechMoreComments,
    comments,
  } = useNews();
  const theme = useTheme();
  const newCommentRef = React.useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    noCurrnt();
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

  // const Description = ({ description }: { description: string | undefined }) => {
  //   const maxLength = 230;
  //   const truncatedDescription =
  //     description && description.length > maxLength
  //       ? description.substring(0, maxLength) + "…ver más"
  //       : description;
  //   return <>{truncatedDescription}</>;
  // };

  return (
    <Backdrop
      open={current.item !== null && current.action == "view"}
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
        justifyContent={
          current.item?.type == "publication-with-images" ? undefined : "center"
        }
        alignItems={
          current.item?.type == "publication-with-images" ? undefined : "center"
        }
        spacing={5}
        sx={{
          height: "100%",
        }}
      >
        {/* Grid de la izquierda para mostrar imágenes */}
        {current.item?.type == "publication-with-images" && (
          <Grid2
            size={9}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Asegura que ocupe todo el alto disponible
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              //boxShadow: theme.palette.primary.boxShadow,
              overflow: "hidden", // Oculta el contenido que se salga del grid
              //padding: 2,
              borderRight: `1px solid ${theme.palette.divider}`, // Añadimos un borde para separar los dos grids
            }}
            onClick={(e) => e.stopPropagation()} // Stop click event propagation
          >
            {/* Aquí irán las imágenes */}
            {current.item && (
              <ImageCarousel height={"100%"} images={current.item.images} />
            )}
          </Grid2>
        )}

        {/* Grid de la derecha para mostrar la información del mail */}
        <Grid2
          size={current.item?.type == "publication-with-images" ? 3 : 12}
          sx={{
            height:
              current.item?.type == "publication-with-images"
                ? "100vh"
                : "80vh",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.palette.primary.boxShadow,
            width:
              current.item?.type == "publication-with-images"
                ? undefined
                : "50%",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            overflowY: "hidden", // Permite el desplazamiento si el contenido es largo
          }}
          onClick={(e) => e.stopPropagation()} // Stop click event propagation
        >
          <Box position={"absolute"} right={0} top={0} p={1}>
            <IconButton
              onClick={handleClose}
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Aquí va la información del mail */}
          <Box display={"flex"} gap={1.3} mb={2}>
            <Avatar>{""}</Avatar>
            <Box>
              <Typography>{current.item?.madeBy.email}</Typography>
              <Typography mt={"-5px"}>
                {formatearFecha(current.item?.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Box
            height={"100%"}
            maxHeight={"11rem"}
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
            <Typography variant="body1">
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
            flex={1}
            display="flex"
            flexDirection="column"
            mt={2}
            sx={{
              minHeight: 0, // 👈 Importante: permite que los hijos flexibles usen scroll
            }}
          >
            <Box
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  newCommentRef.current?.value != null &&
                  newCommentRef.current?.value != ""
                ) {
                  console.log("valor: ", newCommentRef.current.value);
                }
              }}
              p={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden", // evita que sobresalga el contenido
              }}
            >
              <TextField
                label={"Nuevo comentario"}
                ref={newCommentRef}
                multirows
                rows={3}
                lenght={400}
                disabled={loading.fetch_comments}
                sx={{
                  width: "100%",
                }}
                clickableAdornment={{
                  end: () => {
                    if (loading.fetch_comments) {
                      return;
                    }
                    const value = newCommentRef.current?.value?.trim() || "";
                    if (value !== "") {
                      newComment(value);
                      if (!newCommentRef.current) {
                        return;
                      }
                      newCommentRef.current.value = ""; // ✅ Limpia el campo
                    }
                  },
                }}
                endIcon={<SendIcon />}
              />
              <Box
                flex={1}
                mt={2}
                display="flex"
                flexDirection="column"
                overflow="hidden" // evita que el scroll afecte el título
              >
                <Typography
                  mb={1.5}
                  display="flex"
                  justifyContent="center"
                  sx={{
                    flexShrink: 0,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    pb: 1,
                  }}
                >
                  Comentarios
                </Typography>
                <Box
                  flex={1}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={3}
                  sx={{
                    overflowY: "auto",
                    pr: 1,
                    "&::-webkit-scrollbar": { width: "8px" },
                    "&::-webkit-scrollbar-track": {
                      background: `${theme.palette.primary.light}`,
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#888",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
                  }}
                >
                  {loading.fetch_comments ? (
                    <Box display={"flex"} justifyContent={"center"}>
                      <CircularProgress color="error" />
                    </Box>
                  ) : comments.length == 0 ? (
                    <Typography display={"flex"} justifyContent={"center"}>No hay comentarios</Typography>
                  ) : (
                    <>
                      {comments.map((item) => {
                        return (
                          <Box
                            borderLeft={"2px solid red"}
                            sx={{
                              backgroundColor: theme.palette.background.default,
                              p: 2,
                            }}
                          >
                            <Box display={"flex"} gap={2} ml={2}>
                              <Avatar>{""}</Avatar>
                              <Box>
                                <Typography>{item?.madeBy.email}</Typography>
                                <Typography mt={"-5px"}>
                                  {formatearFecha(item?.createdAt)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box ml={2}>
                              <Typography p={2}>{item.comment}</Typography>
                            </Box>
                          </Box>
                        );
                      })}
                      {hasMoreC && (
                        <Box
                          width={"auto"}
                          display={"flex"}
                          justifyContent={"center"}
                          p={2}
                        >
                          <Button
                            onClick={fechMoreComments}
                            variant="contained"
                          >
                            {"Bring More"}
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Backdrop>
  );
};
