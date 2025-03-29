import { Box, Typography } from "@mui/material";

interface PreviewHvProps {
  data: Record<string, string>;
}

export default function PreviewHv({ data }: PreviewHvProps) {
  return (
    <Box
      sx={{
        padding: 3,
        height: "100%",
        overflowY: "auto",
        wordWrap: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Vista Previa
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 2,
          backgroundColor: "#f9f9f9",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {Object.entries(data).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              padding: 1,
              borderBottom: "1px solid #ddd",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            <Typography fontWeight="bold">{key}:</Typography>

            {key === "foto" && value ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <img
                  src={value}
                  alt="Foto de perfil"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <Typography>{value}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
