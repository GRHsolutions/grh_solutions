import React from "react";
import { useNews } from "../../../../hooks/news";
import { Alert, Container, Typography } from "@mui/material";
import NewItem from "./newItem";

const RenderNews: React.FC = () => {
  const { news } = useNews();

  return (
    <Container
      sx={{
        paddingTop: "15px",
        gap: "13px",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      {news.length === 0 ? (
        <Alert
          severity="warning"
          sx={{
            width: "100%",
          }}
        >
          <Typography>
            No hay comunicados actualmente
          </Typography>
        </Alert>
      ) : (
        news.map((item, index) => (
          <NewItem 
            item={item}
            onClick={(item)=>{
              console.log(item)
            }}
            key={`${index}`}
          />
        ))
      )}
    </Container>
  );
};

export default RenderNews;
