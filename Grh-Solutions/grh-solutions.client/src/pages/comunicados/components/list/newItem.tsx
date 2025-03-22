import React from "react";
import { Commentary, News } from "../../../../domain/models/news/news.entities";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import formatearFecha from "../../../../utils/formatearFecha";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import GrhButton from "../../../../generics/grh-generics/button";
import ImageGrid from "../../../../components/comunicados/gridImages";

interface NewItemProps {
  item: News;
  comments: Commentary[];
  onClick: (item: News) => void;
  key: string;
}

const NewItem: React.FC<NewItemProps> = ({ 
  item, 
  onClick, 
  key,
  comments
}: NewItemProps) => {
  const theme = useTheme();
  const Description = ({ description }: { description: string | undefined }) => {
    const maxLength = 100;
    const truncatedDescription =
      description && description.length > maxLength
        ? (
          <>
            {description.substring(0, maxLength)} 
            <Typography 
              component="span"
              sx={{ 
                cursor: 'pointer',
                color: theme.palette.primary.link
              }}
            >
              …ver más
            </Typography>
          </>
        )
        : description;
    return <>{truncatedDescription}</>;
  };

  return (
    <Box
      key={key}
      onClick={() => onClick(item)}
      sx={{
        width: '100%',
        marginBottom: '16px',
        cursor: 'pointer',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        backgroundColor: 'background.paper',
      }}
    >      
      <Box sx={{ 
          padding: '16px' 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <Avatar sx={{ marginRight: '8px' }}>
            {item.madeBy[0]}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.madeBy}
            </Typography>
            <Typography variant="caption" color="textSecondary" mt={'-6px'}>
              {formatearFecha(item.date)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {item.title}
        </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {item && <Description description={item.description} />}
          </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px'
          }}
        >
        {(item.type === "publication-with-images" && item.images.length > 0)  && (
          <ImageGrid 
            images={item.images}
          />
        )}
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: '5px',
            alignItems: 'center',
            position: 'relative',
            marginTop: '5px'
          }}
        >
            <GrhButton 
              startIcon={<ThumbUpOffAltIcon />}
              label={item.numberLikes.toString()}
              id={"like"}
            />
            <GrhButton 
              startIcon={<ThumbDownOffAltIcon />}
              label={item.numberDisLikes.toString()}
              id={"dislike"}
            />
            <GrhButton 
              startIcon={<CommentIcon />}
              label={comments.length.toString()}
              id={"comment"}
            />
        </Box>
      </Box>
    </Box>
  );
};

export default NewItem;
