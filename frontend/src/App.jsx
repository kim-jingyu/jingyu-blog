import { Outlet } from "react-router-dom"
import { darkTheme, GlobalStyle, OutletWrapper } from "./App.style"
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </ThemeProvider>
  )  
}

export default App
