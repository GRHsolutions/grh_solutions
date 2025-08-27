import React from "react";
import { useNews } from "../../../../hooks/news";
import { Alert, Box, Typography } from "@mui/material";
import NewItem from "./newItem";

const RenderNews: React.FC = () => {
  const { news, selectItem, comments } = useNews();

  const handleSelect = (id: number) => {
    selectItem(id);
  }

  return (
    <Box
      sx={{
        gap: "13px",
        display: 'flex',
        flexDirection: 'column',
        overflowY: "hidden",
        overflowX: "hidden",
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
              comments={comments}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RenderNews;
