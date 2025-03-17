import React from "react";
import { News } from "../../../../domain/models/news/news.entities";
import { Avatar, Box, Typography, IconButton, Grid2 } from "@mui/material";
import formatearFecha from "../../../../utils/formatearFecha";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";

interface NewItemProps {
  item: News;
  onClick: (item: News) => void;
  key: string;
}

const NewItem: React.FC<NewItemProps> = ({ item, onClick, key }: NewItemProps) => {
  return (
    <Box
      key={key}
      onClick={() => onClick(item)}
      sx={{
        width: '100%', // Ocupa el 100% del contenedor padre
        marginBottom: '16px',
        cursor: 'pointer',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          //transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        backgroundColor: 'background.paper', // Fondo similar al de Card
      }}
    >
      {/* Imagen de la publicación */}
      {item.images.length > 0 && (
        <Box
          component="img"
          src={item.images[0]} // Mostrar la primera imagen
          alt={item.title}
          sx={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        />
      )}

      {/* Contenido de la publicación */}
      <Box sx={{ padding: '16px' }}>
        {/* Encabezado con avatar, nombre y fecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <Avatar sx={{ marginRight: '8px' }}>
            {item.madeBy[0]} {/* Mostrar la primera letra del nombre del autor */}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.madeBy}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {formatearFecha(item.date)}
            </Typography>
          </Box>
        </Box>

        {/* Título y descripción de la publicación */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {item.description}
        </Typography>

        {/* Acciones (like, dislike, comentar, compartir) */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <Box>
            <IconButton aria-label="like">
              <FavoriteIcon />
              <Typography variant="caption" sx={{ marginLeft: '4px' }}>
                {item.numberLikes}
              </Typography>
            </IconButton>
            <IconButton aria-label="dislike">
              <ThumbDownIcon />
              <Typography variant="caption" sx={{ marginLeft: '4px' }}>
                {item.numberDisLikes}
              </Typography>
            </IconButton>
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewItem;