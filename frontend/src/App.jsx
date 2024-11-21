import { Outlet } from "react-router-dom"
import { darkTheme, GlobalStyle, lightTheme, OutletWrapper } from "./App.style"
import { useRecoilValue } from "recoil"
import { themeState } from "./recoils/Theme"
import { ThemeProvider } from "styled-components";

function App() {
  const theme = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </ThemeProvider>
  )  
}

export default App
