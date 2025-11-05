import { Avatar, Box, Divider, Typography } from "@mui/material";

interface PreviewHvProps {
  data: Record<string, string>;
}

export default function PreviewHv({ data }: PreviewHvProps) {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "0 auto",
        maxHeight: "80vh", // Limitar la altura máxima
        overflowY: "auto", // Habilitar scroll vertical
      }}
    >
      {/* Encabezado con Foto y Nombre Completo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 4,
          borderBottom: "2px solid #ccc",
          paddingBottom: 2,
        }}
      >
        {data.foto && (
          <Avatar
            src={data.foto}
            alt="Foto de perfil"
            sx={{ width: 100, height: 100, marginRight: 3 }}
          />
        )}
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {`${data.Nombre || "Nombre"} ${data.Apellido || "Apellido"}`}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {data.Ocupacion || "Ocupación"}
          </Typography>
        </Box>
      </Box>

      {/* Secciones */}
      <Box>
        {/* Información Personal */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Información Personal
          </Typography>
          <Divider sx={{ marginBottom: 2, borderColor: "#00913f" }} /> {/* Cambiar color */}
          <Typography>
            <strong>Nombre:</strong> {data.Nombre || "Sin información"}
          </Typography>
          <Typography>
            <strong>Apellido:</strong> {data.Apellido || "Sin información"}
          </Typography>
          <Typography>
            <strong>Dirección:</strong> {data.Direccion || "Sin información"}
          </Typography>
          <Typography>
            <strong>Tipo de Documento:</strong>{" "}
            {data["Tipo De Documento"] || "Sin información"}
          </Typography>
          <Typography>
            <strong>RH:</strong> {data["RH (Grupo sanguíneo)"] || "Sin información"}
          </Typography>
        </Box>

        {/* Perfil */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Perfil
          </Typography>
          <Divider sx={{ marginBottom: 2, borderColor: "#00913f" }} /> {/* Cambiar color */}
          <Typography>
            <strong>Ocupación:</strong> {data.Ocupacion || "Sin información"}
          </Typography>
          <Typography>
            <strong>Descripción:</strong> {data.Descripcion || "Sin información"}
          </Typography>
        </Box>

        {/* Formación */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Formación
          </Typography>
          <Divider sx={{ marginBottom: 2, borderColor: "#00913f" }} /> {/* Cambiar color */}
          <Typography>
            <strong>Título:</strong> {data.Titulo || "Sin información"}
          </Typography>
          <Typography>
            <strong>Institución:</strong> {data.Institucion || "Sin información"}
          </Typography>
          <Typography>
            <strong>Fecha de Graduación:</strong>{" "}
            {data["Fecha De Graduacion"] || "Sin información"}
          </Typography>
        </Box>

        {/* Experiencia */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Experiencia
          </Typography>
          <Divider sx={{ marginBottom: 2, borderColor: "#00913f" }} /> {/* Cambiar color */}
          <Typography>
            <strong>Empresa:</strong> {data.Empresa || "Sin información"}
          </Typography>
          <Typography>
            <strong>Cargo:</strong> {data.Cargo || "Sin información"}
          </Typography>
          <Typography>
            <strong>Duración:</strong> {data.Duracion || "Sin información"}
          </Typography>
        </Box>

        {/* Habilidades */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Habilidades
          </Typography>
          <Divider sx={{ marginBottom: 2, borderColor: "#00913f" }} /> {/* Cambiar color */}
          <Typography>
            <strong>Habilidad:</strong> {data.Habilidad || "Sin información"}
          </Typography>
          <Typography>
            <strong>Nivel de Habilidad:</strong>{" "}
            {data["Nivel De Habilidad"] || "Sin información"}
          </Typography>
        </Box>

        {/* Idiomas */}
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Idiomas
          </Typography>
          <Divider sx={{ marginBottom: 2, borderColor: "#00913f" }} /> {/* Cambiar color */}
          <Typography>
            <strong>Idioma:</strong> {data.Idioma || "Sin información"}
          </Typography>
          <Typography>
            <strong>Nivel de Idioma:</strong>{" "}
            {data["Nivel De Idioma"] || "Sin información"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
