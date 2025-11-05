import { CircularProgress, Box, Typography, useTheme } from '@mui/material';


const CenteredLoader = ({ text = "Cargando, por favor espere...", size = 40 }) => {
    const theme = useTheme();
    return(
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            overflowY: 'hidden',
            flexDirection: 'column',
        }}
    >
        <CircularProgress size={size} aria-label="Loading..." />
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {text}
        </Typography>
    </Box>
);
}
export default CenteredLoader;
