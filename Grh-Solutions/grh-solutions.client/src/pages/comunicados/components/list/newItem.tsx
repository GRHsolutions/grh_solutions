import React from "react";
import { News } from "../../../../domain/models/news/news.entities";
import { Avatar, Box } from "@mui/material";
import formatearFecha from "../../../../utils/formatearFecha";

interface NewItemProps {
  item: News;
  onClick: (item: News) => void;
  key: string;
}

const NewItem: React.FC<NewItemProps> = ({
  item,
  onClick,
  key
}: NewItemProps) => {
  return (
    <Box
      key={key}
      onClick={()=>{
        onClick(item)
      }}
    >
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <Avatar>
          p
        </Avatar>
        <Box
          sx={{
            display: 'flew',
            flexDirection: 'column'
          }}
        >
          <label>{item.madeBy}</label>
          <label>{formatearFecha(item.date)} </label>
        </Box>
      </Box>
    </Box>
  );
};

export default NewItem;
