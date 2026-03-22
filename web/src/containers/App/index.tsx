import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { HashRouter as Router } from 'react-router-dom';

import 'react-image-lightbox/style.css';

import { RootState } from '../../store';
import Phone from '../Phone';
import Race from '../Race';

library.add(fab, fas);

const App: FC = () => {
  const settings = useSelector((state: RootState) => (state.data.data.player as any)?.PhoneSettings);
  const showTrack = useSelector((state: RootState) => state.track.show);

  const accent = settings?.colors?.accent;

  const muiTheme = createTheme({
    typography: { fontFamily: 'Oswald' },
    palette: {
      primary: {
        main: accent ?? '#b40000',
        light: accent ?? '#c33333',
        dark: accent ?? '#7e0000',
        contrastText: '#ffffff',
      },
      secondary: { main: '#18191e', light: '#2e3037', dark: '#1e1f24', contrastText: '#cecece' },
      error:   { main: '#6e1616', light: '#a13434', dark: '#430b0b' },
      success: { main: '#52984a', light: '#60eb50', dark: '#244a20' },
      warning: { main: '#f09348', light: '#f2b583', dark: '#b05d1a' },
      info:    { main: '#247ba5', light: '#247ba5', dark: '#175878' },
      mode: 'dark',
      border: { divider: 'rgba(255, 255, 255, 0.12)' },
    } as any,
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 16,
            backgroundColor: '#151515',
            border: '1px solid rgba(255,255,255,0.23)',
            boxShadow: '0 0 10px #000',
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { background: '#151515' } } },
      MuiAutocomplete: { styleOverrides: { paper: { boxShadow: '0 0 25px #000' } } },
      MuiBackdrop: { styleOverrides: { root: { height: '90%', width: '90%', margin: 'auto' } } },
      MuiPopover: { styleOverrides: { root: { zIndex: '100000 !important' as any } } },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': { background: '#ffffff52' },
            '&::-webkit-scrollbar-thumb:hover': { background: accent ?? '#dd1e36' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
          },
          html: {
            background: import.meta.env.DEV ? '#1e1e1e' : 'transparent',
          },
        },
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Phone />
          {showTrack && <Race />}
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
