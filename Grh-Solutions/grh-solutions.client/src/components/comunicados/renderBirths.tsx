import React from "react";
import { Birthday } from "../../domain/models/news/news.entities";
import { useNews } from "../../hooks/news";
import { Box, Container, Grid2, Typography } from "@mui/material";

interface RenderBirthsProps {}

const RenderBirths: React.FC<RenderBirthsProps> = ({}: RenderBirthsProps) => {
  const { birthdays } = useNews();

  return (
    <Container
      sx={{
        paddingTop: "15px",
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflowY: 'auto'
      }}
    >
      {birthdays.map((birthday: Birthday) => (
        <Grid2 
          container 
          display="flex" 
          key={birthday.id} 
          spacing={7}
          alignItems={"center"}
          border={'1px solid black'}
          padding={'3px'}
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
              <img
                src={birthday.photo}
                alt={birthday.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid2>
          <Grid2 size={9}>
            <Typography variant="body1">{birthday.name}</Typography>
            <Typography variant="body1">
              {birthday.date.format("DD/MM/YYYY")}
            </Typography>
          </Grid2>
        </Grid2>
      ))}
    </Container>
  );
};

export default RenderBirths;
