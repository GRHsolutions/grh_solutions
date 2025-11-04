import * as React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Groups3Icon from "@mui/icons-material/Groups3";
import LogoutIcon from "@mui/icons-material/Logout";
import dayjs, { Dayjs } from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";
import GenericDatePicker from "../../../../generics/grh-generics/inputDatePicker";
import GrhButton from "../../../../generics/grh-generics/button";
import { getGroups } from "../../../../domain/services/grupos/grupos.service";
import { createSchedule, getScheduleTypes } from "../../../../domain/services/horarios/horarios.service";
import GenericDatePickerHours from "../../../../generics/grh-generics/GenericDatePickerHours";
const validationSchema = Yup.object({
  scheduleType: Yup.string().required("Selecciona un tipo de horario"),
  group: Yup.string().required("Selecciona un grupo"),
  startDate: Yup.date().required("Selecciona una fecha inicial"),
  endDate: Yup.date()
    .required("Selecciona una fecha final")
    .min(Yup.ref("startDate"), "La fecha final debe ser posterior a la inicial"),
});

const initialValues = {
  scheduleType: "",
  group: "",
  startDate: dayjs().toDate(),
  endDate: dayjs().toDate(),
};

const style = {
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

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  reload?: boolean;
}

export default function ModalHorario({
  open,
  handleClose,
  setReload,
  token,
  reload,
}: IModalOptionsProps) {
  const theme = useTheme();
  const [groups, setGroups] = React.useState<{ id2: string; name2: string }[]>([]);
  const [scheduleTypes, setScheduleTypes] = React.useState<
    { id: string; name: string; startTime: string; endTime: string }[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, scheduleRes] = await Promise.all([
          getGroups(token),
          getScheduleTypes(token),
        ]);

        const groupsData = groupsRes?.data || [];
        setGroups(
          groupsData.map((g: any) => ({
            id2: g._id,
            name2: g.name,
          }))
        );

        const scheduleData = scheduleRes?.data || [];
        setScheduleTypes(
          scheduleData.map((s: any) => ({
            id: s._id,
            name: s.name,
            startTime: s.startTime,
            endTime: s.endTime,
          }))
        );
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [token, reload]);

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      await createSchedule(
        {
          startDate: values.startDate,
          endDate: values.endDate,
          grupo: values.group,
          scheduleType: values.scheduleType,
        },
        token
      );

      setReload?.((prev) => !prev);
      handleClose();
      resetForm();
    } catch (error) {
      console.error("Error al crear el horario:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Groups3Icon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={theme.palette.text.primary}
              >
                Crea un horario
              </Typography>
              <Typography variant="body2" color={theme.palette.text.primary}>
                Asigna un horario a un grupo existente
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, touched, errors, isSubmitting }) => (
            <Form>
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <GrhCustomSelect
                  label="Del área"
                  name="scheduleType"
                  options={scheduleTypes.map((s) => ({
                    value: s.id,
                    name: s.name,
                  }))}
                  value={values.scheduleType}
                  onChange={(e) =>
                    setFieldValue("scheduleType", e.target.value)
                  }
                  error={touched.scheduleType && Boolean(errors.scheduleType)}
                  fullWidth
                />

                <GrhCustomSelect
                  label="El grupo"
                  name="group"
                  options={groups.map((g) => ({
                    value: g.id2,
                    name: g.name2,
                  }))}
                  value={values.group}
                  onChange={(e) => setFieldValue("group", e.target.value)}
                  error={touched.group && Boolean(errors.group)}
                  fullWidth
                />
              </Box>
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <GenericDatePickerHours
                  name="startDate"
                  label="Fecha y hora inicial"
                  type="datetime" 
                  value={dayjs(values.startDate)}
                  onChange={(newValue) => setFieldValue("startDate", newValue?.toDate())}
                />
                <GenericDatePickerHours
                  name="endDate"
                  label="Fecha y hora final"
                  type="datetime"
                  value={dayjs(values.endDate)}
                  onChange={(newValue) => setFieldValue("endDate", newValue?.toDate())}
                />
              </Box>


              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  height: "64vh",
                  p: 2,
                }}
              >
                <GrhButton
                  type="submit"
                  startIcon={<LogoutIcon />}
                  label={isSubmitting ? "Publicando..." : "Publicar horario"}
                  variant="principal"
                  sx={{ width: "30%" }}
                  id="horario"
                  disabled={isSubmitting}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
