import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
      <RouterProvider router={router} />
  </RecoilRoot>
)