import { Outlet } from "react-router-dom"
import { darkTheme, GlobalStyle, lightTheme, OutletWrapper } from "./App.style"
import { useRecoilState } from "recoil"
import { ThemeFlag, themeState } from "./recoils/Theme"
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";

function App() {
  const [theme, setTheme] = useRecoilState(themeState);

    const updateThemeByTime = () => {
        const currentHour = new Date().getHours();
        const isDayTime = currentHour >= 6 && currentHour < 18;
        setTheme(isDayTime ? ThemeFlag.light : ThemeFlag.dark);
    };

    useEffect(() => {
        updateThemeByTime();

        const intervalId = setInterval(updateThemeByTime, 1000 * 60 * 30);

        return () => clearInterval(intervalId);
    }, []);

  return (
    <ThemeProvider theme={theme === ThemeFlag.dark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </ThemeProvider>
  )  
}

export default App
