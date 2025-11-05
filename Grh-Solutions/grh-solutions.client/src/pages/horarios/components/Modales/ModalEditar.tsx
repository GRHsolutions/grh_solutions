import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";
import dayjs from "dayjs";
import GrhButton from "../../../../generics/grh-generics/button";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import { getAreas } from "../../../../domain/services/area/area.service";
import { getGroups } from "../../../../domain/services/grupos/grupos.service";
import GenericDatePickerHours from "../../../../generics/grh-generics/GenericDatePickerHours";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { updateSchedule } from "../../../../domain/services/horarios/horarios.service";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "38%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

const validationSchema = Yup.object({
  area: Yup.string().required("Seleccione un área"),
  group: Yup.string().required("Seleccione un grupo"),
  startDate: Yup.date().required("Seleccione la fecha de inicio"),
  endDate: Yup.date().required("Seleccione la fecha final"),
});

interface EditarDetalleProps {
  handleClose: () => void;
  current?: any | null;
  token: string;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditarDetalle = ({
  handleClose,
  current,
  token,
  setReload,
}: EditarDetalleProps) => {
  const [areasOptions, setAreasOptions] = React.useState<
    { value: string; name: string }[]
  >([]);
  const [groups, setGroups] = React.useState<{ id2: string; name2: string }[]>(
    []
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [areasRes, groupsRes] = await Promise.all([
          getAreas(token),
          getGroups(token),
        ]);

        const areas = areasRes.data || [];
        setAreasOptions(areas.map((a: any) => ({ value: a._id, name: a.name })));

        const groupsData = groupsRes?.data || [];
        setGroups(
          groupsData.map((g: any) => ({
            id2: g._id,
            name2: g.name,
          }))
        );
      } catch (err) {
        console.error("Error cargando áreas o grupos:", err);
      }
    };
    fetchData();
  }, [token]);

  const initialValues = {
    area: current?.group?.area || "",
    group: current?.group?._id || "",
    startDate: current?.start_date
      ? dayjs(current.start_date)
      : dayjs().hour(8).minute(0),
    endDate: current?.end_date
      ? dayjs(current.end_date)
      : dayjs().hour(17).minute(0),
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const payload = {
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        grupo: values.group,
        scheduleType: current?.scheduleType?._id || "",
      };

      await updateSchedule(current?._id, payload, token);

      if (setReload) setReload((prev) => !prev);
      handleClose();
    } catch (err) {
      console.error("Error actualizando horario:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DateRangeIcon />
          <Box>
            <Typography variant="h6" fontWeight={"bold"}>
              Editar Horario
            </Typography>
            <Typography variant="body1">
              Al guardar los cambios, se notificará a los empleados.
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form>
              <Box sx={{ mt: 3, display: "flex", gap: 2, alignItems: "center" }}>
                {/* <GrhCustomSelect
                  label="Área"
                  name="area"
                  options={areasOptions}
                  value={values.area}
                  onChange={(e) => setFieldValue("area", e.target.value)}
                  error={touched.area && Boolean(errors.area)}
                  helperText={touched.area && errors.area}
                  fullWidth
                /> */}

                <GrhCustomSelect
                  label="Grupo"
                  name="group"
                  options={groups.map((item) => ({
                    value: item.id2,
                    name: item.name2,
                  }))}
                  value={values.group}
                  onChange={(e) => setFieldValue("group", e.target.value)}
                  error={touched.group && Boolean(errors.group)}
                  helperText={touched.group && errors.group}
                  fullWidth
                />
              </Box>
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <GenericDatePickerHours
                  name="startDate"
                  label="Fecha y hora inicial"
                   type="datetime" 
                  value={values.startDate}

                  onChange={(newValue) => setFieldValue("startDate", newValue)}
                />
                <GenericDatePickerHours
                  name="endDate"
                   type="datetime" 
                  label="Fecha y hora final"
                  value={values.endDate}
                  onChange={(newValue) => setFieldValue("endDate", newValue)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  height: "58vh",
                  p: 2,
                  gap: 2,
                }}
              >
                <GrhButton
                  onClick={handleClose}
                  startIcon={<ExitToAppIcon />}
                  label="Cancelar"
                  variant="use-default"
                  sx={{ width: "30%" }}
                />
                <GrhButton
                  type="submit"
                  startIcon={<LogoutIcon />}
                  label={isSubmitting ? "Guardando..." : "Editar Horario"}
                  variant="principal"
                  sx={{ width: "30%" }}
                  disabled={isSubmitting}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
