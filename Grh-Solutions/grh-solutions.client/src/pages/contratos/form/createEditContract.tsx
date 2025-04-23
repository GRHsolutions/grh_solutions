import {
  Box,
  Grid2,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Contracts } from "../../../domain/models/contratos/contratos.entities";
import { Form, Formik } from "formik";
import GrhButton from "../../../generics/grh-generics/button";
import AddIcon from "@mui/icons-material/Add";
import GrhTextField from "../../../generics/grh-generics/textField";
import CloseIcon from "@mui/icons-material/Close";
import GrhCustomSelect from "../../../generics/grh-generics/inputSelect";

interface CreateEditContractProps {
  contrato: Contracts | undefined;
  onSubmit: () => void;
  open: boolean;
  onClose: () => void;
}

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

export const CreateEditContract = ({
  contrato,
  onSubmit,
  open,
  onClose,
}: CreateEditContractProps) => {
  const types = [
    {
      value: '',
      name: 'Laboral',
    }
  ]
  const theme = useTheme();


  const SubmitCont = () => {
    console.log(contrato);
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose}>
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
            mb: '15px'
          }}
        >
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <AddIcon
              fontSize="large"
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            />
            <Typography variant="h6" fontWeight={"bold"}>
              Crear nuevo contrato
            </Typography>
          </Stack>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Formik
          initialValues={
            {
              ...contrato,
            } as Contracts
          }
          onSubmit={SubmitCont}
        >
          {({ values, isValid, handleChange }) => {
            return (
              <Form>
                <Grid2 container spacing={2}>
                  <Grid2 size={12}>
                    <GrhTextField
                      label="Titulo del contrato"
                      onChange={handleChange}
                      value={values.title}
                      variant="standard"
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <GrhCustomSelect
                      label="Titulo del contrato"
                      onChange={handleChange}
                      value={values.title}
                      variant="standard" 
                      name
                      options={types}                    
                    />
                  </Grid2>
                  <Grid2
                    size={12}
                  >
                    <GrhTextField
                      label="Descripcion del contrato"
                      onChange={handleChange}
                      value={values.html}
                      variant="standard"
                      multirows
                      rows={5}
                      fullWidth
                    />
                  </Grid2>

                  <Grid2 size={12} display={"flex"} justifyContent={"end"}>
                    <GrhButton
                      type="submit"
                      variant="principal"
                      startIcon={<AddIcon />}
                      label="Subir"
                      sx={{
                        padding: "5rem",
                        width: "5.5rem",
                      }}
                      disabled={!isValid}
                    />
                  </Grid2>
                </Grid2>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};
