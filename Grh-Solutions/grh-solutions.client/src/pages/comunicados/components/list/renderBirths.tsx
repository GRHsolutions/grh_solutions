import React from "react";
import { Birthday } from "../../../../domain/models/news/news.entities";
import { useNews } from "../../../../hooks/news";
import {
  Alert,
  Avatar,
  Box,
  Container,
  Grid2,
  Typography,
  useTheme,
} from "@mui/material";
import { useNewsSecurity } from "../../../../contexts/news.security.provider";

interface RenderBirthsProps {}

const RenderBirths: React.FC<RenderBirthsProps> = ({}: RenderBirthsProps) => {
  const { birthdays } = useNews();

  const { hasPermission } = useNewsSecurity();

  const theme = useTheme();

  return (
    <Container
      sx={{
        paddingTop: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        overflowY: "auto",
      }}
    >
      {hasPermission("GET", "/api/news/births") ? (
        birthdays.length <= 0 ? (
          <Alert
            severity="info"
            sx={{
              width: "auto",
            }}
          >
            <Typography>No hay cumpleaños hoy</Typography>
          </Alert>
        ) : (
          birthdays.map((birthday: Birthday) => (
            <Grid2
              container
              display="flex"
              key={birthday._id}
              spacing={3}
              alignItems={"center"}
              padding={"5px"}
              sx={{
                "&:hover": {
                  backgroundColor: `${theme.palette.primary.hover}`,
                },
              }}
            >
              <Grid2 size={3}>
                <Box
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: "42px",
                    height: "42px",
                  }}
                >
                  <Avatar
                    src={birthday.photo}
                    alt={birthday.name + birthday._id}
                  />
                </Box>
              </Grid2>
              <Grid2 size={9}>
                <Typography variant="body1">
                  {birthday.name + birthday.lastname}
                </Typography>
                <Typography variant="body1">{birthday.email}</Typography>
              </Grid2>
            </Grid2>
          ))
        )
      ) : (
        <Alert
          severity="error"
          sx={{
            width: "auto",
          }}
        >
          <Typography>No tienes permiso para esta funcionalidad</Typography>
        </Alert>
      )}
    </Container>
  );
};

export default RenderBirths;
