import { Box, Grid2, Typography, useTheme } from "@mui/material"

interface SurveyProps {
  loading: boolean;
}

export const Survey = ({
  
} : SurveyProps) => {
  const theme = useTheme()


  return (
    <Box>
      <Grid2
        container
        spacing={2}
      >
        <Grid2
          size={12}
        >
          <Typography
            variant="h5"
            fontWeight={"bold"}
            sx={{
              color: theme.palette.secondary.main,
            }}
          >
            Encuesta 
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  )
}