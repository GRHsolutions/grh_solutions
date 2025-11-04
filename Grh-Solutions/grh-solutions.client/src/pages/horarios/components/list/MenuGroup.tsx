import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import ModalGroup from "./ModalGroup";
import ModalHorario from "./ModalHorario";
import Groups3Icon from "@mui/icons-material/Groups3";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GrhButton from "../../../../generics/grh-generics/button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getAreas } from "../../../../domain/services/area/area.service";
import { getProfiles } from "../../../../domain/services/profile/profile.service";
import { useAuth } from "../../../../hooks/auth";
interface IPositionedMenuProps {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PositionedMenu({ setReload, reload }: IPositionedMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalType, setModalType] = React.useState<string | null>(null);
      const [areasOptions, setAreasOptions] = React.useState<
    { value: string; name: string }[]
  >([]);
  const [usersOptions, setUsersOptions] = React.useState<
    { id: number; nombre: string }[]
  >([]);
  const open = Boolean(anchorEl);
  const { auth } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = (type: string) => {
    setModalType(type);
    handleClose();
  };
  const handleCloseModal = () => {
    setModalType(null);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [areasRes, usersRes] = await Promise.all([
          getAreas(auth.token),
          getProfiles(auth.token),
        ]);

        const areas = areasRes.data;
        const users = usersRes.data;

        setAreasOptions(areas.map((a: any) => ({ value: a._id, name: a.name })));
        setUsersOptions(
          users.map((u: any) => ({
            id: u.user,
            nombre: `${u.name} ${u.lastname}`.trim(),
          }))
        );
      } catch (err) {
        console.error("Error cargando áreas o usuarios:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <GrhButton
        label="Crear"
        variant="principal"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClick}
        sx={{ width: "100%" }}
      />
      <Menu
        sx={{ mt: 5.5 }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ textAlign: "center" }}>Opciones</Box>
        <MenuItem
          onClick={() => handleOpenModal("Group")}
          sx={{
            gap: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: "4px",
            paddingX: "30px",
          }}
        >
          <Groups3Icon></Groups3Icon>
          Grupo
        </MenuItem>
        <MenuItem
          onClick={() => handleOpenModal("Horario")}
          sx={{
            gap: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: "4px",
            paddingX: "30px",
          }}
        >
          <CalendarMonthIcon></CalendarMonthIcon>
          Horario
        </MenuItem>
      </Menu>
      {modalType === "Group" && (
        <ModalGroup open={true} handleClose={handleCloseModal} setReload={setReload} areasOptions={areasOptions} usersOptions={usersOptions} token={auth.token} />
      )}
      {modalType === "Horario" && (
        <ModalHorario open={true} handleClose={handleCloseModal} setReload={setReload} token={auth.token} reload={reload} />
      )}
    </div>
  );
}
