import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'theme/themeProvider';
import { CursorProvider } from 'components/Cursor.tsx';
import DarkModeProvider from 'theme/darkModeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <DarkModeProvider>
        <CursorProvider>
          <App />
        </CursorProvider>
      </DarkModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
