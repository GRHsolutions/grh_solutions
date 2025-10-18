import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid2,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import pdf from "./../../../assets/pdfs/19-19-128-8-1038-71-A_S.pdf";
import { useContratos } from "../../../hooks/contratos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BasicMenu from "../../../generics/grh-generics/menu";
import formatearFecha from "../../../utils/formatearFecha";
import React from "react";
import SimpleDialog from "../../../generics/dialogGeneric/dialogo";

interface ViewContratoProps {
  handleClose: () => void;
}

const modalStyle = {
  position: "absolute",
  top: 0,
  right: "12%",
  width: "76%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

type option = 'aprobar' | 'rechazar' | 'firmar' | 'none';

export const ViewContrato = ({ handleClose }: ViewContratoProps) => {
  const theme = useTheme();
  const { current } = useContratos();
  const [use, setUse] = React.useState<option>('none');
  
  const handleConfirm = () => {
    switch(use){
      case 'aprobar': {
        console.log(use) 
        setUse('none');
        break;
      }
      case 'rechazar':{
        console.log(use)
        setUse('none');
        break;
      }
      case 'firmar': {
        console.log(use);
        setUse('none');
        break;
      }
      case 'none': {
        setUse('none');
        throw("Case cannot be handled" + use);
      }
      default: {
        throw("default cannot be handled" + use);
      }
    }
  }
 
  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.primary.boxShadow}`,
            mb: "15px",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <VisibilityIcon
              fontSize="large"
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            />
            <Box>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                color={theme.palette.primary.contrastText}
              >
                {current.item?.title}
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight={"15px"}
                marginTop={"-15px"}
                color={theme.palette.primary.contrastText}
              >
                Vea la informacion general del contrato
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 size={8} height={"87vh"}>
            <iframe src={pdf} width={"100%"} height={"100%"}></iframe>
          </Grid2>
          <Grid2 size={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
                action={
                  <BasicMenu
                    icon={<MoreVertIcon />}
                    items={[
                      {
                        label: "aprobar",
                        onClick: () => setUse("aprobar"),
                      },
                      {
                        label: "rechazar",
                        onClick: () => setUse("rechazar"),
                      },
                      {
                        label: "firmar",
                        onClick: () => setUse("firmar"),
                      },
                    ]}
                  />
                }
                title={
                  <Typography
                    color={theme.palette.primary.contrastText}
                  >
                    {`Tipo: ${current.item?.contractType.toUpperCase()}`}
                  </Typography>
                }
                subheader={formatearFecha(current.item?.createdAt, true, false)}
              />
              <CardContent
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
              <Collapse timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                  <Typography sx={{ marginBottom: 2 }}>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }}>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }}>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid2>
        </Grid2>
        <SimpleDialog
          open={use != 'none'}
          onClose={() => {
            setUse('none');
          }} 
          onConfirm={handleConfirm}
        />
      </Box>
    </Modal>
  );
};
