import { CircularProgress, Box, Typography } from '@mui/material';

const CenteredLoader = ({ text = "Cargando, por favor espere...", size = 40 }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
        }}
    >
        <CircularProgress size={size} aria-label="Loading..." />
        <Typography variant="h6" sx={{ mt: 2 }}>
            {text}
        </Typography>
    </Box>
);

export default CenteredLoader;
