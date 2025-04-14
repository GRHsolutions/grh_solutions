import { Box, Grid2, useTheme } from "@mui/material";
import { useParametros } from "../../contexts/useParamether.provider";
import InfoUser from "./components/InfoUser";
import ResumeUser from "./components/ResumeUser";

export default function InfoPage() {
  const { parametros } = useParametros();
  const theme = useTheme();
  const { usePhoneScreen } = parametros;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100%",
        width: "100%",
        fontSize: "1rem",
      }}
    >
      <Grid2
        container
        width={"80vw"}
        height={"100vh"}
        sx={{
          border: "3px solid black"
        }}
      >
        <Grid2
          size={5}
          sx={{
            boxShadow: `${theme.palette.primary.boxShadow}`,
            backgroundColor: `${theme.palette.primary.light}`,
            height: '100%',
            overflowY: 'hidden',
          }}
        >
          <InfoUser />
        </Grid2>
        {!usePhoneScreen && (
          <Grid2
            size={{
              sm: 7
            }}
            sx={{
              boxShadow: `${theme.palette.primary.boxShadow}`,
              backgroundColor: `${theme.palette.primary.light}`,
              height: '100%',
              overflowY: 'hidden',
            }}
          >
            <ResumeUser />
          </Grid2>
        )}
      </Grid2>
    </Box>
  )
}