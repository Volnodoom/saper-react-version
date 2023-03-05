import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from "themes/default-theme";
import * as S from 'components/app/app.style';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <S.GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

