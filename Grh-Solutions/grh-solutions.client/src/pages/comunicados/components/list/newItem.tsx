import React from "react";
import { Commentary, News } from "../../../../domain/models/news/news.entities";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import formatearFecha from "../../../../utils/formatearFecha";
import CommentIcon from "@mui/icons-material/Comment";
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import GrhButton from "../../../../generics/grh-generics/button";
import ImageGrid from "../../../../components/comunicados/gridImages";
import GrhBasicMenu from "../../../../generics/grh-generics/menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNews } from "../../../../hooks/news";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNewsSecurity } from "../../../../contexts/news.security.provider";

interface NewItemProps {
  item: News;
  comments: Commentary[];
  onClick: (item: string) => void;
  key: string;
}

const NewItem: React.FC<NewItemProps> = ({ 
  item, 
  onClick, 
  key,
}: NewItemProps) => {
  const theme = useTheme();
  const {
    selectItemToUpdate,
    selectItemToDelete
  } = useNews();
  const {
  hasPermission
} = useNewsSecurity();

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
      onClick={() => onClick(item._id)}
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
      <Box 
        sx={{ 
          padding: '16px' 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <Box
            display={'flex'}
          >
            <Avatar sx={{ marginRight: '8px' }}>
              {""}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.madeBy.email || ""}
              </Typography>
              <Typography variant="caption" color="textSecondary" mt={'-6px'}>
                {formatearFecha(item.createdAt)|| ""}
              </Typography>
            </Box>
          </Box>
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <GrhBasicMenu 
              icon={<MoreVertIcon />}
              items={[
                {
                  label: "Editar",
                  onClick: () => {
                    selectItemToUpdate(item._id);
                  },
                  icon: <EditIcon/>,
                  visible: hasPermission("PUT", "/api/news/")
                },{
                  label: "Eliminar",
                  onClick: () => {
                    selectItemToDelete(item._id);
                  },
                  icon: <DeleteIcon />,
                  visible: hasPermission("DELETE", "/api/news/")
                }
              ]}
            />
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
            {/* <GrhButton 
              startIcon={<ThumbUpOffAltIcon />}
              label={item.numberLikes.toString()}
              id={"like"}
            /> 
            <GrhButton 
              startIcon={<ThumbDownOffAltIcon />}
              label={item.numberDisLikes.toString()}
              id={"dislike"}
            /> */}
            <GrhButton 
              startIcon={<CommentIcon />}
              label={`${item.comms}`}
              id={"comment"}
            />
        </Box>
      </Box>
    </Box>
  );
};

export default NewItem;
