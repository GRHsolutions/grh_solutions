import React from "react";
import { useNews } from "../../../../hooks/news";
import { Alert, Box, Typography } from "@mui/material";
import NewItem from "./newItem";
import { News } from "../../../../domain/models/news/news.entities";

const RenderNews: React.FC = () => {
  const { news, setCurrent } = useNews();

  const handleSelect = (item: News) => {
    setCurrent({
      item: item,
      action: 'view'
    })
  }

  return (
    <Box
      sx={{
        paddingTop: "15px",
        gap: "13px",
        display: 'flex',
        flexDirection: 'column',
        overflowY: "auto",
        overflowX: "hidden",
        padding: 3,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {news.length === 0 ? (
        <Alert
          severity="warning"
          sx={{
            width: "100%"
          }}
        >
          <Typography>
            No hay comunicados actualmente
          </Typography>
        </Alert>
      ) : (
        <Box>
          {news.map((item) => (
            <NewItem 
              key={item.id.toString()} 
              item={item} 
              onClick={handleSelect} 
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RenderNews;
