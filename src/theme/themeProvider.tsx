import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "theme/globalStyleRules";
import theme from "theme/index";

export const ThemeProvider = ({ children }: any) => (
  <StyledThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {children}
    </>
  </StyledThemeProvider>
);
