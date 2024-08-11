import { Outlet } from "react-router-dom"
import { OutletWrapper } from "./App.style"

function App() {
  return (
    <>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </>
  )  
}

export default App
