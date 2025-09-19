import {
  Box,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNews } from "../../../../hooks/news";
import OutboxIcon from "@mui/icons-material/Outbox";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { News } from "../../../../domain/models/news/news.entities";
import { TabsForm } from "./components/tabsForm";

const modalStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

export const CreateEditNew = () => {
  const { 
    current, 
    noCurrnt,
  } = useNews();
  
  const theme = useTheme();
  const [initial, setInitial] = React.useState<News | null>(null);
  const editting = current.action == "edit";

  const handleClose = () => {
    noCurrnt();
  };

  React.useEffect(() => {
    if (current.action === "create" || current.action === "edit") {
      setInitial(current.item);
    }
  }, [current.item]);

  return (
    <Modal
      open={current.action === "create" || current.action === "edit"}
      onClose={handleClose}
    >
      <Box
        sx={{
          ...modalStyle,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${(theme.palette.primary.hover, 0.1)}`,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <OutboxIcon
              fontSize="large"
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            />
            <Typography variant="h6" fontWeight={"bold"}>
              Crear nuevo comunicado
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TabsForm initialValue={initial} edit={editting} />
      </Box>
    </Modal>
  );
};
