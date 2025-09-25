import React from "react";
import { useNews } from "../../../../hooks/news";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
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
      {loading.list == true ? (
        <CircularProgress color="info" />
      ) : news.length === 0 ? (
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
        <Box width={"auto"} display={"flex"} justifyContent={"center"} p={2}>
          <Button onClick={fechMore} variant="contained">
            {loading.fetch_more ? (
              <CircularProgress color="info" />
            ) : (
              "Bring More"
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RenderNews;
