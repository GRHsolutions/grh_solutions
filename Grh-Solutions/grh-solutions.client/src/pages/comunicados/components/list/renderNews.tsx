import React from "react";
import { useNews } from "../../../../hooks/news";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import NewItem from "./newItem";

const RenderNews: React.FC = () => {
  const { news, selectItem, comments, hasMore, fechMore, loading } = useNews();

  const handleSelect = (id: string) => {
    selectItem(id);
  };

  return (
    <Box
      sx={{
        gap: "13px",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        overflowX: "hidden",
        padding: 1,
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {news.length === 0 ? (
        <Alert
          severity="warning"
          sx={{
            width: "auto",
          }}
        >
          <Typography>No hay comunicados actualmente</Typography>
        </Alert>
      ) : (
        <Box>
          {news.map((item) => (
            <NewItem
              key={item._id}
              item={item}
              onClick={handleSelect}
              comments={comments}
            />
          ))}
        </Box>
      )}
      {hasMore && (
        <Box
          width={"auto"}
          border={"1px solid red"}
          display={"flex"}
          justifyContent={"center"}
          p={2}
        >
          {loading ? (
            <Button onClick={fechMore} variant="contained">
              Bring More
            </Button>
          ) : (
            <CircularProgress color="info"/>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RenderNews;
