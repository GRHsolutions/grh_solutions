import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  useTheme,
  Switch,
  CircularProgress,
  Grid2,
  Stack,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalCreateRol from "./ModalCreateRol";
import { Rol, UpdateRolDto } from "../../../domain/models/role/role.entities";
import {
  getAllRoles,
  getPermissions,
  getPermissionsPagination,
  getPermsFromRol,
  updateRol,
} from "../../../domain/services/Roles/Roles.service";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import GrhCustomSelect from "../../../generics/grh-generics/inputSelect";
import {
  Permission,
  PermissionsFilter,
} from "../../../domain/models/permission/permission.entities";
import GrhTextField from "../../../generics/grh-generics/textField";
import MUIswitch from "../../../generics/switch/MUIswitch";
import { useNotifications } from "../../../contexts/NotificationContext";

interface IModalRoleProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalRole({ open, handleClose }: IModalRoleProps) {
  const theme = useTheme();
  const [roles, setRoles] = useState<{ value: string; name: string }[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentRol, setCurrentRol] = useState<Rol | undefined>(undefined);
  const [assignedPermissions, setAssignedPermissions] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState<{
    loading_roles: boolean;
    loading_update_rol: boolean;
    loading_permissions: boolean;
  }>({
    loading_roles: false,
    loading_update_rol: false,
    loading_permissions: false,
  });
  const [filter, setFilter] = useState<PermissionsFilter>({
    currentPage: 1,
    rowsPerPage: 10,
    useGetAllNoPage: false,
  });
  const [isActive, setIsActive] = useState(false);
  const {
    addNotification
  } = useNotifications();

  // Fetch de roles
  useEffect(() => {
    setLoading((prev) => ({
      ...prev,
      loading_roles: true,
    }));
    getAllRoles()
      .then((res) => {
        const formatted = res.map((role: { _id: string; name: string }) => ({
          value: role._id,
          name: role.name,
        }));
        setRoles(formatted);
      })
      .catch((e) => console.error(e))
      .finally(() =>
        setLoading((prev) => ({
          ...prev,
          loading_roles: false,
        }))
      );
  }, []);

  // Fetch permisos, paginación y permisos asignados al rol seleccionado
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedRoleId) {
        setPermissions([]);
        setCurrentRol(undefined);
        setAssignedPermissions([]);
        setFilter((prev) => ({
          ...prev,
          currentPage: 1,
          totalPages: 0,
        }));
        return;
      }
      setLoading((prev) => ({
        ...prev,
        loading_permissions: true,
      }));

      try {
        const [permissionsRes, paginationRes, getThisPermissions] =
          await Promise.all([
            getPermissions(filter),
            getPermissionsPagination(filter),
            getPermsFromRol(selectedRoleId),
          ]);

        setPermissions(permissionsRes);

        setCurrentRol(getThisPermissions);

        setFilter((prev) => ({
          ...prev,
          totalPages: paginationRes.totalPages,
        }));
      } catch (error) {
        console.error("❌ Error al obtener permisos", error);
      } finally {
        setLoading((prev) => ({
          ...prev,
          loading_permissions: false,
        }));
      }
    };

    fetchData();
  }, [selectedRoleId, filter.currentPage, filter.rowsPerPage, filter.method, filter.url]);

  useEffect(() => {
    setAssignedPermissions(currentRol ? currentRol.permissions : []);
    setIsActive(currentRol ? currentRol.isActive : false);
  }, [currentRol]);

  // Detectar si hubo cambios
  const hasChanges = () => {
    if (!currentRol) return false;

    const originalPermissions = currentRol.permissions || [];
    const currentPermissions = assignedPermissions || [];
    const originalStatus = currentRol.isActive;

    // Verificar si cambió el estado
    if (originalStatus !== isActive) return true;

    // Verificar si cambió la cantidad de permisos
    if (originalPermissions.length !== currentPermissions.length) return true;

    // Verificar si cambió algún permiso específico
    const permissionsChanged =
      originalPermissions.some((id) => !currentPermissions.includes(id)) ||
      currentPermissions.some((id) => !originalPermissions.includes(id));

    return permissionsChanged;
  };

  const onJustCreated = (obj: Rol) => {
    const newRole = {
      value: obj._id,
      name: obj.name,
    };
    setRoles((prev) => [...prev, newRole]);
  };

  const handlePermissionToggle = (permId: string) => {
    setAssignedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSave = async () => {
    if (!currentRol) return;

    const current = currentRol.permissions || [];
    const assigned = assignedPermissions || [];

    // Permisos que se agregaron (están en assigned pero no en current)
    const addPermissions = assigned.filter((id) => !current.includes(id));

    // Permisos que se removieron (están en current pero no en assigned)
    const removePermissions = current.filter((id) => !assigned.includes(id));

    const payload: UpdateRolDto = {
      isActive: isActive, // o lo que necesites según tu lógica
      addPermissions,
      removePermissions,
    };

    setIsSaving(true);

    try {
      await updateRol(selectedRoleId, payload);
      addNotification({
        color: "success",
        title: "Se ha actualizado el rol",
        position: "top-right",
        duration: 2000
      })
    } catch (error) {
      console.error("❌ Error al actualizar el rol", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: "2px solid #000",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: 2,
              borderBottom: `1px solid ${theme.palette.primary.hover}`,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <PublishedWithChangesIcon
                fontSize="large"
                sx={{ color: theme.palette.primary.contrastText }}
              />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Administración de roles
                </Typography>
                <Typography
                  variant="body2"
                  mt={-1}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Crea roles y administra sus permisos.
                </Typography>
              </Box>
            </Stack>

            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* CONTENT */}
          <Grid2
            container
            spacing={2}
            sx={{ flex: 1, minHeight: 0, alignItems: "stretch" }}
          >
            {/* LEFT SIDEBAR */}
            <Grid2 size={4} sx={{ display: "flex", flexDirection: "column" }}>
              <GrhCustomSelect<string>
                variant={"standard"}
                label={"Seleccionar rol"}
                options={roles}
                value={selectedRoleId}
                disabled={
                  loading.loading_permissions ||
                  loading.loading_roles ||
                  loading.loading_update_rol ||
                  roles.length <= 0
                }
                onChange={(val) => setSelectedRoleId(val.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => setOpenModal(true)}
              >
                + Agregar Rol
              </Button>
            </Grid2>

            {/* PERMISSIONS LIST */}
            <Grid2
              size={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* BÚSQUEDA */}
              <Grid2 sx={{ mb: 2 }} container gap={2}>
                <Grid2 size={8}>
                  <GrhTextField
                    fullWidth
                    variant="standard"
                    disabled={loading.loading_permissions || !selectedRoleId}
                    label="Buscar permiso"
                    value={filter.url}
                    onChange={(e) =>
                      setFilter((prev) => ({ ...prev, url: e.target.value }))
                    }
                  />
                </Grid2>
                <Grid2 size={3}>
                  <GrhCustomSelect<string>
                    variant={"standard"}
                    label={"Seleccionar metodo"}
                    options={[
                      {
                        name: "OBTENER/GET",
                        value: "GET"
                      },{
                        name: "SUBIR/PUT",
                        value: "POST"
                      },{
                        name: "ACTUALIZAR/PUT",
                        value: "PUT"
                      },{
                        name: "ELIMINAR/DELETE",
                        value: "DELETE"
                      },{
                        name: "MODULOS",
                        value: "MODULO"
                      }
                    ]}
                    disabled={
                      loading.loading_permissions ||
                      loading.loading_roles ||
                      loading.loading_update_rol ||
                      roles.length <= 0
                    }
                    fullWidth
                    value={(filter.method as string) || ""}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        method: e.target.value as
                          | "GET"
                          | "POST"
                          | "PUT"
                          | "DELETE"
                          | "PATCH"
                          | "MODULO",
                      }))
                    }
                  />
                </Grid2>
              </Grid2>
              {/* CONTENEDOR DE LISTA / LOADER */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  pr: 1,
                  mb: 2,
                  "&::-webkit-scrollbar": { width: "8px" },
                  "&::-webkit-scrollbar-track": {
                    background: `${theme.palette.primary.light}`,
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
                }}
              >
                {loading.loading_permissions ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  permissions.map((perm) => (
                    <Box
                      key={perm._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        px: 2,
                        bgcolor: "rgba(0,0,0,0.04)",
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{ color: theme.palette.primary.contrastText }}
                        variant="body2"
                      >
                        {perm.description}
                      </Typography>
                      <Switch
                        checked={assignedPermissions.includes(perm._id)}
                        onChange={() => handlePermissionToggle(perm._id)}
                        color="secondary"
                      />
                    </Box>
                  ))
                )}
              </Box>

              {/* PAGINADOR */}
              <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={filter.totalPages || 1}
                  page={filter.currentPage}
                  color="primary"
                  onChange={(_e, value) =>
                    setFilter((prev) => ({ ...prev, currentPage: value }))
                  }
                  disabled={loading.loading_permissions}
                />
              </Box>

              {/* FOOTER ESTÁTICO */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 2,
                  borderTop: `1px solid ${theme.palette.primary.hover}`,
                }}
              >
                {currentRol && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      color={theme.palette.text.primary}
                    >
                      Estado del rol
                    </Typography>
                    <MUIswitch
                      value={isActive}
                      onChange={() => setIsActive(!isActive)}
                    />
                  </Stack>
                )}

                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={!selectedRoleId || isSaving || !hasChanges()}
                >
                  {isSaving ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>

      <ModalCreateRol
        open={openModal}
        handleClose={() => setOpenModal(false)}
        onJustCreated={onJustCreated}
      />
    </>
  );
}
