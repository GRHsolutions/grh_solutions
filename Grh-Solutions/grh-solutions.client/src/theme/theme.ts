import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#007BFF' },
    secondary: { main: '#6EC6FF' },
    background: { default: '#F8F9FA', paper: '#FFFFFF' },
    text: { primary: '#343A40', secondary: '#6C757D' },
    success: { main: '#28A745' },
    warning: { main: '#FD7E14' },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90CAF9' },
    secondary: { main: '#F48FB1' },
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#E0E0E0', secondary: '#B0B0B0' },
    success: { main: '#66BB6A' },
    warning: { main: '#FFB74D' },
  },
});

export { lightTheme, darkTheme };