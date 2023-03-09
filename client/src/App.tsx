import AppRoutes from './config/routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "../fonts/FCOrbitRounded.ttf"
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>


  );
}

export default App;
